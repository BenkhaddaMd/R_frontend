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
import { ModifierComponent } from './modifier/modifier.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
      title: 'Application'
    },
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService], data: { title: 'Dashboard'}
    },
      { path: 'modifier', component: ModifierComponent, canActivate: [AfterLoginService], data: { title: 'Modifier'}
    },
      { path: 'tachesCaissier', component: TachesCaissierComponent, canActivate: [AfterLoginService], data: { title: 'Taches caissier'}
    },
    { path: 'taches', component: TachesComponent, canActivate: [AfterLoginService], data: { title: 'Taches'}
    },
      { path: 'menu', component: MenuComponent, canActivate: [AfterLoginService], data: { title: 'Menu'}
    },
      { path: 'menuServeur', component: MenuServeurComponent, canActivate: [AfterLoginService], data: { title: 'Menu serveur'}
    },
      { path: 'menugestion', component: MenugestionComponent, canActivate: [AfterLoginService], data: { title: 'Menu gestion'}
    },
    { path: 'employees', component: EmployeesComponent, canActivate: [AfterLoginService], data: { title: 'Employees'}
  },
      { path: 'home', component: HomeComponent, canActivate: [AfterLoginService], data: { title: 'Home'}
    },
      { path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService],data: { title: 'Profile'} 
    },
      {
        path: 'register', component: RegisterComponent, data: { title: 'Register Page' }, canActivate: [AfterLoginService]
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
