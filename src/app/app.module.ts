import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {ProgressBarModule} from "angular-progress-bar"

import { HttpClientModule } from '@angular/common/http';
import { TachesComponent } from './taches/taches.component';
import { MenuComponent } from './menu/menu.component';
import { MenugestionComponent } from './menugestion/menugestion.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeesComponent } from './employees/employees.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MenuServeurComponent } from './menu-serveur/menu-serveur.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RegisterComponent } from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CommandeDetailsComponent } from './commande-details/commande-details.component';
import { TachesCaissierComponent } from './taches-caissier/taches-caissier.component';
import { ModifierComponent } from './modifier/modifier.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  entryComponents: [CommandeDetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpClientModule,
    ProgressBarModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    TachesComponent,
    MenuComponent,
    MenugestionComponent,
    EmployeesComponent,
    MenuServeurComponent,
    CommandeDetailsComponent,
    TachesCaissierComponent,
    ModifierComponent,
    DashboardComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
