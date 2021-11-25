import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form!: FormGroup;

  get emailInvalid(): boolean | undefined {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordInvalid(): boolean | undefined {
    return (
      this.form.get('password')?.invalid && this.form.get('password')?.touched
    );
  }

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.createForm();
  }

  save(): void {
    if (this.form.invalid) {
      return this.validateForm();
    }

    this.adminService.loginAdmin(this.form.value).subscribe(
      (response) => {
        const userLogged = response?.adminLogged;

        this.userLoggedSuccess(JSON.stringify(userLogged));
      },
      (err) =>
        this.showErrorModal(
          'El usuario con el que trataste de ingresar no se encuentra registrado...'
        )
    );
  }

  private createForm(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  private resetForm(): void {
    this.form.reset({ password: '', email: '' });
  }

  private showErrorModal(title: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    }).fire({ icon: 'error', title });
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

  private userLoggedSuccess(userLogged: string): void {
    localStorage.setItem('CURRENT_ADMIN', userLogged);
    this.router.navigateByUrl('/projects');
    this.resetForm();
  }
}
