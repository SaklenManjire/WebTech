import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  name:string = "Saklen Manjire"
  age:number = 20
  course:string = "CSE AI/ML"
  imagePath:string = "bmw.avif"
  cities:string[] = ["Pune","Mumbai","Kolhapur","Ichalkaranji"]

  changeName = () => {
    this.name = "Saklen"
  }

  toggleImage = () => {
    this.imagePath = this.imagePath === "defender.jpg"?"bmw.avif":"defender.jpg"
  }
}
