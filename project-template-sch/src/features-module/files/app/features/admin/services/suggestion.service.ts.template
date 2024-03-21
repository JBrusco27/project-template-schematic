import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Suggestion } from '../../../shared/models/suggestion.model';
import { constants } from '../../../shared/api.constants';
import { UtilsService, httpOptions } from '../../../../app/shared/utils/app.utils';

@Injectable({
	providedIn: 'root',
})
export class SuggestionService {
	constructor(
		private http: HttpClient,
		private utilsService: UtilsService
	) {}

	async createSuggestion(suggestion: Suggestion): Promise<Suggestion> {
		return await firstValueFrom(this.http.post<Suggestion>(constants.API_SUGGESTION, suggestion, httpOptions).pipe(
			tap((newSuggestion: Suggestion) => this.utilsService.log(`added Suggestion w/ id=${newSuggestion.id_suggestion}`)),
			catchError(this.utilsService.handleError<Suggestion>('addSuggestion'))
		));
	}

}
