import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MovementesOutgoingsComponentsPage, MovementesOutgoingsUpdatePage } from './movementes-outgoings-jbh.page-object';

describe('MovementesOutgoings e2e test', () => {
    let navBarPage: NavBarPage;
    let movementesOutgoingsUpdatePage: MovementesOutgoingsUpdatePage;
    let movementesOutgoingsComponentsPage: MovementesOutgoingsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MovementesOutgoings', () => {
        navBarPage.goToEntity('movementes-outgoings-jbh');
        movementesOutgoingsComponentsPage = new MovementesOutgoingsComponentsPage();
        expect(movementesOutgoingsComponentsPage.getTitle()).toMatch(/jbhApp.movementesOutgoings.home.title/);
    });

    it('should load create MovementesOutgoings page', () => {
        movementesOutgoingsComponentsPage.clickOnCreateButton();
        movementesOutgoingsUpdatePage = new MovementesOutgoingsUpdatePage();
        expect(movementesOutgoingsUpdatePage.getPageTitle()).toMatch(/jbhApp.movementesOutgoings.home.createOrEditLabel/);
        movementesOutgoingsUpdatePage.cancel();
    });

    it('should create and save MovementesOutgoings', () => {
        movementesOutgoingsComponentsPage.clickOnCreateButton();
        movementesOutgoingsUpdatePage.setTotalValueInput('5');
        expect(movementesOutgoingsUpdatePage.getTotalValueInput()).toMatch('5');
        movementesOutgoingsUpdatePage.setCreateDateInput('2000-12-31');
        expect(movementesOutgoingsUpdatePage.getCreateDateInput()).toMatch('2000-12-31');
        movementesOutgoingsUpdatePage.idUserGroupSelectLastOption();
        movementesOutgoingsUpdatePage.idSubCategorySelectLastOption();
        movementesOutgoingsUpdatePage.paymentMethodSelectLastOption();
        movementesOutgoingsUpdatePage.save();
        expect(movementesOutgoingsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
