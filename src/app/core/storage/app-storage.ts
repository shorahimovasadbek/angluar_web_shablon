import { Injectable } from '@angular/core';

/** Saqlanadigan barcha kalitlar shu yerda — tasodifiy string kalitlarning oldini oladi */
export type StorageKey = 'token' | 'refresh' | 'user' | 'lang';

const PREFIX = 'app:';

@Injectable({ providedIn: 'root' })
export class AppStorage {
  get(key: StorageKey): string | null {
    return localStorage.getItem(PREFIX + key);
  }

  set(key: StorageKey, value: string): void {
    localStorage.setItem(PREFIX + key, value);
  }

  remove(...keys: StorageKey[]): void {
    keys.forEach((k) => localStorage.removeItem(PREFIX + k));
  }

  getJson<T>(key: StorageKey): T | null {
    const raw = this.get(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      this.remove(key);
      return null;
    }
  }

  setJson(key: StorageKey, value: unknown): void {
    this.set(key, JSON.stringify(value));
  }
}
