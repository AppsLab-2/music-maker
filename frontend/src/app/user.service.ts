import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { LoginFormComponent } from './login-form/login-form.component';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  isLogged: boolean = false;

  constructor(public dialog: MatDialog, private http: HttpClient) { }

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
      }
    });
  }

  logout(){
    this.isLogged = false;
    this.http.get<User>("http://localhost:8080/logout");
  }
}
