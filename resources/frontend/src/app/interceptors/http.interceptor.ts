import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from '../services/application.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private applicationService: ApplicationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.applicationService.isAuthenticated() || '';
    if (token) {
      // if the token is  stored in localstorage add it to http header
      const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
      //clone http to the custom AuthRequest and send it to the server 
      const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest)
    } else {
      return next.handle(request);
    }
  }
}
