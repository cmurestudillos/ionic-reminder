import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MaterialModule } from 'src/app/modules/material.module';
// Formularios
import { FormsModule } from '@angular/forms';
// Rutas
import { TabsPageRoutingModule } from './tabs.router.module';
// Paginas
import { TabsPage } from './tabs.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
