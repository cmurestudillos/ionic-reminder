import { Component } from '@angular/core';
// Rutas
import { Router } from '@angular/router';
// Servicios
import { TareasService } from '../../services/tareas.service';
// Ionic Component
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isToastOpen = false;
  textValue = '';

  constructor(public tareasService: TareasService, private router: Router, private alertCtrl: AlertController) {}


  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            if ( data.titulo.length === 0 ) {
              return;
            }

            this.tareasService.crearLista(data.titulo).subscribe((response: any) => {
              if(response){
                this.isToastOpen = true
                this.textValue = response.msg
                // Redirigir a la lista creada por su id
                this.router.navigate([`/tabs/tab1/agregar/${ response.lista._id }`]);
              }
            });
          }
        }
      ]
    });

    alert.present();

  }
}
