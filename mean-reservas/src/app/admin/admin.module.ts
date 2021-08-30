import {NgModule} from '@angular/core';
//import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { SharedModule } from '../shared/shared.module';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  imports: [
    // CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatRadioModule
  ],
  declarations: [
    AdminComponent
  ],
  exports:[AdminComponent],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
