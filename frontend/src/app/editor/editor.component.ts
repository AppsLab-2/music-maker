import { Component, OnInit } from '@angular/core';
import { PatternService } from '../pattern.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(public patternService: PatternService) { }

  ngOnInit(): void {
    this.patternService.showEditor = false;
    //this.patternService.songPatternList = [];
  }
}
