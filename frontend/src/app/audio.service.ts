import { Injectable } from '@angular/core';
import * as Tone from 'tone'
import { PatternService } from './pattern.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  keys: string[] = ['B3', 'A3', 'G3', 'F3', 'E3', 'D3', 'C3',
                    'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2',
                    'B1', 'A1', 'G1', 'F1', 'E1', 'D1', 'C1']; 

  keyss: string[] = ['C', 'B', 'A', 'G', 'F', 'E', 'D', 'C'];

  synth: any;

  constructor(private patternService: PatternService) {
    this.synth = new Tone.Synth().toDestination();
    
   }

  playSound(id: number){

  }

  stopSound(id: number){

  }

  playSoundF(tone: number, lenght: number){
    console.log(this.keyss[(tone-(7*Math.floor(tone/7)))]+""+(this.patternService.selectedPattern.mov+3-Math.floor((tone-1)/7)));

    this.synth.volume.value = -20;
    this.synth.triggerAttackRelease(this.keyss[(tone-(7*Math.floor(tone/7)))]+""+(this.patternService.selectedPattern.mov+3-Math.floor((tone-1)/7)), 0.05);
  }

  
}
