import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { UserGroupCategoriesComponentsPage, UserGroupCategoriesUpdatePage } from './user-group-categories-jbh.page-object';

describe('UserGroupCategories e2e test', () => {
    let navBarPage: NavBarPage;
    let userGroupCategoriesUpdatePage: UserGroupCategoriesUpdatePage;
    let userGroupCategoriesComponentsPage: UserGroupCategoriesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserGroupCategories', () => {
        navBarPage.goToEntity('user-group-categories-jbh');
        userGroupCategoriesComponentsPage = new UserGroupCategoriesComponentsPage();
        expect(userGroupCategoriesComponentsPage.getTitle()).toMatch(/jbhApp.userGroupCategories.home.title/);
    });

    it('should load create UserGroupCategories page', () => {
        userGroupCategoriesComponentsPage.clickOnCreateButton();
        userGroupCategoriesUpdatePage = new UserGroupCategoriesUpdatePage();
        expect(userGroupCategoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.userGroupCategories.home.createOrEditLabel/);
        userGroupCategoriesUpdatePage.cancel();
    });

    it('should create and save UserGroupCategories', () => {
        userGroupCategoriesComponentsPage.clickOnCreateButton();
        userGroupCategoriesUpdatePage.setNameInput('name');
        expect(userGroupCategoriesUpdatePage.getNameInput()).toMatch('name');
        userGroupCategoriesUpdatePage.categoriesSelectLastOption();
        userGroupCategoriesUpdatePage.idUserGroupSelectLastOption();
        userGroupCategoriesUpdatePage.save();
        expect(userGroupCategoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
