import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './user.reducers';

import { UserEffects } from './user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserStoreModule {}
