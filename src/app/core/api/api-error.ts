import { HttpErrorResponse } from '@angular/common/http';
import type { FieldTree, ValidationError } from '@angular/forms/signals';
import type { AppLang } from '@core/i18n/lang';

/** Backend xato javobining kutilgan shakli */
interface ErrorBody {
  message?: string | Partial<Record<AppLang, string>>;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fields: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const FALLBACK: Record<AppLang, { offline: string; server: string }> = {
  ru: { offline: 'Нет соединения с интернетом', server: 'Ошибка сервера' },
  uz: { offline: 'Internet aloqasi yoʻq', server: 'Server xatosi' },
};

export function toApiError(e: HttpErrorResponse, lang: AppLang): ApiError {
  if (e.status === 0) return new ApiError(0, FALLBACK[lang].offline);

  const body = (e.error ?? {}) as ErrorBody;
  const msg = typeof body.message === 'string' ? body.message : body.message?.[lang];
  return new ApiError(e.status, msg ?? FALLBACK[lang].server, body.errors ?? {});
}

/** Server xatosini signal-form maydoniga bog'laydi (submission.action ichida qaytariladi) */
export function toFieldError(e: unknown, field: FieldTree<unknown>): ValidationError.WithOptionalFieldTree {
  const message = e instanceof ApiError ? e.message : 'common.error';
  return { kind: 'server', message, fieldTree: field };
}
