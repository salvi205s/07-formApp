import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  // Crear instancia de FormGroup usando FormBuilder
  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, [Validators.requiredTrue]],
    termsAndConditions: [true, [Validators.requiredTrue]],
  });

  // Objeto que contiene información sobre una persona
  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Reiniciar el formulario con los valores iniciales de 'person'
    this.myForm.reset(this.person);
  }

  // Verificar si un campo específico es válido
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  // Método para guardar los datos cuando se presiona el botón "Guardar"
  onSave() {
    // Verificar si el formulario es inválido
    if (this.myForm.invalid) {
      // Marcar todos los campos como tocados para mostrar mensajes de error
      this.myForm.markAllAsTouched();
      return;
    }

    // Extraer la propiedad 'termsAndConditions' y crear un nuevo objeto 'newPerson'
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    // Actualizar la propiedad 'person' con los nuevos valores
    this.person = newPerson;

    // Imprimir los valores del formulario y la propiedad 'person' en la consola
    console.log(this.myForm.value);
    console.log('newPerson: ', this.person);
  }
}
