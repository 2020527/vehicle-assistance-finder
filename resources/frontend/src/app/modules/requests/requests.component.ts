import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  public imageUrl = environment.API.replace('/public/api', '');
  public requestDetails: any;
  public requests: any[] = [];
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.httpClient.get(
      `${environment.API}/requests`
    ).subscribe((response: any) => {
      console.log(response);
      this.requests = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  receiveRequestDetails(request: any) {
    this.requestDetails = null;

    if (request) {
      const requestIndex = this.requests.findIndex(item => item.id === request.id);
      if (requestIndex > -1) {
        this.requests[requestIndex] = request;
      }
    }
  }

  deleteDialog(item: any) {
    this.httpClient.post(
      `${environment.API}/requests/delete/${item.id}`,
      {}
    ).subscribe((response: any) => {
      console.log(response);
      this.alertService.success('Request has been deleted successfully!');
      this.getRequests();
    }, (error: any) => {
      console.error(error);
      this.alertService.danger('Something went wrong while deleting');
    });
  }
}
