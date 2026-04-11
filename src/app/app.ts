import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  // lubos.pittner@posam.sk
  // zadanie 1: counterValue mat v counterService a odkladat ju do localStorage
  //zadanie 2: extrakt counteru do samostatnej komponenty, ktora bude dostupna z menu
  protected collapsed = true;
}
