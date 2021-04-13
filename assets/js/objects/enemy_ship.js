class EnemyShip extends PIXI.Sprite{

	constructor(_parent){

		super();

		this.MAX_LIFE = 2;
		this.LIFE = this.MAX_LIFE;
		this.ID = -1;

		this.create(_parent);
	}

	create(_parent){

		_parent.container.addChild(this);

		this.texture = _parent.assets.loadImg("enemy_ship");
		this.position.set(2000,2000);
		this.anchor.set(0.5);
		this.pivot.set(0.5);
	}


	//it will turn red if shot once
	showHitAnimation(){

		const self = this; 

		this.tint = 0xff0000;

		TweenMax.to(this,0.05,{
			startAt:{alpha:1},
			alpha:0.8,
			repeat:3,
			yoyo:true,
			onComplete:function(){
				self.tint = 0xffffff;
			}
		})
	}

	resetShip(){
		this.LIFE = this.MAX_LIFE;
		this.visible = true;
		this.position.set(1500,400);
	}
}