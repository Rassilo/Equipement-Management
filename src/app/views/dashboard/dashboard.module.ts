import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { EquipmentCreateComponent } from './equipment/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './equipment/equipment-edit/equipment-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
    TabsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ 
    DashboardComponent,
    EquipmentListComponent,
    EquipmentDetailComponent,
    EquipmentCreateComponent,
    EquipmentEditComponent 
  ]
})
export class DashboardModule { }
