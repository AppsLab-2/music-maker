import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pattern } from './Pattern';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class PatternService {
  url: String = "http://localhost:8080/";
  
  selectedPattern: Pattern;
  patternList: Pattern[] = [];
  songPatternList: any[] = [];
  showEditor: boolean = false;

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  selectPattern(pattern: Pattern){
    this.selectedPattern = pattern;
    if (!this.selectedPattern.notes) this.getPattern(this.selectedPattern.id);
  }

  addNewPattern(){
    let pattern: Pattern = {id: null, name: "NewPattern" + this.patternList.length, notes: [], offset: 0} as Pattern;
    this.patternList.push(pattern);
    this.selectedPattern = pattern;
    this.savePattern(pattern);
  }

  deletePattern(pattern: Pattern){
    const index = this.patternList.indexOf(pattern, 0);
    if (index > -1){
      this.patternList.splice(index, 1);
      this.http.delete<Pattern>(this.url + `getPattern/${pattern.id}`, { withCredentials: true }).subscribe();
      this.selectPattern(this.patternList[this.patternList.length-1]);
    }
  }

  duplicatePattern(pattern: Pattern){
    this.patternList.push(JSON.parse(JSON.stringify(pattern)));
    this.patternList[this.patternList.length-1].name = pattern.name + "-Copy";
    this.patternList[this.patternList.length-1].id = undefined;
    this.selectPattern(this.patternList[this.patternList.length-1]);
  }

  edit(){
    this.showEditor = !this.showEditor;
  }
  
  saveAll() {
    this.patternList.forEach(el => {
      this.savePattern(el);
    });
  }

  getFromMemory(id: number): Pattern{
    return this.patternList.filter(item => item.id == id)[0];
  }

  savePattern(pattern: Pattern){
    let temp = JSON.parse(JSON.stringify(pattern.notes));
    for (let index = 0; index < temp.length; index++) {
      delete temp[index].color;
      delete temp[index].played;
      delete temp[index].stopped;
    }

    this.http.post<number>(this.url + `savePattern?projectId=${this.projectService.selectedProject.id}`, {id: pattern.id, name: pattern.name, notes: JSON.stringify(temp), offset: pattern.offset}, { withCredentials: true, headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      res => {
        pattern.id = res;
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  getPattern(id: number){
    this.http.get<any>(this.url + `getPattern/${id}`, { withCredentials: true }).subscribe(
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
    this.http.get<Pattern[]>(this.url + `getPatternsInfo?projectId=${this.projectService.selectedProject.id}`, { withCredentials: true }).subscribe(
      res => {
        this.patternList = res;
        this.selectPattern(this.patternList[0]);
      },
      err => {
        console.log(err);
      });
  }
}
