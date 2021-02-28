import { Injectable } from '@angular/core';
import { Pattern } from './Pattern';

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  selectedPattern: Pattern;
  patternList: Pattern[] = [];
  songPatternList: any[] = [];
  showEditor: boolean = false;

  constructor() { 
    
  }
 
  selectPattern(pattern: Pattern){
    this.selectedPattern = pattern;
  }

  addPattern(){
    let pattern: Pattern = {name: "NewPattern" + this.patternList.length, notes: [], sample: null} as Pattern;
    this.patternList.push(pattern);
    this.selectedPattern = pattern;
  }

  deletePattern(){
    const index = this.patternList.indexOf(this.selectedPattern, 0);
    if (index > -1){
      this.patternList.splice(index, 1);
      this.selectedPattern = this.patternList[this.patternList.length-1];
    }
  }

  duplicatePattern(){
    this.patternList.push(JSON.parse(JSON.stringify(this.selectedPattern)));
    this.patternList[this.patternList.length-1].name = this.selectedPattern.name + "-Copy";
    this.selectPattern(this.patternList[this.patternList.length-1]);
  }

  edit(){
    this.showEditor = !this.showEditor;
  }
}
