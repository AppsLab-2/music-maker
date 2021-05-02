import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatternService } from './pattern.service';
import { ProjectService } from './project.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  isLogged: boolean = false;
  msg: String;

  constructor(private http: HttpClient, private patternService: PatternService, private router: Router, private projectService: ProjectService) { }

  userClicked(){
    if (this.isLogged) this.logout();
  }

  logout(){
    this.patternService.patternList = null;
    this.patternService.selectedPattern = null;
    this.patternService.showEditor = false;
    this.user = null;
    this.isLogged = false;
    this.http.post("http://localhost:8080/logout", { withCredentials: true }).subscribe();
    this.router.navigate(['start']);
  }

  tryLogin(user: User): Observable<User>{
    let headers = new HttpHeaders({'Authorization' : 'Basic ' + btoa(user.name + ':' + user.password), 'X-Requested-With' : 'XMLHttpRequest'});
    return this.http.get<User>("http://localhost:8080/user", {headers: headers, withCredentials: true});
    /*.subscribe(
      res => {
        this.user = res;
      },
      err => {
        this.msg = (err.status === 401) ? "Incorrect username or password!" : "There was a problem reaching backend server! Try again later.";
      });*/
  }

  tryRegister(user: User): Observable<any>{
    return this.http.post<User>("http://localhost:8080/saveUser", user)
    /*.subscribe(
      res => {
        this.tryLogin(user);
      },
      err => {
        this.msg = "There was a problem reaching backend server! Try again later.";
      });*/
  }
}
