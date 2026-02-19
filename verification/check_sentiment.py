from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/index.htm")

        page.fill("#txt", "This is good.")
        page.wait_for_timeout(500)

        # Verify result content
        result_text = page.inner_text("#result")
        print(f"Result: {result_text}")

        if "POSITIVE" in result_text:
            print("SUCCESS: Sentiment analysis working.")
        else:
            print("FAILURE: Sentiment analysis not working.")

        page.screenshot(path="verification/sentiment_check_fixed.png")
        browser.close()

if __name__ == "__main__":
    run()
