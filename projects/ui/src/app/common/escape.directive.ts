import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appEscape]'
})
export class EscapeDirective {

  @Output() escapePressed = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.escapePressed.emit(true);
  }
}
