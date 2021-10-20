import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { House } from './house';
import { Loader } from './loader';
import { Title } from './title';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  phaserGame?: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  gameContainer: any;




  constructor() {
    this.config = {
      width: 454,
      height: 313,
      scene: [Title, Loader, House],
      parent: 'game-container',
      pixelArt: true,
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
    }
  }

}
