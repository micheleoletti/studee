import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorV2Component } from './modules/editor/editor-v2/editor-v2.component';
import { EditorComponent } from './modules/editor/editor/editor.component';

const routes: Routes = [ {
  path: '', component: EditorV2Component
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
