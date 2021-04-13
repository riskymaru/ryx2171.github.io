class Ship extends PIXI.Sprite{

	constructor(_parent, _id){
		super();

		this.POWER_UP = "none";

		this.create(_parent, _id);
	}

	create(_parent, _id){
		
		_parent.container.addChild(this);

		this.texture = _parent.assets.loadImg("ship_" + _id)
		this.position.set(200,200)
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		const shield = new PixiAtlas("shield",_parent)
		shield.anchor.set(0.5)
		this.addChild(shield);
		shield.animationSpeed = 0.5;
		shield.visible = false;
		shield.loop = true;
		
		this.shield = shield;
	}
	
	toggleShield( _id ){
		if(_id == true){
			SFX['shield'].play();
			this.shield.visible = true;
			this.shield.gotoAndPlay(1);	
		}else{
			SFX['shield'].stop();
			this.shield.visible = false;
			this.shield.stop();
		}
	}


}