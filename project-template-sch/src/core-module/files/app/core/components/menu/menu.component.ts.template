import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from '../../../features/admin/services/login.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
    @ViewChild('sidenav') menu?: MatSidenav;

    @Output() toggleMenu = new EventEmitter<boolean>(false);
    public showMenu = false

    constructor(
        private router: Router,
        private loginService: LoginService,
    ) { }

    isLogged(): boolean {
        return this.loginService.isLogged();
    }

    getUserRole(): string {
        return this.loginService.getUserRole();
    }

    salir(): void {
        this.loginService.logOut();
        this.router.navigate(['/admin/login']);
    }

    onToggleMenu(): void {
        this.toggleMenu.emit(!this.showMenu);
    }
}
