import { Component, OnInit } from '@angular/core';
import { PatternService } from '../pattern.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(public patternService: PatternService) { }

  ngOnInit(): void {
  }

}
