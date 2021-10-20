import Phaser from 'phaser';
import { GameObjects } from 'phaser';
import { Injectable } from '@angular/core';

@Injectable()

export class House extends Phaser.Scene {


  necromancer?: GameObjects.Sprite;
  bg_scene?: GameObjects.Image;
  myCursor?: Phaser.Types.Input.Keyboard.CursorKeys;
  portal?: GameObjects.Sprite;
  timeline?: Phaser.Tweens.Timeline;

  isFirstClick = true;

  music?: Phaser.Sound.BaseSound;




  constructor() {
    super({ key: "House" });
  }

  ngOnInit(): void {
  }

  preload() {
    this.load.path = "../../assets/";


    this.load.image('bg_scene', 'bg.png');

    this.load.audio('music', 'music.mp3');


    //portal
    this.load.atlas('portal', 'portal/portal.png',
      'portal/portal_atlas.json');
    this.load.animation('portal_anim_', 'portal/portal_anim.json');

    //necromancer
    this.load.atlas('necromancer_idle', 'necromancer/necromancer_idle/necromancer_idle.png',
      'necromancer/necromancer_idle/necromancer_idle_atlas.json');
    this.load.animation('necromancer_anim_', 'necromancer/necromancer_idle/necromancer_idle_anim.json');

  }

  listenCursor(character: any, characterCursor: any) {
    if (characterCursor.left.isDown) {
      character.x--;
      character.flipX = true;
    }
    if (characterCursor.right.isDown) {
      character.x++;
      character.flipX = false;
    }
    if (characterCursor.up.isDown) {
      character.y--;
    }
    if (characterCursor.down.isDown) {
      character.y++;
    }
  }

  setKeyboard() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.myCursor = this.input.keyboard.createCursorKeys();

  }

  create() {

    //keyboard
    this.setKeyboard();

    this.bg_scene = this.add.image(this.scale.width / 2, this.scale.height / 2, 'bg_scene');

    const musicVolume = 0.09;
    this.music = this.sound.add('music', { volume: musicVolume, loop: true });

    //portal
    this.portal = this.add.sprite(50, 220, 'portal').setScale(1).setInteractive();
    this.portal.input.dropZone = true;
    this.portal.setFlipX(true);
    this.portal!.anims.play('portal_anim');


    //necromancer
    this.necromancer = this.add.sprite(50, 220, 'necromancer_idle').setScale(3).setInteractive();;
    this.input.setDraggable(this.necromancer);
    this.necromancer!.anims.play('necromancer_idle_anim');
    this.necromancer.setName('necromancer');

    this.timeline = this.tweens.timeline({
      targets: [this.necromancer],
      paused: true,
      tweens: [
        {
          rotation: 62.83185,
          duration: 500
        },
        {
          x: 230,
          y: 250,
          duration: 2000
        },
      ]
    });

    this.timeline.play();

    this.timeline = this.tweens.timeline({
      targets: [this.portal],
      paused: true,
      tweens: [
        {
          scale: 0,
          ease: 'Sine.easeInOut',
          duration: 2500,
        },
      ]
    });

    this.timeline.play();



  }

  update(time: number, delta: number) {
    if (this.necromancer) {
      this.listenCursor(this.necromancer, this.myCursor);
    }
  }


}