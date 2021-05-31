import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.css']
})
export class MixerComponent implements OnInit {

  constructor(public audio: AudioService) { }

  ngOnInit(): void {
  }

  change_vol_channel(event: MatSliderChange, id: number){
    
  }

  change_vol_master(event: MatSliderChange){
    this.audio.synth.volume.value = event.value;
  }
}
