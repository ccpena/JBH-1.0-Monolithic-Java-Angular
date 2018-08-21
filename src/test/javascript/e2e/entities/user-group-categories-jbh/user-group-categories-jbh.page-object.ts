import { element, by, promise, ElementFinder } from 'protractor';

export class UserGroupCategoriesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-user-group-categories-jbh div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserGroupCategoriesUpdatePage {
    pageTitle = element(by.id('jhi-user-group-categories-jbh-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    categoriesSelect = element(by.id('field_categories'));
    idUserGroupSelect = element(by.id('field_idUserGroup'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
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
