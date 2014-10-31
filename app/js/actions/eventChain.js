game.eventChain = {

	playHand: function(oneCard, twoCard){
		game.global.turnWon = false;

		this.handleAttackCommands(oneCard, twoCard);
		this.handleNumberCards(oneCard, twoCard);
		this.handleDefenseCommands(oneCard, twoCard);
		this.handleAweCards(oneCard, twoCard);
		this.performAweDamage();
	},

	handleAttackCommands: function(oneCard, twoCard){
		var oneCardAttack = isCommand(oneCard, 'AttackCommand');
		var twoCardAttack = isCommand(twoCard, 'AttackCommand');
		
		if(oneCardAttack && twoCardAttack){
			game.chainProperties.attackChain.bothAttack(oneCard, twoCard);
		}else if(oneCardAttack){
			game.chainProperties.attackChain.singleAttack(oneCard);
		}else if(twoCardAttack){
			game.chainProperties.attackChain.singleAttack(oneCard);
		}
	},

	handleNumberCards: function(oneCard, twoCard){
		var oneCardNumber = isCommand(oneCard, 'RegularCommand');
		var twoCardNumber = isCommand(twoCard, 'RegularCommand');

		if(oneCardNumber && twoCardNumber){
			game.chainProperties.numberChain.bothNumber(oneCard, twoCard);
		}else if(oneCardNumber){
			game.chainProperties.numberChain.singleNumber(oneCard);
		}else if(twoCardNumber){
			game.chainProperties.numberChain.singleNumber(twoCard);
		}
	},

	handleDefenseCommands: function(oneCard, twoCard){
		var oneCardDefense = isCommand(oneCard, 'DefenseCommand');
		var twoCardDefense = isCommand(twoCard, 'DefenseCommand');

		if(oneCardDefense && twoCardDefense){
			game.chainProperties.defenseChain.bothDefend(oneCard, twoCard);
		}else if(oneCardDefense){
			game.chainProperties.defenseChain.singleDefence(oneCard);
		}else if(twoCardDefense){
			game.chainProperties.defenseChain.singleDefence(twoCard);
		}
	},

	handleAweCards: function(oneCard, twoCard){
		var oneCardAwe = isCommand(oneCard, 'AweCommand');
		var twoCardAwe = isCommand(twoCard, 'AweCommand');

		if(oneCardAwe){
			game.chainProperties.aweChain.playAwe(oneCardAwe);
		}

		if(twoCardAwe){
			game.chainProperties.aweChain.playAwe(twoCardAwe);
		}
	},

	performAweDamage: function(){

	},

	isCommand: function(card, type) {
		if(card instanceof type){
			return true;
		}
		return false;
	},
}