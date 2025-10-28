import { Component, Input } from '@angular/core';
import { DiffResult } from '../../../core/services/ai.service';

@Component({
  selector: 'app-preview-diff',
  templateUrl: './preview-diff.component.html'
})
export class PreviewDiffComponent {
  @Input() result!: DiffResult;
}

