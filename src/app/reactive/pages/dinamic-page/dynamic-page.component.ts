import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  // Crear una instancia de FormGroup sin FormBuilder (comentada)
  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // });

  // Crear instancia de FormGroup usando FormBuilder
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  // Crear un FormControl para el nuevo favorito
  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  // Getter para acceder al FormArray 'favoriteGames'
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // Verificar si un campo específico es válido
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  // Verificar si un campo en un FormArray es válido
  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  // Obtener mensaje de error para un campo específico
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }

    return null;
  }

  // Agregar un nuevo favorito a la lista
  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // Agregar un nuevo FormControl al FormArray (comentado sin FormBuilder)
    // this.favoriteGames.push(new FormControl(newGame, Validators.required));

    // Agregar un nuevo FormControl al FormArray usando FormBuilder
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    // Reiniciar el FormControl del nuevo favorito
    this.newFavorite.reset();
  }

  // Eliminar un favorito de la lista por índice
  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  // Manejar la acción de enviar el formulario
  onSubmit(): void {
    // Verificar si el formulario es inválido
    if (this.myForm.invalid) {
      // Marcar todos los campos como tocados para mostrar mensajes de error
      this.myForm.markAllAsTouched();
      return;
    }

    // Imprimir los valores del formulario en la consola
    console.log(this.myForm.value);

    // Limpiar el FormArray 'favoriteGames' utilizando FormBuilder
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);

    // Reiniciar el formulario
    this.myForm.reset();
  }
}
