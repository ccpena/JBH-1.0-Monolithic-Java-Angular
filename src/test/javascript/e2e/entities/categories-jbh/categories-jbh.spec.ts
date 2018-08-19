import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CategoriesComponentsPage, CategoriesUpdatePage } from './categories-jbh.page-object';

describe('Categories e2e test', () => {
    let navBarPage: NavBarPage;
    let categoriesUpdatePage: CategoriesUpdatePage;
    let categoriesComponentsPage: CategoriesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categories', () => {
        navBarPage.goToEntity('categories-jbh');
        categoriesComponentsPage = new CategoriesComponentsPage();
        expect(categoriesComponentsPage.getTitle()).toMatch(/jbhApp.categories.home.title/);
    });

    it('should load create Categories page', () => {
        categoriesComponentsPage.clickOnCreateButton();
        categoriesUpdatePage = new CategoriesUpdatePage();
        expect(categoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.categories.home.createOrEditLabel/);
        categoriesUpdatePage.cancel();
    });

    it('should create and save Categories', () => {
        categoriesComponentsPage.clickOnCreateButton();
        categoriesUpdatePage.setNameInput('name');
        expect(categoriesUpdatePage.getNameInput()).toMatch('name');
        categoriesUpdatePage
            .getDefinedByJBHInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    categoriesUpdatePage.getDefinedByJBHInput().click();
                    expect(categoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
                } else {
                    categoriesUpdatePage.getDefinedByJBHInput().click();
                    expect(categoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
                }
            });
        categoriesUpdatePage.setCreationDateInput('2000-12-31');
        expect(categoriesUpdatePage.getCreationDateInput()).toMatch('2000-12-31');
        categoriesUpdatePage.userGroupCategoriesSelectLastOption();
        categoriesUpdatePage.save();
        expect(categoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
