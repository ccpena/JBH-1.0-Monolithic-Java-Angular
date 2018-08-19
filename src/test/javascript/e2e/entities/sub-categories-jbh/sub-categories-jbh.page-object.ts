import { element, by, promise, ElementFinder } from 'protractor';

export class SubCategoriesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-sub-categories-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SubCategoriesUpdatePage {
    pageTitle = element(by.id('jhi-sub-categories-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    definedByJBHInput = element(by.id('field_definedByJBH'));
    creationDateInput = element(by.id('field_creationDate'));
    categoriesSelect = element(by.id('field_categories'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getDefinedByJBHInput() {
        return this.definedByJBHInput;
    }
    setCreationDateInput(creationDate): promise.Promise<void> {
        return this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput() {
        return this.creationDateInput.getAttribute('value');
    }

    categoriesSelectLastOption(): promise.Promise<void> {
        return this.categoriesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    categoriesSelectOption(option): promise.Promise<void> {
        return this.categoriesSelect.sendKeys(option);
    }

    getCategoriesSelect(): ElementFinder {
        return this.categoriesSelect;
    }

    getCategoriesSelectedOption() {
        return this.categoriesSelect.element(by.css('option:checked')).getText();
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
