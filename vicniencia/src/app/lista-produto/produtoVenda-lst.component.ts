
import { Component } from '@angular/core';
import { produtoVenda } from '../models/produtoVenda';

import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { produtoVendaService } from '../service/produtoVendaService';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-produtoVenda-lst',
  templateUrl: './produtoVenda-lst.component.html',
  styleUrls: ['./produtoVenda-lst.component.css']
})
export class produtoVendaLstComponent {
  displayedColumns: string[] = ['acoes', 'id', 'nome', 'codigoBarras', 'descricao', 'valor', 'fornecedor', 'grupo', 'obs'];

  dataSource = new MatTableDataSource<produtoVenda>();
  @BlockUI()
  blockUI!: NgBlockUI;

  /**
   *
   */
  constructor(private router: Router, private route: ActivatedRoute,
    private produtoVenda: produtoVendaService) {

    this.obterTodos();

  }
  novo(): void {
    this.router.navigate(['/produtoVenda/novo']);

  }
  obterTodos(): void {
    this.blockUI.start('Loading...');
    this.produtoVenda.obterTodos().subscribe({
      next:(dados) =>{
        this.dataSource.data  = dados;
      },
      error(msg) {
        console.log('Erro ao obter produtos: ', msg);

      },
      complete: () => this.blockUI.stop() // Stop blocking,
    })

  }
  remover(id:number):void{

    var result =confirm("Deseja realmente remover o produto!");
    ind:Number;

    if (result) {

      this.produtoVenda.remover(id).subscribe({
        next:(dados) =>{
          if(dados > 0)
          {
            alert("Produto removido com sucesso!!");
            this.obterTodos();
          }
        },
        error(msg) {
          console.log('Erro ao obter clientes: ', msg);
        }
      })
    }
  }

    alterar(id:number):void{

      this.router.navigate(['/produtoVenda/editar/' + id]);
  
    }
}

