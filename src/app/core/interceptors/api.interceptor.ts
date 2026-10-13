import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { Auth } from '@core/auth/auth';
import { Lang } from '@core/i18n/lang';

/** Faqat o'z API'mizga: token, til va Accept header'larini qo'shadi */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(environment.apiUrl)) return next(req);

  const token = inject(Auth).token();
  return next(
    req.clone({
      setHeaders: {
        Accept: 'application/json',
        'Accept-Language': inject(Lang).current(),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }),
  );
};
