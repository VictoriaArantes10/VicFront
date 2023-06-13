import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { produtoVenda } from '../models/produtoVenda';
import { produtoVendaService } from '../service/produtoVendaService';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-frm-produto',
  templateUrl: './frm-produto.component.html',
  styleUrls: ['./frm-produto.component.css']
})
export class produtoVendaFrmComponent implements OnInit {

  produtoVenda: produtoVenda = new produtoVenda();
  id: number = 0;
  @BlockUI()
  blockUI!: NgBlockUI;
  constructor(private router: Router, private route: ActivatedRoute, private produtoVendaService: produtoVendaService) {

  }

  salvar() {
    if (this.id > 0) {
      this.produtoVenda.id = this.id;
  

      this.blockUI.start('Loading...');
      this.produtoVendaService.alterar(this.id, this.produtoVenda).subscribe({
        next: () => {
          alert("Produto Alterado com sucesso!");
          this.router.navigate(['/produtoVendas']);
        },
        error(msg) {
          console.log('Erro ao obter Produtos: ', msg);
        },
        complete: () => this.blockUI.stop()
      })

    }
    else {
      // this.clienteService.inserir(this.cliente);

      console.log(this.produtoVenda);
      this.blockUI.start('Loading...');
      this.produtoVendaService.inserir(this.produtoVenda).subscribe({
        next: () => {
          alert("Produto Cadastrado com sucesso!");
          this.router.navigate(['/produtoVendas']);
        },
        error(msg) {
          console.log('Erro ao obter produtos: ', msg);
        },
        complete: () => this.blockUI.stop()
      })
    }

    console.log(this.produtoVenda);

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.id = Number(params.get('id'));
        console.log(this.id);
        this.carregarProdutos(this.id);
      }
    });
  };


  carregarProdutos(id: number): void {

    this.blockUI.start('Loading...');
    this.produtoVendaService.obterPorId(id).subscribe({
      next: (dados) => {
        this.produtoVenda = dados;
      },
      error(msg) {
        console.log('Erro ao obter produtos: ', msg);
      },
      complete: () => this.blockUI.stop()
    })

  }

  voltar() {

    this.router.navigate(['/produtoVendas']);
  }
}
