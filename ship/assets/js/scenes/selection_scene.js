class SelectionScene extends Scene{

	constructor(_parent){
		super();
	}

	create(_parent,_scene_manager){

		this._scene_manager = _scene_manager;

		this.texture = _parent.assets.loadImg('bg_main');

		this._parent = this;	
		

		this.createSplashScreen(_parent);

		this._scene_manager.addChild(this);
	}

	createOtherStuff(_parent){

		const background1 = new PIXI.Sprite(_parent.assets.loadImg('bg_mid_layer') );
		this.addChild(background1);
		background1.position.set(0,300);

		const background2 = new PIXI.Sprite(_parent.assets.loadImg('mountain_2') );
		this.addChild(background2);
		background2.position.set(0,450);

		const background3 = new PIXI.Sprite(_parent.assets.loadImg('mountain_1') );
		this.addChild(background3);
		background3.position.set(0,550);	

		const logo = new PIXI.Sprite(_parent.assets.loadImg('logo') );
		logo.anchor.set(0.5);
		this.addChild(logo);
		logo.position.set(640,150);


		const selection_1 = new PIXI.Sprite(_parent.assets.loadImg('option_1') );
		selection_1.anchor.set(0.5);
		this.addChild(selection_1);
		selection_1.position.set(400,400);
		selection_1.name = "selection_1";
		//selection_1.tint = 0x666666;
		this.selection_1 = selection_1;

		const selection_2 = new PIXI.Sprite(_parent.assets.loadImg('option_2') );
		selection_2.anchor.set(0.5);
		this.addChild(selection_2);
		selection_2.position.set(880,400);
		selection_2.name = "selection_2";
		//selection_2.tint = 0x666666;
		this.selection_2 = selection_2;

		const done_button = new PIXI.Sprite(_parent.assets.loadImg('play_button') );
		done_button.anchor.set(0.5);
		this.addChild(done_button);
		done_button.position.set(640,640);
		done_button.name = "done_button";
		done_button.visible = false;
		this.done_button = done_button;


		//collect all buttons
		const button_arr = [
								selection_1,
								selection_2,
								done_button
							];	

		//add action for each button
		this.addButtonControl(button_arr);
	}


	createSplashScreen(_parent){

		const self = this;

		const splash_screen_container = new PIXI.Container();
		this.addChild(splash_screen_container);

		const black_background = new PIXI.Graphics();
        black_background.beginFill(0x000000);
        black_background.drawRect(0, 0, 1280, 720);
        black_background.endFill();
        splash_screen_container.addChild(black_background);

		const ryx_intro = new PixiAtlas("ryx_intro",_parent)
		ryx_intro.anchor.set(0.5)
		ryx_intro.position.set(640,300	)
		splash_screen_container.addChild(ryx_intro);
		//ryx_intro.scale.set(1);
		ryx_intro.animationSpeed = 0.5;
		ryx_intro.visible = true;
		//ryx_intro.tint = 0xcccccc;	
		ryx_intro.play();	


		TweenMax.to(splash_screen_container,1,{
												startAt:{aplha:1},
												alpha:0,
												delay:4,
												onStart:function(){
													ryx_intro.visible = false;
												},
												onComplete:function(){
													self.createOtherStuff(_parent);
												}
		})

		
	}


	addButtonControl(button_arr){

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

		SFX["button_2"].play();

		switch(btn.name){

			case "done_button":
				console.log("name: ",btn.name);
				self._scene_manager.changeScene(1);
			break;

			case "selection_1":
				btn.tint = 0xffffff;
				this._parent.selection_2.tint = 0x666666;
				this._parent.done_button.visible = true;
				config.SHIP_SELECTED = 1;
			break

			case "selection_2":
				btn.tint = 0xffffff;
				this._parent.selection_1.tint = 0x666666;
				this._parent.done_button.visible = true;
				config.SHIP_SELECTED = 2;
			break

		};
	}

	destruct(){
       //this.ticker.stop();
       TweenMax.killAll(false,true,false);
        this.destroy();
    }


}