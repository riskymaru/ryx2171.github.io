
const config = new Config();

//preload sound assets
const SFX = new SoundFX();


document.addEventListener("DOMContentLoaded", function(){

	//init div container for canvas
	const gamecanvas = document.getElementById('canvas-app'); 

	const version = "Attack of Chickens v0.1.19";

	//init pixi game
	const pixiapp = new PIXI.Application(config.pixiSettings);

		  //add pixi to DOM
		  gamecanvas.appendChild(pixiapp.view);

	//preload all images
	const preloader = new PixiPreload(pixiapp,config);

	const game = new PixiGame(pixiapp,preloader);

	//ready preloader
	
	colorlog(version);


	config.PLATFORM =  ( PIXI.utils.isMobile.any == true ? "mobile" : "desktop");
	//this will init all pixi preloading task
	//then it will run the "loadComplete";
	preloader.init();

	//load complete event
	preloader.events.on('loadComplete',function(){
	    game.onCompletePreload();
	    console.log("loading complete");
	})



	//check sif the player leave the window tab
	//to mute the audio
	window.onfocus = function(e){  
		//if status is MUTE, sound will remain off
	  	if(SFX.SOUND_STATUS=="NORMAL"){
	  		SFX.toggleAudio(true,true);
		}
	}

	window.onblur = function(e) {
	  	SFX.toggleAudio(false,true);
	};

});