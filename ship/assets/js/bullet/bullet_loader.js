class BulletLoader{

	constructor(_parent, _id){
		this.current_bullet_id = 0;

		this.bullet_pool = null;

		this.createBulletPool(_parent, _id)
	}

	createBulletPool(_parent, _id){
		let i = 0;
		let max_bullet = 60;

		let bullet_pool = [];

		for( i=0; i<max_bullet; i++ ){
			bullet_pool[i] = new Bullet(_parent);
			bullet_pool[i].position.set(-100,-100);
			bullet_pool[i].visible = false;

			if(_id != undefined){
				bullet_pool[i].changeBullet( _id );
			}
		}

		this.bullet_pool = bullet_pool;
	}


}