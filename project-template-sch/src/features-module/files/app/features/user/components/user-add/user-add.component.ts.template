import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { combineLatest, merge } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserAddFormService } from './user-add-form.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent {
	@Input() embedded = false;
	@Output() addUserResult = new EventEmitter<{ result: string; data: User | string }>();

	constructor(
		private loaderService: LoaderService,
		private userService: UserService,
		public formService: UserAddFormService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.formService.initializeFormGroup();

		const pass1 = this.formService.form.get('contrasena_usuario')!.valueChanges;
		const pass2 = this.formService.form.get('contrasena_usuario_confirmacion')!.valueChanges;

		combineLatest([pass1, pass2]).subscribe(([passValue1, passValue2]) => {
			if (passValue1 === passValue2) {
				this.formService.form.get('contrasena_usuario')?.setErrors({ notSamePass: false });
				this.formService.form.get('contrasena_usuario_confirmacion')?.setErrors({ notSamePass: false });
				this.formService.form.get('contrasena_usuario')?.updateValueAndValidity({ emitEvent: false });
				this.formService.form.get('contrasena_usuario_confirmacion')?.updateValueAndValidity({ emitEvent: false });
			} else {
				this.formService.form.get('contrasena_usuario')?.setErrors({ notSamePass: true });
				this.formService.form.get('contrasena_usuario_confirmacion')?.setErrors({ notSamePass: true });
			}
		});
	}

	async onSubmit(): Promise<void> {
		this.loaderService.setMessage('Creando usuario');

		const user:User = await this.userService.createUser(this.formService.form.value)
    
    if (this.embedded) {
      this.addUserResult.emit({ result: 'saved', data: user });
    } else {
      this.router.navigate(['/usuarios']);
    }
	}

	onCancel(): void {
		if (this.embedded) {
			this.addUserResult.emit({ result: 'cancel', data: '' });
		} else {
			this.router.navigate(['/']);
		}
	}
}
