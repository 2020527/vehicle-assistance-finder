import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-add-mechanic',
  templateUrl: './add-mechanic.component.html',
  styleUrls: ['./add-mechanic.component.scss']
})
export class AddMechanicComponent implements OnInit {
  modalRef?: BsModalRef;
  public response: any;
  public user: any;
  @ViewChild('template') template: any;
  public form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    pinCode: new FormControl(null, Validators.required),
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
    private modalService: BsModalService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.applicationService.currentUser$.subscribe(user => this.user = user);
  }

  readFile(event: any) {
    if (event.target.files?.length) {
      let formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.httpClient.post(`${environment.API}/images`, formData)
        .subscribe((response: any) => {
          console.log(response);
          this.form.patchValue({ image: response.path });
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

    this.form.patchValue({created_by: this.user?.id});

    this.httpClient.post(
      `${environment.API}/garages`,
      this.form.value
    ).subscribe((response: any) => {
      console.log(response);
      this.response = response;
      this.modalService.show(this.template);
      this.router.navigate(['/mechanics']);
    }, (error: any) => {
      console.log(error);
    });
  }
}
