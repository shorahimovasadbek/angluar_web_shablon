import { Component, booleanAttribute, input } from '@angular/core';
import { LucideLoaderCircle } from '@lucide/angular';

export type UiButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
export type UiButtonSize = 'lg' | 'md' | 'sm';

@Component({
  selector: 'ui-button',
  imports: [LucideLoaderCircle],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  host: {
    '[class.is-block]': 'block()',
    '[class.is-inert]': 'disabled() || loading()',
  },
})
export class UiButton {
  readonly variant = input<UiButtonVariant>('primary');
  readonly size = input<UiButtonSize>('lg');
  readonly type = input<'button' | 'submit'>('button');
  readonly block = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
}
