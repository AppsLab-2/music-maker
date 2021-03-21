import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatternPlayerService } from '../pattern-player.service';
import { PatternService } from '../pattern.service';

class note{
  key: number;
  col: number;
  color: any = '#b9fac5';
  constructor(key: number, col: number){
    this.key = key;
    this.col = col;
  }
}

@Component({
  selector: 'app-tone-editor',
  templateUrl: './tone-editor.component.html',
  styleUrls: ['./tone-editor.component.css']
})

export class ToneEditorComponent implements OnInit {
  math = Math;
  keys: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  constructor(public patternService: PatternService, private player: PatternPlayerService) {}

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.player.stop();
  }

  mouseDown(event: MouseEvent){
    if (event.button == 0 && (event.target as HTMLElement).classList.contains("mainGrid")){
      this.patternService.selectedPattern.notes.push(new note(Math.ceil(((event.offsetY-15)/21)), Math.ceil(event.offsetX/26)));
    }
  }

  onDrag(item:note, event: DragEvent){
    if ((event.target as HTMLElement).classList.contains("mainGrid")) return;

    if (Math.ceil((event.clientY-65)/21) > 0 && Math.ceil((event.clientY-65)/21) <= 21) item.key = Math.ceil((event.clientY-65)/21);
    if (Math.ceil((event.clientX-200)/26)+2 > 2 ) item.col = Math.ceil((event.clientX-200)/26)+2;
  }

  img = new Image();
  onDragStart(event: DragEvent, item: note) {
    event.dataTransfer.setDragImage(this.img, 0, 0);
  }

  onDragOver(event: DragEvent){
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  }

  onRightClick(note: note, event){
    event.preventDefault();
    const index = this.patternService.selectedPattern.notes.indexOf(note, 0);
    if (index > -1) {
      this.patternService.selectedPattern.notes.splice(index, 1);
    }
  }
}
