import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AccountsComponentsPage, AccountsUpdatePage } from './accounts-jbh.page-object';

describe('Accounts e2e test', () => {
    let navBarPage: NavBarPage;
    let accountsUpdatePage: AccountsUpdatePage;
    let accountsComponentsPage: AccountsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Accounts', () => {
        navBarPage.goToEntity('accounts-jbh');
        accountsComponentsPage = new AccountsComponentsPage();
        expect(accountsComponentsPage.getTitle()).toMatch(/jbhApp.accounts.home.title/);
    });

    it('should load create Accounts page', () => {
        accountsComponentsPage.clickOnCreateButton();
        accountsUpdatePage = new AccountsUpdatePage();
        expect(accountsUpdatePage.getPageTitle()).toMatch(/jbhApp.accounts.home.createOrEditLabel/);
        accountsUpdatePage.cancel();
    });

    it('should create and save Accounts', () => {
        accountsComponentsPage.clickOnCreateButton();
        accountsUpdatePage.typeSelectLastOption();
        accountsUpdatePage.idUsrGroupSelectLastOption();
        accountsUpdatePage.save();
        expect(accountsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
