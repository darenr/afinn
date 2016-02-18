
function tokenize(input) {
  return input.replace(/[^a-zA-Z- ]+/g, '').replace('/ {2,}/', ' ').toLowerCase().split(' ');
}

function sentiment(phrase) {

  var tokens = tokenize(phrase),
    score = 0,
    words = [],
    positive = [],
    negative = [];

  // Iterate over tokens
  var len = tokens.length;
  while (len--) {
    var obj = tokens[len];
    var item = afinn[obj];
    if (!afinn.hasOwnProperty(obj)) continue;

    words.push(obj);
    if (item > 0) positive.push(obj);
    if (item < 0) negative.push(obj);

    score += item;
  }

  var verdict = score == 0 ? "NEUTRAL" : score < 0 ? "NEGATIVE" : "POSITIVE";

  // Handle optional async interface
  var result = {
    verdict: verdict,
    score: score,
    comparative: score / tokens.length,
    positive: positive,
    negative: negative
  };

  return result;
}
