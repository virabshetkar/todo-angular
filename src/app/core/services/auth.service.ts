import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, from, map, mergeMap, switchMap } from 'rxjs';
import { CredentialModel } from '../models/credentials.model';
import { FirestoreCollections } from '../enums/firestore-collections.enum';
import { UserRegistrationModel } from '../models/registration.model';
import { UserModel } from '../models/user.model';
import { EmailAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';

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

        return this.afs
          .collection(FirestoreCollections.USER)
          .doc<UserModel>(creds.user.uid)
          .valueChanges();
      })
    );
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(this.auth.signInWithPopup(provider)).pipe(
      map((creds) => {
        if (!creds.user) throw new Error('Unable to sign in');

        const { user } = creds;

        const userdoc = this.afs
          .collection(FirestoreCollections.USER)
          .doc<UserModel>(creds.user.uid);

        return { userdoc, user };
      }),
      mergeMap(({ userdoc, user }) =>
        userdoc.get().pipe(
          mergeMap((data) => {
            if (!data.exists) {
              data.ref.set({
                firstName: user.displayName!.split(' ')[0],
                lastName: user.displayName!.split(' ')[1],
                phoneNumber: user.phoneNumber!,
                email: user.email!,
              });
            }
            return userdoc.valueChanges();
          })
        )
      )
    );
  }

  registerUser(user: UserRegistrationModel) {
    return from(
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
    ).pipe(
      mergeMap((creds) => {
        if (!creds.user) throw new Error('Unable to create user.');
        creds.user
          .updateProfile({
            displayName: `${user.firstName} ${user.lastName}`,
          })
          .then(() => creds.user!.sendEmailVerification());

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

  changePassword(oldPassword: string, newPassword: string) {
    return this.auth.user.pipe(
      first(),
      switchMap((user) => {
        if (!user) throw new Error('No User Found');
        if (!user.email) throw new Error('No Email Found');
        const credential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        return user.reauthenticateWithCredential(credential);
      }),
      map((creds) => {
        if (!creds.user) throw new Error('No User Found');
        creds.user.updatePassword(newPassword);
      })
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
