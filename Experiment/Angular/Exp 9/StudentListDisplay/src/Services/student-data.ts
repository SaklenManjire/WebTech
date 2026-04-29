import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentData {
  studentList:any[] = [
    {name:"Saklen",age:20,course:"CSE"},
    {name:"Kaushal",age:23,course:"CSE AI/ML"},
    {name:"Atharva",age:19,course:"IT"},
    {name:"Om",age:25,course:"AI DS"}
  ]
  getStudentList()
  {
    return this.studentList
  }
}
