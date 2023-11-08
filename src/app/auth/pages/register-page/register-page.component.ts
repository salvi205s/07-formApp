import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validators.service';
// import * as customValidators from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  // Creación de un formulario reactivo utilizando el FormBuilder de Angular.
  public myForm: FormGroup = this.fb.group({
    // Campo 'name' con validadores de requerido y patrón (firstNameAndLastnamePattern).
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],

    // Campo 'email' con validadores de requerido, patrón (emailPattern) y validador personalizado (emailValidator).
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],

    // Campo 'username' con validadores de requerido y validador personalizado (cantBeStrider).
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],

    // Campo 'password' con validadores de requerido y longitud mínima de 6 caracteres.
    password: ['', [Validators.required, Validators.minLength(6)]],

    // Campo 'password2' con validador de requerido.
    password2: ['', [Validators.required]],
  }, {
    // Validadores adicionales que operan sobre el formulario completo.
    validators: [
      // Validador personalizado que verifica si los campos 'password' y 'password2' son iguales.
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  // Constructor que recibe instancias de FormBuilder, ValidatorsService y EmailValidator.
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  // Método que verifica si un campo específico del formulario es válido.
  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  // Método invocado al enviar el formulario, marca todos los campos como tocados.
  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
