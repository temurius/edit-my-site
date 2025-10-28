import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AiService, DiffResult } from '../../../core/services/ai.service';
import gsap from 'gsap';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {
  open = false;
  prompt = new FormControl('Make the hero title blue and bold.');
  selectedHtml = '<h1 appElementSelector>Hello</h1>';
  result?: DiffResult;

  @ViewChild('panel') panel?: ElementRef<HTMLDivElement>;

  constructor(private ai: AiService) {}

  ngOnInit(): void {}

  toggle() {
    this.open = !this.open;
    if (this.open && this.panel) {
      gsap.fromTo(
        this.panel.nativeElement,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }

  runEdit() {
    const prompt = this.prompt.value || '';
    this.ai.generateEdit(prompt, this.selectedHtml).subscribe(res => (this.result = res));
  }
}

