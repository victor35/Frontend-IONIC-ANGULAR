import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public storage: StorageService, public clienteService: ClienteService, public router: Router,
    public cartService: CartService) { }

  ngOnInit() {

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEMail(localUser.email).subscribe(response => {
        this.items = response['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: { id: response['id'] },
          enderecoDeEntrega: null,
          pagamento: null,
          itens: cart.items.map(x => {
            return {
              quantidade: x.quantidade,
              produto: { id: x.produto.id }
            }
          })
        }
      },
        error => {
          if (error.status == 403) {
            this.router.navigate(['home']);
          }
        });
    } else {
      this.router.navigate(['home']);
    }

  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    console.log(this.pedido);
    //this.router.navigate(['',item]);
  }

}
