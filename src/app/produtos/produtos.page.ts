import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoDTO } from 'src/models/produtos.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[] = [];
  page: number = 0;


  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute, public router: Router, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.findByCategoria();
  }

  async findByCategoria() { 
    let cat_id = this.route.snapshot.paramMap.get('id');
    let loader = await this.presentLoading();
    this.produtoService.findByCategoria(cat_id, this.page, 10).subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']); 
      let end = this.items.length - 1;
      console.log(this.page);
      console.log(this.items);
      this.loadImageUrls(start, end);
      loader.dismiss();
    }, error => { 
      loader.dismiss();
    });
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
        error => { })
    }
  }

  showDetail(produto_id: string){
    this.router.navigate(['produto-detail', produto_id])
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      //cssClass: 'my-custom-class',
      message: 'Aguarde...',
      //duration: 2000
    });
    await loading.present();
    return loading;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    setTimeout(() => {
      event.target.complete();
      this.findByCategoria(); // tem q melhorar pra pagina q ta
    }, 1000);
  }

  loadData(event) {
    this.page++;
    this.findByCategoria();
    setTimeout(() => {
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
}
