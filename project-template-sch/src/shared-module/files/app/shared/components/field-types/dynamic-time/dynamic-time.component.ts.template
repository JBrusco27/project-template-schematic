import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-time',
    templateUrl: './dynamic-time.component.html',
    styleUrls: ['./dynamic-time.component.css']
})
export class DynamicTimeComponent implements OnInit {

    @Input() field: any;
    formName!: FormGroup;

    constructor( private formgroupDirective: FormGroupDirective ) { }

    ngOnInit(): void {
        this.formName = this.formgroupDirective.control;
    }

}
