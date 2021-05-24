import { Injectable } from '@angular/core';
import * as Tone from 'tone'

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  keys: string[] = ['B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3',
                    'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2',
                    'B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1']; 

  synth: any;

  constructor() {
    this.synth = new Tone.Synth().toDestination();
    
   }

  playSound(id: number){

  }

  stopSound(id: number){

  }

  playSoundF(tone: number, lenght: number){
    const now = Tone.now()
    console.log(this.keys[tone-1]);
    this.synth.volume.value = -20;
    this.synth.triggerAttackRelease(this.keys[tone-1], 0.05)

  }
}
