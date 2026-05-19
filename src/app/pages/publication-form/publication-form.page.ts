import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { PublicationService } from '../../services/publication';
import { CameraService } from '../../services/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.page.html',
  styleUrls: ['./publication-form.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonTextarea,
    IonNote,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PublicationFormPage implements OnInit {
  form!: FormGroup;
  photoDataUrl: string | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private pubService: PublicationService,
    private camera: CameraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      photo: [null, Validators.required]
    });
  }

  async takePhoto() {
    const dataUrl = await this.camera.takePhoto();
    if (dataUrl) {
      this.photoDataUrl = dataUrl;
      this.form.patchValue({ photo: dataUrl });
    }
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const { title, description, photo } = this.form.value;
    await this.pubService.create({ title, description, photo });
    this.submitting = false;
    this.router.navigateByUrl('/publications');
  }
}