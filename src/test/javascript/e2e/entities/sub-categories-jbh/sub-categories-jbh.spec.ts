import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubCategoriesComponentsPage, SubCategoriesUpdatePage } from './sub-categories-jbh.page-object';

describe('SubCategories e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let subCategoriesUpdatePage: SubCategoriesUpdatePage;
    let subCategoriesComponentsPage: SubCategoriesComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SubCategories', async () => {
        await navBarPage.goToEntity('sub-categories-jbh');
        subCategoriesComponentsPage = new SubCategoriesComponentsPage();
        expect(await subCategoriesComponentsPage.getTitle()).toMatch(/jbhApp.subCategories.home.title/);
    });

    it('should load create SubCategories page', async () => {
        await subCategoriesComponentsPage.clickOnCreateButton();
        subCategoriesUpdatePage = new SubCategoriesUpdatePage();
        expect(await subCategoriesUpdatePage.getPageTitle()).toMatch(/jbhApp.subCategories.home.createOrEditLabel/);
        await subCategoriesUpdatePage.cancel();
    });

    it('should create and save SubCategories', async () => {
        await subCategoriesComponentsPage.clickOnCreateButton();
        await subCategoriesUpdatePage.setNameInput('name');
        expect(await subCategoriesUpdatePage.getNameInput()).toMatch('name');
        const selectedDefinedByJBH = subCategoriesUpdatePage.getDefinedByJBHInput();
        if (await selectedDefinedByJBH.isSelected()) {
            await subCategoriesUpdatePage.getDefinedByJBHInput().click();
            expect(await subCategoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeFalsy();
        } else {
            await subCategoriesUpdatePage.getDefinedByJBHInput().click();
            expect(await subCategoriesUpdatePage.getDefinedByJBHInput().isSelected()).toBeTruthy();
        }
        await subCategoriesUpdatePage.setCreationDateInput('2000-12-31');
        expect(await subCategoriesUpdatePage.getCreationDateInput()).toMatch('2000-12-31');
        await subCategoriesUpdatePage.categoriesSelectLastOption();
        await subCategoriesUpdatePage.save();
        expect(await subCategoriesUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
