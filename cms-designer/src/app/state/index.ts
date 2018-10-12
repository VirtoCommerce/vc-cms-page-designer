import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from './root.reducer';

export interface State {
    root: fromRoot.RootState;
}

const getRootFeatureState = createFeatureSelector<fromRoot.RootState>('root');

export const getLoading = createSelector(
    getRootFeatureState,
    state => state.loading
);

