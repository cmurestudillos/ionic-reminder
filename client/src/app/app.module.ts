import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//Rutas
import { AppRoutingModule } from './routes/app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// Componentes
import { AppComponent } from './app.component';
// Peticiones HTTP
import { HttpClientModule } from '@angular/common/http';
// Almacenamiento en memoria
import { Storage } from '@ionic/storage';
// Token cifrado
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
// Angular Material
import { MaterialModule } from './modules/material.module';

export function jwtOptionsFactory(storage:any) {
	return {
		tokenGetter: () => {
			return storage.get('access_token');
		},
		whitelistedDomains: ['localhost:4000']
	};
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
	MaterialModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [Storage]
			}
		})
  ],
  providers: [
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
