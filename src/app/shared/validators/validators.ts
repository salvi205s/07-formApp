import { FormControl, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

// Definición de una función de validación personalizada que verifica si el valor del control es 'strider'.
export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

  // Obtener el valor del control, quitar espacios en blanco al principio y al final, y convertir a minúsculas.
  const value: string = control.value.trim().toLowerCase();

  // Verificar si el valor es igual a 'strider'.
  if (value === 'strider') {
    // Si es igual, devolver un objeto con un error personalizado (noStrider).
    return {
      noStrider: true,
    };
  }

  // Si no es igual, devolver null, indicando que la validación ha pasado con éxito.
  return null;
};
