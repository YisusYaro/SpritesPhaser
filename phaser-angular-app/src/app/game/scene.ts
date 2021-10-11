import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class Scene extends Phaser.Scene {

  bg?: GameObjects.Image;
  knight?: GameObjects.Sprite;
  necromancer?: GameObjects.Sprite;
  ice_zombie?: GameObjects.Sprite;
  masked_orc?: GameObjects.Sprite;


  constructor() {
    super({ key: "menu" });

  }

  ngOnInit(): void {
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.image('bg', 'bg.png');

    //knight
    this.load.atlas('knight_idle', 'knight/knight_idle/knight_idle.png',
      'knight/knight_idle/knight_idle_atlas.json');
    this.load.animation('knight_anim_', 'knight/knight_idle/knight_idle_anim.json');

    //necromancer
    this.load.atlas('necromancer_idle', 'necromancer/necromancer_idle/necromancer_idle.png',
      'necromancer/necromancer_idle/necromancer_idle_atlas.json');
    this.load.animation('necromancer_anim_', 'necromancer/necromancer_idle/necromancer_idle_anim.json');

    //ice_zombie
    this.load.atlas('ice_zombie_idle', 'ice_zombie/ice_zombie_idle/ice_zombie_idle.png',
      'ice_zombie/ice_zombie_idle/ice_zombie_idle_atlas.json');
    this.load.animation('ice_zombie_anim_', 'ice_zombie/ice_zombie_idle/ice_zombie_idle_anim.json');

    //masked_orc
    this.load.atlas('masked_orc_idle', 'masked_orc/masked_orc_idle/masked_orc_idle.png',
      'masked_orc/masked_orc_idle/masked_orc_idle_atlas.json');
    this.load.animation('masked_orc_anim_', 'masked_orc/masked_orc_idle/masked_orc_idle_anim.json');

  }

  setKeyboard() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;

    //this.myCursor = this.input.keyboard.createCursorKeys();

  }


  create() {

    //keyboard
    this.setKeyboard();

    //bg
    this.bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg');

    //characters

    //knight
    this.knight = this.add.sprite(50, 230, 'knight_idle').setScale(3);
    this.knight!.anims.play('knight_idle_anim');

    //necromancer
    this.necromancer = this.add.sprite(100, 242, 'necromancer_idle').setScale(3);
    this.necromancer!.anims.play('necromancer_idle_anim');

    //ice_zombie
    this.ice_zombie = this.add.sprite(150, 245, 'ice_zombie_idle').setScale(3);
    this.ice_zombie!.anims.play('ice_zombie_idle_anim');

    //masked_orc
    this.masked_orc = this.add.sprite(200, 245, 'masked_orc_idle').setScale(3);
    this.masked_orc!.anims.play('masked_orc_idle_anim');


  }

  update(time: number, delta: number) {

  }


}