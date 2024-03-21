import { DataSource, SelectionModel, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, BehaviorSubject, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/shared/models';

/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserDataSource extends DataSource<User> {
	private userSubject = new BehaviorSubject<User[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	data: User[] = [];
	paginator!: MatPaginator;
	sort!: MatSort;
	filter = '';
	totalCount = 0;
	selection = new SelectionModel<User>(true, []);

	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle(): void {
		this.isAllSelected() ? this.selection.clear() : this.data.forEach((row) => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: User): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_usuario + 1}`;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.filter = filterValue.trim().toLowerCase();
	}

	loadUser(filter: string, sort: string, sortColumn: string, pageNumber: number, pageSize: number): void {

		try {
			this.loadingSubject.next(true);
			const user: any = this.userService.getUsers(filter, sort, sortColumn, pageNumber, pageSize)
			
			if ( user.data && user.data.length > 0 ) {
				this.data = user.data;
				this.totalCount = user.totalCount;
				this.userSubject.next(user.data);
			}
		} catch(error){
			of([]);
		} finally {
			this.loadingSubject.next(false);
		}

			
	}

	constructor(private userService: UserService) {
		super();
	}

	/**
	 * Connect this data source to the table. The table will only update when
	 * the returned stream emits new records.
	 * @returns A stream of the records to be rendered.
	 */
	connect(collectionViewer: CollectionViewer): Observable<User[]> {
		return this.userSubject.asObservable();
	}

	/**
	 *  Called when the table is being destroyed. Use this function, to clean up
	 * any open connections or free any held resources that were set up during connect.
	 */
	disconnect(collectionViewer: CollectionViewer): void {
		this.userSubject.complete();
		this.loadingSubject.complete();
	}
}
