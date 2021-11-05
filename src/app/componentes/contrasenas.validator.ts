import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarQueSeanIguales: ValidatorFn =  (control: ValidationErrors   ) : ValidationErrors | null =>{
  const pass = control.get('pass');
  const confirmpass = control.get('confirmpass');

  return pass!.value === confirmpass!.value ? null : { 'noSonIguales': true };
};