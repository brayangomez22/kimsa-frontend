import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import Swal from 'sweetalert2';
import actions from '../../store/actions/allieds.actions';

@Component({
  selector: 'app-allieds',
  templateUrl: './allieds.component.html',
  styleUrls: ['./allieds.component.scss']
})
export class AlliedsComponent {
  public allieds: any[] = [];
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
    this.getAllieds();
  }

  extractImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.value.image = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.form.value.image);
    }
  }

  save() {
    if (this.form.invalid) {
      return this.validateForm();
    }

    this.store.dispatch(actions.ADD_ALLIED(this.form.value));
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

  handleDeleteAllied(id: string): void {
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
        this.deleteAllied(id);
      }
    });
  }

  private deleteAllied(id: any): void {
    this.store.dispatch(actions.DELETE_ALLIED({ payload: id }));
  }

  private createForm(): void {
    this.form = this.fb.group({ image: ['', Validators.required] });
  }

  private resetForm(): void {
    this.imageSelected = null;
    this.form.reset({ image: '' });
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

  private getAllieds(): void {
    this.store.dispatch(actions.LOAD_ALLIEDS());

    this.store.select('allieds').subscribe(({ allieds, loaded, error }) => {      
      this.allieds = allieds;

      this.loaded = loaded;
      this.error = error;
    });
  }
}
