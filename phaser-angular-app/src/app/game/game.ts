import { Injectable } from "@angular/core";
import { GameObjects, Tweens } from "phaser";
import Phaser from 'phaser';

@Injectable()

export class game extends Phaser.Scene{
    // declaracion de variables
    knight?: GameObjects.Sprite;
    portal?: GameObjects.Sprite;
    Background?: GameObjects.Image;
    myCursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    //tweens?:Tweens.Tween;

    //constructor
    constructor(){
        super({key:"game"});
    }

    ngOnInit(): void {
    }

    preload(){
        this.load.path = "../../assets/";
        this.load.atlas('portal', 'portal/portal.png', 'portal/portal_atlas.json');
        this.load.animation('portal_anim_', 'portal/portal_anim.json');
        this.load.atlas('knight_idle', 'knight/knight_idle/knight_idle.png', 'knight/knight_idle/knight_idle_atlas.json');
        this.load.animation('knight_anim_', 'knight/knight_idle/knight_idle_anim.json');
        this.load.image('fondo','bg.png');
        //alert("escena 2");
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

    create(){
        this.setKeyboard();
        //console.log("en escena Loader");
        
        // creamos el fondo
        this.Background = this.add.image(0,0,'fondo');
        this.Background.setOrigin(0,0);
        this.Background.setScale(1,1);
        // creando al caballero
        this.knight = this.add.sprite(50, 130, 'knight_idle');
        this.knight!.anims.play('knight_idle_anim');
        this.knight.setName('knight');
        this.knight.setScale(3);
        this.knight.setDepth(8);
        this.knight.setOrigin(0.5,0.5);
        this.knight.setAlpha(0);

        // portal
        this.portal = this.add.sprite(50, 150, 'portal').setScale(1);
        this.portal.flipX = true;
        this.portal!.anims.play('portal_anim');
        this.portal.setScale(0);

        //creacion del tween
        this.tweens.timeline({
            targets: [this.portal],
            paused: true,
            tweens: [
                {
                    scale: 1,
                    ease: 'Bounce',
                    duration: 1000
                }
            ]
        }).play();

        this.tweens.timeline({
            targets: [this.knight],
            paused: true,
            delay: 1500,
            tweens: [
                {
                    alpha:1,
                    ease: 'Power1',
                    rotation: 2 * Math.PI,
                    repeat:0,
                    x:100,
                    y: 250,
                }
            ]
        }).play();

        this.tweens.timeline({
            targets: [this.portal],
            paused: true,
            delay: 3500,
            tweens: [
                {
                    scale: 0,
                    ease: 'back',
                    duration: 1000
                }
            ]
        }).play();

        const events = Phaser.Input.Events;

    }

    update(){
        this.listenCursor(this.knight, this.myCursor);
    }
}