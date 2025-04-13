import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  hideUserMenu = signal(true);

  toggleNavbarMenu() {
    this.hideUserMenu.set(!this.hideUserMenu());
  }
}
