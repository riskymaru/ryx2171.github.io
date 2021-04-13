class GameScene extends Scene{

	constructor(_parent){

		super();

		this.isApple = PIXI.utils.isMobile.apple.device;

		this.FULL_SCREEN_MODE = false;

		//console.log('isOS: ',this.isApple);
	}

	create(_parent,_scene_manager){

		this._scene_manager = _scene_manager;

		this.texture = _parent.assets.loadImg('bg_main');
		
		this.createOtherStuff(_parent);

		_parent.container.addChild(this);

		SFX["bgm_1"].play();
	}

	createOtherStuff(_parent){

		const main_container = new PIXI.Container();
		this.addChild(main_container);

		const game_container = {
			container:main_container,
			assets:_parent.assets,
			parent:this,
		}


		const control = new Control();
		control.init(_parent);
		this.control = control;

		const background = new Background(game_container);
		control.BACKGROUND = background


		const ship = new Ship(game_container, config.SHIP_SELECTED);
		this.addChild(ship);
		control.SHIP = ship;
		
		const power_up = new PowerUp(game_container);
		this.addChild(power_up);
		power_up.visible = false;

		const hud_container = new PIXI.Container();
		this.addChild(hud_container);

		control.POWER_UP_ICON = power_up;

		const bullet_loader = new BulletLoader( game_container );
		control.addBulletPool( bullet_loader.bullet_pool );

		const enemy_bullet_loader = new BulletLoader( game_container, 4 );
		control.addEnemyBulletPool( enemy_bullet_loader.bullet_pool );

		const enemy_loader = new EnemyLoader( game_container );
		control.addEnemyPool( enemy_loader.ENEMY_POOL );

		//level design is located in config.js
		control.addSpawnSequence( config.SPAWN_SEQUENCE  );

		const explosion_loader = new ExplosionLoader( game_container );
		control.addExplosionPool( explosion_loader.EXPLOSION_POOL );


		const power_up_container = new PIXI.Sprite(_parent.assets.loadImg("power_up_container"));
		power_up_container.position.set(640,50);
		power_up_container.anchor.set(0.5);
		power_up_container.pivot.set(0.5);
		hud_container.addChild(power_up_container);

		const score_board = new PIXI.Sprite(_parent.assets.loadImg("score_board"));
		score_board.position.set(150,40);
		score_board.anchor.set(0.5);
		score_board.pivot.set(0.5);
		hud_container.addChild(score_board);

		const score_board_text = new PIXI.Text('0');
        score_board_text.position.set(120,5);
        score_board_text.anchor.set(1,0.5);
        score_board_text.style._fontFamily = "Roboto",
        score_board_text.style._fill = "#ffffff";
        score_board_text.style._fontSize = 25;
        score_board_text.style._align = "right";
        score_board.addChild(score_board_text);
        this.score_board_text = score_board_text;
        control.SCORE_TEXT = score_board_text;
		
		const bar = new PIXI.Sprite(_parent.assets.loadImg("bar"));
		bar.position.set(75,0);
		bar.anchor.set(1,0.5);
		bar.pivot.set(0.5);
		bar.scale.set(0.01,1);
		bar.tint = 0xffcc00;
		power_up_container.addChild(bar);
		control.POWER_BAR = bar;

		const fullscreen_button = new PIXI.Sprite(_parent.assets.loadImg("fullscreen_button"));
		fullscreen_button.position.set(1230,50);
		fullscreen_button.anchor.set(0.5);
		fullscreen_button.pivot.set(0.5);
		fullscreen_button.name = "fullscreen_button";
		hud_container.addChild(fullscreen_button);

		const shoot_button = new PIXI.Sprite(_parent.assets.loadImg("shoot_button"));
		shoot_button.position.set(1150,600);
		shoot_button.anchor.set(0.5);
		shoot_button.pivot.set(0.5);
		shoot_button.name = "shoot_button";
		hud_container.addChild(shoot_button);

		const joystick_button = new PIXI.Sprite(_parent.assets.loadImg("joystick_button"));
		joystick_button.position.set(150,550);
		joystick_button.anchor.set(0.5);
		joystick_button.pivot.set(0.5);
		joystick_button.name = "joystick_button";
		hud_container.addChild(joystick_button);

		const ship_explosion = new ShipExplosion(game_container);
		ship_explosion.position.set(640,350);
		ship_explosion.visible = false;
		control.SHIP_EXPLOSION = ship_explosion;


		const game_over = new GameOver(_parent)
		game_over.position.set(640,300);
		game_over.anchor.set(0.5);
		game_over.pivot.set(0.5);
		this.addChild(game_over);
		game_over.visible = false;

		const instructions = new PIXI.Sprite(_parent.assets.loadImg( config.PLATFORM + "_control") );
		instructions.position.set(640,550);
		instructions.anchor.set(0.5);
		instructions.pivot.set(0.5);
		this.addChild(instructions);
		instructions.visible = false;

		control.INSTRUCTIONS = instructions;


		//collect all buttons
		const button_arr = [
								fullscreen_button,
								shoot_button,
								game_over.play_button,
								game_over.home_button
							]

		this.addButtonControl(button_arr);

		//create diffrent control for touchscreen
		control.setTouchControl( joystick_button );

		control.GAME_OVER_SCREEN = game_over;

		control.HUD_CONTAINER = hud_container;


		//run game start;
		control.prepareGameStart();

		if(config.PLATFORM == "desktop"){
			joystick_button.visible = false;
			shoot_button.visible = false;
		}

	}

	addButtonControl( button_arr ){

		let self = this;

		button_arr.forEach(function(b){

			b.interactive = true;
        	b.buttonMode = true;

			b.on('pointerdown',function(e){
				self.allBtnActions(b,self);
	        },self);

		});
	}

	allBtnActions(btn){

		const self = this;

		if(btn._out!=undefined){
			btn.texture = this.parent.assets.loadImg(btn._out);
		}
		
		if(btn.name != "spin"){
			TweenMax.to(btn.scale,0.1,{startAt:{x:1,y:1},x:0.9,y:0.9,repeat:1,yoyo:true});
			TweenMax.to(btn,0.1,{startAt:{alpha:1},alpha:0.8,repeat:1,yoyo:true});
		}

		//SFX.play("button_click");

		//console.log("name: ",btn.name);

		switch(btn.name){

			case "shoot_button":
				this.control.shootBullet();
			break;

			case "fullscreen_button":
				console.log("scene",self.pixi);
				takeScreenshot(self.pixi);
				//this.toggleFullscreen();
			break;

			case "home_button":
				SFX["bgm_1"].stop();
				this._scene_manager.changeScene(0);
			break;

			case "play_button":
				showInputText();
				this.control.prepareGameStart();
			break;
		}
	}


	toggleFullscreen(){

		let self = this;

		if(self.isApple == false){

			if(self.FULL_SCREEN_MODE == false){
				document.documentElement.webkitRequestFullscreen();
				document.documentElement.webkitRequestFullscreen();
				document.documentElement.webkitRequestFullscreen();
				self.FULL_SCREEN_MODE = true;
			}else{
				document.webkitExitFullscreen();
				//document.documentElement.webkitExitFullscreen();//not working
				self.FULL_SCREEN_MODE = false;
			}
		}

	}


	destruct(){
        //this.ticker.stop();
        TweenMax.killAll(false,true,false);
        this.destroy();
    }
}