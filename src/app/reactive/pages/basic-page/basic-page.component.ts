import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  // myForm: FormGroup= new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null {
    console.log('field: ', field);
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  // Función para obtener mensajes de error de un campo específico
  getFieldError(field: string): string | null {
    // Verifica si el campo existe en el formulario
    if (!this.myForm.controls[field]) return null;

    // Obtiene los errores del campo o un objeto vacío si no hay errores
    const errors = this.myForm.controls[field].errors || {};
    console.log('Errores ', Object.keys(errors));

    // Itera sobre cada tipo de error en el campo
    for (const key of Object.keys(errors)) {
      // Evalúa el tipo de error y devuelve un mensaje correspondiente
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          // Devuelve un mensaje con la longitud mínima requerida
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    // Si no hay errores conocidos, devuelve null
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      // this.myForm.markAllAsTouched();: Si el formulario es inválido, marca todos los campos como "touched".
      // Esto significa que se considerarán "tocados" o interactuados por el usuario,
      // lo que activará la visualización de mensajes de error,
      // si los hay, en los campos.
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
