import {
  AfterContentInit,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextLength]',
})
export class TextLengthDirective implements AfterContentInit {
  constructor(private eleRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    if (this.eleRef.nativeElement.innerText) {
      var wordArray = this.eleRef.nativeElement.innerText.match(/\S+/g);
      var wordLimit = 50;
      if (wordArray && wordArray.length > wordLimit) {
        var updatedText = this.eleRef.nativeElement.innerText
          .match(/\S+/g)
          .slice(0, wordLimit)
          .join(' ') + '...';

          this.renderer.setProperty(this.eleRef.nativeElement, 'innerText', updatedText);
      }
    }
  }
}
