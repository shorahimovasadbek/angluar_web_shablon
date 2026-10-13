import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Toastr } from '@core/ui/toastr';

/** Toastr xabarlarini ko'rsatadi — AppComponent'da bir marta joylashtiriladi */
@Component({
  selector: 'ui-toaster',
  imports: [TranslatePipe],
  template: `
    @for (t of toastr.items(); track t.id) {
      <button type="button" class="toast" [class]="'toast toast--' + t.kind" (click)="toastr.dismiss(t.id)">
        {{ t.message | translate }}
      </button>
    }
  `,
  styleUrl: './ui-toaster.css',
  host: { role: 'status', 'aria-live': 'polite' },
})
export class UiToaster {
  protected readonly toastr = inject(Toastr);
}
