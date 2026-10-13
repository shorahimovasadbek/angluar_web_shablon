import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiToaster } from '@shared/ui/ui-toaster/ui-toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UiToaster],
  template: `
    <router-outlet />
    <ui-toaster />
  `,
})
export class AppComponent {}
