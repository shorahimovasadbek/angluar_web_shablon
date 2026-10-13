import { Component, ElementRef, booleanAttribute, computed, input, model, output, signal, viewChild } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';
import { LucideCircleAlert, LucideEye, LucideEyeOff } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { formatPhone, phoneDigits } from '@shared/utils/format';

export type UiInputKind = 'text' | 'phone' | 'email' | 'password';

/** Foydalanuvchi kiritgan matn → model qiymati */
const PARSE: Record<UiInputKind, (s: string) => string> = {
  text: (s) => s,
  password: (s) => s,
  email: (s) => s.replace(/\s/g, ''),
  phone: phoneDigits,
};
/** Model qiymati → ekranda ko'rinishi */
const FORMAT: Partial<Record<UiInputKind, (s: string) => string>> = { phone: formatPhone };
const format = (k: UiInputKind, s: string) => FORMAT[k]?.(s) ?? s;

/** Signal forms bilan ishlaydi: `<ui-input [formField]="f.phone" kind="phone" />` */
@Component({
  selector: 'ui-input',
  imports: [LucideCircleAlert, LucideEye, LucideEyeOff, TranslatePipe],
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.scss',
})
export class UiInput implements FormValueControl<string> {
  readonly value = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = input(false);
  readonly touch = output<void>();

  readonly kind = input<UiInputKind>('text');
  readonly label = input('');
  readonly placeholder = input('');
  readonly hint = input('');

  private readonly el = viewChild.required<ElementRef<HTMLInputElement>>('el');
  protected readonly focused = signal(false);
  protected readonly showPw = signal(false);

  protected readonly text = computed(() => format(this.kind(), this.value()));
  protected readonly error = computed(() => (this.touched() ? (this.errors()[0]?.message ?? '') : ''));
  protected readonly prefix = computed(() => (this.kind() === 'phone' ? '+998' : ''));
  protected readonly ph = computed(() => this.placeholder() || (this.kind() === 'phone' ? '90 123-45-67' : ''));
  protected readonly type = computed(() => {
    const k = this.kind();
    if (k === 'password') return this.showPw() ? 'text' : 'password';
    return k === 'phone' ? 'tel' : k;
  });
  protected readonly autocomplete = computed(() => {
    const k = this.kind();
    return k === 'phone' ? 'tel-national' : k === 'password' ? 'current-password' : k === 'email' ? 'email' : 'off';
  });

  focus(): void {
    this.el().nativeElement.focus();
  }

  protected onInput(): void {
    const el = this.el().nativeElement;
    const raw = PARSE[this.kind()](el.value);
    el.value = format(this.kind(), raw);
    this.value.set(raw);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touch.emit();
  }
}
