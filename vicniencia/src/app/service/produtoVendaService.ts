import { Injectable } from '@angular/core';
import { produtoVenda } from '../models/produtoVenda';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class produtoVendaService {

  constructor(private http: HttpClient) { }

  produtoVendas: produtoVenda[] = [];
  count: number = 1;
  api:string = "http://localhost:8080";

  public inserir(produtoVenda:produtoVenda):Observable<number>
{
   return this.http.post<number>(this.api + '/produtoVenda', produtoVenda);
}

public obterTodos(): Observable<produtoVenda[]> {
  return this.http.get<produtoVenda[]>(this.api + "/produtoVendas");
}


public remover(id:number):Observable<number> {
  return this.http.delete<number>(this.api + "/produtoVendass/" + id );
}


public alterar(id:number, produtoVenda:produtoVenda): Observable<number> {
  return this.http.put<number>(this.api + "/produtoVenda/" + id, produtoVenda);
}

public obterPorId(id:number): Observable<produtoVenda> {

  return this.http.get<produtoVenda>(this.api + "/produtoVenda/" + id );
}


}
