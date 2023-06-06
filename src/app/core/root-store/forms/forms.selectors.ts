import {createSelector} from '@ngrx/store';
import * as fromForms from './forms.reducer';

export const selectForms = createSelector(
	fromForms.getFormsState,
	(formsState) => formsState
);
