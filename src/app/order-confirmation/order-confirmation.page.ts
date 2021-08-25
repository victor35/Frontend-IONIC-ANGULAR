import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/models/cart-item';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteService } from 'src/services/domain/cliente.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido : PedidoDTO;
  cartItems: CartItem[];
  cliente : ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public route: ActivatedRoute,public router: Router, public cartService: CartService, public clienteService: ClienteService) {

    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.pedido = this.router.getCurrentNavigation().extras.state.pedido;
      }
    })
   }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(res=>{
      this.cliente = res as ClienteDTO;
      this.endereco = this._findEndereco(this.pedido.enderecoDeEntrega.id,res['enderecos']); 
    }, error => {
      this.router.navigateByUrl('/home');
    });
  }

  private _findEndereco(id:string, list : EnderecoDTO[]): EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.total();
  }

  back(){
    this.router.navigateByUrl("/payement");
  }

}
