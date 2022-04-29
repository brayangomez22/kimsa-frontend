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
    request.append('image', body.image);
    request.append('rolSpanish', body.rolSpanish);
    request.append('rolEnglish', body.rolEnglish);
    request.append('descriptionSpanish', body.descriptionSpanish);
    request.append('descriptionEnglish', body.descriptionEnglish);
    request.append('socialsNetworks', body.socialsNetworks);
    request.append('createdAt', body.createdAt);

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
