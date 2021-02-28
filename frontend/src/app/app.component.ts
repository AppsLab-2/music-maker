import { Component } from '@angular/core';
import { PatternService } from './pattern.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public patternService: PatternService){ }
}
