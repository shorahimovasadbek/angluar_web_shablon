import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Auth } from '@core/auth/auth';
import { type AppLang, LANGS, Lang } from '@core/i18n/lang';
import { Toastr } from '@core/ui/toastr';
import { UiButton } from '@shared/ui/ui-button/ui-button';
import { formatPhone, phoneDigits } from '@shared/utils/format';

@Component({
  selector: 'app-profile-page',
  imports: [UiButton, TranslatePipe],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  protected readonly auth = inject(Auth);
  protected readonly lang = inject(Lang);
  private readonly toastr = inject(Toastr);
  protected readonly langs = LANGS;

  protected phone(raw: string): string {
    return '+998 ' + formatPhone(phoneDigits(raw));
  }

  protected async setLang(l: AppLang): Promise<void> {
    await this.lang.set(l);
    this.toastr.success('profile.saved');
  }
}
