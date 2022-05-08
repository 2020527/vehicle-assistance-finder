import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  public loading = false;
  constructor() { }

  isAuthenticated(): string {
    return localStorage.getItem('VEHICLE_AUTH_TOKEN') || '';
  }

  setToken(token: string) {
    localStorage.setItem('VEHICLE_AUTH_TOKEN', token);
  }

  logout() {
    localStorage.removeItem('VEHICLE_AUTH_TOKEN');
    this.currentUser$.next(null);
  }
}
