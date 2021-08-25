import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoDTO } from 'src/models/produtos.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.findByCategoria();
  }

  findByCategoria() { 
    let cat_id = this.route.snapshot.paramMap.get('id');
    this.produtoService.findByCategoria(cat_id).subscribe(response => {
      this.items = response['content']; 
      this.loadImageUrls();
    }, error => { });
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
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
}
