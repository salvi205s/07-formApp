import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Se usa para que el campo email no se repita
// Define la clase EmailValidator que implementa la interfaz AsyncValidator.
export class EmailValidator implements AsyncValidator {
  // Implementa el método validate de la interfaz AsyncValidator.
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    // Obtiene el valor del control (en este caso, el valor del campo de correo electrónico).
    const email = control.value;

    // Crea un Observable para simular una llamada HTTP asincrónica.
    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
        // Imprime el valor del correo electrónico en la consola.
        console.log({ email });

        // Verifica si el correo electrónico es igual a 'fernando@google.com'.
        if (email === 'fernando@google.com') {
          // Si es igual, emite un objeto de error indicando que el correo está tomado.
          subscriber.next({ emailTaken: true });

          // Completa la emisión.
          subscriber.complete();
          // Nota: En una aplicación real, aquí se haría una llamada HTTP para verificar si el correo está tomado.
          // La simulación se realiza con un delay de 3000 milisegundos (3 segundos).
        }

        // Si el correo no está tomado, emite null indicando que no hay errores.
        subscriber.next(null);
        // Completa la emisión.
        subscriber.complete();

      }).pipe(delay(3000)); // Simula un retardo de 3000 milisegundos (3 segundos).

    // Devuelve el Observable creado.
    return httpCallObservable;

     // Comentario adicional:
        // Esta es una implementación básica de la validación asincrónica para verificar si un correo electrónico está tomado.
        // En una aplicación real, esta lógica se implementaría con una llamada HTTP al servidor para verificar la disponibilidad del correo.

        // Comentario adicional (código comentado):
        // Se proporciona un bloque de código comentado que muestra cómo podría ser la implementación utilizando una llamada HTTP real.
        // Este bloque está comentado porque el código anterior simula la lógica asincrónica sin depender de una llamada HTTP real.
  }


  // validate(control: AbstractControl ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email })

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   );
// }
}

// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   // delay(3000),
//   map( resp => {
//     return ( resp.length === 0 )
//         ? null
//         : { emailTaken: true }
//   })
// );
