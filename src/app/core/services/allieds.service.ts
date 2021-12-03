import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESOURCE_URL } from '../constants/RESOURCE_URL';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class AlliedsService {

  constructor(private http: GeneralService) { }

  create(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.allieds;
    const request = new FormData();

    request.append('image', body.image);

    return this.http.postFile(url, request);
  }

  get(): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.allieds;
    return this.http.get(url);
  }

  delete(id: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.deleteAllied(id);
    return this.http.delete(url);
  }
}
