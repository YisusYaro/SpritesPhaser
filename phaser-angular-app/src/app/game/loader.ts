import { Injectable } from "@angular/core";
import { GameObjects } from "phaser";
import Phaser from 'phaser';

@Injectable()

export class Loader extends Phaser.Scene {

    necromancer?: GameObjects.Sprite;
    hell?: GameObjects.Sprite;
    portal1?: GameObjects.Sprite;
    portal2?: GameObjects.Sprite;
    music?: Phaser.Sound.BaseSound;
    timeline?: Phaser.Tweens.Timeline;
    hahaha?: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: "Loader" });
    }

    ngOnInit(): void {
    }

    preload() {
        this.load.path = "../../assets/";
        this.load.atlas('portal', 'portal/portal.png', 'portal/portal_atlas.json');
        this.load.animation('portal_anim_', 'portal/portal_anim.json');

        //hell
        this.load.atlas('hell', 'hell/hell.png',
            'hell/hell_atlas.json');
        this.load.animation('hell_anim', 'hell/hell_anim.json');


        this.load.audio('music', 'music.mp3');
        this.load.audio('hahaha', 'hell/hahaha.mp3');

        //portal
        this.load.atlas('portal', 'portal/portal.png',
            'portal/portal_atlas.json');
        this.load.animation('portal_anim_', 'portal/portal_anim.json');

        //necromancer
        this.load.atlas('necromancer_idle', 'necromancer/necromancer_idle/necromancer_idle.png',
            'necromancer/necromancer_idle/necromancer_idle_atlas.json');
        this.load.animation('necromancer_anim_', 'necromancer/necromancer_idle/necromancer_idle_anim.json');

    }

    create() {

        //background
        this.hell = this.add.sprite(this.scale.width / 2, this.scale.height / 2 + 20, 'hell').setScale(1);
        this.hell!.anims.play('hell_anim');
        this.hell.setName('hell');

        const musicVolume = 0.09;
        this.music = this.sound.add('music', { volume: musicVolume, loop: true });

        const hahahaVolume = 0.5;
        this.hahaha = this.sound.add('hahaha', { volume: hahahaVolume, loop: false });

        //portal1
        this.portal1 = this.add.sprite(55, 160, 'portal').setScale(1).setInteractive();
        this.portal1.setFlipX(true);
        this.portal1.input.dropZone = true;
        this.portal1!.anims.play('portal_anim');

        //portal2
        this.portal2 = this.add.sprite(400, 160, 'portal').setScale(0).setInteractive();
        this.portal2.input.dropZone = true;
        this.portal2!.anims.play('portal_anim');

        //necromancer
        this.necromancer = this.add.sprite(55, 160, 'necromancer_idle').setScale(3).setInteractive();
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
                    duration: 2000
                },
                {
                    scale: 6,
                    ease: 'Sine.easeInOut',
                    duration: 500,
                    onStart: () => { this.hahaha!.play() },
                },
                {
                    y: 80,
                    duration: 200
                },
                {
                    y: 160,
                    duration: 200
                },
                {
                    y: 80,
                    duration: 200
                },
                {
                    y: 160,
                    duration: 200
                },
                {
                    y: 80,
                    duration: 200
                },
                {
                    y: 160,
                    duration: 200
                },
                {
                    y: 80,
                    duration: 200
                },
                {
                    y: 160,
                    duration: 200
                },
                {
                    y: 80,
                    duration: 200
                },
                {
                    y: 160,
                    duration: 200
                },
                {
                    scale: 4,
                    ease: 'Sine.easeInOut',
                    duration: 500
                },
                {
                    x: 400,
                    duration: 1000,
                },
                {
                    rotation: 62.83185,
                    duration: 500,
                    onComplete: () => { this.scene.start('House'); },
                },
            ]
        });



        this.timeline.play();




        this.timeline = this.tweens.timeline({
            targets: [this.portal1],
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

        this.timeline = this.tweens.timeline({
            targets: [this.portal2],
            paused: true,
            tweens: [
                {
                    scale: 1,
                    ease: 'Sine.easeInOut',
                    duration: 1500,
                },
            ]
        });


        this.timeline.play();


    }

    update() {

    }
}