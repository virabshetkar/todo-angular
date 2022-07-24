import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, mergeMap } from 'rxjs';
import { CredentialModel } from 'todo-models/models/credentials.model';
import { FirestoreCollections } from '../enums/firestore-collections.enum';
import { RegistrationModel } from '../models/registration.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}

  signInWithEmail(credential: CredentialModel) {
    return from(
      this.auth.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      mergeMap((creds) => {
        if (!creds.user) throw new Error('Unable to sign in');
        creds.user
          .getIdTokenResult()
          .then((token) => console.log(token.claims));
        return this.afs
          .collection(FirestoreCollections.USER)
          .doc<UserModel>(creds.user.uid)
          .valueChanges();
      })
    );
  }

  registerUser(user: RegistrationModel) {
    return from(
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
    ).pipe(
      mergeMap((creds) => {
        if (!creds.user) throw new Error('Unable to create user.');
        creds.user.sendEmailVerification();
        creds.user.updateProfile({
          displayName: `${user.firstName} ${user.lastName}`,
        });
        return this.afs
          .collection(FirestoreCollections.USER)
          .doc(creds.user.uid)
          .set({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
          });
      })
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
