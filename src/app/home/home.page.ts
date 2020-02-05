import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public auth: AuthService,
    public navCtrl: NavController,
    public menu: MenuController) { }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.sucsessfullLogin(response.headers.get("Authorization"));
      this.navCtrl.navigateRoot("categorias");
    }, error => { })
  }
}
