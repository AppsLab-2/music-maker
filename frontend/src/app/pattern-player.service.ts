import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { AudioService } from './audio.service';
import { Pattern } from './Pattern';

@Injectable({
  providedIn: 'root'
})
export class PatternPlayerService {

  constructor(private audioService: AudioService) { }

  timer = timer(0, 3);
  sub;
  list: any[];
  ticks = 0;


  play(pattern: Pattern){
    this.list = pattern.notes;
    this.sub = this.timer.subscribe(x => this.tick(x));
    this.list.forEach(el =>  {
      el.played = false;
      el.stopped = false;
    })
  }

  stop(){
    this.sub.unsubscribe();
    this.ticks = 0;
  }

  tick(x: any){
    this.ticks = x;
    this.list.forEach(el => {
      if ((el.col*26)-75 <= x && !el.played){
        el.played = true;
        el.color = 'orange';
        this.audioService.playSound((el.y*50)+el.x)
      }
      if ((el.col*26)-25 <= x && !el.stopped){
        el.stopped = true;
        el.color = '#b9fac5';
        this.audioService.stopSound((el.y*50)+el.x)
      }    
    });
  }
}
