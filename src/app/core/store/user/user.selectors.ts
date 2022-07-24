import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreCollection } from '../../enums/store-collections.enum';
import { State } from '../../models/state.model';
import { UserModel } from '../../models/user.model';

export const userSelector = createFeatureSelector<State<UserModel>>(
  StoreCollection.USER
);

export const userLoadingSelector = createSelector(
  userSelector,
  (state) => state.isLoading
);
