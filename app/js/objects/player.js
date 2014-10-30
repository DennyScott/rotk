(function() {

	var Player = function(name){
		var _name;
		var _health;

		var _initalize = function(name){
			_name = name;
			_health = 50;
		};


		_initalize(name);
	}

	game.player = Player;

})();