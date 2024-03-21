import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../../features/admin/services/login.service';
import { SuggestionComponent } from '../../../features/admin/components/suggestion/suggestion.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {

    @Output() toggleMenu = new EventEmitter<boolean>(false);
    public showMenu = false;
    screenWidth = window.innerWidth

    constructor(
        private loginService: LoginService,
        public dialog: MatDialog
    ) { }

    @HostListener('window:resize', ['$event'])
    onResize(event?: any) {
        this.screenWidth = window.innerWidth;
    }

    onToggleMenu(): void {
        this.showMenu = !this.showMenu;
        this.toggleMenu.emit(this.showMenu);
    }

    isLogged(): boolean {
        return this.loginService.isLogged();
    }

    openSuggestionForm(): void {
        this.dialog.open(SuggestionComponent, {
            width: '350px',
        });
    }
}
