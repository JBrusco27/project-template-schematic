import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuggestionService } from '../../services/suggestion.service';
import { SuggestionFormService } from './suggestion-form.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
	selector: 'app-suggestion',
	templateUrl: './suggestion.component.html',
	styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent implements OnInit {
	suggestionSent = false;

	constructor(
		private loaderService: LoaderService,
		public formService: SuggestionFormService,
		private suggestionService: SuggestionService,
		private dialogRef: MatDialogRef<SuggestionComponent>
	) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.loaderService.setMessage('Enviando sugerencia');

		const result: unknown = this.suggestionService.createSuggestion(this.formService.form.value)
    
    this.suggestionSent = true;
    setTimeout(() => this.dialogRef.close({ result: true }), 1800);
    this.formService.initializeFormGroup();
	}

	close(): void {
		this.dialogRef.close();
	}
}