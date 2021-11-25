import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as actions from '../../store/actions/partners.actions';

import Swal from 'sweetalert2';
import { Partner } from '../../core/models/partner.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  public partners: any[] = [];
  public loaded: boolean = false;
  public error: any;
  public form!: FormGroup;
  public imageSelected!: string | ArrayBuffer | null;
  public isEditModeEnabled: boolean = false;
  public currentPartnerToEdit!: Partner;

  get firstNameNoValid(): boolean | undefined {
    return (
      this.form.get('firstName')?.invalid && this.form.get('firstName')?.touched
    );
  }

  get lastNameNoValid(): boolean | undefined {
    return (
      this.form.get('lastName')?.invalid && this.form.get('lastName')?.touched
    );
  }

  get rolNoValid(): boolean | undefined {
    return this.form.get('rol')?.invalid && this.form.get('rol')?.touched;
  }

  get descriptionNoValid(): boolean | undefined {
    return (
      this.form.get('description')?.invalid &&
      this.form.get('description')?.touched
    );
  }

  get photoInvalid(): boolean | undefined {
    return this.form.get('photo')?.invalid && this.form.get('photo')?.touched;
  }

  get imageInvalid(): boolean | undefined {
    return this.form.get('photo')?.invalid && this.form.get('photo')?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    private store: Store<AppState>
  ) {
    this.createForm();
    this.getPartners();
  }

  private getPartners(): void {
    this.store.dispatch(actions.LOAD_PARTNERS());

    this.store.select('partners').subscribe(({ partners, loaded, error }) => {
      this.partners = partners;
      this.loaded = loaded;
      this.error = error;
    });
  }

  addPartner(): void {
    this.openModal();
    this.isEditModeEnabled = false;
  }

  saveNewPartner() {
    if (this.form.invalid) {
      return this.validateForm();
    }

    const socialsNetworks = [
      {
        name: 'facebook',
        url: this.form.value.firtsRedSocial,
      },
      {
        name: 'instagram',
        url: this.form.value.secondRedSocial,
      },
      {
        name: 'linkedin',
        url: this.form.value.thirdRedSocial,
      },
    ];

    const partner = {
      ...this.form.value,
      socialsNetworks: JSON.stringify(socialsNetworks),
    };

    delete partner.firtsRedSocial;
    delete partner.secondRedSocial;
    delete partner.thirdRedSocial;

    this.store.dispatch(actions.ADD_PARTNER(partner));
    this.resetForm();
    this.closeModal();
  }

  extractImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.form.value.photo = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.form.value.photo);
    }
  }

  public handleDeletePartner(id: any): void {
    Swal.fire({
      title: 'Estas segur@',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePartner(id);
      }
    });
  }

  public deletePartner(id: any): void {
    this.store.dispatch(actions.DELETE_PARTNER({ payload: id }));
  }

  editPartner(partner: Partner): void {
    this.currentPartnerToEdit = partner;

    this.openModal();
    this.isEditModeEnabled = true;
    this.createEditedForm(partner);
  }

  createEditedForm(partner: any): void {
    this.form.reset({
      id: partner._id,
      firstName: partner.firstName,
      lastName: partner.lastName,
      rol: partner.rol,
      description: partner.description,
      firtsRedSocial: partner.socialsNetworks[0].url || '',
      secondRedSocial: partner.socialsNetworks[1].url || '',
      thirdRedSocial: partner.socialsNetworks[2].url || '',
      photo: '',
    });
  }

  saveNewEditedPartner(): void {
    const partner = this.form.value;

    const socialsNetworks = [
      {
        name: 'facebook',
        url: partner.firtsRedSocial,
      },
      {
        name: 'instagram',
        url: partner.secondRedSocial,
      },
      {
        name: 'linkedin',
        url: partner.thirdRedSocial,
      },
    ];

    const partnerEdited = {
      ...partner,
      socialsNetworks: JSON.stringify(socialsNetworks),
      photo: this.currentPartnerToEdit.photo,
    };

    delete partnerEdited.firtsRedSocial;
    delete partnerEdited.secondRedSocial;
    delete partnerEdited.thirdRedSocial;

    this.store.dispatch(actions.UPDATE_PARTNER({ partner: partnerEdited }));
    this.resetForm();
    this.closeModal();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rol: ['', Validators.required],
      description: ['', Validators.required],
      firtsRedSocial: [''],
      secondRedSocial: [''],
      thirdRedSocial: [''],
      photo: ['', Validators.required],
    });
  }

  private resetForm(): void {
    this.imageSelected = null;
    this.form.reset({
      firstName: '',
      lastName: '',
      rol: '',
      description: '',
      firtsRedSocial: '',
      secondRedSocial: '',
      thirdRedSocial: '',
      photo: '',
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
