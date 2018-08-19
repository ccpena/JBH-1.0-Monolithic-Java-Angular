import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActiveDebtsComponentsPage, ActiveDebtsUpdatePage } from './active-debts-jbh.page-object';

describe('ActiveDebts e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let activeDebtsUpdatePage: ActiveDebtsUpdatePage;
    let activeDebtsComponentsPage: ActiveDebtsComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ActiveDebts', async () => {
        await navBarPage.goToEntity('active-debts-jbh');
        activeDebtsComponentsPage = new ActiveDebtsComponentsPage();
        expect(await activeDebtsComponentsPage.getTitle()).toMatch(/jbhApp.activeDebts.home.title/);
    });

    it('should load create ActiveDebts page', async () => {
        await activeDebtsComponentsPage.clickOnCreateButton();
        activeDebtsUpdatePage = new ActiveDebtsUpdatePage();
        expect(await activeDebtsUpdatePage.getPageTitle()).toMatch(/jbhApp.activeDebts.home.createOrEditLabel/);
        await activeDebtsUpdatePage.cancel();
    });

    it('should create and save ActiveDebts', async () => {
        await activeDebtsComponentsPage.clickOnCreateButton();
        await activeDebtsUpdatePage.setValueInput('5');
        expect(await activeDebtsUpdatePage.getValueInput()).toMatch('5');
        await activeDebtsUpdatePage.setCreateDateInput('2000-12-31');
        expect(await activeDebtsUpdatePage.getCreateDateInput()).toMatch('2000-12-31');
        await activeDebtsUpdatePage.idDebtorSelectLastOption();
        await activeDebtsUpdatePage.idCreditorSelectLastOption();
        await activeDebtsUpdatePage.idSubCategorySelectLastOption();
        await activeDebtsUpdatePage.idMovementOutgoingSelectLastOption();
        await activeDebtsUpdatePage.save();
        expect(await activeDebtsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
