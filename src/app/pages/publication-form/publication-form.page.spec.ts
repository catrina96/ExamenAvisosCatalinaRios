import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicationFormPage } from './publication-form.page';

describe('PublicationFormPage', () => {
  let component: PublicationFormPage;
  let fixture: ComponentFixture<PublicationFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
