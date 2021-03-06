(function() {

	var game = window.game || {};
	var Phaser = window.Phaser || {};
	/**
	 * Player Class
	 */
	var Player = function(name) {
		var _this = this;
		var _name; //Players Name
		var _health; //Players Health
		var _text; //The Text Object to display
		var _missedTurns;
		var _cardContext;
		var _cardClickEvent;
		this.opponent = undefined;
		this.hand = undefined;
		this.budget = undefined;
		this.hasChosenCards = undefined;

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

		var _createView = function(command) {
			command.createView(0, 0);

			command.view().events.onInputDown.add(_cardClickEvent, _cardContext);


			command.view().scale.x = 0.9;
			command.view().scale.y = 0.9;
		};

		/**
		 * Generate the label used to display the players current health
		 * @return {String} Users current health
		 */
		var _createLabel = function() {
			return name + "'s Health: " + _health;
		};

		var _createMissingTurnsLabel = function() {
			return 'Missed Turns Remaining: ' + (game.global.cancelTurns + 1);
		};

		var _createVisibleCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				if (typeof _this.hand[i].view() === 'undefined') {
					_createView(_this.hand[i], i);
				}
			}

			_killAllCards();
		};

		var _drawCard = function() {
			if (_this.deck.length > 0) {
				var randNum = game.rnd.integerInRange(0, _this.deck.length - 1);

				//This line will remove a card from the deck, and put it into your hand
				_this.hand.push(_this.deck[randNum]);

				_this.deck.splice(randNum, 1);
			}
		};

		var _drawMaxCards = function() {
			while (_this.hand.length < game.global.fullHand) {
				_drawCard();
			}
		};

		var _killAllCards = function() {
			if (_this.hand && typeof game.global.winner === 'undefined') {
				for (var i = 0; i < _this.hand.length; i++) {
					if (typeof _this.hand[i].view() !== 'undefined') {
						_this.hand[i].view().kill();
					}
				}
			}
		};

		var _removeCommand = function(command) {
			if (command.view()) {
				_removeCommandFromView(command.view());
			}
			_removeCommandFromHand(command);
			command.clearView(); //Used to remove refrence to the view.  Will probably need to remove it from the actual view as well
			_setKeyOnCards();
		};

		var _removeCommandFromHand = function(command) {
			_this.hand.splice(command.handKey, 1);
			_setKeyOnCards();
		};

		var _removeCommandFromView = function(view) {
			view.kill();
		};

		var _resetAllCards = function() {
			var currentXPosition = 75;
			var currentYPosition = game.world.centerY + (game.world.centerY * 0.75);

			if (_this.hand && typeof game.global.winner === 'undefined') {
				for (var i = 0; i < _this.hand.length; i++) {
					_this.hand[i].view().reset(currentXPosition + (i * 140), currentYPosition);
				}
			}
		};

		var _setKeyOnCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				_this.hand[i].handKey = i;
			}
		};

		this.clearCards = function() {
			_killAllCards();
		};

		this.createView = function(x, y, widthAnchor, heightAnchor) {
			var startX;
			if (widthAnchor === 1) {
				startX = game.world.width + 200;
			} else {
				startX = -400;
			}
			//Create Text Object
			_text = game.add.text(startX, y, _createLabel(), {
				font: '35px Geo',
				fill: '#ffffff'
			});

			//Create Text Object
			_missedTurns = game.add.text(x, y + 50, '', {
				font: '25px Geo',
				fill: '#ffffff'
			});

			_text.anchor.setTo(widthAnchor, heightAnchor);
			_missedTurns.anchor.setTo(widthAnchor, heightAnchor);

			game.add.tween(_text).to({
				x: x
			}, 1000, Phaser.Easing.Bounce.Out, true);

		};

		this.hideMissingTurnsView = function() {
			_missedTurns.text = '';
		};

		this.showMissingTurnsView = function() {
			_missedTurns.text = _createMissingTurnsLabel();
		};

		this.drawCards = function() {
			_drawMaxCards();
			_createVisibleCards();
		};

		this.endTurn = function() {
			_killAllCards();
			_setKeyOnCards();
		};

		this.name = function() {
			return _name;
		};

		/**
		 * Check if the player is currently holding a defence card. The defence card
		 * cannot be in the procces of 'being played' this turn.
		 *
		 * @return {Boolean} Player is holding defence card?
		 */
		this.isHoldingDefenceCard = function() {
			//Must check if the player played this defence card this turn
			for (var i = 0; i < _this.hand.length; i++) {
				if (_this.hand[i] instanceof game.DefenceCommand) {
					return true;
				}
			}

			return false;
		};

		/**
		 * Use the defence card that the player is currently holding.
		 *
		 */
		this.useDefenseCard = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				if (_this.hand[i] instanceof game.DefenceCommand) {
					var temp = _this.hand[i];
					_removeCommand(_this.hand[i]);
					return temp;
				}
			}
		};

		this.removeAttackCard = function() {
			var notFound = true;
			for (var i = 0; i < _this.hand.length && notFound; i++) {
				if (_this.hand[i] instanceof game.AttackCommand) {
					_removeCommand(_this.hand[i]);
					notFound = false;
				}
			}
		};

		this.removeAllAttackCards = function() {
			for (var i = 0; i < _this.hand.length; i++) {
				if (_this.hand[i] instanceof game.AttackCommand) {
					_removeCommand(_this.hand[i]);
					i--;
				}
			}
		};

		this.removeCardsOfType = function(cardTypes) {
			for (var i = 0; i < _this.hand.length; i++) {
				for (var j = 0; j < cardTypes.length; j++) {
					if (_this.hand[i] instanceof cardTypes[j]) {
						_removeCommand(_this.hand[i]);
						i--;
					}
				}
			}
		};

		/**
		 * Get Players Health
		 * @return {int} Current Health
		 */
		this.health = function() {
			return _health;
		};

		/**
		 * Is the player at or below 0 health.
		 * @return {Boolean} Is the player at or below 0 health.
		 */
		this.isDead = function() {
			if (_health <= 0) {
				return true;
			} else {
				return false;
			}
		};

		/**
		 * Get the width of the _text object.
		 * @return {int} Current width of the object
		 */
		this.getWidth = function() {
			return _text.width;
		};

		/**
		 * Get the Height of the _text object
		 * @return {int} Current height of the object.
		 */
		this.getHeight = function() {
			return _text.height;
		};

		this.startTurn = function() {
			game.global.hasDamageSounded = false;
			_resetAllCards();
			_setKeyOnCards();
		};

		/**
		 * Player takes damage, reducing the number from the
		 * health, then displaying.
		 *
		 * @param  {int} amount Damage to reduce from health.
		 * @return {int}        Return current health after damage.
		 */
		this.takeDamage = function(amount) {
			if (_health > 0 && _this.opponent.health() > 0 && amount > 0) {
				_health -= amount;
				_text.text = _createLabel(); //Display Current Health
				_this.opponent.heal(amount);
				if(!game.global.hasDamageSounded) {
					game.global.damageAudio.play();
					game.global.hasDamageSounded = true;
				}
			}
			return _health;
		};

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
		};

		this.prepare = function(clickEvent, context) {
			_cardContext = context;
			_cardClickEvent = clickEvent;
			_drawMaxCards();
			_setKeyOnCards();
			_createVisibleCards();


		};

		this.removeCommand = function(command) {
			_removeCommand(command);

		};



		_initalize(name); //Call constructor
	};

	game = game || {};
	game.player = Player; //Attach to global scope

})();