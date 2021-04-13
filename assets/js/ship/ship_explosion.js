class ShipExplosion extends PIXI.Sprite{

	constructor(_parent){
		super();

		this.POWER_UP = "none";

		this.create(_parent);
	}

	create(_parent){
		
		_parent.container.addChild(this);

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		const flying_pogs = new PIXI.Sprite(_parent.assets.loadImg("flying_pogs"));
		flying_pogs.position.set(0,0);
		flying_pogs.anchor.set(0.5);
		flying_pogs.pivot.set(0.5);
		flying_pogs.scale.set(0.15);
		this.addChild(flying_pogs);
		this.flying_pogs = flying_pogs;

		this.createParticles(_parent);
	}
	

	createParticles(_parent){

		let obj_particles = [];

		let i = 0;

		let self = this;

		for( i=0; i<12; i++ ){
			obj_particles[i] = new PIXI.Sprite(_parent.assets.loadImg("particle_1"));
			obj_particles[i].position.set(0,0);
			obj_particles[i].anchor.set(0.5);
			obj_particles[i].pivot.set(0.5);
			this.addChild( obj_particles[i] );
		}

		this.obj_particles = obj_particles;

		/*TweenMax.delayedCall(3,function(){
			self.playExplosion();
		})
		//this.playExplosion();*/
	}

	playExplosion(){
		let i = 0;

		let self = this;

		this.visible = true;

		TweenMax.to(this.flying_pogs.scale,1,{
												startAt:{y:0.2,x:0.2},
												y:1,
												x:1 
											})

		TweenMax.to(this.flying_pogs,1,{
											startAt:{y:0,x:0,alpha:1},
											y:600,
											alpha:0,
											ease:Back.easeIn,
											onComplete:function(){
												self.visible = false;
											}
										})

		for( i=0; i<12; i++ ){
			TweenMax.to(this.obj_particles[i],1,{
												startAt:{y:0,x:0},
												y: i > 5 ? -600 : 600,
												x: (300+(Math.random()*1200)) *(i % 2==0 ? 1 : -1),
												//ease:Back.easeIn,
												delay:(0.01*i)
										});
		}
	}


}