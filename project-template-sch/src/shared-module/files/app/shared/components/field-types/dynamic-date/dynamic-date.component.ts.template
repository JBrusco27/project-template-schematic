import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-date',
    templateUrl: './dynamic-date.component.html',
    styleUrls: ['./dynamic-date.component.css']
})
export class DynamicDateComponent implements OnInit {

    @Input() field: any;
    formName!: FormGroup;

    constructor( private formgroupDirective: FormGroupDirective ) { }

    ngOnInit(): void {
        this.formName = this.formgroupDirective.control;
    }

}
