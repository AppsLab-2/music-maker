import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatternPlayerService } from '../pattern-player.service';
import { PatternService } from '../pattern.service';
import { ProjectService } from '../project.service';
import { SongPlayerService } from '../song-player.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdown: boolean = false;

  constructor(
    public userService: UserService, public player: PatternPlayerService, private projectService: ProjectService,
    public patternService: PatternService, public songService: SongPlayerService, public router: Router
    ) { }

  ngOnInit(): void {
  }

  play(){
    if (this.patternService.showEditor) this.player.play(this.patternService.selectedPattern);
    else this.songService.play();
  }

  stop(){
    this.songService.stop();
    this.player.stop();
  }

  save(){
    this.patternService.saveAll();
    this.projectService.saveProject(this.projectService.selectedProject);
  }
}
