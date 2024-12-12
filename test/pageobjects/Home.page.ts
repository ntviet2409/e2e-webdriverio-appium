import { $ } from '@wdio/globals';
import Page from './BasePage';

class HomePage extends Page {
    // Element Selectors
    public get logoImage() {
        return $('//android.widget.Image[@text="Elfie icon"]');
    }

    public get hamburgerMenu() {
        return $('//android.widget.Button[@text="menu"]');
    }

    public get overlayXIcon() {
        return $('//android.widget.Button[@text="menu"]');
    }

    public get copyRightElement() {
        return $('//android.widget.TextView[@text="Copyright © 2024 Elfie Pte. Ltd."]');
    }

    public get acceptAllCookies() {
        return $('//android.widget.Button[@text="Accept All"]');
    }

    // Actions and Validations
    /**
     * Verifies if the logo is displayed and takes a screenshot.
     */
    public async verifyLogoShouldBeDisplayed() {
        await this.acceptAllCookies.click();
        const isLogoVisible = await this.logoImage.isExisting();
        expect(isLogoVisible).toBe(true);

        await this.saveScreenshotWithOverwrite('./screenshots/step1_Logo_Displayed.png');
    }

    /**
     * Clicks on the hamburger menu.
     */
    public async clickOnHamburgerMenu() {
        await this.hamburgerMenu.click();
    }

    /**
     * Verifies if the overlay icon changes to 'X' and takes a screenshot.
     */
    public async verifyIconChangeToX() {
        const isOverlayIconVisible = await this.overlayXIcon.isExisting();
        expect(isOverlayIconVisible).toBe(true);

        await browser.pause(2000);
        await this.saveScreenshotWithOverwrite('./screenshots/step2_Icon_Changed.png');
    }

    /**
     * Scrolls until the copyright element is visible.
     */
    public async scrollUntilElementVisible() {
        await this.clickOnHamburgerMenu();

        let isVisible = false;
        while (!isVisible) {
            await driver
                .action('pointer')
                .move({ duration: 0, x: 460, y: 1876 })
                .down({ button: 0 })
                .move({ duration: 1000, x: 673, y: 208 })
                .up({ button: 0 })
                .perform();

            isVisible = await this.copyRightElement.isExisting();
            if (isVisible) {
                console.log('Element is now visible');
            } else {
                console.log('Element not visible, scrolling again...');
            }
        }
    }

    /**
     * Verifies if the copyright information is displayed and takes a screenshot.
     */
    public async verifyCopyRightInformationIsDisplayed() {
        const isCopyRightVisible = await this.copyRightElement.isExisting();
        expect(isCopyRightVisible).toBe(true);

        await this.saveScreenshotWithOverwrite('./screenshots/step3_CopyRight_Displayed.png');
    }
}

export default new HomePage();