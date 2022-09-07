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

  constructor(
    private fb: FormBuilder,
    private element: ElementRef,
    private store: Store<AppState>
  ) {
    this.createForm();
    this.getPartners();
  }

  public invalidField(field: string): boolean {
    if (this.form.get(field)?.invalid && this.form.get(field)?.touched) {
      return true;
    } else {
      return false;
    }
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
      createdAt: new Date(),
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
      this.form.value.image = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.form.value.image);
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
      rolSpanish: partner.rolSpanish,
      rolEnglish: partner.rolEnglish,
      descriptionSpanish: partner.descriptionSpanish,
      descriptionEnglish: partner.descriptionEnglish,
      firtsRedSocial: partner.socialsNetworks[0].url || '',
      secondRedSocial: partner.socialsNetworks[1].url || '',
      thirdRedSocial: partner.socialsNetworks[2].url || '',
      image: '',
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
      image: partner.image ? partner.image : this.currentPartnerToEdit.image,
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
      rolSpanish: ['', Validators.required],
      rolEnglish: ['', Validators.required],
      descriptionSpanish: ['', Validators.required],
      descriptionEnglish: ['', Validators.required],
      firtsRedSocial: [''],
      secondRedSocial: [''],
      thirdRedSocial: [''],
      image: ['', Validators.required],
    });
  }

  private resetForm(): void {
    this.imageSelected = null;
    this.form.reset({
      firstName: '',
      lastName: '',
      rolSpanish: '',
      rolEnglish: '',
      descriptionSpanish: '',
      descriptionEnglish: '',
      firtsRedSocial: '',
      secondRedSocial: '',
      thirdRedSocial: '',
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
