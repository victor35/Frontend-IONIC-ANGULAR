import { Injectable } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';

@Injectable()
export class PedidoService {
    private pedido = [];

    constructor() { }

    setPedido(id, pedido) {
        this.pedido[id] = pedido;
    }

    getPedido(id) {
        return this.pedido[id];
    }
}
