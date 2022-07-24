import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss'],
})
export class EmailverificationComponent implements OnInit {
  email$ = this.auth.user.pipe(map((user) => user?.email));

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  goBack() {
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }
}
