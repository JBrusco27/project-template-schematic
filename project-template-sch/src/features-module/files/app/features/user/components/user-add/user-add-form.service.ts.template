import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { newEmailValidator } from './new-email.validator';

@Injectable({
	providedIn: 'root',
})
export class UserAddFormService {
	constructor(private userService: UserService) {}

	form: FormGroup = new FormGroup({
		primer_nombre_usuario: new FormControl(null, [Validators.required]),
		apellido_paterno_usuario: new FormControl(null, [Validators.required]),
		correo_usuario: new FormControl(null, [Validators.required, Validators.email], [newEmailValidator(this.userService, '')]),
		contrasena_usuario: new FormControl(null, [Validators.required, Validators.minLength(8)]),
		contrasena_usuario_confirmacion: new FormControl(null, [Validators.required, Validators.minLength(8)]),
	});

	initializeFormGroup(): void {
		this.form.setValue({
			primer_nombre_usuario: null,
			apellido_paterno_usuario: null,
			contrasena_usuario: null,
			correo_usuario: null,
			contrasena_usuario_confirmacion: null
		});
	}
}
