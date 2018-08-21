import { element, by, promise, ElementFinder } from 'protractor';

export class UsersGroupComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-users-group-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UsersGroupUpdatePage {
    pageTitle = element(by.id('jhi-users-group-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    membersGroupSelect = element(by.id('field_membersGroup'));
    idUserOwnerSelect = element(by.id('field_idUserOwner'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    membersGroupSelectLastOption(): promise.Promise<void> {
        return this.membersGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    membersGroupSelectOption(option): promise.Promise<void> {
        return this.membersGroupSelect.sendKeys(option);
    }

    getMembersGroupSelect(): ElementFinder {
        return this.membersGroupSelect;
    }

    getMembersGroupSelectedOption() {
        return this.membersGroupSelect.element(by.css('option:checked')).getText();
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
