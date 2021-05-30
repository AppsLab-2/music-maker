import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as Tone from 'tone'
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
    if (this.sub) this.sub.unsubscribe();
    this.sub = null;
    this.ticks = 0;
    if (this.list) this.list.forEach(el => el.color = '#b9fac5');
  }

  tick(x: any){
    this.ticks = x;
    this.list.forEach(el => {
      if ((el.col*26)-75 <= x && !el.played){
        el.played = true;
        el.color = 'orange';
        this.audioService.playSoundF(el.key, 26)
      }
      if ((el.col*26)-25 <= x && !el.stopped){
        el.stopped = true;
        el.color = '#b9fac5';
        //this.audioService.stopSound((el.y*50)+el.x)
      }    
    });
  }
}
