import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESOURCE_URL } from '../constants/RESOURCE_URL';
import { GeneralService } from './general.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: GeneralService) {}

  createProject(body: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.createProject;
    const request = new FormData();

    request.append('titleSpanish', body.titleSpanish);
    request.append('titleEnglish', body.titleEnglish);
    request.append('entitySpanish', body.entitySpanish);
    request.append('entityEnglish', body.entityEnglish);
    request.append('descriptionSpanish', body.descriptionSpanish);
    request.append('descriptionEnglish', body.descriptionEnglish);

    if (body.additionalInformation) {
      request.append('additionalInformation', body.additionalInformation);
    }

    request.append('image', body.image);
    request.append('createdAt', body.createdAt);

    return this.http.postFile(url, request);
  }

  getProjects(): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.getAllProjects;
    return this.http.get(url);
  }

  deleteProject(id: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.deleteProject(id);
    return this.http.delete(url);
  }

  editProject(id: any, project: any): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.editProject(id);
    const request = new FormData();

    request.append('titleSpanish', project?.titleSpanish);
    request.append('titleEnglish', project?.titleEnglish);
    request.append('entitySpanish', project?.entitySpanish);
    request.append('entityEnglish', project?.entityEnglish);
    request.append('descriptionSpanish', project?.descriptionSpanish);
    request.append('descriptionEnglish', project?.descriptionEnglish);

    if (project?.additionalInformation) {
      request.append('additionalInformation', project?.additionalInformation);
    }

    request.append('image', project?.image);
    return this.http.editFile(url, request);
  }
}
