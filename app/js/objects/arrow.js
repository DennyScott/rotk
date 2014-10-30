(function(){

	var Arrow = function(x, y, scale) {
		var _arrow = this;
		var _isUp;
		var _sprite;
		var upArrow = 'upArrow';
		var downArrow = 'downArrow';

		var _initalize = function(x, y, scale) {
			_isUp = true;
			_sprite = game.add.sprite(x, y, upArrow);
			_sprite.scale.x = scale;
			_sprite.scale.y = scale;
		};

		this.flip = function(){
			if(_isUp){
				_renderFlip(downArrow);
			}else{
				_renderFlip(upArrow);
			}
		};

		this.isUp = function() {
			console.log(_isUp);
			return _isUp;
		}

		var _renderFlip = function(texture) {
			_sprite.loadTexture(texture);
			_isUp = !_isUp;
		};

		_initalize(x, y, scale);
	}

	game.arrow = Arrow;
})();