(function() {

	var Player = function(name, x, y){
		var _player = this;
		var _name;
		var _health;
		var _text;

		var _initalize = function(name, x, y){
			_name = name;
			_health = 50;
			_text = game.add.text(x, y, _createLabel(), {
				font: '40px Geo',
				fill: '#000000'
			})
		};

		var _createLabel = function(){
			return name + "'s Health: " + _health;
		}

		this.health = function(){
			return _health;
		}

		this.isDead = function(){
			if(_health <= 0 ){
				return true
			}else{
				return false;
			}
		}

		this.getWidth = function() {
			return _text.width;
		}

		this.getHeight = function() {
			return _text.height;
		}

		this.takeDamage = function(amount){
			_health -= amount;
			_text.text = _createLabel();
			return _health;
		}

		this.heal = function(amount){
			_health += amount;
			_text.text = _createLabel();
			return _health;
		}


		_initalize(name, x, y);
	}

	game.player = Player;

})();