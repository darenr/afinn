function tokenize(input) {
  return $.map(input.replace(/ {2,}/g, ' ')
    .replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g, '')
    .toLowerCase()
    .split(' '), $.trim);
}

function sentiment(phrase) {

  var tokens = tokenize(phrase),
    score = 0,
    words = [],
    positive = [],
    negative = [];

  var i = 0;
  var len = tokens.length;
  var negated = false;

  while (i < len) {
    var match = null;
    var matchLen = 0;
    var item = 0;

    // Try 3-gram, 2-gram, 1-gram
    for (var n = 3; n >= 1; n--) {
      if (i + n <= len) {
        var chunk = tokens.slice(i, i + n).join(' ');
        if (afinn.hasOwnProperty(chunk)) {
          match = chunk;
          matchLen = n;
          item = afinn[chunk];
          break;
        }
        var chunkNoApos = chunk.replace(/['’]/g, '');
        if (afinn.hasOwnProperty(chunkNoApos)) {
          match = chunk;
          matchLen = n;
          item = afinn[chunkNoApos];
          break;
        }
      }
    }

    if (match) {
      if (negated) {
        item = item * -1.0;
        negated = false;
      }

      // Special handling for "no" as it is both a sentiment word (-1) and a negator
      if (match === 'no') {
          negated = true;
      }

      words.push(match);
      score += item;
      if (item > 0) positive.push(match);
      if (item < 0) negative.push(match);

      i += matchLen;
    } else {
      var token = tokens[i];
      // Check for negators
      if (token === 'no' || token === 'not' || token === 'cannot' || /n['’]t$/.test(token)) {
        negated = !negated;
      }
      i++;
    }
  }

  var verdict = score == 0 ? "NEUTRAL" : score < 0 ? "NEGATIVE" : "POSITIVE";

  var result = {
    verdict: verdict,
    score: score,
    comparative: score / tokens.length,
    positive: [...new Set(positive)],
    negative: [...new Set(negative)]
  };

  return result;
}
