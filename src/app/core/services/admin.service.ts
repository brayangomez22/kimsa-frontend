import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESOURCE_URL } from '../constants/RESOURCE_URL';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: GeneralService) {}

  createAdmin(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.createAdmin;
    return this.http.post(url, body);
  }

  loginAdmin(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.loginAdmin;
    return this.http.post(url, body);
  }

  isLogged() { return localStorage.getItem('CURRENT_ADMIN') != null; }
}
