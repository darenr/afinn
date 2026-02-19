from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))

        page.goto("http://localhost:8000/index.htm")

        # Check if afinn is defined
        afinn_check = page.evaluate("typeof afinn !== 'undefined' ? 'defined' : 'undefined'")
        print(f"afinn variable is: {afinn_check}")

        if afinn_check == 'defined':
            keys_count = page.evaluate("Object.keys(afinn).length")
            print(f"afinn has {keys_count} keys")

        page.fill("#txt", "This is good.")

        result_text = page.inner_text("#result")
        print(f"Result: {result_text}")

        browser.close()

if __name__ == "__main__":
    run()
