import { Component, OnInit, Input } from '@angular/core';
import { PatternService } from '../pattern.service';

@Component({
  selector: 'app-pattern-properties',
  templateUrl: './pattern-properties.component.html',
  styleUrls: ['./pattern-properties.component.css']
})
export class PatternPropertiesComponent implements OnInit {

  constructor(public patternService: PatternService) { }

  ngOnInit(): void {
  }

}
