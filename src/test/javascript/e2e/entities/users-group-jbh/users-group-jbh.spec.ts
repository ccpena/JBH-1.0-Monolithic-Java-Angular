import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UsersGroupComponentsPage, UsersGroupUpdatePage } from './users-group-jbh.page-object';

describe('UsersGroup e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let usersGroupUpdatePage: UsersGroupUpdatePage;
    let usersGroupComponentsPage: UsersGroupComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UsersGroups', async () => {
        await navBarPage.goToEntity('users-group-jbh');
        usersGroupComponentsPage = new UsersGroupComponentsPage();
        expect(await usersGroupComponentsPage.getTitle()).toMatch(/jbhApp.usersGroup.home.title/);
    });

    it('should load create UsersGroup page', async () => {
        await usersGroupComponentsPage.clickOnCreateButton();
        usersGroupUpdatePage = new UsersGroupUpdatePage();
        expect(await usersGroupUpdatePage.getPageTitle()).toMatch(/jbhApp.usersGroup.home.createOrEditLabel/);
        await usersGroupUpdatePage.cancel();
    });

    it('should create and save UsersGroups', async () => {
        await usersGroupComponentsPage.clickOnCreateButton();
        await usersGroupUpdatePage.setNameInput('name');
        expect(await usersGroupUpdatePage.getNameInput()).toMatch('name');
        const selectedInvitationAccepted = usersGroupUpdatePage.getInvitationAcceptedInput();
        if (await selectedInvitationAccepted.isSelected()) {
            await usersGroupUpdatePage.getInvitationAcceptedInput().click();
            expect(await usersGroupUpdatePage.getInvitationAcceptedInput().isSelected()).toBeFalsy();
        } else {
            await usersGroupUpdatePage.getInvitationAcceptedInput().click();
            expect(await usersGroupUpdatePage.getInvitationAcceptedInput().isSelected()).toBeTruthy();
        }
        await usersGroupUpdatePage.idUserOwnerSelectLastOption();
        await usersGroupUpdatePage.idUserInvitedSelectLastOption();
        await usersGroupUpdatePage.save();
        expect(await usersGroupUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
