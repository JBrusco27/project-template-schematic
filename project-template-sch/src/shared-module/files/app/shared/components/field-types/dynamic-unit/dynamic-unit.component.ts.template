import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-dynamic-unit',
    templateUrl: './dynamic-unit.component.html',
    styleUrls: ['./dynamic-unit.component.css']
})
export class DynamicUnitComponent implements OnInit {

    @Input() field: any;
    formName!: FormGroup;

    constructor(private formgroupDirective: FormGroupDirective) {}

    ngOnInit(): void {
        this.formName = this.formgroupDirective.control;
    }

}
