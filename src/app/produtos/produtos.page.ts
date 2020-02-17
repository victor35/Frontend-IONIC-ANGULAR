import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoDTO } from 'src/models/produtos.dto';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.findByCategoria();
  }

  findByCategoria() {
    let cat_id = this.route.snapshot.paramMap.get('id');
    this.produtoService.findByCategoria(cat_id).subscribe(response => {
      this.items = response['content'];
    }, error => { });
  }



}
