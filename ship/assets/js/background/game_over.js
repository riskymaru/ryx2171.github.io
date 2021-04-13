class GameOver extends PIXI.Sprite{

	constructor(_parent){
		super();

		this.create(_parent);
	}


	create(_parent){

		
		_parent.container.addChild(this);

		this.texture = _parent.assets.loadImg("game_over")
		this.position.set(640,400)
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		const home_button = new PIXI.Sprite( _parent.assets.loadImg("home_button")	);
		home_button.position.set(-150,270);
		home_button.anchor.set(0.5);
		home_button.pivot.set(0.5);
		home_button.name = "home_button";
		this.addChild(home_button);
		this.home_button = home_button;

		const play_button = new PIXI.Sprite( _parent.assets.loadImg("play_button")	);
		play_button.position.set(150,270);
		play_button.anchor.set(0.5);
		play_button.pivot.set(0.5);
		play_button.name = "play_button";
		this.addChild(play_button);
		this.play_button = play_button;

		const total_score = new PIXI.Text('0');
        total_score.position.set(0,23);
        total_score.anchor.set(0.5);
        total_score.style._fontFamily = "Roboto",
        total_score.style._fill = ["#ffcc00","#ff6600"];
        total_score.style._stroke = "#5c4242";
        total_score.style._strokeThickness = 5;
        total_score.style._fontSize = 80;
        total_score.style._fontWeight = "bolder"; 
        total_score.style._align = "center";
        this.addChild(total_score);
        this.total_score = total_score;
	}

	show(){
		this.visible = true;
		this.alpha = 0;
		TweenMax.to(this.scale,1,{startAt:{x:1.25,y:1.25},x:1,y:1,ease:Bounce.easeOut,delay:2});
		TweenMax.to(this,1,{startAt:{alpha:0},alpha:1,ease:Bounce.easeOut,delay:2});

		let score = {total:0};
		let self = this;

		let snd_ctr = 0;

		if(config.SCORE>0){
				TweenMax.to(score,3,{
					total:config.SCORE,
					delay:2,
					ease:Linear.easeNone,
					onUpdate:function(){
						snd_ctr+=1;

						if(snd_ctr==4){
							SFX["score_up"].play();
							self.total_score.text =convert( parseInt(score.total), "num2comma" );
							snd_ctr=0;
						}

						
					},onComplete:function(){
						self.total_score.text = convert( config.SCORE, "num2comma" );
					}
				})
		}else{
			self.total_score.text = "0";
		}

	}

}