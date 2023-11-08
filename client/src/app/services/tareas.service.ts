import { Injectable } from '@angular/core';
// Libreria para trabajar con peticiones al Backend
import { HttpClient } from '@angular/common/http';
// Operadores de RxJS
import { Observable } from 'rxjs';
// Modelo de datos
import { Lista } from '../models/lista.model';
// URL API - Bacnkend
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) {
    this.cargarListas();
  }

  // Cargar listas existentes en BBDD
  cargarListas(): Observable<Lista[]> {
    return this.http.get<Lista[]>(`${this.apiUrl}/listas`);
  }

  // Cargamos los items de la lista seleccionada
  cargarTareasLista(listaId: string): Observable<Lista> {
    return this.http.get<Lista>(`${this.apiUrl}/listas/${listaId}`);
  }

  // Crear nueva lista
  crearLista(titulo: string): Observable<Lista> {
    const nuevaLista = new Lista(titulo);
    return this.http.post<Lista>(`${this.apiUrl}/listas`, nuevaLista);
  }

  // Actualizar una lista en el backend
  actualizarLista(lista: Lista): Observable<Lista> {
    return this.http.put<Lista>(`${this.apiUrl}/listas/${lista}`, lista);
  }

  // Borrar la lista seleccionada
  borrarLista(lista: Lista): Observable<any> {
    return this.http.delete(`${this.apiUrl}/listas/${lista}`);
  }

}
