class Bullet extends PIXI.Sprite{

	constructor(_parent){
		super();
		this.ID = -1;
		this.TYPE = "normal";
		this._parent = _parent
		this.create(_parent);
	}

	create(_parent){

		_parent.container.addChild(this);

		this.texture = _parent.assets.loadImg("bullet_1");
		this.anchor.set(0.5);
		this.pivot.set(0.5);

	}

	changeBullet(_id){
		this.TYPE = _id
		this.texture = this._parent.assets.loadImg("bullet_" + _id);
	}

	resetBullet(){
		this.TYPE = 1;
		this.texture = this._parent.assets.loadImg("bullet_1");
	}

}