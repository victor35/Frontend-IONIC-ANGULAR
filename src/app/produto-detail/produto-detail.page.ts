import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produtos.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/config/api.config';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute, public cartService: CartService, public router: Router) { }

  ngOnInit() {
    this.findByProduto();
  }

  findByProduto() {
    let prod_id = this.route.snapshot.paramMap.get("id");
    this.produtoService.findById(prod_id).subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    },
      error => { })
  }

  getImageUrlIfExists() {
    this.produtoService.getSmallImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`
    },
      error => { })
  }

  addToCart(produto: ProdutoDTO){
    this.cartService.addProduto(produto);
    this.router.navigate(['cart']);
  }
}
