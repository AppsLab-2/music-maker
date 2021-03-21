import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public username: String = "testUser1";

  constructor() { }
}
