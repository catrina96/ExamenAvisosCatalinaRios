import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage';
import { Publication } from '../app/models/publication.model';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  private items: Publication[] = [];

  constructor(private storage: StorageService) {}

  async load() {
    this.items = await this.storage.getAll<Publication>();
    this.items.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
    return this.items;
  }

  async getAll() {
    if (!this.items.length) await this.load();
    return this.items;
  }

  async create(data: Omit<Publication,'id'|'createdAt'>) {
    const pub: Publication = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data
    };
    this.items.unshift(pub);
    await this.storage.setAll(this.items);
    return pub;
  }

  async delete(id: string) {
    this.items = this.items.filter(p => p.id !== id);
    await this.storage.setAll(this.items);
  }
}
