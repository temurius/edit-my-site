import { createAction, props } from '@ngrx/store';
import { DiffResult } from '../core/services/ai.service';

export const requestEdit = createAction('[Editor] Request Edit', props<{ prompt: string; contextHtml: string }>());
export const editSuccess = createAction('[Editor] Edit Success', props<{ result: DiffResult }>());
export const editFailure = createAction('[Editor] Edit Failure', props<{ error: any }>());

