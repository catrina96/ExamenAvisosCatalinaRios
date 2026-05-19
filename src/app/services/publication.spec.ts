/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { PublicationService } from './publication';
import { StorageService } from './storage';

describe('PublicationService', () => {
  let service: PublicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicationService,
        {
          provide: StorageService,
          useValue: {
            getAll: async () => [],
            setAll: async () => {}
          }
        }
      ]
    });
    service = TestBed.inject(PublicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
