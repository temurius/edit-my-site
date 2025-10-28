import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent {
  users = [
    { id: 1, name: 'Demo Admin', email: 'admin@example.com', role: 'admin' }
  ];
}

