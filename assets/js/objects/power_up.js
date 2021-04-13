class PowerUp extends PIXI.Sprite{
	constructor( _parent ){
		super();
		this.create( _parent );
	}

	create(_parent){
		_parent.container.addChild(this);
		this.texture = _parent.assets.loadImg("power_up_icon");
	}

	/**work in progress*/
}