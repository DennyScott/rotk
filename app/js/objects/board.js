(function() {

	var Board = function() {
		var _board = this;
		var _completeBoard = game.add.group();
		var _outerBoard;
		var _one = {
				text: '1'
			},
			_two = {
				text: '2'
			},
			_three = {
				text: '3'
			},
			_four = {
				text: '4'
			},
			_five = {
				text: '5'
			},
			_six = {
				text: '6'
			},
			_seven = {
				text: '7'
			},
			_eight = {
				text: '8'
			},
			_nine = {
				text: '9'
			};
		var _scale = 0.333333;
		var _positions;
		var _tileArray;
		var text = game.add.group(_completeBoard, 'text', true);
		var tiles = game.add.group(_completeBoard, 'tiles', true);

		var _initalize = function() {
			_outerBoard = game.add.sprite(game.world.centerX, game.world.centerY, 'blackTile');
			_outerBoard.anchor.setTo(0.5, 0.5);

			_getPositions();
			_createTileArray();
			_createTilesOnBoard();
			_rotateBoard();
		};

		var _createTileArray = function() {
			_tileArray = [_two, _nine, _three, _eight, _one, _seven, _four, _six, _five];
		};

		var _createTilesOnBoard = function() {
			for (var i = 0; i < _tileArray.length; i++) {
				_tileArray[i].sprite = game.add.sprite(_positions[i].x, _positions[i].y, 'whiteTile', null, tiles);
				_tileArray[i].sprite.scale.x = _scale;
				_tileArray[i].sprite.scale.y = _scale;
				_outerBoard.addChild(_tileArray[i].sprite);

				var spriteText = game.add.text(game.world.centerX - (_tileArray[i].sprite.width / 2), game.world.centerY - (_tileArray[i].sprite.height / 2), _tileArray[i].text, 
				{
					font: '70px Geo',
					fill: '#000000',
					align: 'center'
				}, text);

				spriteText.anchor.setTo(0.5, 0.5);
				spriteText.angle = -45;

				_tileArray[i].sprite.addChild(spriteText);
			};
		};

		var _rotateBoard = function() {
			_outerBoard.angle += 45;
		}

		var _getPositions = function() {
			var xLeft = 0 - (_outerBoard.width / 2);
			var xCenter = xLeft + (_outerBoard.width * _scale);
			var xRight = 0 + (_outerBoard.width / 2) - (_outerBoard.width * _scale);

			var yTop = 0 - (_outerBoard.height / 2);
			var yCenter = yTop + (_outerBoard.height * _scale);
			var yBottom = 0 + (_outerBoard.height / 2) - (_outerBoard.height * _scale);

			_positions = [{
				x: xLeft,
				y: yTop
			}, {
				x: xCenter,
				y: yTop
			}, {
				x: xRight,
				y: yTop
			}, {
				x: xLeft,
				y: yCenter
			}, {
				x: xCenter,
				y: yCenter
			}, {
				x: xRight,
				y: yCenter
			}, {
				x: xLeft,
				y: yBottom
			}, {
				x: xCenter,
				y: yBottom
			}, {
				x: xRight,
				y: yBottom
			}];
		};

		_initalize();

	}

	game.board = Board;
})();