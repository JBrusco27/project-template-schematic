import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiResponse } from '../../../../shared/models';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';

import { UserService } from '../../services/user.service';

export function newEmailValidator(apiValidationService: UserService, editedValue: string): AsyncValidatorFn {
	return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
		if (!editedValue) {
			return asyncValidator(apiValidationService, control.value, editedValue);
		}
		if (control.value === editedValue) {
			return of(null);
		}
		return asyncValidator(apiValidationService, control.value, editedValue);
	};
}

function asyncValidator(
	apiValidationService: UserService,
	controlValue: string,
	editedValue: string
): Observable<{ repeatedValue: boolean } | null> {
	return timer(400).pipe(
		filter(() => controlValue !== editedValue),
		distinctUntilChanged(),
		switchMap(() => apiValidationService.verifyNewUserEmail(controlValue)),
		map((response: ApiResponse) => (response && response.success === false ? { repeatedValue: true } : null))
	);
}
