import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NodeListComponent } from './node-list/node-list.component';
import { EditorV2Component } from './editor-v2/editor-v2.component';



@NgModule({
  declarations: [
    EditorComponent,
    NodeListComponent,
    EditorV2Component,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditorModule { }
