import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { toFieldError } from '@core/api/api-error';
import { Auth } from '@core/auth/auth';
import { LANGS, Lang } from '@core/i18n/lang';
import { UiButton } from '@shared/ui/ui-button/ui-button';
import { UiInput } from '@shared/ui/ui-input/ui-input';

interface LoginModel {
  phone: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [FormRoot, FormField, UiInput, UiButton, TranslatePipe],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  protected readonly lang = inject(Lang);
  protected readonly langs = LANGS;

  private readonly model = signal<LoginModel>({ phone: '', password: '' });

  protected readonly f = form(
    this.model,
    (p) => {
      required(p.phone, { message: 'auth.err.phone' });
      minLength(p.phone, 9, { message: 'auth.err.phone' });
      required(p.password, { message: 'auth.err.pw_short' });
      minLength(p.password, 6, { message: 'auth.err.pw_short' });
    },
    {
      submission: {
        action: async (f) => {
          const { phone, password } = f().value();
          try {
            await this.auth.login({ phone: '998' + phone, password });
          } catch (e) {
            return toFieldError(e, f.password);
          }
          await this.router.navigateByUrl('/home', { replaceUrl: true });
          return undefined;
        },
      },
    },
  );
}
