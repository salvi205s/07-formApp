import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  // Definición de patrón para validar nombres y apellidos.
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  // Definición de patrón para validar correos electrónicos.
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // Función de validación personalizada que verifica si el valor es igual a 'strider'.
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  // Función que verifica si un campo específico del formulario tiene errores y ha sido tocado.
  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  // Función de validación personalizada que verifica si dos campos en el formulario son iguales.
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // Obtener los valores de los dos campos.
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // Verificar si los valores son diferentes y establecer errores en el campo2 si es así.
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      // Si los valores son iguales, eliminar los errores en el campo2.
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
