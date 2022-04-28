import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import Swal from 'sweetalert2';

import { Project } from '../../core/models/project.model';
import * as actions from '../../store/actions/projects.actions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  public projects: any[] = [];
  public loaded: boolean = false;
  public error: any;
  public form!: FormGroup;
  public imageSelected!: string | ArrayBuffer | null;
  public isEditModeEnabled: boolean = false;
  public currentProjectToEdit!: Project;

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    private store: Store<AppState>
  ) {
    this.createForm();
    this.getProjects();
  }

  public invalidField(field: string): boolean {
    if (this.form.get(field)?.invalid && this.form.get(field)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  private getProjects(): void {
    this.store.dispatch(actions.LOAD_PROJECTS());

    this.store.select('projects').subscribe(({ projects, loaded, error }) => {
      this.projects = projects;

      this.loaded = loaded;
      this.error = error;
    });
  }

  addProject(): void {
    this.openModal();
    this.isEditModeEnabled = false;
  }

  saveNewProject() {
    if (this.form.invalid) {
      return this.validateForm();
    }

    const project = { ...this.form.value, createdAt: new Date() };

    this.store.dispatch(actions.ADD_PROJECT(project));
    this.resetForm();
    this.closeModal();
  }

  extractImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.value.image = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.form.value.image);
    }
  }

  handleDeleteProject(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProject(id);
      }
    });
  }

  private deleteProject(id: any): void {
    this.store.dispatch(actions.DELETE_PROJECT({ payload: id }));
  }

  editProject(project: Project): void {
    this.currentProjectToEdit = project;

    this.openModal();
    this.isEditModeEnabled = true;
    this.createEditedForm(project);
  }

  createEditedForm(project: any): void {
    this.form.reset({
      id: project._id,
      titleSpanish: project.titleSpanish,
      titleEnglish: project.titleEnglish,
      entitySpanish: project.entitySpanish,
      entityEnglish: project.entityEnglish,
      descriptionSpanish: project.descriptionSpanish,
      descriptionEnglish: project.descriptionEnglish,
      additionalInformation: project.additionalInformation,
      image: '',
    });
  }

  saveNewEditedProject(): void {
    const project = this.form.value;
    const projectEdited = {
      ...project,
      image: this.currentProjectToEdit.image,
    };

    this.store.dispatch(actions.UPDATE_PROJECT({ project: projectEdited }));
    this.resetForm();
    this.closeModal();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: [''],
      titleSpanish: ['', Validators.required],
      titleEnglish: ['', Validators.required],
      entitySpanish: ['', Validators.required],
      entityEnglish: ['', Validators.required],
      descriptionSpanish: ['', Validators.required],
      descriptionEnglish: ['', Validators.required],
      additionalInformation: [''],
      image: ['', Validators.required],
    });
  }

  private resetForm(): void {
    this.imageSelected = null;
    this.form.reset({
      titleSpanish: '',
      titleEnglish: '',
      entitySpanish: '',
      entityEnglish: '',
      descriptionSpanish: '',
      descriptionEnglish: '',
      additionalInformation: '',
      image: '',
    });
  }

  private validateForm(): void {
    return Object.values(this.form.controls).forEach((control) => {
      control instanceof FormGroup
        ? Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          )
        : control.markAsTouched();
    });
  }

  public openModal(): void {
    this.element.nativeElement
      .querySelector('.modal__container')
      .classList.add('modal__container--active');
  }

  public closeModal(): void {
    this.element.nativeElement
      .querySelector('.modal__container')
      .classList.remove('modal__container--active');

    this.resetForm();
  }
}
