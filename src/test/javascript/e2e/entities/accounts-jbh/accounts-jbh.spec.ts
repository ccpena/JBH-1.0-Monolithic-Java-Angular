import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AccountsComponentsPage, AccountsUpdatePage } from './accounts-jbh.page-object';

describe('Accounts e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let accountsUpdatePage: AccountsUpdatePage;
    let accountsComponentsPage: AccountsComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Accounts', async () => {
        await navBarPage.goToEntity('accounts-jbh');
        accountsComponentsPage = new AccountsComponentsPage();
        expect(await accountsComponentsPage.getTitle()).toMatch(/jbhApp.accounts.home.title/);
    });

    it('should load create Accounts page', async () => {
        await accountsComponentsPage.clickOnCreateButton();
        accountsUpdatePage = new AccountsUpdatePage();
        expect(await accountsUpdatePage.getPageTitle()).toMatch(/jbhApp.accounts.home.createOrEditLabel/);
        await accountsUpdatePage.cancel();
    });

    it('should create and save Accounts', async () => {
        await accountsComponentsPage.clickOnCreateButton();
        await accountsUpdatePage.typeSelectLastOption();
        await accountsUpdatePage.idUsrGroupSelectLastOption();
        await accountsUpdatePage.save();
        expect(await accountsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
