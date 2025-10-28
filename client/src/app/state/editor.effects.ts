import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EditorActions from './editor.actions';
import { AiService } from '../core/services/ai.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class EditorEffects {
  generate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditorActions.requestEdit),
      mergeMap(({ prompt, contextHtml }) =>
        this.ai.generateEdit(prompt, contextHtml).pipe(
          map(result => EditorActions.editSuccess({ result })),
          catchError(error => of(EditorActions.editFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private ai: AiService) {}
}

