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

    let hasInfo = null;

    if (body.hasInfo !== '') {
      hasInfo = body.hasInfo;
    } else {
      hasInfo = null;
    }

    request.append('titleSpanish', body.titleSpanish);
    request.append('titleEnglish', body.titleEnglish);
    request.append('entitySpanish', body.entitySpanish);
    request.append('entityEnglish', body.entityEnglish);
    request.append('descriptionSpanish', body.descriptionSpanish);
    request.append('descriptionEnglish', body.descriptionEnglish);
    request.append('hasInfo', hasInfo);
    request.append('image', body.image);

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

  editProject(id: any, project: Project): Observable<any> {
    const url = environment.apiUrl + RESOURCE_URL.editProject(id);
    return this.http.edit(url, project);
  }
}
