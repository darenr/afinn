from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/index.htm")

        page.fill("#txt", "This is good.")

        # Get computed style
        color = page.eval_on_selector("#result", "e => getComputedStyle(e).color")
        bg_color = page.eval_on_selector("#result", "e => getComputedStyle(e).backgroundColor")

        print(f"Text color: {color}")
        print(f"Background color: {bg_color}")

        browser.close()

if __name__ == "__main__":
    run()
