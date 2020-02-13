import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { CidadeDTO } from 'src/models/cidade.dto';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeService } from 'src/services/domain/cidade.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EstadoService } from 'src/services/domain/estado.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  public loginGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController,

    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

    this.loginGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['Joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.loginGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();

    }, error => { })
  }

  signupUser() {
    this.clienteService.insert(this.loginGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => { }
    )
  }

  async showInsertOk() {
    let alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: 'Cadastro concluído com sucessso',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK!',
          handler: () => {
            this.navCtrl.navigateBack("/home");
          }
        }
      ]
    });
    await alert.present();
  }



  updateCidades() {
    let estado_id = this.loginGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.loginGroup.controls.cidadeId.setValue(null);

    }, error => { })
  }

}
