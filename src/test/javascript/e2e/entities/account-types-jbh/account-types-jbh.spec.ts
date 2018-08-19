import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AccountTypesComponentsPage, AccountTypesUpdatePage } from './account-types-jbh.page-object';

describe('AccountTypes e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let accountTypesUpdatePage: AccountTypesUpdatePage;
    let accountTypesComponentsPage: AccountTypesComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AccountTypes', async () => {
        await navBarPage.goToEntity('account-types-jbh');
        accountTypesComponentsPage = new AccountTypesComponentsPage();
        expect(await accountTypesComponentsPage.getTitle()).toMatch(/jbhApp.accountTypes.home.title/);
    });

    it('should load create AccountTypes page', async () => {
        await accountTypesComponentsPage.clickOnCreateButton();
        accountTypesUpdatePage = new AccountTypesUpdatePage();
        expect(await accountTypesUpdatePage.getPageTitle()).toMatch(/jbhApp.accountTypes.home.createOrEditLabel/);
        await accountTypesUpdatePage.cancel();
    });

    it('should create and save AccountTypes', async () => {
        await accountTypesComponentsPage.clickOnCreateButton();
        await accountTypesUpdatePage.setDescriptionInput('description');
        expect(await accountTypesUpdatePage.getDescriptionInput()).toMatch('description');
        const selectedDefinedByJBH = accountTypesUpdatePage.getDefinedByJBHInput();
        if (await selectedDefinedByJBH.isSelected()) {
            await accountTypesUpdatePage.getDefinedByJBHInput().click();
            expect(await accountTypesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
        } else {
            await accountTypesUpdatePage.getDefinedByJBHInput().click();
            expect(await accountTypesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
        }
        await accountTypesUpdatePage.save();
        expect(await accountTypesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
