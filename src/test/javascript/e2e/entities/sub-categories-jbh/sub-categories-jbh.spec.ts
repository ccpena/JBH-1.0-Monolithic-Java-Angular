import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SubCategoriesComponentsPage, SubCategoriesUpdatePage } from './sub-categories-jbh.page-object';

describe('SubCategories e2e test', () => {
    let navBarPage: NavBarPage;
    let subCategoriesUpdatePage: SubCategoriesUpdatePage;
    let subCategoriesComponentsPage: SubCategoriesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubCategories', () => {
        navBarPage.goToEntity('sub-categories-jbh');
        subCategoriesComponentsPage = new SubCategoriesComponentsPage();
        expect(subCategoriesComponentsPage.getTitle()).toMatch(/jbhApp.subCategories.home.title/);
    });

    it('should load create SubCategories page', () => {
        subCategoriesComponentsPage.clickOnCreateButton();
        subCategoriesUpdatePage = new SubCategoriesUpdatePage();
        expect(subCategoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.subCategories.home.createOrEditLabel/);
        subCategoriesUpdatePage.cancel();
    });

    it('should create and save SubCategories', () => {
        subCategoriesComponentsPage.clickOnCreateButton();
        subCategoriesUpdatePage.setNameInput('name');
        expect(subCategoriesUpdatePage.getNameInput()).toMatch('name');
        subCategoriesUpdatePage
            .getDefinedByJBHInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    subCategoriesUpdatePage.getDefinedByJBHInput().click();
                    expect(subCategoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
                } else {
                    subCategoriesUpdatePage.getDefinedByJBHInput().click();
                    expect(subCategoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
                }
            });
        subCategoriesUpdatePage.setCreationDateInput('2000-12-31');
        expect(subCategoriesUpdatePage.getCreationDateInput()).toMatch('2000-12-31');
        subCategoriesUpdatePage.categoriesSelectLastOption();
        subCategoriesUpdatePage.save();
        expect(subCategoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
