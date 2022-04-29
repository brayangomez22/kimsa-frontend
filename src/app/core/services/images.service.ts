import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESOURCE_URL } from '../constants/RESOURCE_URL';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: GeneralService) {}

  create(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.images;
    const request = new FormData();

    request.append('link', body.payload.link);
    request.append('typeImage', body.payload.typeImage);
    request.append('createdAt', body.payload.createdAt);

    return this.http.postFile(url, request);
  }

  get(): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.images;
    return this.http.get(url);
  }

  delete(id: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.deleteImage(id);
    return this.http.delete(url);
  }
}
