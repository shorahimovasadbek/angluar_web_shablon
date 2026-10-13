import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideLucideConfig } from '@lucide/angular';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { Auth } from '@core/auth/auth';
import { DEFAULT_LANG, Lang } from '@core/i18n/lang';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([apiInterceptor, errorInterceptor])),
    provideLucideConfig({ size: 20, strokeWidth: 1.75 }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
      fallbackLang: DEFAULT_LANG,
    }),
    provideAppInitializer(async () => {
      const auth = inject(Auth);
      auth.restore();
      await inject(Lang).restore();
      if (auth.isAuthed()) void auth.refreshMe().catch(() => undefined);
    }),
  ],
}).catch((e: unknown) => console.error(e));
