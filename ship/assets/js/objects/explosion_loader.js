class ExplosionLoader{

	constructor(_parent){

		this.CURRENT_EXPLOSION_ID = 0;

		this.EXPLOSION_POOL = null;

		this.createExplosionPool(_parent);
	}

	

	createExplosionPool(_parent){
		let i = 0;
		let MAX_EXPLOSION = 5;

		let EXPLOSION_POOL = [];

		for( i=0; i<MAX_EXPLOSION; i++ ){

			EXPLOSION_POOL[i] = new PixiAtlas("explosion_a",_parent)
			EXPLOSION_POOL[i].anchor.set(0.5)
			EXPLOSION_POOL[i].position.set(1500,400)
			EXPLOSION_POOL[i].scale.set(1);
			EXPLOSION_POOL[i].animationSpeed = 0.5;
			EXPLOSION_POOL[i].visible = true;
		}

		this.EXPLOSION_POOL = EXPLOSION_POOL;
	}



}