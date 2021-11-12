import { Injectable } from "@angular/core";
import { GameObjects, Tweens } from "phaser";
import Phaser from 'phaser';

@Injectable()

export class Loader_c extends Phaser.Scene{
    // declaracion de variables
    knight?: GameObjects.Sprite;
    portal?: GameObjects.Sprite;
    portal_final?: GameObjects.Sprite;
    Background?: GameObjects.Image;
    //time?: Tweens.Timeline;
    //tweens?:Tweens.Tween;

    //constructor
    constructor(){
        super({key:"Loader_c"});
    }

    ngOnInit(): void {
    }

    preload(){
        this.load.path = "../../assets/";
        this.load.atlas('portal', 'portal/portal.png', 'portal/portal_atlas.json');
        this.load.animation('portal_anim_', 'portal/portal_anim.json');
        this.load.atlas('knight_idle', 'knight/knight_idle/knight_idle.png', 'knight/knight_idle/knight_idle_atlas.json');
        this.load.animation('knight_anim_', 'knight/knight_idle/knight_idle_anim.json');
        this.load.image('multiverso','multiverso.png');
        //alert("escena 2");
    }

    create(){
        //console.log("en escena Loader");
        
        // creamos el fondo
        this.Background = this.add.image(0,0,'multiverso');
        this.Background.setOrigin(0,0);
        this.Background.setScale(0.5,0.5);
        // creando al caballero
        this.knight = this.add.sprite(50, 130, 'knight_idle');
        this.knight!.anims.play('knight_idle_anim');
        this.knight.setName('knight');
        this.knight.setScale(2);
        this.knight.setDepth(8);
        this.knight.setOrigin(0.5,0.5);
        this.knight.setAlpha(0);

        // portal inicial
        this.portal = this.add.sprite(50, 150, 'portal').setScale(1);
        this.portal.flipX = true;
        this.portal!.anims.play('portal_anim');
        this.portal.setScale(0);


        // portal final
        this.portal_final = this.add.sprite(400, 150, 'portal').setScale(1);
        this.portal_final!.anims.play('portal_anim');
        this.portal_final.setScale(0);
        //this.portal_final.setAlpha(0);
        //console.log(this.portal_final);
        
        //creacion del tween
        // portal
        
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
        // knight
        this.tweens.timeline({
            targets: [this.knight],
            paused: true,
            ease: 'Sine',
            delay: 2000,
            tweens:[
                //primer tween aparecer al knight
                {alpha:1, x:170, ease:'Cubic', rotation:Math.PI * 2, duration: 1000},
                {x: 350, rotation:Math.PI * 2, loop:2, offset:1100, ease:'Linear', duration: 3000},
                {x: 400, y: 150,offset: 4000, duration: 500},
                {scale: 0, rotation: 45, ease:'Elastic', offset: 4500, duration:500}
            ]
        }).play();

        this.tweens.timeline({
            targets: [this.portal_final],
            paused: true,
            delay: 4000,
            tweens: [
                {
                    scale: 1,
                    ease: 'Bounce',
                    duration: 1000
                }
            ]
        }).play();

        this.tweens.timeline({
            targets: [this.portal],
            paused: true,
            delay: 5000,
            tweens: [
                {
                    scale: 0,
                    ease: 'back',
                    duration: 1000
                }
            ]
        }).play();

        this.tweens.timeline({
            targets: [this.portal_final],
            paused: true,
            delay: 7000,
            tweens: [
                {
                    scale: 0,
                    ease: 'back',
                    duration: 1000
                },
                {onComplete:() => {this.scene.start('game')}}
            ]
        }).play();

    }

    update(){

    }
}