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
  constructor(private http: HttpClient, private router: Router) { }

  getProjects(){
    this.http.get<Project[]>("http://localhost:8080/getList", { withCredentials: true }).subscribe(
      res => {
        this.projectList = res;
      },
      err => {
        console.log(err);
      });
  }

  selectProject(project: Project){
    this.selectedProject = project;
    this.router.navigate(['editor']);
  }

  deleteProject(project: Project){
    const index = this.projectList.indexOf(project, 0);
    if (index > -1){
      this.projectList.splice(index, 1);
      this.http.delete<Project>(`http://localhost:8080/getProject/${project.id}`, { withCredentials: true }).subscribe();
    }
  }

  saveProject(project: Project){
    this.http.post<number>(`http://localhost:8080/saveProject`, project, { withCredentials: true, headers : new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(
      res => {
        project.id = res;
        this.projectList.push(project);
        console.log(project);
      }, 
      err => {
        console.log(err);
      });
  }
}
