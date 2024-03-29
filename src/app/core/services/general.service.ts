import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  public headers: HttpHeaders;
  public headersFile: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.headersFile = new HttpHeaders();
  }

  get(url: string) {
    return this.http.get(url, { headers: this.headers });
  }

  post(url: string, body: any) {
    return this.http.post(url, body, { headers: this.headers });
  }

  postFile(url: string, body: any) {
    return this.http.post(url, body, { headers: this.headersFile });
  }

  delete(url: string) {
    return this.http.delete(url, { headers: this.headers });
  }

  edit(url: string, body: any) {
    return this.http.put(url, body, { headers: this.headers });
  }

  editFile(url: string, body: any) {
    return this.http.post(url, body, { headers: this.headersFile });
  }
}
