import { element, by, ElementFinder } from 'protractor';

export class AccountsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-accounts-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccountsUpdatePage {
    pageTitle = element(by.id('jhi-accounts-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    idUsrGroupSelect = element(by.id('field_idUsrGroup'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async typeSelectOption(option) {
        await this.typeSelect.sendKeys(option);
    }

    getTypeSelect(): ElementFinder {
        return this.typeSelect;
    }

    async getTypeSelectedOption() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async idUsrGroupSelectLastOption() {
        await this.idUsrGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idUsrGroupSelectOption(option) {
        await this.idUsrGroupSelect.sendKeys(option);
    }

    getIdUsrGroupSelect(): ElementFinder {
        return this.idUsrGroupSelect;
    }

    async getIdUsrGroupSelectedOption() {
        return this.idUsrGroupSelect.element(by.css('option:checked')).getText();
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
