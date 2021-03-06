import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public alert = { type: 'success', timeout: 3000, msg: '' };
  public loading = '';
  public form = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pinCode: new FormControl(null, Validators.required)
  });
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private applicationService: ApplicationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.alert.msg = '';
    this.alert.type = 'success';
    if (this.form.invalid) {
      this.alert.type = 'danger';
      this.alert.msg = 'Please fill required information';
      console.log(this.form);
      return;
    }

    this.applicationService.loading = true;
    this.loading = 'Please wait...';
    this.httpClient.post(`${environment.API}/user/register`, this.form.value)
      .subscribe((response: any) => {
        console.log(response);

        this.applicationService.loading = false;
        this.loading = '';
        this.alert.type = 'success';
        this.alert.msg = 'Successfully registered into the system! Please login to continue';
        this.alertService.success(this.alert.msg);
        // this.applicationService.setToken(response.token);
        // this.applicationService.currentUser$.next(response.data);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }, (error: any) => {
        console.error(error);
        this.applicationService.loading = false;
        this.alert.msg = 'Something went wrong, please try again';
        this.alert.type = 'danger';
        this.loading = '';
        this.alertService.danger(this.alert.msg);
      });
  }
}
