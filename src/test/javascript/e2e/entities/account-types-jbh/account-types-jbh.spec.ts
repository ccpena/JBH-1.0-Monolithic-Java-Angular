import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AccountTypesComponentsPage, AccountTypesUpdatePage } from './account-types-jbh.page-object';

describe('AccountTypes e2e test', () => {
    let navBarPage: NavBarPage;
    let accountTypesUpdatePage: AccountTypesUpdatePage;
    let accountTypesComponentsPage: AccountTypesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AccountTypes', () => {
        navBarPage.goToEntity('account-types-jbh');
        accountTypesComponentsPage = new AccountTypesComponentsPage();
        expect(accountTypesComponentsPage.getTitle()).toMatch(/jbhApp.accountTypes.home.title/);
    });

    it('should load create AccountTypes page', () => {
        accountTypesComponentsPage.clickOnCreateButton();
        accountTypesUpdatePage = new AccountTypesUpdatePage();
        expect(accountTypesUpdatePage.getPageTitle()).toMatch(/jbhApp.accountTypes.home.createOrEditLabel/);
        accountTypesUpdatePage.cancel();
    });

    it('should create and save AccountTypes', () => {
        accountTypesComponentsPage.clickOnCreateButton();
        accountTypesUpdatePage.setDescriptionInput('description');
        expect(accountTypesUpdatePage.getDescriptionInput()).toMatch('description');
        accountTypesUpdatePage
            .getDefinedByJBHInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    accountTypesUpdatePage.getDefinedByJBHInput().click();
                    expect(accountTypesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
                } else {
                    accountTypesUpdatePage.getDefinedByJBHInput().click();
                    expect(accountTypesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
                }
            });
        accountTypesUpdatePage.save();
        expect(accountTypesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
