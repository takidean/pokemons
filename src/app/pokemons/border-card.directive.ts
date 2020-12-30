import { Directive, ElementRef, HostListener, Input } from '@angular/core';
  
@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
	private defaultColor: string="#f5f5f5";
	private onMouseEnterInitColor: string="#009688";
    constructor(private el: ElementRef) {
        this.setBorder('#f5f5f5');
        this.setHeight(180);
    }
	
  @Input('pkmnBorderCard')  borderColor: string; //alias

  @HostListener('mouseenter') onMouseEnter(){
	  this.setBorder(this.borderColor || this.onMouseEnterInitColor);
  }
  
    @HostListener('mouseleave') onMouseLeave(){
	  this.setBorder(this.defaultColor);
  }
  
    private setBorder(color: string) {
        let border = 'solid 4px ' + color;
        this.el.nativeElement.style.border = border;
    }
  
    private setHeight(height: number) {
        this.el.nativeElement.style.height = height + 'px';
    }
}