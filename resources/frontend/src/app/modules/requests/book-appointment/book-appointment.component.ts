import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  @Input() garageDetails: any;
  @Input() requestDetails: any;

  @Output() bookEmitter = new EventEmitter();
  @Output() requestEmitter = new EventEmitter();
  public form = new FormGroup({
    requested_address: new FormControl(null, Validators.required),
    requested_pincode: new FormControl(null, Validators.required),
    repair_for: new FormControl(null, Validators.required),
    requested_date: new FormControl(null, Validators.required)
  });

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.requestDetails) {
      this.form.patchValue(this.requestDetails);
      this.form.patchValue({ requested_date: new Date(this.requestDetails.requested_date) });
    }
  }

  submit() {
    const data = this.form.value;
    data.garage_id = this.garageDetails.id;

    const url = this.requestDetails ? `${environment.API}/requests/update/${this.requestDetails.id}` : `${environment.API}/requests`;

    this.httpClient.post(
      url,
      data
    ).subscribe((response: any) => {
      console.log(response);
      this.bookEmitter.emit(null);
      this.requestEmitter.emit(response);
      this.router.navigate(['/requests']);
      this.alertService.success(this.requestDetails ? 'Request has been Updated Successfully' : 'Request Created Successfully');
    }, (error: any) => {
      console.error(error);
      this.alertService.danger('Something went wrong, please try again!');
    });
  }
}
