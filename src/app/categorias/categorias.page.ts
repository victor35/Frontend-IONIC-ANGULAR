import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.services';
import { API_CONFIG } from 'src/config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketURL: string = API_CONFIG.bucketBaseUrl;
  
  constructor(public categoriasService: CategoriaService, public navCtrl: NavController) { }

  ngOnInit() {
    this.categoriasService.findAll().subscribe(response => {
      this.items = response;
    },
      error => {});
  }

  showProdutos(){
    this.navCtrl.navigateForward('produtos');
  }

}
