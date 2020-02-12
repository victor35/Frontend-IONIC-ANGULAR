import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppPage } from 'e2e/src/app.po';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Categorias',
      url: '/categorias',
      icon: 'list-box'
    },
    {
      title: 'Logout',
      url: '/home',
      icon: 'exit'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(appPages : {title: string, url: string}){
    switch(appPages.title){
      case 'Logout':
        this.authService.logout();
        this.navCtrl.navigateRoot(appPages.url);
        break;

        default:
          this.navCtrl.navigateRoot(appPages.url);
    }
  }

}
