import { element, by, promise, ElementFinder } from 'protractor';

export class ActiveDebtsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-active-debts-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
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

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setValueInput(value): promise.Promise<void> {
        return this.valueInput.sendKeys(value);
    }

    getValueInput() {
        return this.valueInput.getAttribute('value');
    }

    setCreateDateInput(createDate): promise.Promise<void> {
        return this.createDateInput.sendKeys(createDate);
    }

    getCreateDateInput() {
        return this.createDateInput.getAttribute('value');
    }

    idDebtorSelectLastOption(): promise.Promise<void> {
        return this.idDebtorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idDebtorSelectOption(option): promise.Promise<void> {
        return this.idDebtorSelect.sendKeys(option);
    }

    getIdDebtorSelect(): ElementFinder {
        return this.idDebtorSelect;
    }

    getIdDebtorSelectedOption() {
        return this.idDebtorSelect.element(by.css('option:checked')).getText();
    }

    idCreditorSelectLastOption(): promise.Promise<void> {
        return this.idCreditorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idCreditorSelectOption(option): promise.Promise<void> {
        return this.idCreditorSelect.sendKeys(option);
    }

    getIdCreditorSelect(): ElementFinder {
        return this.idCreditorSelect;
    }

    getIdCreditorSelectedOption() {
        return this.idCreditorSelect.element(by.css('option:checked')).getText();
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

    idMovementOutgoingSelectLastOption(): promise.Promise<void> {
        return this.idMovementOutgoingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idMovementOutgoingSelectOption(option): promise.Promise<void> {
        return this.idMovementOutgoingSelect.sendKeys(option);
    }

    getIdMovementOutgoingSelect(): ElementFinder {
        return this.idMovementOutgoingSelect;
    }

    getIdMovementOutgoingSelectedOption() {
        return this.idMovementOutgoingSelect.element(by.css('option:checked')).getText();
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
