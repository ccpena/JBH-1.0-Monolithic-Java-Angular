import { Routes , RouterModule } from '@angular/router';

// Components
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';

import { CreditsComponent } from './components/credits/credits.component';
import { HomeComponent} from './components/home/home.component';

const APP_ROUTES: Routes = [
    { path: 'categories', component: CategoriesComponent},
    { path: 'createCategory' , component: CreateCategoryComponent},
    { path: 'home' , component: HomeComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
