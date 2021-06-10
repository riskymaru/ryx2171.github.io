"use strict";

class PixiPreload {

	constructor(app){
        this.img = [];
        this.pixi = app;
        this.loadImg = this.loadImage;
        this.loadSuccess = this.loadComplete;
        this.loader = new PIXI.Container();

        this.createPrelodScene();
        this.init();
    }

    init(){

        this.pixi.loader.baseUrl = 'assets/img';

        this.pixi.loader
            .add('main-bg.png' ,     'bg/main-bg.png')

            .add('home.png' ,     'others/home.png')
            .add('info.png' ,     'others/info.png')
            .add('selection.png', 'others/selection.png')
            .add('lvl-1.png' ,    'others/lvl-1.png')
            .add('lvl-2.png' ,    'others/lvl-2.png')
            .add('lvl-3.png' ,    'others/lvl-3.png')
            .add('effect.png' ,    'others/effect.png')
            .add('congrats.png' ,    'others/congrats.png')
            .add('questionmark.png' , 'others/questionmark.png')
            .add('butterfly.png' , 'others/butterfly.png')
            .add('effect-top.png' , 'others/effect-top.png')

            .add('result-level1.png' ,     'level-label/result-level1.png')
            //.add('result-level2.png' ,     'level-label/result-level2.png')
            //.add('result-level3.png' ,     'level-label/result-level3.png')

            .add('lvl-text-1.png' ,     'level-label/lvl-text-1.png')
            .add('lvl-text-2.png' ,     'level-label/lvl-text-2.png')
            .add('lvl-text-3.png' ,     'level-label/lvl-text-3.png')

            .add('logo2.png' ,     'logo/logo2.png')
            .add('logo1.png' ,     'logo/logo1.png')


            .add('info-lvl-1.png' ,    'questions/info-lvl-1.png')
            .add('info-lvl-2.png' ,    'questions/info-lvl-2.png')
            .add('q1.png' ,    'questions/q1.png')
            .add('q2.png' ,    'questions/q2.png')
            .add('q3.png' ,    'questions/q3.png')
            .add('q4.png' ,    'questions/q4.png')
            .add('q5.png' ,    'questions/q5.png')

            .add('qq1.png' ,    'questions/qq1.png')
            .add('qq2.png' ,    'questions/qq2.png')
            .add('qq3.png' ,    'questions/qq3.png')
            .add('qq4.png' ,    'questions/qq4.png')
            .add('qq5.png' ,    'questions/qq5.png')

            .add('qqq1.png' ,    'questions/qqq1.png')
            .add('qqq2.png' ,    'questions/qqq2.png')
            .add('qqq3.png' ,    'questions/qqq3.png')
            .add('qqq4.png' ,    'questions/qqq4.png')
            .add('qqq5.png' ,    'questions/qqq5.png')

            .add('q2a.png' ,    'questions/q2a.png')
            .add('qq1a.png' ,    'questions/qq1a.png')
            .add('qq5a.png' ,    'questions/qq5a.png')
            .add('qqq3a.png' ,    'questions/qqq3a.png')
            .add('qqq4a.png' ,    'questions/qqq4a.png')

            //.add('q4.png' ,    'questions/q4.png')
            ;//end of preload

            this.pixi.loader.onProgress.add(this.showProgress,this);
            this.pixi.loader.onComplete.add(this.loadComplete,this);
            this.pixi.loader.onError.add(this.onError,this);
            this.pixi.loader.load();
    }

    createPrelodScene(){

            const preloader_x = 360;
            const preloader_y = 650;

            this.preloadScene = new PIXI.Container();
            this.pixi.stage.addChild(this.preloadScene);
           

            this.bg = new PIXI.Graphics();
            this.bg.beginFill(0x0);
            this.bg.lineStyle(4, 0x050505, 1);
            this.bg.drawRect(0,0,config.pixiSettings.width,config.pixiSettings.height);
            this.bg.endFill();
            this.preloadScene.addChild(this.bg);

            this.touchtext = this.preloadScene.addChild(new PIXI.Text('Touch the screen to continue',{fontFamily : 'Arial', 
															 fontSize: 20, 
															 fill : 0x999999, 
															 fontWeight: 'bold',
															 align : 'center'}
											));
            this.touchtext.position.set(512,600);
            this.touchtext.anchor.set(0.5)
            this.touchtext.visible = false;

            this.preloadbarbg = new PIXI.Graphics();
            this.preloadbarbg.beginFill(0x333333);
            this.preloadbarbg.drawRect(0, 0, 300, 5);
            this.preloadbarbg.endFill();
            //this.preloadbarbg.scale.set(0,0.5);
            this.preloadbarbg.position.set(preloader_x, preloader_y);

            this.preloadbar = new PIXI.Graphics();
            this.preloadbar.beginFill(0xff00cc);
            this.preloadbar.drawRect(0, 0, 300, 5);
            this.preloadbar.endFill();
            this.preloadbar.scale.set(0,0.5);
            this.preloadbar.position.set(preloader_x, preloader_y);

            this.preloadScene.addChild(this.preloadbarbg);
            this.preloadScene.addChild(this.preloadbar);

            this.preloadText = this.preloadScene.addChild(new PIXI.Text('',{fontFamily : 'Arial', 
															 fontSize: 20, 
															 fill : 0x999999, 
															 fontWeight: 'bold',
															 align : 'center'}
                                                ));

            this.preloadText.position.set(512,preloader_y+35)
            this.preloadText.anchor.set(0.5)
        
    }

    loadImage(image){
      return this.pixi.loader.resources[image].texture; //PIXI.Texture.from(this.pixi.loader.resources[image].url);
    }

    onError(e){
        //console.log('error',e);
    }

    showProgress(e){
        //console.log('progress: ' , e.progress);
        this.preloadbar.scale.set(e.progress*0.01,1);
        this.preloadText.text = parseInt(e.progress) + '%';
    }

    loadComplete(){
        
        const customEvent = new Event('loadComplete',{'success':true});

        this.bg.on('pointerdown',this.onStartScene,this);
        this.bg.interactive = true;
        this.bg.buttonMode = true;
        this.touchtext.visible = true;

        this.preloadbarbg.visible = false;
        this.preloadbar.visible = false;
        this.preloadText.visible = false;
        
    }

    onStartScene(){
        console.log("test123")
        this.preloadScene.destroy();
        this.loader.emit("loadComplete");
    }
}

