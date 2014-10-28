(function() {

	var Board = function() {
		var _board = this;
		var _completeBoard = game.add.group();
		var _outerBoard;
		var _one, _two, _three, _four, _five, _six, _seven, _eight, _nine;
		var _scale = 0.333333;
		var _positions;
		var _tileArray;
		var tiles = game.add.group(_completeBoard, 'tiles', true);

		var _initalize = function(){
			_outerBoard = game.add.image(game.world.centerX, game.world.centerY, 'blackTile');
			_outerBoard.anchor.setTo(0.5, 0.5);

			_getPositions();
			_createTileArray();
			_createTilesOnBoard();
		};

		var _createTileArray = function() {
			_tileArray = [_two, _nine, _three, _eight, _one, _seven, _four, _six, _five];
		};

		var _createTilesOnBoard = function() {
			for (var i = 0; i < _tileArray.length; i++) {
				_tileArray[i] = game.add.image(_positions[i].x, _positions[i].y, 'whiteTile', null, tiles);
				_tileArray[i].scale.x = _scale;
				_tileArray[i].scale.y = _scale;
			};

			
		}

		var _getPositions = function() {
			var xLeft = _outerBoard.x - (_outerBoard.width/2);
			var xCenter = xLeft + (_outerBoard.width*_scale);
			var xRight = _outerBoard.x + (_outerBoard.width/2) - (_outerBoard.width*_scale);

			var yTop = _outerBoard.y - (_outerBoard.height/2);
			var yCenter = yTop + (_outerBoard.height*_scale);
			var yBottom = _outerBoard.y + (_outerBoard.height/2) - (_outerBoard.height * _scale);

			_positions = [
				{x: xLeft, y: yTop},
				{x: xCenter, y: yTop},
				{x: xRight, y: yTop},
				{x: xLeft, y: yCenter},
				{x: xCenter, y: yCenter},
				{x: xRight, y: yCenter},
				{x: xLeft, y: yBottom},
				{x: xCenter, y: yBottom},
				{x: xRight, y: yBottom}
			];
		};

		_initalize();

	}

	game.board = Board;
})();