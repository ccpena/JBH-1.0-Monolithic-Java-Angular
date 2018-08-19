import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserGroupCategoriesComponentsPage, UserGroupCategoriesUpdatePage } from './user-group-categories-jbh.page-object';

describe('UserGroupCategories e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userGroupCategoriesUpdatePage: UserGroupCategoriesUpdatePage;
    let userGroupCategoriesComponentsPage: UserGroupCategoriesComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserGroupCategories', async () => {
        await navBarPage.goToEntity('user-group-categories-jbh');
        userGroupCategoriesComponentsPage = new UserGroupCategoriesComponentsPage();
        expect(await userGroupCategoriesComponentsPage.getTitle()).toMatch(/jbhApp.userGroupCategories.home.title/);
    });

    it('should load create UserGroupCategories page', async () => {
        await userGroupCategoriesComponentsPage.clickOnCreateButton();
        userGroupCategoriesUpdatePage = new UserGroupCategoriesUpdatePage();
        expect(await userGroupCategoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.userGroupCategories.home.createOrEditLabel/);
        await userGroupCategoriesUpdatePage.cancel();
    });

    it('should create and save UserGroupCategories', async () => {
        await userGroupCategoriesComponentsPage.clickOnCreateButton();
        await userGroupCategoriesUpdatePage.idUserGroupSelectLastOption();
        await userGroupCategoriesUpdatePage.save();
        expect(await userGroupCategoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
