import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class Scene extends Phaser.Scene {

  wood?: GameObjects.Image;
  portal?: GameObjects.Sprite;
  knight?: GameObjects.Sprite;
  necromancer?: GameObjects.Sprite;
  ice_zombie?: GameObjects.Sprite;
  masked_orc?: GameObjects.Sprite;
  bd_scene?: GameObjects.Image;

  myCharacter?: GameObjects.Sprite;


  constructor() {
    super({ key: "menu" });

  }

  ngOnInit(): void {
  }

  preload() {
    this.load.path = "../../assets/";
    this.load.image('wood', 'wood.jpg');
    this.load.image('bg_scene', 'bg.png');


    //portal
    this.load.atlas('portal', 'portal/portal.png',
      'portal/portal_atlas.json');
    this.load.animation('portal_anim_', 'portal/portal_anim.json');

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

    //wood
    this.wood = this.add.image(this.scale.width / 2, this.scale.height / 2, 'wood');


    //portal
    this.portal = this.add.sprite(400, 150, 'portal').setScale(1).setInteractive();
    this.portal.input.dropZone = true;
    this.portal!.anims.play('portal_anim');

    //characters
    //knight
    this.knight = this.add.sprite(120, 30, 'knight_idle').setScale(3).setInteractive();
    this.input.setDraggable(this.knight);
    this.knight!.anims.play('knight_idle_anim');
    this.knight.setName('knight');

    //necromancer
    this.necromancer = this.add.sprite(120, 120, 'necromancer_idle').setScale(3).setInteractive();;
    this.input.setDraggable(this.necromancer);
    this.necromancer!.anims.play('necromancer_idle_anim');
    this.necromancer.setName('necromancer');

    //ice_zombie
    this.ice_zombie = this.add.sprite(120, 200, 'ice_zombie_idle').setScale(3).setInteractive();;
    this.input.setDraggable(this.ice_zombie);
    this.ice_zombie!.anims.play('ice_zombie_idle_anim');
    this.ice_zombie.setName('ice_zombie');

    //masked_orc
    this.masked_orc = this.add.sprite(120, 260, 'masked_orc_idle').setScale(3).setInteractive();;
    this.input.setDraggable(this.masked_orc);
    this.masked_orc!.anims.play('masked_orc_idle_anim');
    this.masked_orc.setName('masked_orc');


    const events = Phaser.Input.Events;


    this.input.on(events.DRAG_START, (pointer: Phaser.Input.Pointer, toucanPiece: GameObjects.Image) => {
      toucanPiece.setDepth(100);
      
    });

    this.input.on(events.DRAG, (pointer: Phaser.Input.Pointer, character: GameObjects.Sprite, dragX: number, dragY: number) => {
      character.x = dragX;
      character.y = dragY;
      character.setScale(4);  
    });

    this.input.on(events.DRAG_END, (pointer: Phaser.Input.Pointer, character: GameObjects.Sprite, dropZone: boolean) => {
      if (dropZone) {

        alert(character.name);

        this.bd_scene = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg_scene');

        //to refactor
        this.myCharacter = character;
        this.myCharacter.setDepth(100);

        
      }
      character.setDepth(0);
      character.setScale(3);  
    });

    this.input.on(events.DROP, (pointer: Phaser.Input.Pointer, character: GameObjects.Image, dropZone: GameObjects.Image) => {

      //let x = character.input.dragStartX;
      //let y = character.input.dragStartY;

      character.setDepth(0);
      character.setScale(3);  

    });



  }

  update(time: number, delta: number) {

  }


}