import Search from '../pageobjects/Search.page';
import SearchResultPage from '../pageobjects/SearchResult.page';
import HomePage from '../pageobjects/Home.page';

describe('Google Search Demonstration', () => {
    it('should open Google Search and perform search actions', async () => {
        // Open the search page
        await Search.open();

        // Perform a search for 'Elfie'
        await Search.search('Elfie');

        // Verify the search results and interact with the first result
        await SearchResultPage.verifySearchResult();
        await SearchResultPage.clickOnFirstResult();

        // Verify Home Page functionality
        await HomePage.verifyLogoShouldBeDisplayed();
        await HomePage.clickOnHamburgerMenu();
        await HomePage.verifyIconChangeToX();
        await HomePage.scrollUntilElementVisible();
        await HomePage.verifyCopyRightInformationIsDisplayed();
    });
});