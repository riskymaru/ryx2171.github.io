"use strict"

class PixiGame{

	
		constructor(pixi,assets){
			//this.pixi -> holds the pixi framework
			this.pixi = pixi;

			this.assets = assets// assets is the preloader object

		}

		onCompletePreload(){
			//super.this.assets.loadComplete();
			console.log('Assets Loading Complete 100%');
		
			//create
			this.create();
		}

		create(){
			/**
			 * @type {Container}
			 * @description
			 * it holds the whole game display
			 */

			 //create general game container
			const game_container = new PIXI.Container();
			this.pixi.stage.addChild(game_container);
			//-----------------------------------------------------------

			//create object that can be pass to other class
			const main_game_container = {
				'container':game_container,
				'assets': this.assets,
				"pixi":this.pixi,
			}


			//load scene using this manager
			const scene_manager = new SceneManager(main_game_container);

			//load initial scene
			scene_manager.changeScene(0);
			//-----------------------------------------------------------
			
	}

}

