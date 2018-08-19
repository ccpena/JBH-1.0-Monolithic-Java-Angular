import { element, by, ElementFinder } from 'protractor';

export class ActiveDebtsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-active-debts-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ActiveDebtsUpdatePage {
    pageTitle = element(by.id('jhi-active-debts-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    valueInput = element(by.id('field_value'));
    createDateInput = element(by.id('field_createDate'));
    idDebtorSelect = element(by.id('field_idDebtor'));
    idCreditorSelect = element(by.id('field_idCreditor'));
    idSubCategorySelect = element(by.id('field_idSubCategory'));
    idMovementOutgoingSelect = element(by.id('field_idMovementOutgoing'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setValueInput(value) {
        await this.valueInput.sendKeys(value);
    }

    async getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    async setCreateDateInput(createDate) {
        await this.createDateInput.sendKeys(createDate);
    }

    async getCreateDateInput() {
        return this.createDateInput.getAttribute('value');
    }

    async idDebtorSelectLastOption() {
        await this.idDebtorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idDebtorSelectOption(option) {
        await this.idDebtorSelect.sendKeys(option);
    }

    getIdDebtorSelect(): ElementFinder {
        return this.idDebtorSelect;
    }

    async getIdDebtorSelectedOption() {
        return this.idDebtorSelect.element(by.css('option:checked')).getText();
    }

    async idCreditorSelectLastOption() {
        await this.idCreditorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idCreditorSelectOption(option) {
        await this.idCreditorSelect.sendKeys(option);
    }

    getIdCreditorSelect(): ElementFinder {
        return this.idCreditorSelect;
    }

    async getIdCreditorSelectedOption() {
        return this.idCreditorSelect.element(by.css('option:checked')).getText();
    }

    async idSubCategorySelectLastOption() {
        await this.idSubCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idSubCategorySelectOption(option) {
        await this.idSubCategorySelect.sendKeys(option);
    }

    getIdSubCategorySelect(): ElementFinder {
        return this.idSubCategorySelect;
    }

    async getIdSubCategorySelectedOption() {
        return this.idSubCategorySelect.element(by.css('option:checked')).getText();
    }

    async idMovementOutgoingSelectLastOption() {
        await this.idMovementOutgoingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async idMovementOutgoingSelectOption(option) {
        await this.idMovementOutgoingSelect.sendKeys(option);
    }

    getIdMovementOutgoingSelect(): ElementFinder {
        return this.idMovementOutgoingSelect;
    }

    async getIdMovementOutgoingSelectedOption() {
        return this.idMovementOutgoingSelect.element(by.css('option:checked')).getText();
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
