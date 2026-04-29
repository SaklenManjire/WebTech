import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VisualBox } from '../../shared/visual-box/visual-box';

@Component({
  selector: 'app-component-visualizer',
  standalone:true,
  imports: [FormsModule,VisualBox],
  templateUrl: './component-visualizer.html',
  styleUrl: './component-visualizer.css',
})
export class ComponentVisualizer {
  message:string='';
  parentData:string="Parent Initial";
  childData:string="Child Initial";

  sendToChild()
  {
    this.parentData=this.message;
    this.childData=this.message;
  }
}
