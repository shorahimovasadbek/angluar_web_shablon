import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  kind: ToastKind;
  /** Tarjima kaliti yoki tayyor matn */
  message: string;
}

@Injectable({ providedIn: 'root' })
export class Toastr {
  private readonly _items = signal<readonly Toast[]>([]);
  readonly items = this._items.asReadonly();
  private nextId = 0;

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string)   { this.show(msg, 'error'); }
  info(msg: string)    { this.show(msg, 'info'); }

  dismiss(id: number): void {
    this._items.update((list) => list.filter((t) => t.id !== id));
  }

  private show(message: string, kind: ToastKind): void {
    const id = ++this.nextId;
    this._items.update((list) => [...list, { id, kind, message }]);
    setTimeout(() => this.dismiss(id), kind === 'error' ? 4000 : 2500);
  }
}
