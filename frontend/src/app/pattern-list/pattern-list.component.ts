import { Component, OnInit } from '@angular/core';
import { PatternService } from '../pattern.service';
import { Pattern } from '../Pattern';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.css']
})
export class PatternListComponent implements OnInit {
  constructor(public patternService: PatternService) { }

  ngOnInit(): void {
    
  }
}
