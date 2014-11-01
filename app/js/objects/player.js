(function() {

	/**
	 * Player Class
	 */
	var Player = function(name) {
		var _this = this;
		var _name; //Players Name
		var _health; //Players Health
		var _text; //The Text Object to display
		this.opponent;
		this.hand;
		this.budget;
		this.hasChosenCards;

		/**
		 * Constructor
		 * @param  {String} name Players Name
		 * @param  {int} x    The X coordinate to place text at
		 * @param  {int} y    The Y coordinate to place text at
		 */
		var _initalize = function(name) {
			_name = name;
			_health = 50;
			_this.hand = [];
			_this.deck = [];
			_this.hasChosenCards = false;
			_createBaseCommands();

		};

		var _createBaseCommands = function() {
			_this.hand = [];

			for (var x = 0; x < game.global.amountOfColors; x++) {
				var color;

				if (x === 0) {
					color = 'red';
				} else if (x === 1) {
					color = 'blue';
				} else {
					color = 'green';
				}

				for (var i = 1; i <= game.global.allNumbers / game.global.amountOfColors; i++) {

					_this.deck.push(new game.RegularCommand(_this, i, color));
				}
			}
		};

		var _createView = function(command, i, clickEvent, context) {
			command.createView(0, 0);

			command.view().events.onInputDown.add(clickEvent, context);


			command.view().scale.x = 0.5;
			command.view().scale.y = 0.5;
		}

		/**
		 * Generate the label used to display the players current health
		 * @return {String} Users current health
		 */
		var _createLabel = function() {
			return name + "'s Health: " + _health;
		}

		var _createVisibleCards = function(clickEvent, context) {
			for (var i = 0; i < _this.hand.length; i++) {
				_createView(_this.hand[i], i, clickEvent, context);
			}

			_killAllCards();
		};

		var _drawCard = function() {
			var randNum = game.rnd.integerInRange(0, _this.deck.length - 1);

			//This line will remove a card from the deck, and put it into your hand
			_this.hand.push(_this.deck[randNum]);

			_this.deck.splice(randNum, 1)
		}

		var _drawMaxCards = function() {
			while (_this.hand.length < game.global.fullHand) {
				_drawCard();
			}
		}

		var _killAllCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].view().kill();
			}
		}

		var _removeCommand = function(command) {
			if (command.view()) {
				_removeCommandFromView(command.view());
			}
			_removeCommandFromHand(command);
			command.clearView(); //Used to remove refrence to the view.  Will probably need to remove it from the actual view as well
		}

		var _removeCommandFromHand = function(command) {
			_this.hand.splice(command.handKey, 1);
			_setKeyOnCards();
		}

		var _removeCommandFromView = function(view) {
			view.kill();
		}

		var _resetAllCards = function() {
			var currentXPosition = game.world.centerX - 300;
			var currentYPosition = game.world.centerY + (game.world.centerY * .75);

			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].view().reset(currentXPosition + (i * 100), currentYPosition);
			}
		}

		var _setKeyOnCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].handKey = i;
			}
		};

		this.createView = function(x, y) {
			//Create Text Object
			_text = game.add.text(x, y, _createLabel(), {
				font: '40px Geo',
				fill: '#000000'
			});
		}

		this.drawCards = function() {
			_drawMaxCards();
		}

		this.endTurn = function() {
			_killAllCards();
			_setKeyOnCards();
		}

		this.name = function() {
			return _name;
		}

		/**
		 * Check if the player is currently holding a defence card. The defence card
		 * cannot be in the procces of 'being played' this turn.
		 *
		 * @return {Boolean} Player is holding defence card?
		 */
		this.isHoldingDefenceCard = function() {
			//Must check if the player played this defence card this turn
			for(var i = 0; i < _this.hand.length; i++){
				if(_this.hand[i] instanceof game.DefenceCommand){
					return true;
				}
			}

			return false;
		},

		/**
		 * Use the defence card that the player is currently holding.
		 *
		 */
		this.useDefenseCard = function() {
			for(var i = 0; i < _this.hand.length; i++){
				if(_this.hand[i] instanceof game.DefenceCommand){
					_removeCommand(_this.hand[i]);	
				}
			}
		}

		/**
		 * Get Players Health
		 * @return {int} Current Health
		 */
		this.health = function() {
			return _health;
		}

		/**
		 * Is the player at or below 0 health.
		 * @return {Boolean} Is the player at or below 0 health.
		 */
		this.isDead = function() {
			if (_health <= 0) {
				return true
			} else {
				return false;
			}
		}

		/**
		 * Get the width of the _text object.
		 * @return {int} Current width of the object
		 */
		this.getWidth = function() {
			return _text.width;
		}

		/**
		 * Get the Height of the _text object
		 * @return {int} Current height of the object.
		 */
		this.getHeight = function() {
			return _text.height;
		}

		this.startTurn = function() {
			_resetAllCards();
			_setKeyOnCards();
		}

		/**
		 * Player takes damage, reducing the number from the
		 * health, then displaying.
		 *
		 * @param  {int} amount Damage to reduce from health.
		 * @return {int}        Return current health after damage.
		 */
		this.takeDamage = function(amount) {
			_health -= amount;
			_text.text = _createLabel(); //Display Current Health
			this.opponent.heal(amount);
			return _health;
		}

		/**
		 * Player recieves health, increasing their health by the number
		 * passed.
		 *
		 * @param  {int} amount Health to increase to health.
		 * @return {int}        Return current health after heal.
		 */
		this.heal = function(amount) {
			_health += amount;
			_text.text = _createLabel(); //Display current health
			return _health;
		}

		this.prepare = function(clickEvent, context) {
			_drawMaxCards();
			_setKeyOnCards();
			_createVisibleCards(clickEvent, context);


		}

		this.removeCommand = function(command) {
			_removeCommand(command);

		}



		_initalize(name); //Call constructor
	}

	game.player = Player; //Attach to global scope

})();