import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import Swal from 'sweetalert2';
import actions from '../../store/actions/images.actions';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  public images: any[] = [];
  public form!: FormGroup;
  public imageSelected!: string | ArrayBuffer | null;
  public loaded: boolean = false;
  public error: any;
  get imageInvalid(): boolean | undefined {
    return this.form.get('image')?.invalid && this.form.get('image')?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    private store: Store<AppState>
  ) {
    this.createForm();
    this.getImages();
  }

  extractImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.value.link = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.form.value.link);
    }
  }

  save() {
    if (this.form.invalid) {
      return this.validateForm();
    }

    const image = {
      ...this.form.value,
      typeImage: 'CLIENTS',
      createdAt: new Date(),
    };

    this.store.dispatch(actions.ADD_IMAGE({ payload: image }));
    this.closeModal();
  }

  openModal(): void {
    this.element.nativeElement
      .querySelector('.modal__container')
      .classList.add('modal__container--active');
  }

  closeModal(): void {
    this.element.nativeElement
      .querySelector('.modal__container')
      .classList.remove('modal__container--active');
    this.resetForm();
  }

  handleDeleteClient(id: string): void {
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
        this.deleteClient(id);
      }
    });
  }

  private deleteClient(id: any): void {
    this.store.dispatch(actions.DELETE_IMAGE({ payload: id }));
  }

  private createForm(): void {
    this.form = this.fb.group({ link: ['', Validators.required] });
  }

  private resetForm(): void {
    this.imageSelected = null;
    this.form.reset({ link: '' });
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

  private getImages(): void {
    this.store.dispatch(actions.LOAD_IMAGES());

    this.store.select('images').subscribe(({ images, loaded, error }) => {
      this.images = images;

      this.loaded = loaded;
      this.error = error;
    });
  }
}
