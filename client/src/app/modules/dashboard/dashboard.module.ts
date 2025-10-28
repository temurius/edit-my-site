import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { PrListComponent } from './pr-list/pr-list.component';
import { PrDetailComponent } from './pr-detail/pr-detail.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      { path: '', component: PrListComponent },
      { path: 'pr/:id', component: PrDetailComponent },
      { path: 'users', component: UserManagementComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardHomeComponent, PrListComponent, PrDetailComponent, UserManagementComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}

