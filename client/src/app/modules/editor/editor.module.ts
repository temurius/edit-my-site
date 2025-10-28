import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { EditorWidgetComponent } from './editor-widget/editor-widget.component';
import { EditCommandInputComponent } from './edit-command-input/edit-command-input.component';
import { PreviewDiffComponent } from './preview-diff/preview-diff.component';
import { ElementSelectorDirective } from './element-selector.directive';

const routes: Routes = [
  { path: '', component: EditorWidgetComponent }
];

@NgModule({
  declarations: [EditorWidgetComponent, EditCommandInputComponent, PreviewDiffComponent, ElementSelectorDirective],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [EditorWidgetComponent]
})
export class EditorModule {}

