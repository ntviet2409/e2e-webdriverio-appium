import { browser } from '@wdio/globals'
const fs = require('fs');
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open () {
        return browser.url(`https://www.google.com/ncr`)
    }

    public async saveScreenshotWithOverwrite(filepath: string) {
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`File at ${filepath} already exists. Deleting it.`);
          }
        await browser.saveScreenshot(filepath);
        console.log(`Screenshot saved to ${filepath}`);
      }

      public async switchToWebView() {
        const contexts = await browser.getContexts();
        console.log(contexts);
        const webviewContext = contexts.find((context) => context.toString().includes('CHROMIUM'));

        if (webviewContext) {
          await browser.switchContext(webviewContext.toString());
        } else {
          console.log('Webview context not found!');
        }
      }

      public async switchToNative() {
        await browser.switchContext('NATIVE_APP');
      }
}
