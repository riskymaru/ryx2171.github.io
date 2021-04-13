class Background extends PIXI.Sprite{

	constructor(_parent){
		super();

		this.speed = 15;


		this.create(_parent);
	}

	create(_parent){

		_parent.container.addChild(this);
		//set the iniitial bg texture
		this.texture = _parent.assets.loadImg('bg_main')

		const background = new PIXI.Sprite(_parent.assets.loadImg('bg_mid_layer') );
		this.addChild(background);
		background.position.set(0,190);	
		background.alpha = 0.25;

		const floor = new PIXI.Sprite(_parent.assets.loadImg('bg_floor') );
		this.addChild(floor);
		floor.position.set(0,600);	

		//back layer
		const layer_back = new PIXI.Container();
		this.addChild(layer_back)
		layer_back.position.y = 350
		this.layer_back = layer_back;

		const mountain_back_1 = new PIXI.Sprite(_parent.assets.loadImg('mountain_2') );
		layer_back.addChild(mountain_back_1);
		mountain_back_1.position.set(0,0);
		mountain_back_1.tint = 0x336699;
		mountain_back_1.alpha = 0.25;

		const mountain_back_2 = new PIXI.Sprite(_parent.assets.loadImg('mountain_2') );
		layer_back.addChild(mountain_back_2);
		mountain_back_2.position.set(2000,0);
		mountain_back_2.tint = 0x336699;
		mountain_back_2.alpha = 0.25;

		//mid layer
		const layer_mid = new PIXI.Container();
		this.addChild(layer_mid);
		layer_mid.position.y = 455;
		this.layer_mid = layer_mid;

		const mountain_mid_1 = new PIXI.Sprite(_parent.assets.loadImg('mountain_1') );
		layer_mid.addChild(mountain_mid_1);
		mountain_mid_1.position.set(0,0);

		const mountain_mid_2 = new PIXI.Sprite(_parent.assets.loadImg('mountain_1') );
		layer_mid.addChild(mountain_mid_2);
		mountain_mid_2.position.set(1280,0);

		//
		//this.addMovement(TL);
	}


	//this will export the moving animation of the background to be controlled in "control.j"
	createTicker(){
		
		let obj = [
				TweenMax.to( this.layer_mid, this.speed , {startAt:{x:0},x:-1280,repeat:-1,ease:Linear.easeNone}),
				TweenMax.to( this.layer_back, this.speed * 3 , {startAt:{x:0},x:-2000,repeat:-1,ease:Linear.easeNone})
			 ];


		return obj;
	}

}