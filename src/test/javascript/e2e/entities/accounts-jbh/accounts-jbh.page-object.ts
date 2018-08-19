import { element, by, promise, ElementFinder } from 'protractor';

export class AccountsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-accounts-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccountsUpdatePage {
    pageTitle = element(by.id('jhi-accounts-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    idUsrGroupSelect = element(by.id('field_idUsrGroup'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    typeSelectLastOption(): promise.Promise<void> {
        return this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    typeSelectOption(option): promise.Promise<void> {
        return this.typeSelect.sendKeys(option);
    }

    getTypeSelect(): ElementFinder {
        return this.typeSelect;
    }

    getTypeSelectedOption() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    idUsrGroupSelectLastOption(): promise.Promise<void> {
        return this.idUsrGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    idUsrGroupSelectOption(option): promise.Promise<void> {
        return this.idUsrGroupSelect.sendKeys(option);
    }

    getIdUsrGroupSelect(): ElementFinder {
        return this.idUsrGroupSelect;
    }

    getIdUsrGroupSelectedOption() {
        return this.idUsrGroupSelect.element(by.css('option:checked')).getText();
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
