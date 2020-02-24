import { ProdutoDTO } from './produtos.dto';

export interface CartItem {
    quantidade: number;
    produto: ProdutoDTO;
}