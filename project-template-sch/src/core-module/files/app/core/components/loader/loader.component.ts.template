import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
	private isLoading: Subject<boolean> = this.loaderService.isLoading;
	public isLoading$ = this.isLoading.asObservable().pipe(delay(0));
  public message: string = '';

	constructor(@Inject(LoaderService) private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.message$.subscribe((message) => {
      this.message = message;
    });
  }

}