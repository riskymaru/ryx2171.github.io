//AUTHOR: RICKY GUEVARRA

//My custom class for Howler Js
//I made this to control sound easier

class SoundFX {

	constructor(){

		this.BGM_VOLUME = 0.75;

		this.SFX_VOLUME =  1;

		this.sounds_on = true;

		this.SOUND_STATUS = "NORMAL";

		this.initSounds();
	}


	//init sounds should be customized and load data from JSON file
	//still work in progress for this class;

	initSounds(){
		

		let dir = "assets/sndm4a/";

		let ext = ".m4a"

		let sound_list = [
				//title / loop

				["bgm1",true,this.BGM_VOLUME],
                ["sfx-btn2",false,this.SFX_VOLUME],
                ["sfx-btn1",false,this.SFX_VOLUME],
                ["sfx-win",false,this.SFX_VOLUME],
                ["sfx-wrong",false,this.SFX_VOLUME],
                ["sfx-display-score",false,this.SFX_VOLUME],
                ["sfx-button-click",false,this.SFX_VOLUME],
                ["sfx-tick",false,this.SFX_VOLUME],

                ["sfx-beep",false,this.SFX_VOLUME],
                ["sfx-reveal-score",false,this.SFX_VOLUME]
		];

		let i = 0;
		let len = sound_list.length;

		for(i=0; i<len; i++){
			this[ sound_list[i][0] ] = new Howl({
												src:[dir + sound_list[i][0] + ext],
												loop:sound_list[i][1],
												volume: sound_list[i][2]
											} );
		}

	}

	play(snd){
		this[snd].play();
	}


	/*stopAll(){

	}*/

	stop(snd){
		this[snd].stop();
	}

	mute(){
		Howler.volume(0);
	}

	toggleAudio(_id,_idle){
		if(_id==false){
			Howler.mute(true);
			if(_idle == false){
				this.SOUND_STATUS = "MUTED"
			}
		}else
		if(_id==true){
			Howler.mute(false)
			if(_idle == false){	
				this.SOUND_STATUS = "NORMAL";	
			}
		}
	}


	fadeOutPlay(_id,_delay,_duration){

		let self = this;

		this.play(_id);

		this[_id].volume(1);

		let obj = {volume:1};

		TweenMax.to(obj,_duration,{
								volume:0,
								delay:_delay,
								onUpdate:function(){
									SFX[_id].volume(obj.volume);
								},
								onComplete:function(){
									self.stop(_id);
									SFX[_id].volume(1);
								}
		});
	}


}