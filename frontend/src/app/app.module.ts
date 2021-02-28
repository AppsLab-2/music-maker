import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToneEditorComponent } from './tone-editor/tone-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SongEditorComponent } from './song-editor/song-editor.component';
import { PatternListComponent } from './pattern-list/pattern-list.component';
import { SampleListComponent } from './sample-list/sample-list.component';
import { PatternPropertiesComponent } from './pattern-properties/pattern-properties.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToneEditorComponent,
    SongEditorComponent,
    PatternListComponent,
    SampleListComponent,
    PatternPropertiesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
