import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApplicationService } from './services/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public isAuthentication = false;
  public user: any;

  constructor(
    private router: Router,
    public applicationService: ApplicationService,
    private httpClient: HttpClient
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        if (ev.url.indexOf('mechanic') > -1 && !applicationService.isAuthenticated()) {
          this.router.navigate(['/login']);
        }
      }
      if(ev instanceof NavigationEnd) {
        this.isAuthentication = this.router.url.indexOf('/register') > -1 || this.router.url.indexOf('/login') > -1;
      }
    });

    if (this.applicationService.isAuthenticated()) {
      this.httpClient.get(`${environment.API}/user/current-user`)
        .subscribe((response: any) => {
          console.log(response);
          this.applicationService.currentUser$.next(response);
        }, (error: any) => {
          console.log(error);
        });
    }
  }

  logout() {

    this.applicationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.applicationService.currentUser$.subscribe(data => this.user = data);
  }
}
