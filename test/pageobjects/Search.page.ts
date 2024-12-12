import { $ } from '@wdio/globals'
import Page from './BasePage';

class HomePage extends Page {

    public open () {
        return super.open();
    }

    public get searchTextbox () {
        return $('//android.view.View[1]/android.widget.EditText');
    }

    public get btnSearch () {
        return $('//android.widget.Button[@text="Google Search"]');
    }

    public get suggestionList () {
        return $('//android.widget.TextView[@text="Elfie"]');    }

    public async search (searchText: string) {
        await this.switchToNative();
        await this.searchTextbox.setValue(searchText);
        await this.btnSearch.click();
        await driver.executeScript("mobile: pressKey", [{"keycode":66}]);
    }
}

export default new HomePage();
