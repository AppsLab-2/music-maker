import { Component, OnInit } from '@angular/core';
import { PatternPlayerService } from '../pattern-player.service';
import { PatternService } from '../pattern.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, public player: PatternPlayerService, public patternService: PatternService) { }

  ngOnInit(): void {
  }

}
