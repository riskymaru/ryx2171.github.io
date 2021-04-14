"use strict";

class PixiPreload {

    constructor(app,config){

        this.pixi = app;

        this.events = new PIXI.Container();

        this.createPrelodScene(config);
    }

    init(){

        this.pixi.loader.baseUrl = 'assets/img';

        this.pixi.loader

                //load all background
                .add('bg_main' ,     '/bg/bg_main.png')
                .add('game_over' ,     '/bg/game_over.png')
                .add('bg_mid_layer' ,     '/bg/bg_mid_layer.png')
                .add('mountain_1' ,     '/bg/mountain_1.png')
                .add('mountain_2' ,     '/bg/mountain_2.png')
                .add('cloud_1' ,     '/bg/cloud_1.png')
                .add('bg_floor' ,     '/bg/bg_floor.png')

                //load ships
                .add('ship_1' ,     '/ship/ship_1.png')
                .add('ship_2' ,     '/ship/ship_2.png')
                .add('enemy_ship' ,     '/ship/enemy_ship.png')

                //load bullet
                .add('bullet_1' ,       '/objects/bullet_1.png')
                .add('bullet_2' ,       '/objects/bullet_2.png')
                .add('bullet_3' ,       '/objects/bullet_3.png')
                .add('bullet_4' ,       '/objects/bullet_4.png')


                //loader extra
                .add('mobile_control' ,       '/objects/mobile_control.png')
                .add('desktop_control' ,    '/objects/desktop_control.png')
                .add('power_up_icon' ,       '/objects/power_up_icon.png')
                .add('score_board' ,    '/objects/score_board.png')
                .add('power_up_container' ,    '/objects/power_up_container.png')
                .add('bar' ,               '/objects/bar.png')
                .add('logo' ,               '/objects/logo.png')
                .add('flying_pogs' ,               '/objects/flying_pogs.png')
                .add('particle_1' ,               '/objects/particle_1.png')

                //load buttons
                .add('option_1' ,       '/buttons/option_1.png')
                .add('option_2' ,       '/buttons/option_2.png')
                .add('shoot_button' ,       '/buttons/shoot_button.png')
                .add('joystick_button' ,    '/buttons/joystick_button.png')
                .add('fullscreen_button' ,    '/buttons/fullscreen_button.png')
                .add('play_button' ,        '/buttons/play_button.png')
                .add('home_button' ,        '/buttons/home_button.png')
                .add('start_game_button' ,    '/buttons/start_game_button.png')

                //load spritesheets
                .add('shield' ,    '/spritesheets/shield.json')
                .add('explosion_a' ,    '/spritesheets/explosion_a.json')
                .add('ryx_intro' ,    '/intro/ryx_intro.json')

            ;//end of preload


            this.pixi.loader.onProgress.add(this.showProgress,this);
            this.pixi.loader.onComplete.add(this.loadComplete,this);
            this.pixi.loader.onError.add(this.onErrorShow,this);

            //load files
            this.pixi.loader.load();
    }

    createPrelodScene(){

            const preloader_y = 600;

            this.preloadScene = new PIXI.Container();
            this.pixi.stage.addChild(this.preloadScene);

            this.bg = new PIXI.Graphics();
            this.bg.beginFill(0x000000);
            this.bg.lineStyle(4, 0x030303, 1);
            this.bg.drawRect(0, 0, 1280, 720);
            this.bg.endFill();
            this.bg.x = 0;
            this.bg.y = 0;
            this.preloadScene.addChild(this.bg);

            this.progress_bar_bg = new PIXI.Graphics();
            this.progress_bar_bg.beginFill(0x606060);
            this.progress_bar_bg.drawRect(0, 0, 620, 5);
            this.progress_bar_bg.endFill();
            this.progress_bar_bg.x = 330;
            this.progress_bar_bg.y = preloader_y;
            this.preloadScene.addChild(this.progress_bar_bg);

            this.progress_bar = new PIXI.Graphics();
            this.progress_bar.beginFill(0xffffff);
            this.progress_bar.drawRect(0, 0, 620, 5);
            this.progress_bar.endFill();
            this.progress_bar.scale.set(0,0.5)
            this.progress_bar.x = 330;
            this.progress_bar.y = preloader_y;
            this.preloadScene.addChild(this.progress_bar);

            const preload_txt = new PIXI.Text('Loading Assets.. Please wait...');
            preload_txt.position.set(640,preloader_y+50);
            preload_txt.anchor.set(0.5);
            preload_txt.style._fontFamily = "Arial",
            preload_txt.style._fill = "#ffffff";
            preload_txt.style._fontSize = 20;
            this.preloadScene.addChild(preload_txt);
            this.preload_txt = preload_txt;

            const logo = new PIXI.Sprite.from('assets/img/preloader/preloader_logo.jpg');
            this.preloadScene.addChild(logo);
            logo.position.set(640,380); 
            logo.anchor.set(0.5); 
            this.logo = logo;
    }

    loadImg(image){
        //console.log('load',this.pixi.loader.resources[image].texture)
      return this.pixi.loader.resources[image].texture; //PIXI.Texture.from(this.pixi.loader.resources[image].url);
    }


    loadSpritesheet(image){
        //console.log('loadSpritesheet',image,this.pixi.loader.resources[image]);
        return this.pixi.loader.resources[image].spritesheet; //PIXI.Texture.from(this.pixi.loader.resources[image].url);
    }

    onErrorShow(e){
        console.log('error',e);
    }

    showProgress(e){
        //console.log('progress: ' , e.progress);
        this.progress_bar.scale.set(e.progress*0.01,1);
        this.preload_txt.text = "Loading "+ Math.ceil(e.progress) +"%";
    }

    /*hidePreloaderBar(){
        this.preload_txt.visible = false;
        this.progress_bar.visible = false;
        this.progress_bar_bg.visible = false;
    }
    */

    loadComplete(){
        //const customEvent = new Event('loadComplete',{'success':true});
        this.events.emit("loadComplete");
        this.preloadScene.destroy();

    }
}

