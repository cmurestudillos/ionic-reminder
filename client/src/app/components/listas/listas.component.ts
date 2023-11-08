import { Component, Input, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html'
})
export class ListasComponent {
  @ViewChild( IonList ) lista!: IonList;
  @Input() terminada = true;
  listas: Lista[] = [];

  constructor( public tareasService: TareasService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.cargarListas();
  }

  cargarListas() {
    this.tareasService.cargarListas().subscribe((listas:any) => {
      this.listas = listas.listas;
    });
  }

// Lista seleccionada para su edicion/vision
  listaSeleccionada( lista: any ) {
    if ( this.terminada ) {
      this.router.navigate([`/tabs/tab2/agregar/${ lista._id }`]);
    } else {
      this.router.navigate([`/tabs/tab1/agregar/${ lista._id }`]);
    }

  }

// Borrar Lista
  borrarLista( lista: Lista ) {
    this.tareasService.borrarLista(lista).subscribe(() => {
      // Realizar alguna acción después de borrar en el backend si es necesario
      console.log('lista borrado');
      this.cargarListas();
    });
  }

// Editar lista seleccionada
  async editarLista( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.tareasService.actualizarLista(lista).subscribe(() => {
              // Realizar alguna acción después de actualizar en el backend si es necesario
              console.log('lista actualizado');
              this.lista.closeSlidingItems();
            });
          }
        }
      ]
    });

    alert.present();
  }

}
