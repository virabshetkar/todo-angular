import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseErrorHandlerService {
  constructor() {}

  getErrorMessage(error: any) {
    if (!error) return undefined;
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/user-not-found') {
        return 'Email not registered';
      } else if (error.code === 'auth/wrong-password') {
        return 'Password is incorrect';
      } else if (error.code === 'auth/too-many-requests') {
        return 'You have many failed login attempts';
      } else if (error.code === 'auth/email-already-in-use') {
        return 'Email is already registered';
      }
    }
    return 'Something went seriously wrong';
  }
}
