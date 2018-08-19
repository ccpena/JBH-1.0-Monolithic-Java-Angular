import { element, by, ElementFinder } from 'protractor';

export class MovementesOutgoingsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-movementes-outgoings-jbh div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MovementesOutgoingsUpdatePage {
    pageTitle = element(by.id('jhi-movementes-outgoings-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    totalValueInput = element(by.id('field_totalValue'));
    createDateInput = element(by.id('field_createDate'));
    idUserGroupSelect = element(by.id('field_idUserGroup'));
    idSubCategorySelect = element(by.id('field_idSubCategory'));
    paymentMethodSelect = element(by.id('field_paymentMethod'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTotalValueInput(totalValue) {
        await this.totalValueInput.sendKeys(totalValue);
    }

    async getTotalValueInput() {
        return this.totalValueInput.getAttribute('value');
    }

    async setCreateDateInput(createDate) {
        await this.createDateInput.sendKeys(createDate);
    }

    async getCreateDateInput() {
        return this.createDateInput.getAttribute('value');
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

    async paymentMethodSelectLastOption() {
        await this.paymentMethodSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async paymentMethodSelectOption(option) {
        await this.paymentMethodSelect.sendKeys(option);
    }

    getPaymentMethodSelect(): ElementFinder {
        return this.paymentMethodSelect;
    }

    async getPaymentMethodSelectedOption() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
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
