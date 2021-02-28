import { Component, OnInit } from '@angular/core';
import { PatternService } from '../pattern.service';

class patternView{
  name: String;
  x: number;
  y: number;
  constructor(x: number, y: number, name: String){
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

@Component({
  selector: 'app-song-editor',
  templateUrl: './song-editor.component.html',
  styleUrls: ['./song-editor.component.css']
})
export class SongEditorComponent implements OnInit {

  constructor(public patternService: PatternService) { }

  ngOnInit(): void {
  }

  mouseDown(event: MouseEvent){
    if (event.button == 0 && (event.target as HTMLElement).classList.contains("mainGrid")){
      this.patternService.songPatternList.push(new patternView(Math.ceil(((event.offsetY-15)/50)), Math.ceil(event.offsetX/26), this.patternService.selectedPattern.name));
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
