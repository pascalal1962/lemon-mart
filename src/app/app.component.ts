import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px">
      <button *ngIf="displayAccountIcons" mat-icon-button><mat-icon>menu</mat-icon></button>
      <a mat-button routerLink="/home"><mat-icon svgIcon="lemon"></mat-icon><span class="mat-h2">LemonMart</span></a>
      <span class="flex-spacer"></span>
      <button *ngIf="displayAccountIcons" mat-mini-fab routerLink="/user/profile"
        matTooltip="Profile" aria-label="User Profile"><mat-icon>account_circle</mat-icon></button>
      <button *ngIf="displayAccountIcons" mat-mini-fab routerLink="/user/logout"
        matTooltip="Logout" aria-label="Logout"><mat-icon>lock_open</mat-icon></button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: ['./app.component.css'],
})
export class AppComponent {
  title = 'app'
  displayAccountIcons = false

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.authService.authStatus.subscribe(
      authStatus => (this.displayAccountIcons = authStatus.isAuthenticated)
    )
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }
}
