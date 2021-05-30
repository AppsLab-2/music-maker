import { Component, OnInit, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AudioService } from '../audio.service';
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

  onMovChange(event: MatSliderChange){
    this.patternService.selectedPattern.mov = event.value;
  }
}
