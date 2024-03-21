import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class SuggestionFormService {
	constructor() {}

	form: UntypedFormGroup = new UntypedFormGroup({
		suggestion_text: new UntypedFormControl(null, Validators.required),
	});

	initializeFormGroup() {
		this.form.setValue({
			suggestion_text: null,
		});
	}
}
