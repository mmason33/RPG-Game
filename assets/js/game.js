class RPG {
	constructor(){
		this.players = [];

		this.messages = {
			hero: '',
			enemy: '',
			heroAttack: '',
			enemyAttack: '',
			directions: {
				pickHero: 'Click player to select your soldier!',
				pickEnemy: 'Click player to select your opponent!'
			}
		}
	}

	playerNames(array) {
		for (var i = 0; i < array.length; i++) {
			this.players.push({name:array[i], hp: 0, attack: 0});
		}
	}

	playerMarkUp() {

		for (let player in this.players) {

			var newDiv = document.createElement('div');
			var newH3 = document.createElement('h3');
			var newContent = document.createTextNode(this.players[player].name);
			var newHp = document.createElement('div');
			newHp.classList.add('hp');
			newH3.classList.add('player-name');
			newDiv.appendChild(newH3);
			newDiv.appendChild(newHp);
			newH3.appendChild(newContent);
			newDiv.classList.add('player', 'col-md-3');
			document.getElementById('players').appendChild(newDiv);

		}

	}

	healthPoints() {

		for (let player in this.players) {
			var randomHP = (Math.floor(Math.random() * 100) + 100);
			var playerList = document.getElementsByClassName('hp');
			this.players[player].hp = randomHP;
			playerList[player].textContent = this.players[player].hp;
		}

	}

	attackPoints() {

		for(let player in this.players) {
			var randomAttack = Math.floor(Math.random() * 25) + 25;
			var nameList = document.getElementsByClassName('player-name');
			nameList[player].setAttribute('data-attack', randomAttack);
		}

	}

	handlePlayerClick(event) {

		var heroWrap = document.getElementById('hero');
		var enemyWrap = document.getElementById('enemy');

		if(heroWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-hero');
			heroWrap.appendChild(event.currentTarget);
		} else if (enemyWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-enemy');
			enemyWrap.appendChild(event.currentTarget);
		}

		document.getElementById('attack-button').style.display = 'inline-block';

	}

	// getMessages() {
	// 	var directions = document.querySelector('directions');
	// 	// directions.appendChild(document.createElement('h3'));
	// 	if(heroWrap.innerHTML == false) {

	// 	} else if (enemyWrap.innerHTML == false) {

	// 	}

	// }

}

const rpg = new RPG();
rpg.playerNames(['one', 'two', 'three', 'four']);
rpg.playerMarkUp();
rpg.healthPoints();
rpg.attackPoints();
// rpg.getMessages();
// document.addEventListener('click', rpg.handlePlayerClick);

for (let player in rpg.players) {
	let classes = document.getElementsByClassName('player');
	classes[player].addEventListener('click', rpg.handlePlayerClick);
}
// rpg.handlePlayerClick();

// function healthPoints() {
	
// 	$('.hp').each(function(){
// 		var randomHP = (Math.floor(Math.random() * 100) + 100);
// 		$(this).text(randomHP + ' hp');
// 		$(this).attr('data-hp', randomHP);
// 	});

// }

// function attackPoints() {

// 	$('.player').each(function(){
// 		$(this).attr('data-attack', Math.floor(Math.random() * 25) + 25);
// 	});

// }

// function handlePlayerClick() {
// 	if($('#hero').html() == false) {
// 		$('.directions h3').text('Click a player to select your opponent');
// 		$('.hero-title').text('Black Ops');
// 		$('#hero').html($(this).clone().addClass('active-hero col-md-12').removeClass('col-md-3'));
// 		$(this).remove();
// 	} else if ($('#enemy').html() == false) {
// 		$('.hp-message').text('');
// 		$('.directions h3').text('');
// 		$('.enemy-title').text('USNA');
// 		$('.the-message').text('');
// 		$('#enemy').html($(this).clone().addClass('active-enemy col-md-12').removeClass('col-md-3'));
// 		$(this).remove();
// 	}
// 	$('#attack-button').show();
// }

// function attackClick() {
// 	attackPoints();

// 	if(parseInt($('.active-hero .hp').attr('data-hp')) > 0 && parseInt($('.active-enemy .hp').attr('data-hp')) > 0) {
// 		$('.active-enemy .hp').text(
// 			(parseInt($('.active-enemy .hp').attr('data-hp')) - parseInt($('.active-hero').attr('data-attack'))) + ' hp'
// 		);
// 		$('.active-enemy .hp').attr('data-hp', parseInt($('.active-enemy .hp').attr('data-hp')) - parseInt($('.active-hero').attr('data-attack')));
// 		$('.hero-message').text(
// 			$('.active-hero h3').attr('data-name') + 
// 			' attacked ' + 
// 			$('.active-enemy h3').attr('data-name') + 
// 			' and reduced their health by ' + 
// 			parseInt($('.active-hero').attr('data-attack')) + 
// 			' points!'
// 		);
// 		if(parseInt($('.active-enemy .hp').attr('data-hp')) > 0) {
// 			$('.active-hero .hp').text((parseInt($('.active-hero .hp').attr('data-hp')) - parseInt($('.active-enemy').attr('data-attack'))) + ' hp');
// 			$('.active-hero .hp').attr('data-hp', parseInt($('.active-hero .hp').attr('data-hp')) - parseInt($('.active-enemy').attr('data-attack')));
// 			$('.enemy-message').text(
// 				$('.active-enemy h3').attr('data-name') + 
// 				' attacked ' + 
// 				$('.active-hero h3').attr('data-name') + 
// 				' and reduced their health by ' + 
// 				parseInt($('.active-enemy').attr('data-attack')) + 
// 				' points!'
// 			);
// 		}
// 	}
// 	calculateWinner();

// }

// function calculateWinner() {
// 	var randomHeroHP = (Math.floor(Math.random() * 60) + 70);
// 	var currentHP = parseInt($('.active-hero .hp').attr('data-hp'));
// 	if (parseInt($('.active-hero .hp').attr('data-hp')) <= 0) {
// 		$('.the-message').text('Pick it up soldier you got killed out there');
// 		$('#reset-button').show();
// 	} else if (parseInt($('.active-enemy .hp').attr('data-hp')) <= 0) {
// 		if(parseInt($('.active-enemy .hp').attr('data-hp')) <= 0 && $('#Players').html() == false) {
// 			$('.the-message').text('You Win!');
// 		} else {
// 			$('.the-message').text('You desimated ' + $('.active-enemy .player-name-wrap h3').attr('data-name') + ' begin your next mission!');
// 			$('.active-hero .hp').attr('data-hp', currentHP + randomHeroHP);
// 			$('.active-hero .hp').text($('.active-hero .hp').attr('data-hp') + ' hp');
// 			$('.hp-message').text('You gained ' + randomHeroHP + ' hp!');
// 			$('.hero-message').text('');
// 			$('.enemy-message').text('');
// 			$('.active-enemy').remove();
// 		}
// 	}
// }


// $(document).ready(function() {

// if (window.innerWidth >= 768) {
// 	playerNames(['Synaptic', 'Merc', 'Warfighter', 'Phantom']);
// 	healthPoints();
// 	$('.select-player').click(handlePlayerClick);
// 	$('#attack-button').click(attackClick);
// } else {
// 	document.write('Please view this project on a larger screen. (min:768px wide)');
// }

// });