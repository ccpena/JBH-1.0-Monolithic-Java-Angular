import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CategoriesComponentsPage, CategoriesUpdatePage } from './categories-jbh.page-object';

describe('Categories e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let categoriesUpdatePage: CategoriesUpdatePage;
    let categoriesComponentsPage: CategoriesComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Categories', async () => {
        await navBarPage.goToEntity('categories-jbh');
        categoriesComponentsPage = new CategoriesComponentsPage();
        expect(await categoriesComponentsPage.getTitle()).toMatch(/jbhApp.categories.home.title/);
    });

    it('should load create Categories page', async () => {
        await categoriesComponentsPage.clickOnCreateButton();
        categoriesUpdatePage = new CategoriesUpdatePage();
        expect(await categoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.categories.home.createOrEditLabel/);
        await categoriesUpdatePage.cancel();
    });

    it('should create and save Categories', async () => {
        await categoriesComponentsPage.clickOnCreateButton();
        await categoriesUpdatePage.setNameInput('name');
        expect(await categoriesUpdatePage.getNameInput()).toMatch('name');
        const selectedDefinedByJBH = categoriesUpdatePage.getDefinedByJBHInput();
        if (await selectedDefinedByJBH.isSelected()) {
            await categoriesUpdatePage.getDefinedByJBHInput().click();
            expect(await categoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
        } else {
            await categoriesUpdatePage.getDefinedByJBHInput().click();
            expect(await categoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
        }
        await categoriesUpdatePage.setCreationDateInput('2000-12-31');
        expect(await categoriesUpdatePage.getCreationDateInput()).toMatch('2000-12-31');
        await categoriesUpdatePage.userGroupCategoriesSelectLastOption();
        await categoriesUpdatePage.save();
        expect(await categoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
