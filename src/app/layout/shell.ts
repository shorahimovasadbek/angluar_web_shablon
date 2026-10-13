import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideHouse, LucideLogOut, LucideUser } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Auth } from '@core/auth/auth';

/** Avtorizatsiyadan keyingi sahifalar karkasi: header + navigatsiya + kontent */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, LucideHouse, LucideUser, LucideLogOut],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly auth = inject(Auth);
}
