class EnemyLoader{

	constructor(_parent){
		this.CURRENT_ENEMY_ID = 0;

		this.ENEMY_POOL = null;
		this.SPAWN_SEQUENCE = null;

		this.createEnemyPool(_parent);
		//this.generateSpawnSquence();
	}


	createEnemyPool(_parent){
		let i = 0;
		let MAX_ENEMY = 41;

		let ENEMY_POOL = [];

		for( i=0; i<MAX_ENEMY; i++ ){
			ENEMY_POOL[i] = new EnemyShip(_parent);
			ENEMY_POOL[i].create(_parent);
			ENEMY_POOL[i].position.set(1300,400);
			ENEMY_POOL[i].visible = false;
			ENEMY_POOL[i].ID = i;
		}

		this.ENEMY_POOL = ENEMY_POOL;
	}


}