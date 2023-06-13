import { produtoVendaLstComponent } from './lista-produto/produtoVenda-lst.component';
import { produtoVendaFrmComponent } from './frm-produto/frm-produto.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
                        { path: "produtoVendas", component: produtoVendaLstComponent },
                        { path: "produtoVenda/novo", component: produtoVendaFrmComponent },
                        { path: "produtoVenda/editar/:id", component: produtoVendaFrmComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
