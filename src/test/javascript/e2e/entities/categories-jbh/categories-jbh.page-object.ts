import { element, by, ElementFinder } from 'protractor';

export class CategoriesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-categories-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CategoriesUpdatePage {
    pageTitle = element(by.id('jhi-categories-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    definedByJBHInput = element(by.id('field_definedByJBH'));
    creationDateInput = element(by.id('field_creationDate'));
    userGroupCategoriesSelect = element(by.id('field_userGroupCategories'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getDefinedByJBHInput() {
        return this.definedByJBHInput;
    }
    async setCreationDateInput(creationDate) {
        await this.creationDateInput.sendKeys(creationDate);
    }

    async getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    async userGroupCategoriesSelectLastOption() {
        await this.userGroupCategoriesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userGroupCategoriesSelectOption(option) {
        await this.userGroupCategoriesSelect.sendKeys(option);
    }

    getUserGroupCategoriesSelect(): ElementFinder {
        return this.userGroupCategoriesSelect;
    }

    async getUserGroupCategoriesSelectedOption() {
        return this.userGroupCategoriesSelect.element(by.css('option:checked')).getText();
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
