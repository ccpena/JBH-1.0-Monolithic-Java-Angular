import { element, by, ElementFinder } from 'protractor';

export class UserGroupCategoriesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-user-group-categories-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserGroupCategoriesUpdatePage {
    pageTitle = element(by.id('jhi-user-group-categories-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    idUserGroupSelect = element(by.id('field_idUserGroup'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async idUserGroupSelectLastOption() {
        await this.idUserGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idUserGroupSelectOption(option) {
        await this.idUserGroupSelect.sendKeys(option);
    }

    getIdUserGroupSelect(): ElementFinder {
        return this.idUserGroupSelect;
    }

    async getIdUserGroupSelectedOption() {
        return this.idUserGroupSelect.element(by.css('option:checked')).getText();
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
