import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MovementesOutgoingsComponentsPage, MovementesOutgoingsUpdatePage } from './movementes-outgoings-jbh.page-object';

describe('MovementesOutgoings e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let movementesOutgoingsUpdatePage: MovementesOutgoingsUpdatePage;
    let movementesOutgoingsComponentsPage: MovementesOutgoingsComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MovementesOutgoings', async () => {
        await navBarPage.goToEntity('movementes-outgoings-jbh');
        movementesOutgoingsComponentsPage = new MovementesOutgoingsComponentsPage();
        expect(await movementesOutgoingsComponentsPage.getTitle()).toMatch(/jbhApp.movementesOutgoings.home.title/);
    });

    it('should load create MovementesOutgoings page', async () => {
        await movementesOutgoingsComponentsPage.clickOnCreateButton();
        movementesOutgoingsUpdatePage = new MovementesOutgoingsUpdatePage();
        expect(await movementesOutgoingsUpdatePage.getPageTitle()).toMatch(/jbhApp.movementesOutgoings.home.createOrEditLabel/);
        await movementesOutgoingsUpdatePage.cancel();
    });

    it('should create and save MovementesOutgoings', async () => {
        await movementesOutgoingsComponentsPage.clickOnCreateButton();
        await movementesOutgoingsUpdatePage.setTotalValueInput('5');
        expect(await movementesOutgoingsUpdatePage.getTotalValueInput()).toMatch('5');
        await movementesOutgoingsUpdatePage.setCreateDateInput('2000-12-31');
        expect(await movementesOutgoingsUpdatePage.getCreateDateInput()).toMatch('2000-12-31');
        await movementesOutgoingsUpdatePage.idUserGroupSelectLastOption();
        await movementesOutgoingsUpdatePage.idSubCategorySelectLastOption();
        await movementesOutgoingsUpdatePage.paymentMethodSelectLastOption();
        await movementesOutgoingsUpdatePage.save();
        expect(await movementesOutgoingsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
