import { element, by, promise, ElementFinder } from 'protractor';

export class MembersGroupComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-members-group-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MembersGroupUpdatePage {
    pageTitle = element(by.id('jhi-members-group-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    invitationAcceptedInput = element(by.id('field_invitationAccepted'));
    idUserGroupSelect = element(by.id('field_idUserGroup'));
    idUserOwnerSelect = element(by.id('field_idUserOwner'));
    idUserInvitedSelect = element(by.id('field_idUserInvited'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getInvitationAcceptedInput() {
        return this.invitationAcceptedInput;
    }
    idUserGroupSelectLastOption(): promise.Promise<void> {
        return this.idUserGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idUserGroupSelectOption(option): promise.Promise<void> {
        return this.idUserGroupSelect.sendKeys(option);
    }

    getIdUserGroupSelect(): ElementFinder {
        return this.idUserGroupSelect;
    }

    getIdUserGroupSelectedOption() {
        return this.idUserGroupSelect.element(by.css('option:checked')).getText();
    }

    idUserOwnerSelectLastOption(): promise.Promise<void> {
        return this.idUserOwnerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idUserOwnerSelectOption(option): promise.Promise<void> {
        return this.idUserOwnerSelect.sendKeys(option);
    }

    getIdUserOwnerSelect(): ElementFinder {
        return this.idUserOwnerSelect;
    }

    getIdUserOwnerSelectedOption() {
        return this.idUserOwnerSelect.element(by.css('option:checked')).getText();
    }

    idUserInvitedSelectLastOption(): promise.Promise<void> {
        return this.idUserInvitedSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idUserInvitedSelectOption(option): promise.Promise<void> {
        return this.idUserInvitedSelect.sendKeys(option);
    }

    getIdUserInvitedSelect(): ElementFinder {
        return this.idUserInvitedSelect;
    }

    getIdUserInvitedSelectedOption() {
        return this.idUserInvitedSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
