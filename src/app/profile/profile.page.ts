import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export interface PhotoInterface {
  filepath: string;
  webviewPath: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;
  public photosInterface: PhotoInterface[] = [];
  cameraOn: boolean = false;
  picture: any;

  constructor(public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEMail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot('home');
          }
        });
    } else {
      this.navCtrl.navigateRoot('home');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
      },
        error => { });
  }

  async getCameraPicture(){
    this.cameraOn = true;
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).catch((err)=>{
      console.log('provavelmente o usuario cancelou a imagem', err);
    });

    if(capturedPhoto){
      // save photos
      this.photosInterface.unshift({
        filepath: "soon...",
        webviewPath: capturedPhoto.webPath
      });
      console.log(this.photosInterface);
      this.picture = this.photosInterface[0].webviewPath 
    }
    
    this.cameraOn = false;
  }

}

