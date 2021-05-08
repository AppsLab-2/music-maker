import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Project } from '../Project';
import { ProjectService } from '../project.service';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public loginForm;
  public registerForm;
  msg: String;
  projectName: String;
  showContent: number = 0;
  constructor(public userService: UserService, public projectService: ProjectService) { }

  private createForms(){
    this.loginForm = new FormGroup({
      'name': new FormControl(),
      'password': new FormControl()
    });
    this.registerForm = new FormGroup({
      'name': new FormControl(),
      'password': new FormControl(),
      'repeat': new FormControl()
    });
  }

  ngOnInit(): void {
    if (this.userService.isLogged) this.showContent = 3;
    this.createForms();
  }

  changeContent(num: number){
    this.createForms();
    this.showContent = num;
    delete this.msg;
  }

  login(){
    this.userService.tryLogin(this.loginForm.value).subscribe(res => {
      this.loginSucces(res);
    },
    err => {
      this.msg = (err.status === 401) ? "Incorrect username or password!" : "There was a problem reaching backend server! Try again later.";
    });
  }

  loginSucces(res: User){
    this.userService.user = res;
    this.userService.isLogged = true;
    this.showContent = 3;
    this.projectService.getProjects();
  }

  register(){
    let user: User = this.registerForm.value;
    this.userService.tryRegister(user).subscribe(
      res => {
        this.userService.tryLogin(user).subscribe(res => {
          this.loginSucces(res);
        });
      },
      err => {
        this.msg = "There was a problem reaching backend server! Try again later.";
      });{

    }
  }

  createNew(){
    if (this.projectName != ""){
      this.projectService.saveProject({name: this.projectName, id: null} as Project);
      this.projectName = "";
    }
  }

  hasError(): string{
    if (this.registerForm.get('password') != this.registerForm.get('repeat')){
      return "Passwords don't match";
    }
    return this.registerForm.get('password').errors == null ? null : "You must enter a value";
  }

  loginIsValid(): boolean{
    return this.loginForm.get('name').errors != null || this.loginForm.get('password').errors != null;
  }

  regIsValid(): boolean{
    return this.registerForm.get('name').errors != null || this.registerForm.get('password').errors != null || this.registerForm.get('repeat').errors != null;
  }
}
