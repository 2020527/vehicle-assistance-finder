import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '@full-fledged/alerts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-find-mechanic',
  templateUrl: './find-mechanic.component.html',
  styleUrls: ['./find-mechanic.component.scss']
})
export class FindMechanicComponent implements OnInit {

  public garages: any[] = [];
  public imageUrl = environment.API.replace('/public/api', '');
  modalRef?: BsModalRef;
  bsModalRef?: BsModalRef;
  public deleteGarage: any;
  public user: any;
  public bookingDetails: any;
  public filterForm = new FormGroup({
    pincode: new FormControl(null),
    address: new FormControl(null),
    garage: new FormControl(null)
  });

  constructor(
    public applicationService: ApplicationService,
    private httpClient: HttpClient,
    public modalService: BsModalService,
    private alertService: AlertService
  ) {
    this.applicationService.currentUser$.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.getGarages();
  }

  submit() {
    let httpParams = new HttpParams();
    Object.keys(this.filterForm.value).forEach((key: string) => {
      if (this.filterForm.value[key]) {
        httpParams = httpParams.append(key, this.filterForm.value[key]);
      }
    });
    this.getGarages(httpParams);
  }

  getGarages(params: HttpParams = new HttpParams()) {
    this.applicationService.loading = true;
    this.httpClient.get(
      `${environment.API}/garages`,
      { params }
    ).subscribe((response: any) => {
      console.log(response);
      setTimeout(() => {
        this.applicationService.loading = false;
      }, 1000);
      this.garages = response;
      if (this.garages?.length) {
        this.garages?.forEach(item => {
          item.experience_in = item?.experience_in?.split(',');
        });
      }
    }, (error: any) => {
      this.applicationService.loading = false;
      console.log(error);
    });
  }

  openDeleteModal(template: any, item: any) {
    this.deleteGarage = item;
    this.modalRef = this.modalService.show(template);
  }

  confirmDelete() {
    this.httpClient.post(
      `${environment.API}/garages/delete/${this.deleteGarage.id}`,
      this.deleteGarage
    ).subscribe((response: any) => {
      console.log(response);
      this.alertService.success('Garage Deleted Successfully');
      this.modalRef?.hide();
      this.getGarages();
    }, (error: any) => {
      console.error(error);
    });
  }

  openBookingModal(item: any) {
    this.bookingDetails = item;
  }
}
