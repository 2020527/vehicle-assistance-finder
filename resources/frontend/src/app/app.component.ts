import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { environment } from 'src/environments/environment';
import { ApplicationService } from './services/application.service';
const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  ngxLoadingComponent!: NgxLoadingComponent;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = true;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
  };
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
      if (ev instanceof NavigationEnd) {
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
