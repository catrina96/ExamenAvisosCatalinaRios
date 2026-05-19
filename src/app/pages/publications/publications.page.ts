import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { PublicationService } from 'src/app/services/publication';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Publication } from '../../app/models/publication.model';
import { DateFormatPipe } from '../../pipes/date-format-pipe';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,
    DateFormatPipe
  ]
})
export class PublicationsPage implements OnInit {
  publications: Publication[] = [];

  constructor(
    private pubService: PublicationService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.publications = await this.pubService.getAll();
  }

  async ionViewWillEnter() {
    this.publications = await this.pubService.getAll();
  }

  addNew() {
    this.router.navigateByUrl('/publication-form');
  }

  async confirmDelete(pubId: string) {
    const modal = await this.modalCtrl.create({
      component: ConfirmDeleteModalComponent,
      componentProps: { id: pubId }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data === true) {
      await this.pubService.delete(pubId);
      this.publications = await this.pubService.getAll();
    }
  }
}
