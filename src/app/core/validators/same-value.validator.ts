import { FormGroup } from '@angular/forms';

export function SameValueValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ sameValueValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function NotSameValueValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors) {
      return;
    }
    if (control.value === matchingControl.value) {
      matchingControl.setErrors({ notSameValueValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
