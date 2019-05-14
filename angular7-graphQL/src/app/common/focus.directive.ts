import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit, OnChanges {

  @Input() shouldFocus: boolean;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.toggleFocus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.shouldFocus.currentValue) {
      this.toggleFocus();
    }
  }

  toggleFocus() {
    if(this.shouldFocus) {
      this.el.nativeElement.focus();
    }
  }

}
