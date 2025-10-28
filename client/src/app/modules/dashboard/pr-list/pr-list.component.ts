import { Component } from '@angular/core';

interface PRItem {
  id: number;
  title: string;
  author: string;
  status: 'open' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html'
})
export class PrListComponent {
  prs: PRItem[] = [
    { id: 101, title: 'Update hero title color', author: 'Demo Admin', status: 'open' },
    { id: 102, title: 'Fix footer spacing', author: 'Demo Admin', status: 'open' }
  ];
}

