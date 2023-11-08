import { Component, OnInit} from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html'
})
export class AgregarPage implements OnInit{
  lista!: Lista;
  nombreItem = '';

  constructor( private tareasService: TareasService, private route: ActivatedRoute ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('listaId');
    console.log(param);
    // if (param) {
    //   this.tareasService.cargarTareasLista(param).subscribe((lista) => {
    //     console.log(lista);
    //     this.lista = lista;
    //   });
    // }
  }

  // Añadir elementos a la lista creada
  agregarItem() {
    if ( this.nombreItem.length === 0 ) {
      return;
    }

    // Creamos el objeto y lo metemos en el Array
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    // Y despues, limpiamos el item y lo guardamos en BBDD
    this.nombreItem = '';
    console.log(this.lista);
    // this.tareasService.actualizarLista(this.lista).subscribe(() => {
      // Realizar alguna acción después de guardar en el backend si es necesario
      // console.log('tarea creado');
    // });
  }

  // Marcar o Desmarcar el CheckBox
  cambioCheck( item: ListaItem ) {
    if (!this.lista) {
      return;
    }

    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.tareasService.actualizarLista(this.lista).subscribe(() => {
      // Realizar alguna acción después de guardar en el backend si es necesario
      console.log('tarea actualizado');
    });
  }

  // Borrar elemento de la lista
  borrar( i: number ) {
    if (!this.lista) {
      return;
    }

    this.lista.items.splice(i, 1);
    this.tareasService.actualizarLista(this.lista).subscribe(() => {
      // Realizar alguna acción después de guardar en el backend si es necesario
      console.log('tarea borrado');
    });
  }

}
