import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-command-input',
  templateUrl: './edit-command-input.component.html'
})
export class EditCommandInputComponent {
  @Input() control = new FormControl('');
  @Output() submitCommand = new EventEmitter<void>();

  onSubmit() {
    this.submitCommand.emit();
  }
}

