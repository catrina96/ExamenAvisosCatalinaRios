import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private KEY = 'publications_v1';

  async getAll<T>(): Promise<T[]> {
    const r = await Preferences.get({ key: this.KEY });
    return r.value ? JSON.parse(r.value) as T[] : [];
  }

  async setAll<T>(items: T[]): Promise<void> {
    await Preferences.set({ key: this.KEY, value: JSON.stringify(items) });
  }
}
