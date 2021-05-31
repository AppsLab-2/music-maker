import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from './Project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project;
  projectList: Project[] = [];

  url: String = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) { }

  getProjects(){
    this.http.get<Project[]>(this.url + "getList", { withCredentials: true }).subscribe(
      res => {
        this.projectList = res;
      },
      err => {
        console.log(err);
      });
  }

  deleteProject(project: Project){
    const index = this.projectList.indexOf(project, 0);
    if (index > -1){
      this.projectList.splice(index, 1);
      this.http.delete<Project>(this.url + `getProject/${project.id}`, { withCredentials: true }).subscribe();
    }
  }

  getPatternFromId(id: number, list: any[]){
    let patt = list.filter(item => item.id == id)[0];
    this.http.get<any>(this.url + `getPattern/${id}`, { withCredentials: true }).subscribe(
      res => {
        patt.notes = JSON.parse(res.notes);
      },
      err => {
        console.log(err);
      });
    return patt;
  }

  selectProject(project: Project){
    this.http.get<any>(this.url + `getProject/${project.id}`, { withCredentials: true }).subscribe(
      res => {
        console.log(res);
        res.patterns = JSON.parse(res.patterns);
        res.patterns.forEach(el => {
          el.patt = this.getPatternFromId(el.patId, res.patternList);
        }); 
        this.selectedProject = res as Project;
        this.router.navigate(['editor']);
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  saveProject(project: Project){
    project.patterns.forEach(r => {
      delete r["color"];
      r.patId = r.patt.id;
      delete r["patt"];
    })
    this.http.post<number>(this.url + `saveProject`, {name: project.name, id: project.id, patterns: JSON.stringify(project.patterns)}, { withCredentials: true, headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      res => {
        project.id = res;
        if (!this.projectList.includes(project)) this.projectList.push(project);
        console.log(project);
        project.patterns.forEach(el => {
          el.patt = this.getPatternFromId(el.patId, project.patternList);
        }); 
      }, 
      err => {
        console.log(err);
      });
  }
}
