import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public isAuthentication = false;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if(ev instanceof NavigationEnd) {
        this.isAuthentication = this.router.url.indexOf('/register') > -1 || this.router.url.indexOf('/login') > -1;
      }
    });
  }
}
