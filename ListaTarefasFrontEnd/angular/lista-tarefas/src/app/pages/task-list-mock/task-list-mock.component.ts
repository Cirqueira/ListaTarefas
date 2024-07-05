import { Component, OnInit} from '@angular/core';

interface DataItem {
  name: string;
  date: string;
  isActive: boolean;
}

@Component({
  selector: 'app-task-list-mock',
  templateUrl: './task-list-mock.component.html',
  styleUrls: ['./task-list-mock.component.css'],
})
export class TaskListMockComponent {
  filter = {
    startDate: '',
    endDate: '',
    activeOnly: false
  };

  data: DataItem[] = [
    { name: 'Item 1', date: '2024-06-01', isActive: false },
    { name: 'Item 2', date: '2024-06-02', isActive: true },
    { name: 'Item 3', date: '2024-06-03', isActive: false },
    { name: 'Item 4', date: '2024-06-04', isActive: true },
    { name: 'Item 5', date: '2024-06-05', isActive: true },
    { name: 'Item 6', date: '2024-06-06', isActive: true },
    { name: 'Item 7', date: '2024-06-07', isActive: true },
    { name: 'Item 8', date: '2024-06-08', isActive: true },
    { name: 'Item 9', date: '2024-06-09', isActive: true },
    { name: 'Item 10', date: '2024-06-10', isActive: true },
    { name: 'Item 11', date: '2024-06-11', isActive: false },
    { name: 'Item 12', date: '2024-06-12', isActive: true },
  ];

  filteredData: DataItem[] = [];

  constructor() { }

  onSubmit() {
    this.filteredData = this.data.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = new Date(this.filter.startDate);
      const endDate = new Date(this.filter.endDate);
      const isDateInRange = (!this.filter.startDate || itemDate >= startDate) &&
                            (!this.filter.endDate || itemDate <= endDate);
      const isActive = !this.filter.activeOnly || item.isActive;

      return isDateInRange && isActive;
    });
  }

}
