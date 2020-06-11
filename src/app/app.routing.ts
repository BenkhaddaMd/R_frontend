import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AfterLoginService } from './canActive/after-login.service';
import { BeforeLoginService } from './canActive/before-login.service';
import { TachesComponent } from './taches/taches.component';
import { MenuComponent } from './menu/menu.component';
import { MenugestionComponent } from './menugestion/menugestion.component';
import { EmployeesComponent } from './employees/employees.component';
import { MenuServeurComponent } from './menu-serveur/menu-serveur.component';
import { RegisterComponent } from './register/register.component';
import { TachesCaissierComponent } from './taches-caissier/taches-caissier.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AfterLoginService]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }, canActivate: [BeforeLoginService]
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: 'tachesCaissier', component: TachesCaissierComponent, canActivate: [AfterLoginService]
    },
    { path: 'taches', component: TachesComponent, canActivate: [AfterLoginService]
    },
      { path: 'menu', component: MenuComponent, canActivate: [AfterLoginService]
    },
      { path: 'menuServeur', component: MenuServeurComponent, canActivate: [AfterLoginService]
    },
      { path: 'menugestion', component: MenugestionComponent, canActivate: [AfterLoginService]
    },
    { path: 'employees', component: EmployeesComponent, canActivate: [AfterLoginService]
  },
      { path: 'home', component: HomeComponent, canActivate: [AfterLoginService]
    },
      { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],data: { title: 'Profile'} 
    },
      {
        path: 'register', component: RegisterComponent, data: { title: 'Register Page' }, canActivate: [AfterLoginService]
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
