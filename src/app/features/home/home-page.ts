import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Auth } from '@core/auth/auth';

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly auth = inject(Auth);
}
