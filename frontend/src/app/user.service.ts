import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { PatternService } from './pattern.service';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  isLogged: boolean = false;

  constructor(public dialog: MatDialog, private http: HttpClient, private patternService: PatternService) { }

  userClicked(){
    if (this.isLogged) this.logout();
    else this.showLoginForm();
  }

  showLoginForm(incorrect?: any){
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px', data: {incorrect: incorrect}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.user = result.user;
        this.isLogged = true;
        this.patternService.getPatterns();
      }
    });
  }

  logout(){
    this.user = null;
    this.isLogged = false;
    this.http.post("http://localhost:8080/logout", { withCredentials: true });
    localStorage.clear();
    sessionStorage.clear();
  }
}
