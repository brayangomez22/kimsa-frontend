import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import Swal from 'sweetalert2';
import actions from '../../store/actions/clients.actions';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  public clients: any[] = [];
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
    this.getClients();
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

    this.store.dispatch(actions.ADD_CLIENT(this.form.value));
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
    this.store.dispatch(actions.DELETE_CLIENT({ payload: id }));
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

  private getClients(): void {
    this.store.dispatch(actions.LOAD_CLIENTS());

    this.store.select('clients').subscribe(({ clients, loaded, error }) => {      
      this.clients = clients;

      this.loaded = loaded;
      this.error = error;
    });
  }
}
