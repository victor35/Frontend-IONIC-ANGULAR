import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketURL: string = API_CONFIG.bucketBaseUrl;
  
  constructor(public categoriasService: CategoriaService, public navCtrl: NavController, public router: Router) { }

  ngOnInit() {
    this.categoriasService.findAll().subscribe(response => {
      this.items = response;
    },
      error => {});
  }

  showProdutos(categoria_id: string){
    this.router.navigate(['produtos',categoria_id]);
  }

}
