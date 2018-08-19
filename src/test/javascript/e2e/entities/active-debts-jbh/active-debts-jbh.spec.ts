import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ActiveDebtsComponentsPage, ActiveDebtsUpdatePage } from './active-debts-jbh.page-object';

describe('ActiveDebts e2e test', () => {
    let navBarPage: NavBarPage;
    let activeDebtsUpdatePage: ActiveDebtsUpdatePage;
    let activeDebtsComponentsPage: ActiveDebtsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ActiveDebts', () => {
        navBarPage.goToEntity('active-debts-jbh');
        activeDebtsComponentsPage = new ActiveDebtsComponentsPage();
        expect(activeDebtsComponentsPage.getTitle()).toMatch(/jbhApp.activeDebts.home.title/);
    });

    it('should load create ActiveDebts page', () => {
        activeDebtsComponentsPage.clickOnCreateButton();
        activeDebtsUpdatePage = new ActiveDebtsUpdatePage();
        expect(activeDebtsUpdatePage.getPageTitle()).toMatch(/jbhApp.activeDebts.home.createOrEditLabel/);
        activeDebtsUpdatePage.cancel();
    });

    it('should create and save ActiveDebts', () => {
        activeDebtsComponentsPage.clickOnCreateButton();
        activeDebtsUpdatePage.setValueInput('5');
        expect(activeDebtsUpdatePage.getValueInput()).toMatch('5');
        activeDebtsUpdatePage.setCreateDateInput('2000-12-31');
        expect(activeDebtsUpdatePage.getCreateDateInput()).toMatch('2000-12-31');
        activeDebtsUpdatePage.idDebtorSelectLastOption();
        activeDebtsUpdatePage.idCreditorSelectLastOption();
        activeDebtsUpdatePage.idSubCategorySelectLastOption();
        activeDebtsUpdatePage.idMovementOutgoingSelectLastOption();
        activeDebtsUpdatePage.save();
        expect(activeDebtsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
