import { Injectable } from '@angular/core';
import { Howl, Howler } from "howler"

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  sound = new Howl({
    src: ['assets/bl.wav']
  });
  list = {};

  constructor() {
    Howler.volume(0.1);
   }

  playSound(id: number){
    this.list[id] = this.sound.play();
  }

  stopSound(id: number){
    if (id === 0) this.sound.stop();
    this.sound.stop(this.list[id]);
  }
}
