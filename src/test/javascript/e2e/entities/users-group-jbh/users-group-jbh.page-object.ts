import { element, by, ElementFinder } from 'protractor';

export class UsersGroupComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-users-group-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UsersGroupUpdatePage {
    pageTitle = element(by.id('jhi-users-group-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    invitationAcceptedInput = element(by.id('field_invitationAccepted'));
    idUserOwnerSelect = element(by.id('field_idUserOwner'));
    idUserInvitedSelect = element(by.id('field_idUserInvited'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getInvitationAcceptedInput() {
        return this.invitationAcceptedInput;
    }

    async idUserOwnerSelectLastOption() {
        await this.idUserOwnerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idUserOwnerSelectOption(option) {
        await this.idUserOwnerSelect.sendKeys(option);
    }

    getIdUserOwnerSelect(): ElementFinder {
        return this.idUserOwnerSelect;
    }

    async getIdUserOwnerSelectedOption() {
        return this.idUserOwnerSelect.element(by.css('option:checked')).getText();
    }

    async idUserInvitedSelectLastOption() {
        await this.idUserInvitedSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idUserInvitedSelectOption(option) {
        await this.idUserInvitedSelect.sendKeys(option);
    }

    getIdUserInvitedSelect(): ElementFinder {
        return this.idUserInvitedSelect;
    }

    async getIdUserInvitedSelectedOption() {
        return this.idUserInvitedSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
