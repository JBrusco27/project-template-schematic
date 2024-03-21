import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-textarea',
    templateUrl: './dynamic-textarea.component.html',
    styleUrls: ['./dynamic-textarea.component.css']
})
export class DynamicTextareaComponent {

    @Input() field: any;
    formName!: FormGroup;

    constructor(private formgroupDirective: FormGroupDirective) {}

    ngOnInit(): void {
        this.formName = this.formgroupDirective.control;
    }

}
