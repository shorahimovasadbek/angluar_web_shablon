import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { toApiError } from '@core/api/api-error';
import { Auth } from '@core/auth/auth';
import { Lang } from '@core/i18n/lang';

/** HTTP xatolarni ApiError ga aylantiradi; 401 da tokenni yangilab so'rovni qayta yuboradi */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) return next(req);

  const auth = inject(Auth);
  const lang = inject(Lang);
  const fail = (e: unknown) =>
    throwError(() => (e instanceof HttpErrorResponse ? toApiError(e, lang.current()) : e));

  return next(req).pipe(
    catchError((e: unknown) => {
      const canRefresh =
        e instanceof HttpErrorResponse && e.status === 401 && auth.isAuthed() && !auth.isRefreshUrl(req.url);
      if (!canRefresh) return fail(e);

      return from(auth.refresh()).pipe(
        switchMap((token) =>
          token ? next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(catchError(fail)) : fail(e),
        ),
      );
    }),
  );
};
