import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton]
})
export class ConfirmDeleteModalComponent {
  @Input() id!: string;

  constructor(private modalCtrl: ModalController) {}

  confirm() {
    this.modalCtrl.dismiss(true);
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }
}
