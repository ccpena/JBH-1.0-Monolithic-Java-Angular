import { element, by, promise, ElementFinder } from 'protractor';

export class MovementesOutgoingsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-movementes-outgoings-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
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

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTotalValueInput(totalValue): promise.Promise<void> {
        return this.totalValueInput.sendKeys(totalValue);
    }

    getTotalValueInput() {
        return this.totalValueInput.getAttribute('value');
    }

    setCreateDateInput(createDate): promise.Promise<void> {
        return this.createDateInput.sendKeys(createDate);
    }

    getCreateDateInput() {
        return this.createDateInput.getAttribute('value');
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

    idSubCategorySelectLastOption(): promise.Promise<void> {
        return this.idSubCategorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idSubCategorySelectOption(option): promise.Promise<void> {
        return this.idSubCategorySelect.sendKeys(option);
    }

    getIdSubCategorySelect(): ElementFinder {
        return this.idSubCategorySelect;
    }

    getIdSubCategorySelectedOption() {
        return this.idSubCategorySelect.element(by.css('option:checked')).getText();
    }

    paymentMethodSelectLastOption(): promise.Promise<void> {
        return this.paymentMethodSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    paymentMethodSelectOption(option): promise.Promise<void> {
        return this.paymentMethodSelect.sendKeys(option);
    }

    getPaymentMethodSelect(): ElementFinder {
        return this.paymentMethodSelect;
    }

    getPaymentMethodSelectedOption() {
        return this.paymentMethodSelect.element(by.css('option:checked')).getText();
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
