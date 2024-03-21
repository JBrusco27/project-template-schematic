import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-checkbox',
    templateUrl: './dynamic-checkbox.component.html',
    styleUrls: ['./dynamic-checkbox.component.css']
})
export class DynamicCheckboxComponent implements OnInit {

    @Input() field: any;
    formName!: FormGroup;

    constructor(private formgroupDirective: FormGroupDirective) {}

    ngOnInit(): void {
        this.formName =  this.formgroupDirective.control;
    }

}
