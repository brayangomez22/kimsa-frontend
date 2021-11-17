import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESOURCE_URL } from '../constants/RESOURCE_URL';
import { GeneralService } from './general.service';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(private http: GeneralService) {}

  createPartner(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.createPartner;
    const request = new FormData();

    request.append('firstName', body.firstName);
    request.append('lastName', body.lastName);
    request.append('photo', body.photo);
    request.append('rol', body.rol);
    request.append('description', body.description);
    request.append('socialsNetworks', body.socialsNetworks);

    return this.http.postFile(url, request);
  }

  getPartners(): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.getAllPartners;
    return this.http.get(url);
  }

  deletePartner(id: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.deletePartner(id);
    return this.http.delete(url);
  }

  editPartner(id: any, partner: Partner): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.editPartner(id);
    return this.http.edit(url, partner);
  }
}