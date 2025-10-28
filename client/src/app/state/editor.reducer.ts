import { createReducer, on } from '@ngrx/store';
import * as EditorActions from './editor.actions';
import { DiffResult } from '../core/services/ai.service';

export interface EditorState {
  loading: boolean;
  result?: DiffResult;
  error?: any;
}

export const initialState: EditorState = {
  loading: false
};

export const editorReducer = createReducer(
  initialState,
  on(EditorActions.requestEdit, state => ({ ...state, loading: true, error: undefined })),
  on(EditorActions.editSuccess, (state, { result }) => ({ ...state, loading: false, result })),
  on(EditorActions.editFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

