import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pattern } from './Pattern';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  selectedPattern: Pattern;
  patternList: Pattern[] = [];
  songPatternList: any[] = [];
  showEditor: boolean = false;

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  selectPattern(pattern: Pattern){
    this.selectedPattern = pattern;
    if (!this.selectedPattern.notes) this.getPattern();
  }

  addPattern(){
    let pattern: Pattern = {id: null, name: "NewPattern" + this.patternList.length, notes: []} as Pattern;
    this.patternList.push(pattern);
    this.selectedPattern = pattern;
    this.savePattern();
  }

  deletePattern(){
    const index = this.patternList.indexOf(this.selectedPattern, 0);
    if (index > -1){
      this.patternList.splice(index, 1);
      this.http.delete<Pattern>(`http://localhost:8080/getPattern/${this.selectedPattern.id}`, { withCredentials: true }).subscribe();
      this.selectedPattern = this.patternList[this.patternList.length-1];
    }
  }

  duplicatePattern(){
    this.patternList.push(JSON.parse(JSON.stringify(this.selectedPattern)));
    this.patternList[this.patternList.length-1].name = this.selectedPattern.name + "-Copy";
    this.patternList[this.patternList.length-1].id = undefined;
    this.selectPattern(this.patternList[this.patternList.length-1]);
  }

  edit(){
    this.showEditor = !this.showEditor;
  }

  ;
  savePattern(){
    let temp = JSON.parse(JSON.stringify(this.selectedPattern.notes));
    for (let index = 0; index < temp.length; index++) {
      delete temp[index].color;
      delete temp[index].played;
      delete temp[index].stopped;
    }

    console.log({name: this.selectedPattern.name, notes: JSON.stringify(temp)});
    this.http.post<number>(`http://localhost:8080/savePattern?projectId=${this.projectService.selectedProject.id}`, {id: this.selectedPattern.id, name: this.selectedPattern.name, notes: JSON.stringify(temp)}, { withCredentials: true, headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      res => {
        this.selectedPattern.id = res;
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  getPattern(){
    this.http.get<any>(`http://localhost:8080/getPattern/${this.selectedPattern.id}`, { withCredentials: true }).subscribe(
      res => {
        res.notes = JSON.parse(res.notes);
        const index = this.patternList.indexOf(this.selectedPattern, 0);
        this.patternList[index] =  res as Pattern;
        this.selectedPattern = res as Pattern;
      },
      err => {
        console.log(err);
      });
  }

  getPatterns(){
    this.http.get<Pattern[]>(`http://localhost:8080/getPatternsInfo?projectId=${this.projectService.selectedProject.id}`, { withCredentials: true }).subscribe(
      res => {
        this.patternList = res;
        this.selectPattern(this.patternList[0]);
      },
      err => {
        console.log(err);
      });
  }
}
