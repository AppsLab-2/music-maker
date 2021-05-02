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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { EditorComponent } from './editor/editor.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToneEditorComponent,
    SongEditorComponent,
    PatternListComponent,
    SampleListComponent,
    PatternPropertiesComponent,
    StartPageComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
