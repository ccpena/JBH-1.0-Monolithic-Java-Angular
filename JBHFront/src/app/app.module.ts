import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AccountComponent } from './components/account/account.component';
import { SavingsComponent } from './components/savings/savings.component';
import { CreditsComponent } from './components/credits/credits.component';
import { MovementsComponent } from './components/movements/movements.component';
import { HomeComponent } from './components/home/home.component';
import { SubcategoriesComponent } from './components/categories/subcategories/subcategories.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';

// Services
import { CategoryService } from './services/category.service';

// External Files
import { APP_ROUTING} from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,    
    AccountComponent,
    SavingsComponent,
    CreditsComponent,
    MovementsComponent,
    HomeComponent,
    SubcategoriesComponent,    
    CreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
