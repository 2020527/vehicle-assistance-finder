import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public alert = { type: 'success', timeout: 3000, msg: '' };
  public loading = '';
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  constructor(
    public applicationService: ApplicationService,
    private router: Router,
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.alert.msg = '';
    this.alert.type = 'success';
    if (this.form.invalid) {
      this.alert.type = 'danger';
      this.alert.msg = 'Please fill required information';
      console.log(this.form);
      return;
    }

    this.applicationService.loading = true;
    this.httpClient.post(`${environment.API}/user/login`, this.form.value)
      .subscribe((response: any) => {
        console.log(response);
        this.applicationService.currentUser$.next(response.user);
        this.applicationService.setToken(response.token);
        this.alertService.success('Successfully loggedin!');

        this.router.navigate(['/mechanics']);
        this.applicationService.loading = false;
      }, (error: any) => {
        console.error(error);
        this.applicationService.loading = false;
        this.alert.msg = 'Invalid Email or Password, please try again!';
        this.alert.type = 'danger';
        this.loading = '';
        this.alertService.danger('Invalid Email or Password, please try again!');
      });
  }
}
