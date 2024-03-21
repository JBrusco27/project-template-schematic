import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-verifica-eliminar',
    templateUrl: './modal-verifica-eliminar.component.html',
    styleUrls: ['./modal-verifica-eliminar.component.css']
})
export class ModalVerificaEliminarComponent {

    constructor(
        public dialogRef: MatDialogRef<ModalVerificaEliminarComponent>,
        @Inject(MAT_DIALOG_DATA) public datosModal: { mensaje: string, titulo: string }
    ) {}

}
