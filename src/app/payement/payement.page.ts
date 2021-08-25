import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PedidoDTO } from 'src/models/pedido.dto';
import { DataService } from 'src/services/domain/data.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.page.html',
  styleUrls: ['./payement.page.scss'],
})
export class PayementPage implements OnInit {

  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;
  

  constructor(public route: ActivatedRoute,public router: Router, public formBuilder: FormBuilder) {
 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        debugger
        this.pedido = this.router.getCurrentNavigation().extras.state.pedido;
      }
    });

    
    console.log("pedido payemente",this.pedido);
    
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas:[1,Validators.required],
      "@type":["pagamentoComCartão",Validators.required],
    })

    console.log("form:",this.formGroup.value);
    console.log("@type:",this.formGroup.value['@type']);
    
  }
  

  ngOnInit() {
    
  }

  nextPage(){
    console.log(this.pedido);
    this.pedido.pagamento = this.formGroup.value; 
    
  }

}
