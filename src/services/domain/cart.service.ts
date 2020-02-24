import { Injectable } from '@angular/core';
import { Cart } from 'src/models/cart';
import { StorageService } from '../storage.service';
import { ProdutoDTO } from 'src/models/produtos.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) { }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] }
        this.storage.setLocalCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart = this.storage.getLocalCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setLocalCart(cart);
        return cart;
    }
}