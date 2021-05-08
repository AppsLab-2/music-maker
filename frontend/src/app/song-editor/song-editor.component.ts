import { Component, OnInit } from '@angular/core';
import { Pattern } from '../Pattern';
import { PatternService } from '../pattern.service';
import { SongPlayerService } from '../song-player.service';

class patternView{
  patt: Pattern;
  x: number;
  y: number;
  width: number;
  color: string = "white";
  constructor(x: number, y: number, patt: Pattern, width: number){
    this.patt = patt;
    this.x = x;
    this.y = y;
    this.width = width;
  }
}

@Component({
  selector: 'app-song-editor',
  templateUrl: './song-editor.component.html',
  styleUrls: ['./song-editor.component.css']
})
export class SongEditorComponent implements OnInit {

  constructor(public patternService: PatternService, public songPlayer: SongPlayerService) { }

  ngOnInit(): void {}

  getWidth(patt: Pattern): number{
    let max: number = 0;
    patt.notes.forEach(el => {
      if (el.col > max) max = el.col;
    });
    console.log(25*Math.floor(max/4));
    return 26*Math.floor(max/4) > 0 ? 26*Math.floor(max/4) : 26;
  }

  mouseDown(event: MouseEvent){
    if (event.button == 0 && (event.target as HTMLElement).classList.contains("mainGrid")){
      this.patternService.songPatternList.push(new patternView(Math.ceil(((event.offsetY-15)/50)), Math.ceil(event.offsetX/26), this.patternService.selectedPattern, this.getWidth(this.patternService.selectedPattern)));
    }
  }

  onDrag(item: patternView, event: DragEvent){
    if ((event.target as HTMLElement).classList.contains("mainGrid")) return;

    if (Math.ceil((event.clientY-65)/50) > 0 && Math.ceil((event.clientY-65)/21) <= 40) item.x = Math.ceil((event.clientY-65)/50);
    if (Math.ceil((event.clientX-200)/26)+2 > 1 ) item.y = Math.ceil((event.clientX-200)/26)+2;
  }

  img = new Image();
  onDragStart(event: DragEvent, item: patternView) {
    event.dataTransfer.setDragImage(this.img, 0, 0);
  }

  onDragOver(event: DragEvent){
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  }

  onRightClick(item: patternView, event){
    event.preventDefault();
    const index = this.patternService.songPatternList.indexOf(item, 0);
    if (index > -1) {
      this.patternService.songPatternList.splice(index, 1);
    }
  }
}
