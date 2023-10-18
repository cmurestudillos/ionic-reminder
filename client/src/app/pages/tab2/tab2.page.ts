import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html'
})
export class Tab2Page {
  constructor(public tareasService: TareasService) {}
}
