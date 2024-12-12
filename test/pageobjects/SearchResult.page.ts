import { $ } from '@wdio/globals';
import Page from './BasePage';

class SearchResultPage extends Page {
    // Element Selector
    public get resultsList() {
        return $('//android.widget.TextView[@text="https://www.elfie.co"]');
    }

    // Verify that the search results exist
    public async verifySearchResult() {
        const isResultExisting = await this.resultsList.isExisting();
        expect(isResultExisting).toBe(true);
    }

    // Click on the first search result
    public async clickOnFirstResult() {
        await browser.saveScreenshot('./screenshots/step1_google_opened.png');
        await this.resultsList.click();
    }
}

export default new SearchResultPage();