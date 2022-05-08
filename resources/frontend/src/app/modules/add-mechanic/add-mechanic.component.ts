import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { AlertService } from '@full-fledged/alerts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-mechanic',
  templateUrl: './add-mechanic.component.html',
  styleUrls: ['./add-mechanic.component.scss']
})
export class AddMechanicComponent implements OnInit {
  public response: any;
  public user: any;
  public id = '';
  public details: any;
  public imageUrl = environment.API.replace('/public/api', '');
  public form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pincode: new FormControl(null, Validators.required),
    rating: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    visiting_charges: new FormControl(null, Validators.required),
    experience_in: new FormControl(null, Validators.required),
    photo: new FormControl(null),
    image: new FormControl(null, Validators.required),
    created_by: new FormControl(null)
  });
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private applicationService: ApplicationService,
    private alertService: AlertService,
    private location: Location
  ) {
    this.activedRoute.params.subscribe(param => {
      this.id = param.id;
      if (this.id) {
        this.getMechanicDetails(this.id);
      }
    });
  }

  ngOnInit(): void {
    this.applicationService.currentUser$.subscribe(user => this.user = user);
  }

  readFile(event: any) {
    this.details = {};
    if (event.target.files?.length) {
      let formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.httpClient.post(`${environment.API}/images`, formData)
        .subscribe((response: any) => {
          console.log(response);
          this.form.patchValue({ image: response.path });
          this.details = {image: response.path};
          event.target.value = '';
        }, (error: any) => {
          console.log(error);
        });
    }
  }

  submit() {
    if (this.form.invalid) {

      return;
    }

    this.applicationService.loading = true;
    this.form.patchValue({ created_by: this.user?.id });
    const url = this.id ? `${environment.API}/garages/update/${this.id}` : `${environment.API}/garages`;
    this.httpClient.post(
      url,
      this.form.value
    ).subscribe((response: any) => {
      console.log(response);
      this.applicationService.loading = false;
      this.response = response;
      this.router.navigate(['/mechanics']);
      this.alertService.success(`Garage has been ${this.id ? 'updated ': 'added '} successfully`);
    }, (error: any) => {
      console.log(error);
      this.applicationService.loading = false;
    });
  }

  getMechanicDetails(id: string) {
    this.httpClient.get(
      `${environment.API}/garages/${id}`
    ).subscribe((response: any) => {
      console.log(response);
      this.details = response;
      this.form.patchValue(response);
    }, (error: any) => {
      console.log(error);
    });
  }

  goBack() {
    this.location.back();
  }
}
