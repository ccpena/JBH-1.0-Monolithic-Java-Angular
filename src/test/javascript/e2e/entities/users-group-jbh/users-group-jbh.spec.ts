import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { UsersGroupComponentsPage, UsersGroupUpdatePage } from './users-group-jbh.page-object';

describe('UsersGroup e2e test', () => {
    let navBarPage: NavBarPage;
    let usersGroupUpdatePage: UsersGroupUpdatePage;
    let usersGroupComponentsPage: UsersGroupComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UsersGroups', () => {
        navBarPage.goToEntity('users-group-jbh');
        usersGroupComponentsPage = new UsersGroupComponentsPage();
        expect(usersGroupComponentsPage.getTitle()).toMatch(/jbhApp.usersGroup.home.title/);
    });

    it('should load create UsersGroup page', () => {
        usersGroupComponentsPage.clickOnCreateButton();
        usersGroupUpdatePage = new UsersGroupUpdatePage();
        expect(usersGroupUpdatePage.getPageTitle()).toMatch(/jbhApp.usersGroup.home.createOrEditLabel/);
        usersGroupUpdatePage.cancel();
    });

    it('should create and save UsersGroups', () => {
        usersGroupComponentsPage.clickOnCreateButton();
        usersGroupUpdatePage.setNameInput('name');
        expect(usersGroupUpdatePage.getNameInput()).toMatch('name');
        usersGroupUpdatePage.save();
        expect(usersGroupUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
