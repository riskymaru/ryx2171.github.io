class Control {

	constructor( ){

		this.SHIP = null;
		this.SHIP_SPD = 4;

        //direction id 
		this.MOVE_UP = false;
		this.MOVE_LEFT = false;
		this.MOVE_RIGHT = false;
		this.MOVE_DOWN = false;


        //object pool
		this.EXPLOSION_POOL = null;
        this.ENEMY_POOL = null;
        this.ENEMY_BULLET_POOL = null;
        this.BULLET_POOL = null;


		this.EXPLOSION_CURRENT_ID = 0;

		this.BULLET_ARR_RELEASE = [];//max bullet that will appear in screen;
		this.BULLET_SPD = 10;
		this.BULLET_CURRENT_ID = 0;
		this.MAX_BULLET = 60;

        this.MAX_BULLET_RELEASE = 50

		
		this.ENEMY_ARR_RELEASE = [];//max enemy that will appear in screen;
		this.ENEMY_SPD = 5;
		this.ENEMY_CURRENT_ID = 0;
		this.MAX_ENEMY = 30;
		
		this.ENEMY_BULLET_ARR_RELEASE = [];//max enemy bullet that will appear in screen;
		this.ENEMY_BULLET_SPD = 10;
		this.ENEMY_BULLET_CURRENT_ID = 0;
		this.ENEMY_MAX_BULLET = 50;
		this.ENEMY_SHOOT_COUNTER = 0;
		this.ENEMY_SHOOT_DELAY = 80;
        this.ENEMY_WHO_WILL_SHOOT_ID = 0;

		this.ENEMY_SPAWNING = false;
		this.ENEMY_SPAWN_CTR = 0;
		this.SPAWN_SEQUENCE = null;
		this.SPAWN_SEQUENCE_ID = 0;

		this.ENEMY_SPAWN_DELAY = 100;// enemy will spawn ins creen

		this.ENEMY_CHASE_Y_SPD = 160;// the smaller the faster chase

        //objects that are declared in game_scene.js
		this.SCREEN = null; 
		this.SCORE_TEXT = null;
		this.GAME_OVER_MODE = false;
		this.GAME_OVER_SCREEN = null;
		this.BACKGROUND = null;
		this.HUD_CONTAINER = null;
        this.INSTRUCTIONS = null;
        this.POWER_UP_ICON = null;
        this.POWER_BAR = null;
        this.SHIP_EXPLOSION = null;


		this.POWER_UP = "NONE";//MULTISHOT/NONE/HOMING/SHIELD
		this.POWER_UP_LIST = ["NONE","MULTISHOT","HOMING","SHIELD"];

		this.MASTER_PAUSE = false;

        //this holds the overall animation and ticker
        //ticker means every tick of frame it will do something
		this.MASTER_TIMELINE = new TimelineMax();

	}

	init(_parent ){

		let self = this;

		this.SCREEN = _parent.container;


        //control using WASD or ARROW_KEYS
		document.addEventListener('keydown', function(event) {

			if ( self.MASTER_PAUSE == false  ){

				if( event.key == "d" || event.key == "ArrowRight" ){
					self.MOVE_RIGHT = true;
				}else
				if( event.key == "a" || event.key == "ArrowLeft" ){
					self.MOVE_LEFT = true;
				}

				if( event.key == "w" || event.key == "ArrowUp" ){
					self.MOVE_UP = true;
				}else
				if( event.key == "s" || event.key == "ArrowDown" ){
					self.MOVE_DOWN = true;
				}

			}

		});

		document.addEventListener('keyup', function(event) {

			if (self.MASTER_PAUSE == false ){

				if( event.key == "d" || event.key == "ArrowRight" ){
					self.MOVE_RIGHT = false;
				}else
				if( event.key == "a" || event.key == "ArrowLeft" ){
					self.MOVE_LEFT = false;
				}

				if( event.key == "w" || event.key == "ArrowUp" ){
					self.MOVE_UP = false;
				}else
				if( event.key == "s" || event.key == "ArrowDown" ){
					self.MOVE_DOWN = false;
				}

				
				if( event.key == " " || event.key == "Enter" ){
					self.shootBullet();
				}
			}
		});


		//create a loop function to handle movement
		//it will call function continuously
	}

    //this will create a loop the will run every frame
	createTicker( ){
		let self = this;

		return TweenMax.to(this,1,{
									onUpdate:function( ){
										self.onTickEvent(self);
									},
									repeat:-1
								})
	}


    //this will be called every frame
	onTickEvent(_parent ){
		if( this.GAME_OVER_MODE == false ){
			if( this.MASTER_PAUSE == false ){
				this.moveShip(_parent);
				this.shipBulletMovement()
				this.enemySpawningTicker();
				this.checkGameCollision();
				this.powerUpMovement();
				this.checkEnemyShoot();
                this.enemyBulletMovement()
			}
		}
	}

    //generate background and ticker loop
    generateGameTimeline( ){

        this.MASTER_TIMELINE.stop();
        this.MASTER_TIMELINE.clear();
        this.MASTER_TIMELINE.kill();
        
        this.MASTER_TIMELINE.appendMultiple(
                    [
                        this.BACKGROUND.createTicker(),
                        this.createTicker()
                    ]
            )
        this.MASTER_TIMELINE.play();
    }




	prepareGameStart( ){

		this.generateGameTimeline();

		let self = this;

		this.GAME_OVER_SCREEN.visible = false;

		this.SCORE_TEXT.text = 0;
		config.SCORE = 0;

		this.SHIP.visible = true;
		this.SHIP.position.set(-200,300);

		this.HUD_CONTAINER.alpha = 0;
		this.HUD_CONTAINER.y = 1000;

		TweenMax.to(this.SHIP,2,{x:300,ease:Back.easeOut,delay:1});

		TweenMax.to(this.HUD_CONTAINER,1,{
			startAt:{alpha:0,y:1000},
			alpha:1,
			y:0,
			delay:2,
			ease:Back.easeOut,
			onComplete:function( ){

                if( config.FIRST_OPEN == true ){

                    self.INSTRUCTIONS.visible = true;

                    config.FIRST_OPEN = false;

                    TweenMax.delayedCall(5,function(){
                        self.INSTRUCTIONS.visible = false;
                        self.gameStart();
                    })    

                }else{
                    self.gameStart();
                }
				
			}
		});

        
	}

	/*gamePause( ){
		this.MASTER_TIMELINE.stop();
		this.MASTER_PAUSE = true;
	}*/

    /*gameResume( ){
        this.MASTER_TIMELINE.play();
        this.MASTER_PAUSE = false;
    }*/

	gameStart( ){
			this.GAME_OVER_MODE = false;
			this.startEnemySpawn();
			this.HUD_CONTAINER.visible = true;
	}


	moveShip(_parent ){

			if(  _parent.MOVE_UP && _parent.SHIP.y > 100 ){
				_parent.SHIP.y -= _parent.SHIP_SPD;
			}else

			if(  _parent.MOVE_DOWN && _parent.SHIP.y < 600 ){
				_parent.SHIP.y += _parent.SHIP_SPD;
			}

			if(  _parent.MOVE_LEFT && _parent.SHIP.x > 100 ){
				_parent.SHIP.x -= _parent.SHIP_SPD;
			}else

			if(  _parent.MOVE_RIGHT && _parent.SHIP.x < 1100 ){
				_parent.SHIP.x += _parent.SHIP_SPD;
			}
	}

	shipBulletMovement( ){

			let i=0;
			let len = this.BULLET_ARR_RELEASE.length;
			let _bullet = null;

			if( this.BULLET_POOL != null || this.BULLET_POOL != undefined ){

				let _enemy = null;

				for(i=0;i<len;i++ ){

                    _bullet = this.BULLET_ARR_RELEASE[i];

                    if( _bullet != undefined ){

        					if( _bullet.visible == true ){


        						if(  this.POWER_UP == "HOMING"  ){ 

                                         _enemy = this.ENEMY_ARR_RELEASE[ 0 ]; // it will check 1st enemy

            							if( _enemy != undefined && _bullet.TYPE == 2 ){

            									_bullet.y -= (_bullet.y - _enemy.y) / 10;
            									_bullet.x -= (_bullet.x - _enemy.x) / 10;
            									_bullet.x += 2;

            							}else{
            								_bullet.x += this.BULLET_SPD;
            							}

        						}else{

        							     _bullet.x += this.BULLET_SPD;

        						}

        						if( _bullet.x > 1280 ){

        							_bullet.visible = false;
        						}
        					}
                    }
				}
			}
	}


	addBulletPool( _bullet_pool  ){
			this.BULLET_POOL = _bullet_pool;
	}

	powerUpMovement( ){
    		if( this.POWER_UP_ICON.visible == true ){

    			this.shipToPowerUpCollision(this.POWER_UP_ICON, this.SHIP);
                this.POWER_UP_ICON.y+= 1;
                this.POWER_UP_ICON.x-= 1;

    		}

    		if( this.POWER_UP_ICON.x <= 0 ){
    			this.POWER_UP_ICON.visible = false;
    			this.POWER_UP_ICON.x = 1400;
                TweenMax.killTweensOf(this.POWER_UP_ICON);
    		}
	}

	showPowerUp( ){
    		this.POWER_UP_ICON.visible = true;
    		this.POWER_UP_ICON.x = 640;
    		this.POWER_UP_ICON.y = 0;
            this.POWER_UP_ICON.scale.set(1);
            TweenMax.to(this.POWER_UP_ICON.scale,0.2,{startAt:{x:1,y:1},x:1.2,y:1.2,repeat:-1,yoyo:true});
	}

	selectPower( ){
		const rnd = Math.floor(Math.random()*3);
		this.POWER_UP = this.POWER_UP_LIST[rnd+1];
		//this.gamePause();
	}

	startPowerUp( ){

		let self = this;

		this.selectPower();

        TweenMax.killTweensOf(this.POWER_UP_ICON);

        SFX["get_power_up"].play();

		if( self.POWER_UP == "SHIELD" ){
			self.SHIP.toggleShield(true);
		}

		self.POWER_BAR.visible = true;

		TweenMax.killTweensOf(this.POWER_BAR);

		TweenMax.to(this.POWER_BAR.scale,5,{
											startAt:{x:1},
											x:0.01,
											ease:Linear.easeNone,
											onComplete:function( ){

												if( self.POWER_UP=="SHIELD" ){
													self.SHIP.toggleShield(false);
												}

												self.POWER_BAR.visible = false;
												self.POWER_UP = "NONE";
											}
										});
	}

	prepareBulletToShoot( ){

            let _bullet =  this.BULLET_POOL[ this.BULLET_CURRENT_ID ];

			_bullet.x = this.SHIP.x;
			_bullet.y = this.SHIP.y + 20;
			_bullet.visible = true;

			if( this.POWER_UP == "HOMING" ){
				_bullet.changeBullet(2);
			}else

			if( this.POWER_UP == "MULTISHOT" ){
				_bullet.changeBullet(3);

			}else{
				_bullet.resetBullet();
			}

			this.BULLET_ARR_RELEASE.push( _bullet );

			this.BULLET_CURRENT_ID+=1;

			if( this.BULLET_CURRENT_ID >= this.MAX_BULLET ){
				this.BULLET_CURRENT_ID = 0;
			}

			if(  this.BULLET_ARR_RELEASE.length >= this.MAX_BULLET_RELEASE  ){
                this.BULLET_ARR_RELEASE[0].visible = false;
				this.BULLET_ARR_RELEASE.shift();
			}
	}

	shootBullet( ){

			let i=0;

            let _id = 0

			if( this.POWER_UP == "HOMING" ){

				this.prepareBulletToShoot()
				SFX["shoot_3"].play();
			
			}else
			if( this.POWER_UP == "MULTISHOT" ){

				SFX["shoot_2"].play();
				SFX["shoot_1"].play();

				for(i=0; i<3; i++ ){

					this.prepareBulletToShoot();

                    _id = this.BULLET_CURRENT_ID;
					
					if(  this.BULLET_POOL[ _id -1 ]  !== undefined  ){
						this.BULLET_POOL[ _id -1 ].x = this.SHIP.x + (i == 1 ? 20 : 0);
						this.BULLET_POOL[ _id -1 ].y = this.SHIP.y -20 + ( 20*i);
					}
				}
			}else{
                    //NORMAL BULLET
					SFX["shoot_1"].play();
					this.prepareBulletToShoot()
			}
	}

	addExplosionPool( _explosion_pool  ){
		this.EXPLOSION_POOL = _explosion_pool;
	}

	showExplosion( _enemy  ){

		SFX["explosion_1"].play();

		let explosion_obj =	this.EXPLOSION_POOL[ this.EXPLOSION_CURRENT_ID] ;

		explosion_obj.visible = true;
		explosion_obj.x = _enemy.x;
		explosion_obj.y = _enemy.y;

		explosion_obj.gotoAndPlay(1);

		TweenMax.to(explosion_obj,0.5,{ 
			startAt:{alpha:0},
			alpha:1,
			onComplete:function( ){
				explosion_obj.visible = false;
			}
		})

		this.EXPLOSION_CURRENT_ID += 1;

		if( this.EXPLOSION_CURRENT_ID>=4 ){
			this.EXPLOSION_CURRENT_ID = 0;
		}

        this.shakeScreen();
	}


	//ENEMY--------------------------------------------

	//
	addEnemyPool( _enemy_pool  ){
		this.ENEMY_POOL = _enemy_pool;
	}

	startEnemySpawn( ){
		this.ENEMY_SPAWNING = true;
	}

	addSpawnSequence( _spawn_sequence  ){
		this.SPAWN_SEQUENCE = _spawn_sequence
	}

	addEnemyInStage( ){

			let i = 0;

			let enemy_len = this.SPAWN_SEQUENCE[ this.SPAWN_SEQUENCE_ID ].length;

			let enemy_ship = null;

			for(i=0; i<enemy_len; i++ ){

					if( this.SPAWN_SEQUENCE[ this.SPAWN_SEQUENCE_ID ][ i ] !== 0  ){//zero is for power ups

						enemy_ship = this.ENEMY_POOL[ this.ENEMY_CURRENT_ID ];

						this.ENEMY_ARR_RELEASE.push( enemy_ship );

						enemy_ship.resetShip();

						if(  this.ENEMY_ARR_RELEASE.length >= this.MAX_ENEMY  ){
                            this.ENEMY_POOL[0].visible = false;
							this.ENEMY_ARR_RELEASE.shift();
						}

                        //set enemy postion based on the config.js list
                        //this apply the level design in config.js

                        //enemy texture can be changed here also, based on the level design
						enemy_ship.y = this.SPAWN_SEQUENCE[ this.SPAWN_SEQUENCE_ID ][ i ].y;

						this.ENEMY_CURRENT_ID += 1;

						if( this.ENEMY_CURRENT_ID >= this.MAX_ENEMY ){
							this.ENEMY_CURRENT_ID = 0;
						}

					}else
					if( this.SPAWN_SEQUENCE[ this.SPAWN_SEQUENCE_ID ][ i ] == 0 ){//show power ups
						this.showPowerUp();
						console.log("showPowerUp");
					}

			}

			this.SPAWN_SEQUENCE_ID += 1;

			if(  this.SPAWN_SEQUENCE_ID >= this.SPAWN_SEQUENCE.length  ){
				this.SPAWN_SEQUENCE_ID = 0;

                //this will add the difficulty,
                //the more you play the faster the enemy spawn
                this.ENEMY_SPAWN_DELAY -= 20;
			}
	}

	addEnemyBulletPool( _bullet_pool  ){
		this.ENEMY_BULLET_POOL = _bullet_pool;
	}


	checkEnemyShoot( ){

        if( this.ENEMY_SPAWNING == true ){
    		this.ENEMY_SHOOT_COUNTER+=1;

    		if( this.ENEMY_SHOOT_COUNTER>=this.ENEMY_SHOOT_DELAY ){
    			this.ENEMY_SHOOT_COUNTER = 0;
    			this.enemyShootBullet();
    		}
        }
	}

	enemyBulletMovement( ){

        if( this.ENEMY_SPAWNING == true ){

    			let i=0;
    			let len = this.ENEMY_BULLET_ARR_RELEASE.length;
    			let _bullet = null;

    			if( this.ENEMY_BULLET_POOL != null || this.ENEMY_BULLET_POOL != undefined ){

    				for(i=0;i<len;i++ ){

                       _bullet = this.ENEMY_BULLET_ARR_RELEASE[i];

                       if( _bullet != undefined ){

        					if( this.ENEMY_BULLET_ARR_RELEASE[i].visible == true ){

        						_bullet.x -= this.BULLET_SPD * 0.75;
                                _bullet.rotation -= 0.1;
        			
        						if( _bullet.x <= 0 ){
        							_bullet.visible = false;
                                    this.removeFromArray( _bullet, this.ENEMY_BULLET_ARR_RELEASE );
        						}
        					}
                        }
    				}
    			}
        }
	}


	enemyShootBullet( ){

            let _enemy = this.ENEMY_ARR_RELEASE[ this.ENEMY_WHO_WILL_SHOOT_ID ];

            if( _enemy != undefined  ){

			     this.prepareEnemyBulletToShoot(_enemy );
                 //SFX["shoot_1"].play();
                 SFX["chicken_shoot"].play();
            }

            if( this.ENEMY_WHO_WILL_SHOOT_ID < this.ENEMY_ARR_RELEASE.length ){
                this.ENEMY_WHO_WILL_SHOOT_ID +=1;
            }else{
                this.ENEMY_WHO_WILL_SHOOT_ID = 0;
            }

	}

	prepareEnemyBulletToShoot( _enemy  ){

			this.ENEMY_BULLET_POOL[ this.ENEMY_BULLET_CURRENT_ID].x = _enemy.x;
			this.ENEMY_BULLET_POOL[ this.ENEMY_BULLET_CURRENT_ID].y = _enemy.y + 20;
			this.ENEMY_BULLET_POOL[ this.ENEMY_BULLET_CURRENT_ID].visible = true;

			this.ENEMY_BULLET_ARR_RELEASE.push( this.ENEMY_BULLET_POOL[ this.ENEMY_BULLET_CURRENT_ID] );

			this.ENEMY_BULLET_CURRENT_ID+=1;

			if( this.ENEMY_BULLET_CURRENT_ID >= this.ENEMY_MAX_BULLET ){
				this.ENEMY_BULLET_CURRENT_ID = 0;
			}

			if(  this.ENEMY_BULLET_ARR_RELEASE.length >= this.ENEMY_MAX_BULLET  ){
                this.ENEMY_BULLET_ARR_RELEASE[0].visible = false;
				this.ENEMY_BULLET_ARR_RELEASE.shift();
			}
	}

	explodeEnemy(_enemy ){

			SFX['chicken'].play();
			this.showExplosion( _enemy );  
			this.addPlusScore();
			this.removeFromArray( _enemy , this.ENEMY_ARR_RELEASE );
            _enemy.visible = false;
            _enemy.x = 1500;
	}

	addPlusScore( ){

			config.SCORE += 100;
			this.SCORE_TEXT.text = convert( config.SCORE, "num2comma");
	}


	enemyMovement( ){

		    let i=0;

			let len = this.ENEMY_ARR_RELEASE.length;

			if( this.ENEMY_POOL != null || this.ENEMY_POOL != undefined ){
				for(i=0;i<len;i++ ){
					if( this.ENEMY_ARR_RELEASE[i] != undefined  ){
						if( this.ENEMY_ARR_RELEASE[i].visible == true  ){
							this.enemyMoveStyle( this.ENEMY_ARR_RELEASE[i], this.SHIP );
						}
					}
				}
			}
	}



	removeFromArray( _enemy , _array  ){

		let arr_id = null;

		arr_id = _array.indexOf(_enemy);

		_array.splice(arr_id,1);
	}


	enemyMoveStyle(_enemy,_ship ){

		if( _enemy.x < 0 ){
			
            _enemy.visible = false;
            _enemy.x = 1500;
			this.removeFromArray( _enemy, this.ENEMY_ARR_RELEASE );

		}

		if( _enemy.visible == true ){
			_enemy.x -= this.ENEMY_SPD;
		}

		_enemy.y -= (_enemy.y - _ship.y) / this.ENEMY_CHASE_Y_SPD;

	}

	enemySpawningTicker( ){

		if( this.ENEMY_SPAWNING == true ){

			this.ENEMY_SPAWN_CTR += 1;

			if( this.ENEMY_SPAWN_CTR > this.ENEMY_SPAWN_DELAY ){
				this.ENEMY_SPAWN_CTR = 0;
				this.addEnemyInStage();
			}
		}

		this.enemyMovement();
	}


	checkGameCollision( ){

		if(  this.ENEMY_SPAWNING == true ){

                let i = 0;
                let j = 0;

				if(  this.BULLET_ARR_RELEASE != undefined && this.ENEMY_ARR_RELEASE != undefined  ){

					let bullet_len = this.BULLET_ARR_RELEASE.length;
					let enemy_len =  this.ENEMY_ARR_RELEASE.length;

					for(i=0; i<enemy_len; i++  ){

						for(j=0; j<bullet_len; j++ ){

							this.bulletToEnemyCollision( this.ENEMY_ARR_RELEASE[i], this.BULLET_ARR_RELEASE[j] );
						}

						this.shipToEnemyCollision( this.ENEMY_ARR_RELEASE[i], this.SHIP );
					}
				}

                let enemy_bullet_len = this.ENEMY_BULLET_ARR_RELEASE.length;

                if( enemy_bullet_len>0 ){

                    for(j=0; j<enemy_bullet_len; j++ ){

                        this.shipToEnemyBulletCollision( this.SHIP, this.ENEMY_BULLET_ARR_RELEASE[j] );

                    }
                }
		}
	}

	bulletToEnemyCollision( _enemy, _bullet ){

		if(  _enemy !== undefined && _bullet !== undefined  ){ 

			if(  _enemy.visible == true && _bullet.visible == true  ){ 

				if(  collide( _enemy, _bullet)   ){

					_enemy.LIFE -= 1;
					if( _enemy.LIFE > 0  ){

						SFX["hit_1"].play();
						SFX['chicken_shout'].play();
						_enemy.showHitAnimation();

					}else{

						this.explodeEnemy( _enemy );  

					}
					
					_bullet.visible = false;
				}
			}
		}
	}

	shipToEnemyCollision( _enemy, _ship ){

		if(  _enemy !== undefined && _ship !== undefined  ){ 

			if(  _enemy.visible == true && _ship.visible == true  ){ 
	
				if(  collide( _enemy, _ship)   ){

					this.explodeEnemy( _enemy );  

					if(  this.POWER_UP !== "SHIELD"  ){
						_ship.visible = false;
						this.showExplosion( _ship );  
						this.showGameOver();
					}
				}
			}
		}
	}


    shipToEnemyBulletCollision( _ship, _bullet ){

        if(  _ship !== undefined && _bullet !== undefined  ){ 

            if(  _ship.visible == true && _bullet.visible == true  ){ 

                if(  collide( _ship, _bullet)   ){

                    if(  this.POWER_UP !== "SHIELD"  ){
                        _ship.visible = false;
                        this.showExplosion( _ship );  
                        this.showGameOver();
                    }

                    SFX["bullet_deflect"].play();

                    _bullet.visible = false;
                    _bullet.x = 1500;
                }
            }
        }
    }

	shipToPowerUpCollision( _power, _ship ){

		if(  collide( _power, _ship)   ){

			_power.visible = false;
			this.SHIP.toggleShield(false);
			this.POWER_UP = "NONE";
			this.startPowerUp();

		}
	}


	showGameOver( ){

        let self = this;

		this.controlReset();

        this.GAME_OVER_SCREEN.show();
		
		this.HUD_CONTAINER.visible = false;
		this.GAME_OVER_MODE = true;
        this.SHIP_EXPLOSION.x = this.SHIP.x;
        this.SHIP_EXPLOSION.y = this.SHIP.y;
        this.SHIP_EXPLOSION.playExplosion();
	}


	shakeScreen( ){

		TweenMax.to(this.SCREEN,0.1,{startAt:{x:0},x:3,repeat:3,yoyo:true});
		TweenMax.to(this.SCREEN,0.2,{startAt:{y:0},y:6,repeat:3,yoyo:true});
	}


	//touch control
	setTouchControl( joystick_button  ){

        //pressed - will check if the button is on press and hold state
        //if the player remove their touch in the button it will be updated to false;
		let pressed = false;
		let self = this;

		joystick_button.interactive = true;
        joystick_button.buttonMode = true;

		joystick_button.on("touchstart", function(event) {
		  	pressed = true;
		});


		joystick_button.on("touchmove", function(event) {

			if( pressed == true ){
		  		//console.log("move",event.data.global);
		  		if( event.data.global.x < 150 - 10 ){
		  			self.MOVE_LEFT = true;
		  			self.MOVE_RIGHT = false;
		  		}else
		  		if( event.data.global.x > 150+10 && event.data.global.x < 400 ){
		  			self.MOVE_RIGHT = true;
		  			self.MOVE_LEFT = false;
		  		}

		  		if( event.data.global.y < 550 - 10 && event.data.global.x < 400 ){
		  			self.MOVE_UP = true;
		  			self.MOVE_DOWN = false;
		  		}else
		  		if( event.data.global.y > 550 + 10 && event.data.global.x < 400 ){
		  			self.MOVE_DOWN = true;
		  			self.MOVE_UP = false;
		  		}
		  	}
		});


		joystick_button.on("touchend", function(event) {
			
		  	pressed = false;

		  	self.MOVE_LEFT = false;
		  	self.MOVE_RIGHT = false;
		  	self.MOVE_UP = false;
		  	self.MOVE_DOWN = false;
		});

		joystick_button.on("touchendoutside", function(event) {

		  	pressed = false;
		  	self.MOVE_LEFT = false;
		  	self.MOVE_RIGHT = false;
		  	self.MOVE_UP = false;
		  	self.MOVE_DOWN = false;
		});
	}


	controlReset( ){


		this.POWER_UP_ICON.visible = false;
		this.POWER_UP_ICON.x = 1500;

		this.MOVE_UP = false;
		this.MOVE_LEFT = false;
		this.MOVE_RIGHT = false;
		this.MOVE_DOWN = false;

		this.EXPLOSION_CURRENT_ID = 0;

		this.BULLET_ARR_RELEASE = [];
		this.BULLET_SPD = 10;
		this.BULLET_CURRENT_ID = 0;
		this.MAX_BULLET = 50;

		this.ENEMY_ARR_RELEASE = [];
		this.ENEMY_SPD = 5;
		this.ENEMY_CURRENT_ID = 0;
		this.MAX_ENEMY = 40;

		this.ENEMY_BULLET_ARR_RELEASE = [];
		this.ENEMY_BULLET_SPD = 10;
		this.ENEMY_BULLET_CURRENT_ID = 0;
		this.ENEMY_MAX_BULLET = 50;
		this.ENEMY_SHOOT_COUNTER = 0;
		this.ENEMY_SHOOT_DELAY = 200;

		this.ENEMY_SPAWNING = false;
		this.ENEMY_SPAWN_CTR = 0;
		this.SPAWN_SEQUENCE_ID = 0;

        this.ENEMY_SPAWN_DELAY = 120;
	
		this.POWER_UP = "NONE";

		let i=0;
		let bullet_len = this.BULLET_POOL.length;

		let enemy_len = this.ENEMY_POOL.length
        let enemy_bullet_len = this.ENEMY_BULLET_POOL.length;

		for(i=0; i<bullet_len; i++ ){
			this.BULLET_POOL[i].position.set(-300,-300);
			this.BULLET_POOL[i].visible = false;
		}

        for(i=0; i<enemy_bullet_len; i++ ){
            this.ENEMY_BULLET_POOL[i].position.set(-300,-300);
            this.ENEMY_BULLET_POOL[i].visible = false;
        }

		for(i=0; i<enemy_len; i++ ){
			this.ENEMY_POOL[i].position.set(-2000,-2000);
			this.ENEMY_POOL[i].visible = false;
		}
	}


}