import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  sub?: Subscription;
  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {}

  goBack() {
    const { selectRouteParams } = getSelectors();
    const params$ = this.store.select(selectRouteParams);
    this.sub = params$.subscribe((params) => {
      this.router.navigate([params['back']]);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
