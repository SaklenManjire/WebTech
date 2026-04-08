import { Component, signal } from '@angular/core';
import { Home } from '../home/home';
import { AddStudent } from '../add-student/add-student';
import { StudentList } from '../student-list/student-list';

@Component({
  selector: 'app-root',
  imports: [Home,AddStudent,StudentList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
