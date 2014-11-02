(function() {
	var game = window.game || {};

	/**
	 * Board Object. This will include each small tile, and the larger outer board. This will handle the creation of these
	 * objects, and any events needed triggererd on these objects.
	 */
	var Board = function(x, y, scale) {
		var _completeBoard = game.add.group(); //Entire Board Group
		var _outerBoard; //OuterBoard, parent of child tiles
		var _outerBoardScale;
		var _positions; //Coordinates for each Tile
		var _tileArray = []; //Array of all created Tile Objects
		var _positionArray = [2, 9, 3, 8, 1, 7, 4, 6, 5]; //Left to Right, top to Bottom positioning.
		var _combinations = []; //Possible Combinations in the game
		var tiles = game.add.group(_completeBoard, 'tiles', true); //Group for all tiles
		var _scale = 0.333333; //Scale of the smaller tiles compared to the larger tiles.
		var _awes = [];

		/**
		 * Constructor
		 */
		var _initalize = function(x, y, scale) {

			if (typeof scale === 'undefined') {
				scale = 1;
			}

			//Create the Outer Board
			_outerBoard = game.add.sprite(x, y, 'blackTile');
			_outerBoard.anchor.setTo(0.5, 0.5); //Anchor will be middle of object
			_outerBoard.scale.x = scale;
			_outerBoard.scale.y = scale;
			_outerBoardScale = scale;

			_getPositions(); //Calculate all positions for tiles based on _outerBoard
			_createTileArray(); //Place the tiles in an array, following an order for gameplay
			_createTilesOnBoard(); //Place the tiles in the positions found
			_rotateBoard(); //Rotate the board 45 degrees.
			_createCombinations();
		};


		/**
		 * Create the Tile Array. The positioning of each object in the array is to
		 * replicate the positioning of each value, left to right, top to bottom.
		 * @return {[type]} [description]
		 */
		var _createTileArray = function() {
			for (var i = 0; i < _positionArray.length; i++) {
				var tile = new game.tile(i + 1 + '');
				_tileArray.push(tile);
			}

		};

		/**
		 * Create each tile object, setting the correct scale, white tile, positioons, and text.
		 */
		var _createTilesOnBoard = function() {
			for (var i = 0; i < _tileArray.length; i++) {
				var index = _positionArray[i] - 1; //Use the position array to organize. Since we start with 0, negate 1

				//Create Tile Sprite
				var createdSprite = _tileArray[index].addSprite(_positions[i].x,
					_positions[i].y, _scale, tiles);

				//Add the sprite as a Child of the outerboard object
				_outerBoard.addChild(createdSprite);

			}
		};

		/**
		 * Rotate the angle of the Board by 45 degrees.
		 * @return {[type]} [description]
		 */
		var _rotateBoard = function() {
			_outerBoard.angle += 45;
		};

		/**
		 * Create array combinations of each possible "combo combination" on the board. To be a
		 * combination, they must follow in line directly or diagonally.
		 *
		 */
		var _createCombinations = function() {
			_combinations = [
				[4, 8, 2],
				[6, 1, 9],
				[5, 7, 3],
				[4, 6, 5],
				[8, 1, 7],
				[2, 9, 3],
				[4, 1, 3],
				[2, 1, 5]
			];
		};

		/**
		 * Play a Card, passing the number and the value. This will pass the responsibility
		 * onto the tile object to update the color
		 * @param  {[int]} number Number/position of the card
		 * @param  {[string]} color  The color to make the card. Can be blue, red, green, black, and white
		 */
		this.playNumberCard = function(number, color) {
			_tileArray[number - 1].changeTileColor(color); //Change current Tile Color
			_removeAwe(number);
			var winCounter = _checkCombinations(number, color, _checkCombinationTileForSameColor); //Check if the placed tile causes winners
			var loseCounter = _checkCombinations(number, color, _checkCombinationTileForOposingColors); //Check if the placed tile causes losers
			var combos = {
				win: winCounter,
				lose: loseCounter
			};
			return combos;
		};

		/**
		 * Play Awe Card. This card will be placed on the board, but cannot be combo'd.
		 * Each turn, the other opponent is damaged while this number exists.
		 *
		 * @param  {int} number Number to place card on.
		 * @param  {player} player Player to Damage
		 */
		this.playAweCard = function(number, player) {
			_tileArray[number - 1].changeTileColor('black'); //Place tile on Board
			_awes.push({
				number: number,
				player: player
			}); //Store Awe Value
		};

		/**
		 * Get all Current Awes
		 * @return {Array} Array of all Awe Objects
		 */
		this.getAwes = function() {
			return _awes;
		};

		/**
		 * Checks if number exists in the awe array. If it does, remove
		 * it.
		 *
		 * @param  {int} number Number to check awe array with
		 */
		var _removeAwe = function(number) {
			for (var i = 0; i < _awes.length; i++) {
				if (_awes[i].number === number) {
					_awes.splice(i, 1);
				}
			}
		};

		/**
		 * Clear a combo of three values. This will take the tile and turn them back to white
		 * tiles.
		 *
		 * @param  {Array} combo Three Values to clear.
		 */
		this.clearCombo = function(combo) {
			for (var i = 0; i < combo.length; i++) {
				_tileArray[combo[i] - 1].changeTileColor('white'); //Change tiles back to white
			}
		};

		/**
		 * Check if the number placed, in unision with the color, is the same or opposite color
		 * as two other values paired in the combinations array. If any combination
		 * has three colors that are the same or different, that is a combo.
		 * The rules of the compare are defined by the comparingRules method passed into this
		 * function.
		 *
		 * @param  {[int]} number Number that was placed by player
		 * @param  {[string]} color  Color of the placed tile
		 * @param {function} comparingRules The function to compare the combination values with
		 * @return {Array}        Array of winners counted
		 */
		var _checkCombinations = function(number, color, comparingRules) {
			var comboCounter = [];

			//Iterate through each combination
			for (var i = 0; i < _combinations.length; i++) {
				//Check if the current played value is part of the combination, it must be
				if (_combinations[i].indexOf(number) >= 0) {
					//If all three colors are the same, add 1 value to the counter
					if (comparingRules(_combinations[i])) {
						comboCounter.push(_combinations[i]); //Add Found combo to counter array
					}
				}
			}

			return comboCounter; //Return the totaled Counter
		};

		/**
		 * Check if the comination of three values are the opposite colors. If
		 * they are the opposite colors, return true, if not, return false.
		 *
		 * @param  {Array} combination Combination of three values to check colors in.
		 * @return {Boolean}             True if all three values are opposte, else false
		 */
		var _checkCombinationTileForOposingColors = function(combination) {
			var seenColor = []; //Array to hold the color of each tile passed

			//Iterate through all 3 values in the combination array
			for (var i = 0; i < combination.length; i++) {
				//Get the current tiles color
				var currentComboColor = _tileArray[combination[i] - 1].color();

				//Is the Color not seen before in the seenColor array, and not a default color (white, black)
				if (seenColor.indexOf(currentComboColor) === -1 && !_defaultColors(currentComboColor)) {
					seenColor.push(currentComboColor); //Push that value in the seenArray
				} else {
					//If this value was already seen, return false
					return false;
				}
			}

			//All three colors were opposite, return true
			return true;
		};

		/**
		 * Check if the passed color is one of the default colors (white, black)
		 *
		 * @param  {String} color Color to check
		 * @return {Boolean}      Fal
		 */
		var _defaultColors = function(color) {
			//Is this one of the default colors?
			if (color === 'white' || color === 'black') {
				return true;
			}

			//The color was not one of the default colors
			return false;
		};

		/**
		 * Check if the combination of three values are the same color. If
		 * they are the same color, return true, if not, return false
		 *
		 * @param  {[string]} color     Color to check that each tile are
		 * @param  {[array]} combination Combination of three values to check colors in.
		 * @return {[boolean]}             True if all three colors are the same, else false
		 */
		var _checkCombinationTileForSameColor = function(combination) {
			var color = _tileArray[combination[0] - 1].color();
			//Iterate through all 3 values in the combination array
			for (var j = 0; j < combination.length; j++) {
				//If the color is not the same as the passed string return false
				if (_tileArray[combination[j] - 1].color() !== color) {
					return false;
				}
			}

			return true; //All three values were the same color, return true
		};

		/**
		 * Collect the positions from the outerboard size. This will first collect the X positions left
		 * center and right, and the y positions top middle and bottom. We then put together an array with
		 * those position to dictate all nine positions.
		 *
		 */
		var _getPositions = function() {
			//The below 6 positions defined all 6 positons a value can take. (3x3 = 9)
			var xLeft = 0 - (_outerBoard.width / (2 * _outerBoardScale));
			var xCenter = xLeft + (_outerBoard.width * (_scale * (1 / _outerBoardScale)));
			var xRight = xCenter + (_outerBoard.width * (_scale * (1 / _outerBoardScale)));

			var yTop = 0 - (_outerBoard.height / (2 * _outerBoardScale));
			var yCenter = yTop + (_outerBoard.height * (_scale * (1 / _outerBoardScale)));
			var yBottom = yCenter + (_outerBoard.height * (_scale * (1 / _outerBoardScale)));

			//We then take these 6 positions, and place them in combinations together, to create
			//all 9 posibilities.
			_positions = [{
				//Top Left
				x: xLeft,
				y: yTop
			}, {
				//Center Top
				x: xCenter,
				y: yTop
			}, {
				//Top right
				x: xRight,
				y: yTop
			}, {
				//Middle Left
				x: xLeft,
				y: yCenter
			}, {
				//Center Middle
				x: xCenter,
				y: yCenter
			}, {
				//Middle Right
				x: xRight,
				y: yCenter
			}, {
				//Bottom Left
				x: xLeft,
				y: yBottom
			}, {
				//Middle Bottom
				x: xCenter,
				y: yBottom
			}, {
				//Bottom Right
				x: xRight,
				y: yBottom
			}];
		};

		_initalize(x, y, scale); //Start the Constructor

		game.global = game.global || {}; //Create the Global variable if it does not exist

	};

	game.board = Board; //Add the Board to the game object
})();