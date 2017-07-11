import { Component } from '@angular/core';

import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';

import { RoomsProvider } from '../../providers/providers';

@IonicPage({})
@Component({
  selector: 'page-professor-room',
  templateUrl: 'professor-room.html',
})
export class ProfessorRoomPage {
  isDataLoaded: boolean = false;

  rooms: any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public rs: RoomsProvider,
    public toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    this.rs.find()
      .subscribe((rooms) => {
        this.rooms = rooms.data;
        this.isDataLoaded = true;
      });
  }

  newRoom() {
    this.modalCtrl.create('NewRoomPage', null, { cssClass: 'new-room-modal' }).present();
  }

  students(room) {
    this.navCtrl.push('AddStudentsPage', { room });
  }

  activate(room) {
    const online = this.rooms.filter(x => x.online && x._id !== room._id);

    if (online.length > 0) {
      online.forEach((r) => {
        this.rs.activate(r, false);
      });
    }

    this.rs.activate(room, room.online)
      .then(() => {
        const message = room.online ? `Turma #${room.code} ativada` : `Turma #${room.code} desativada`
        this.presentToast(message)
          .catch((error) => console.info('error', error));
      });
  }

  goToActivities(room) {
    this.navCtrl.push('ProfessorAttendanceListPage', { room });
  }

  remove(room) {
    this.rs.remove(room)
      .then(() => this.presentToast(`Turma #${room.code} removida`));
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 2000,
    });
    return toast.present();
  }

  askToRemove(room) {
    const confirm = this.alertCtrl.create({
      title: 'Remover turma?',
      message: 'Essa operação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.presentToast('Remoção cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.remove(room);
          }
        }
      ]
    });
    confirm.present();
  }
}
