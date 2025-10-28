import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EditorWidgetComponent } from './modules/editor/editor-widget.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent, title: 'Edit-My-Site AI · Dashboard' },
  { path: 'editor', component: EditorWidgetComponent, title: 'Edit-My-Site AI · Editor' },
  { path: '**', redirectTo: '' }
];
