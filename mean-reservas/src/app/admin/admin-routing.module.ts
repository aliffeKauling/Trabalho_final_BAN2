import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { OnlyAdminUsersGuard } from './admin-user-guard';

// const routes: Routes = [{
//   path: '',
//    canActivate: [OnlyAdminUsersGuard],
//    children: [{
//        path: 'admin',
//     component: AdminComponent
//    }]
// }];
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AdminComponent,
        canActivate: [OnlyAdminUsersGuard],
      },
      // {
      //   path: 'register',
      //   component: RegisterComponent,
      // },
    ],
  },
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

//export class AdminRoutingModule {}
export const AdminRoutingModule = RouterModule.forChild(routes);
