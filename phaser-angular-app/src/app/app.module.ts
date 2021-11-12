import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { Title } from './game/title';
import { Loader } from './game/loader';
import { House } from './game/house';
import { Loader_c } from './game/loader_c';
import { game } from './game/game';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Title, Loader, House, Loader_c, game],
  bootstrap: [AppComponent]
})
export class AppModule { }
