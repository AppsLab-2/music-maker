import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  public loginForm;
  public msg: String;

  private createForm(){
    this.loginForm = new FormGroup({
      'name': new FormControl(),
      'password': new FormControl()
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  tryLogin(){
    let user: User = {name: this.loginForm.get("name").value, password: this.loginForm.get("password").value} as User;
    let headers = new HttpHeaders(user ? {'Authorization' : 'Basic ' + btoa(user.name + ':' + user.password)} : {});
    this.http.get<User>("http://localhost:8080/user", {headers: headers, withCredentials: true}, ).subscribe(
      res => {
        this.data.user = res;
        this.dialogRef.close(this.data);  
      },
      err => {
        this.msg = (err.status === 401) ? "Incorrect username or password!" : "There was a problem reaching backend server! Try again later.";
      });
  }
  
  isValid(): boolean{
    return (this.loginForm.get('name').errors == null && this.loginForm.get('password').errors == null)
  }

  getErrorMessage(param: any){
    if (param.errors.required) return 'You must enter a value';
  }
}
