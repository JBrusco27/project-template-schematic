import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models';
import { UserDataSource } from './user-list.datasource';
import { fromEvent, merge, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/features/admin/services/login.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('deletePopup', { static: true })
	deletePopup!: TemplateRef<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatTable) table!: MatTable<User>;
	@ViewChild('input') search?: ElementRef;
	dataSource!: UserDataSource;

	userSub$!: Subscription;

	public displayedColumns = ['primer_nombre_usuario', 'apellido_paterno_usuario', 'correo_usuario', 'fecha_creacion_usuario', 'actions'];
	private subscriptions: Subscription[] = [];

	constructor(
		private loaderService: LoaderService,
		private userService: UserService,
        private loginService: LoginService,
		public dialog: MatDialog,
		public router: Router
	) {}

	ngOnInit(): void {
		this.loaderService.setMessage('Cargando listado de usuarios');
		this.dataSource = new UserDataSource(this.userService);
		this.dataSource.loadUser('', 'asc', 'id_usuario', 0, 10);
	}

	isLogged(): boolean {
        return this.loginService.isLogged();
    }
	

	ngAfterViewInit(): void {
		this.table.dataSource = this.dataSource;

		// reset the paginator after sorting
		this.sort.sortChange.subscribe((data: any) => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(tap(() => this.loadUserTable()))
			.subscribe();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}

	loadUserTable(): void {
		this.dataSource.loadUser(
			this.search?.nativeElement.value || '',
			this.sort.direction || 'asc',
			this.sort.active,
			this.paginator.pageIndex || 1,
			this.paginator.pageSize
		);
	}

	onDeleteUser(user: User): void {
		// const dialogConfig = new MatDialogConfig();
		// dialogConfig.disableClose = false;
		// dialogConfig.autoFocus = true;
		// dialogConfig.data = { ...user };
		// const dialogRef = this.dialog.open(this.deletePopup, dialogConfig);
		// dialogRef.afterClosed().subscribe((dialogResult: string) => {
		// 	if (dialogResult === 'eliminar') {
		// 		this.userService.deleteUser(user).subscribe(
		// 			(data: any) => this.loadUserTable(),
		// 			(error) => console.log(error),
		// 			() => console.log('Delete Finished.')
		// 		);
		// 	}
		// });
	}

	onEditUser(user: User): void {
		// this.router.navigate(['user/edit/' + user.id_usuario]);
	}

	onSetStatus(user: User) {
		// this.userService.updateStatusUser(user).subscribe(() => this.loadUserTable());
	}
}
