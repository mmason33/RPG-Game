class RPG {
	constructor(){
		this.players = [];
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
			newDiv.id = player;
			document.getElementById('players').appendChild(newDiv);

		}

	}

	healthPoints() {

		for (let player in this.players) {
			var randomHP = (Math.floor(Math.random() * 100) + 100);
			var playerList = document.getElementsByClassName('hp');
			this.players[player].hp = randomHP;
			playerList[player].textContent = this.players[player].hp;
			playerList[player].setAttribute('data-hp', this.players[player].hp);
		}

	}

	attackPoints() {

		for(let player in this.players) {
			var randomAttack = Math.floor(Math.random() * 25) + 25;
			var nameList = document.getElementsByClassName('player-name');
			nameList[player].setAttribute('data-attack', randomAttack);
			this.players[player].attack = randomAttack;
		}

	}

	handlePlayerClick(event) {

		var heroWrap = document.getElementById('hero');
		var enemyWrap = document.getElementById('enemy');

		if(heroWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-hero');
			heroWrap.appendChild(event.currentTarget);
			document.getElementById('directions-message').innerHTML = 'Click player to select opponent';
		} else if (enemyWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-enemy');
			enemyWrap.appendChild(event.currentTarget);
			document.getElementById('directions-message').innerHTML = '';
		}

		document.getElementById('attack-button').style.display = 'inline-block';
	}

	attackClick() {
		var activeHeroHp = parseInt(document.querySelectorAll('.active-hero .hp')[0].textContent);
		var activeEnemyHp = parseInt(document.querySelectorAll('.active-enemy .hp')[0].textContent);
		var heroAttack = parseInt(document.querySelectorAll('#hero .player-name')[0].getAttribute('data-attack'));
		var enemyAttack = parseInt(document.querySelectorAll('#enemy .player-name')[0].getAttribute('data-attack'));


		if (activeHeroHp > 0 && activeEnemyHp > 0) {
			activeHeroHp -= enemyAttack;
			document.querySelectorAll('.active-hero .hp')[0].textContent = activeHeroHp;

			activeEnemyHp -= heroAttack;
			document.querySelectorAll('.active-enemy .hp')[0].textContent = activeEnemyHp;
		}

	}

	calcWinner() {
		var randomHeroHP = (Math.floor(Math.random() * 60) + 70);
		var currentHeroHP = parseInt(document.querySelectorAll('.active-hero .hp')[0].textContent);
		var currentEnemyHP = parseInt(document.querySelectorAll('.active-enemey .hp')[0].textContent);

		if (currentHeroHP <= 0) {

			document.getElementById('the-message').textContent = 'Pick it up soldier you got killed out there!';
			document.getElementsByName('reset-button').style.display = 'inline-block';

		} else if (currentEnemyHP <= 0) {

			if (currentEnemyHP <= 0 && document.getElementById('players').innerHTML == false) {

				document.getElementById('the-message').textContent = 'You Win!';

			}

		}
	}
}

const rpg = new RPG();
rpg.playerNames(['one', 'two', 'three', 'four']);
rpg.playerMarkUp();
rpg.healthPoints();
for (let player in rpg.players) {
	let classes = document.getElementsByClassName('player');
	classes[player].addEventListener('click', rpg.handlePlayerClick);
}

var atButton = document.getElementById('attack-button');

atButton.addEventListener('click', function(){
	rpg.attackPoints();
	rpg.attackClick();
});


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