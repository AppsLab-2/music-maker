import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { PatternPlayerService } from './pattern-player.service';
import { ProjectService } from './project.service';
import * as Tone from 'tone'

@Injectable({
  providedIn: 'root'
})
export class SongPlayerService {
  constructor(private player : PatternPlayerService, private projectService: ProjectService) { }

  timer = timer(0, 24);
  sub;
  ticks = 0;
  clock = 0;
  //this.patternService.songPatternList;

  
  play(){
    this.sub = this.timer.subscribe(x => this.tick(x));
    this.projectService.selectedProject.patterns.forEach(el =>  {
      el.played = false;
      el.stopped = false;
    })
  }

  stop(){
    if (this.sub) this.sub.unsubscribe();
    this.sub = null;
    this.ticks = 0;
    this.clock = 0;
    this.player.stop();
  }

  tick(x: any){
    this.ticks = x;
    this.clock = x*0.024;
    this.projectService.selectedProject.patterns.forEach(el => {
      if ((el.y*26)-2*26 <= x && !el.played){
        console.log(el.x);
        el.played = true;
        el.color = 'orange';
        this.player.play(el.patt);
        console.log("playing: " + el.patt.name);
      }
      if ((el.y*26)-2*26+el.width <= x && !el.stopped){
        el.stopped = true;
        el.color = 'white';
        //this.player.stop();
        console.log("stopping: " + el.patt.name);
      }    
    });
  }

  test(){
    Tone.Transport.bpm.value = 60;
    Tone.Transport.scheduleRepeat(function(time){
      console.log(time);
      console.log(Tone.Transport.bpm.value);
    }, "1n");
    Tone.Transport.start();
  }
}
