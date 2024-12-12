import { removeSync } from 'fs-extra';

export const config: WebdriverIO.Config = {
    runner: 'local',

    // TypeScript Configuration
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true,
        },
    },

    // Appium Server Configuration
    port: 4723,

    // Test Specifications
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,

    // Capabilities
    capabilities: [
        {
            platformName: 'Android',
            'appium:browserName': 'Chrome',
            'appium:deviceName': 'emulator-5554',
            'appium:platformVersion': '15.0',
            'appium:automationName': 'UiAutomator2',
            'goog:chromeOptions': {
                args: [
                    '--start-fullscreen',
                    '--enable-experimental-cookie-features',
                    '--allow-cross-origin-auth-prompt',
                    '--allow-third-party-modules',
                    '--disable-web-security',
                ],
            },
        },
    ],

    // General Configuration
    logLevel: 'info',
    waitforTimeout: 10000,

    // Services Configuration
    services: [
        [
            'appium',
            {
                command: 'appium',
                args: {
                    debugLogSpacing: true,
                    relaxedSecurity: true,
                    sessionOverride: true,
                },
            },
        ],
    ],

    // Framework and Reporters
    framework: 'mocha',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './report/allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                disableMochaHooks: true,
                addConsoleLogs: true,
            },
        ],
    ],

    // Hooks
    onPrepare: (): void => {
        // Clean up reports directory before starting tests
        removeSync('./report/allure-results/');
        removeSync('./allure-report/');
        console.time('Execution time for all spec files');
    },

    afterTest: async function (test): Promise<void> {
        // Handle test failure screenshots
        const testName = test.title.replace(/\s+/g, '_').toLowerCase();
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
        const folderPath = `./screenshots/${testName}_${timestamp}`;

        const fs = require('fs');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        await browser.saveScreenshot(`${folderPath}/failure.png`);
    },

    mochaOpts: {
        ui: 'bdd',
        timeout: 1000000,
    },
};