import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { AppStorage } from '@core/storage/app-storage';

export type AppLang = 'ru' | 'uz';
export const LANGS: readonly AppLang[] = ['ru', 'uz'];
export const DEFAULT_LANG: AppLang = 'ru';

@Injectable({ providedIn: 'root' })
export class Lang {
  private readonly translate = inject(TranslateService);
  private readonly storage = inject(AppStorage);

  private readonly _current = signal<AppLang>(DEFAULT_LANG);
  readonly current = this._current.asReadonly();

  restore(): Promise<void> {
    const saved = this.storage.get('lang');
    return this.apply(isLang(saved) ? saved : DEFAULT_LANG);
  }

  async set(lang: AppLang): Promise<void> {
    await this.apply(lang);
    this.storage.set('lang', lang);
  }

  private async apply(lang: AppLang): Promise<void> {
    this._current.set(lang);
    document.documentElement.lang = lang;
    await firstValueFrom(this.translate.use(lang));
  }
}

function isLang(v: string | null): v is AppLang {
  return LANGS.includes(v as AppLang);
}
