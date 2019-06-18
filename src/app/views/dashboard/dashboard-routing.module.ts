import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { EquipmentListComponent } from './equipment/equipment-list/equipment-list.component';
import { EquipmentCreateComponent } from './equipment/equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './equipment/equipment-edit/equipment-edit.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'equipments',
    component: EquipmentListComponent,
    data: { title: 'Equipment List' }
  },
  {
    path: 'equipment-create',
    component: EquipmentCreateComponent,
    data: { title: 'Ajout Equipement' }
  },
  {
    path: 'equipment-edit/:id',
    component: EquipmentEditComponent,
    data: { title: 'Modifier Equipement' }
  },
  {
    path: 'equipment-details/:id',
    component: EquipmentDetailComponent,
    data: { title: 'Detail Equipement' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
