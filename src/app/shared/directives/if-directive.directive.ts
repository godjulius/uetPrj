import {Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appIfDirective]',
    standalone: true
})
export class IfDirectiveDirective {
    templateRef = inject(TemplateRef)
    containerRef = inject(ViewContainerRef)
    constructor() {
    }

    @Input() set isDisplayed(value: boolean) {
        if (value) {
            this.containerRef.createEmbeddedView(this.templateRef)
        } else {
            this.containerRef.clear();
        }
    }
}
