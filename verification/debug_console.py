from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        page.goto("http://localhost:8000/index.htm")

        page.fill("#txt", "This is good.")
        page.wait_for_timeout(1000)

        result_text = page.inner_text("#result")
        print(f"Result: {result_text}")

        browser.close()

if __name__ == "__main__":
    run()
