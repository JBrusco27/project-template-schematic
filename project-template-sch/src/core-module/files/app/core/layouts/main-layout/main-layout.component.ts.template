import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})

export class MainLayoutComponent {
  public menuOpened = false;
  public footerPosition = 'footer-absolute';
  screenWidth = window.innerWidth

  onScroll(event: any) {
      if ( event.srcElement.scrollTop < 10 ) {
          this.footerPosition = 'footer-absolute';
      } else {
          this.footerPosition = 'footer-relative';
      }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
      this.screenWidth = window.innerWidth;
  }

  toogleMenu(state: boolean) {
      this.menuOpened = state;
  }

  menuType(){
      return this.screenWidth > 768 ? 'side' : 'over'
  }

}
