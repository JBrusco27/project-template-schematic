import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	isLoading = new Subject<boolean>();
	private messageSubject = new BehaviorSubject<string>('');
	message$ = this.messageSubject.asObservable();

	show(): void {
		this.isLoading.next(true);
	}

	hide(): void {
		this.isLoading.next(false);
		this.messageSubject.next('Procesando solicitud');
	}

	setMessage(message: string): void {
		this.messageSubject.next(message);
	}
}
