class SceneManager extends PIXI.Container{

	constructor(_parent,_scenes){
		super();

		this.current_scene = null;
		
		this.scenes = _scenes;

		this._parent = _parent;

		this.pixi = _parent.pixi;

		this.create(_parent)
	}



	create(_parent){

		//add the scene manager 
		_parent.container.addChild(this);
	}

	changeScene(_scene_id){

		let new_scene = null;

		//init selected scene
		switch(_scene_id){

			case 0:
				const selection_scene = new SelectionScene();
				new_scene = selection_scene;
			break;

			case 1:
				const game_scene = new GameScene();
				new_scene = game_scene;
			break;

		}

		if(this.current_scene != null){
			this.removeScene( this.current_scene );
		}

		new_scene.create(this._parent,this);
		new_scene.pixi = this.pixi;
		this.current_scene = new_scene;
	}

	removeScene(scene){
        console.log("remove scene");
        this.removeChild(scene);
        scene.destruct();
        TweenMax.killAll(false,true,false);
    }

}