import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
    roles: new FormControl([], [Validators.required]),//new FormBuilder().array([new FormControl('')])
  });

  get fullname(): AbstractControl {
    return this.userForm.get('fullname')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  // set roles(role) {
  //   console.log('set role',role)
  //   this.userForm.setValue(role);
  //   console.log('user form',this.userForm)
  // }
  get roles(): AbstractControl {
    return this.userForm.get('roles')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { fullname, email, password, repeatPassword, roles } = this.userForm.getRawValue();
    console.log('passou do tipo usuario',{ fullname:fullname, email:email, password:password, repeatPassword:repeatPassword, roles:roles })
    this.authService.register(fullname, email, password, repeatPassword, roles).subscribe(data => {
      this.router.navigate(['/auth/login']);
    });
  }

  // adicionarTipo(event:any){
  //   console.log('passou do tipo usuario',event)
  // }
}
