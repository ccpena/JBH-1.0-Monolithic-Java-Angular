import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MembersGroupComponentsPage, MembersGroupUpdatePage } from './members-group-jbh.page-object';

describe('MembersGroup e2e test', () => {
    let navBarPage: NavBarPage;
    let membersGroupUpdatePage: MembersGroupUpdatePage;
    let membersGroupComponentsPage: MembersGroupComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MembersGroups', () => {
        navBarPage.goToEntity('members-group-jbh');
        membersGroupComponentsPage = new MembersGroupComponentsPage();
        expect(membersGroupComponentsPage.getTitle()).toMatch(/jbhApp.membersGroup.home.title/);
    });

    it('should load create MembersGroup page', () => {
        membersGroupComponentsPage.clickOnCreateButton();
        membersGroupUpdatePage = new MembersGroupUpdatePage();
        expect(membersGroupUpdatePage.getPageTitle()).toMatch(/jbhApp.membersGroup.home.createOrEditLabel/);
        membersGroupUpdatePage.cancel();
    });

    it('should create and save MembersGroups', () => {
        membersGroupComponentsPage.clickOnCreateButton();
        membersGroupUpdatePage
            .getInvitationAcceptedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    membersGroupUpdatePage.getInvitationAcceptedInput().click();
                    expect(membersGroupUpdatePage.getInvitationAcceptedInput().isSelected()).toBeFalsy();
                } else {
                    membersGroupUpdatePage.getInvitationAcceptedInput().click();
                    expect(membersGroupUpdatePage.getInvitationAcceptedInput().isSelected()).toBeTruthy();
                }
            });
        membersGroupUpdatePage.idUserGroupSelectLastOption();
        membersGroupUpdatePage.idUserOwnerSelectLastOption();
        membersGroupUpdatePage.idUserInvitedSelectLastOption();
        membersGroupUpdatePage.save();
        expect(membersGroupUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
