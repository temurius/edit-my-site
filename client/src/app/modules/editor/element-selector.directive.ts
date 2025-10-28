import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appElementSelector]'
})
export class ElementSelectorDirective {
  private originalOutline = '';

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('mouseenter') onEnter() {
    this.originalOutline = this.el.nativeElement.style.outline || '';
    this.renderer.setStyle(this.el.nativeElement, 'outline', '2px dashed #2563eb');
    this.renderer.setStyle(this.el.nativeElement, 'outlineOffset', '2px');
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'outline', this.originalOutline);
    this.renderer.removeStyle(this.el.nativeElement, 'outlineOffset');
  }
}

