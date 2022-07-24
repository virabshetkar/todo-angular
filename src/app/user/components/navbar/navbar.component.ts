import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() title?: string = 'PoCApp';

  constructor(private auth: AngularFireAuth, private router: Router) {}

  user$ = this.auth.user;
  ngOnInit(): void {}
  signOut() {
    this.auth.signOut().then(() => this.router.navigate(['login']));
  }
}
