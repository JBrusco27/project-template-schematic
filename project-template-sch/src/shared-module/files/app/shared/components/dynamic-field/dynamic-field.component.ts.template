import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-field',
    templateUrl: './dynamic-field.component.html',
    styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {
    @Input() field: any;
    formName!: FormGroup;

    constructor(private formgroupDirective: FormGroupDirective) { }

    ngOnInit() {
        console.log(this.field)
        this.formName = this.formgroupDirective.control;
    }

}
