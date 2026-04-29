import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-visual-box',
  standalone: true,
  template: `
    <div class="box">
      <h3>{{title}}</h3>
      <p>{{data}}</p>
    </div>
  `,
  styles: [`
    .box {
      border: 2px solid black;
      padding: 20px;
      margin: 10px;
      width: 150px;
      text-align: center;
    }
  `]
})
export class VisualBox {
  @Input() title!: string;
  @Input() data!: string;
}