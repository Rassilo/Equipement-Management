import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { UserResolver } from './auth/user.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Login Page'
    }
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
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    resolve: { data: UserResolver},
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        resolve: { data: UserResolver},
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      { 
        resolve: { data: UserResolver},
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        resolve: { data: UserResolver},
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
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
