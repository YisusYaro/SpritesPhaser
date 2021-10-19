import { Injectable } from "@angular/core";
import { GameObjects } from "phaser";
import Phaser from 'phaser';

@Injectable()

export class Loader extends Phaser.Scene{
    // declaracion de variables
    knight?: GameObjects.Sprite;
    Background?: GameObjects.Image;

    //constructor
    constructor(){
        super({key:"Loader"});
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
        console.log("en escena Loader");
        
        // creamos el fondo
        this.Background = this.add.image(0,0,'multiverso');
        this.Background.setOrigin(0,0);
        this.Background.setScale(0.5,0.5);
        // creando al caballero
        this.knight = this.add.sprite(120, 35, 'knight_idle');
        this.knight!.anims.play('knight_idle_anim');
        this.knight.setName('knight');

        //creacion del tween


    }

    update(){

    }
}