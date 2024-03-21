import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-error',
    templateUrl: './dynamic-error.component.html',
    styleUrls: ['./dynamic-error.component.css']
})
export class DynamicErrorComponent implements OnInit {
    // @ts-ignore
    formName: FormGroup;
    @Input() fieldName: string = '';
    @Input() fieldLabel: string = '';

    constructor(private formgroupDirective: FormGroupDirective) {}

    ngOnInit(): void {
        this.formName = this.formgroupDirective.control;
    }
}
