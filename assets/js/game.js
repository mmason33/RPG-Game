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
			var wrapper = document.createElement('div');
			var newH3 = document.createElement('h3');
			var newContent = document.createTextNode(this.players[player].name);
			var newHp = document.createElement('div');
			var newAttack = document.createElement('span');
			

			newDiv.classList.add('player', 'col-md-3');
			newDiv.id = 'player-' + player;
			wrapper.classList.add('player-name-wrap');
			newHp.classList.add('hp');
			newH3.classList.add('player-name');
			newAttack.classList.add('attack-points');
			newDiv.appendChild(wrapper);
			newDiv.appendChild(newH3);
			newDiv.appendChild(newHp);
			newH3.appendChild(newContent);

			document.getElementById('players').appendChild(newDiv);
			for ( var i = 0; i < document.getElementsByClassName('player-name-wrap').length; i++) {
				var wrappers = document.getElementsByClassName('player-name-wrap')[i];
				wrappers.appendChild(newH3);
				wrappers.appendChild(newHp);
				wrappers.appendChild(newAttack);
			}
		}

	}

	healthPoints() {

		for (let player in this.players) {
			var randomHP = (Math.floor(Math.random() * 100) + 100);
			var playerList = document.getElementsByClassName('hp');
			this.players[player].hp = randomHP;
			playerList[player].textContent = this.players[player].hp + ' hp';
			playerList[player].setAttribute('data-hp', this.players[player].hp);
		}

	}

	attackPoints() {

		for (var i = 0; i < document.getElementsByClassName('attack-points').length; i++) {
			var randomAttack = Math.floor(Math.random() * 25) + 25;
			this.players[i].attack = randomAttack;
			document.getElementsByClassName('attack-points')[i].textContent = this.players[i].attack;
		}	

	}

	handlePlayerClick(event) {

		var heroWrap = document.getElementById('hero');
		var enemyWrap = document.getElementById('enemy');

		if(heroWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-hero');
			heroWrap.appendChild(event.currentTarget);
			document.querySelector('.hero-title').textContent = "Black Ops";
			document.getElementById('directions-message').innerHTML = 'Click player to select opponent';
		} else if (enemyWrap.innerHTML == false) {
			event.currentTarget.classList.remove('col-md-3');
			event.currentTarget.classList.add('col-md-12', 'active-enemy');
			enemyWrap.appendChild(event.currentTarget);
			document.querySelector('.enemy-title').textContent = 'USNA';
			document.getElementById('directions-message').innerHTML = '';
			document.getElementById('hp-message').textContent = '';
			document.getElementById('the-message').textContent = '';
		}

		document.getElementById('attack-button').style.display = 'inline-block';
	}

	attackClick() {
		if (document.getElementById('enemy').innerHTML != false) {
			var activeHeroHp = parseInt(document.querySelectorAll('.active-hero .hp')[0].textContent);
			var activeEnemyHp = parseInt(document.querySelectorAll('.active-enemy .hp')[0].textContent);
			var heroAttack = parseInt(document.querySelectorAll('#hero .attack-points')[0].textContent);
			var enemyAttack = parseInt(document.querySelectorAll('#enemy .attack-points')[0].textContent);

			if (activeHeroHp > 0 && document.getElementById('enemy') != false) {
					activeEnemyHp -= heroAttack;
					document.querySelectorAll('.active-enemy .hp')[0].textContent = activeEnemyHp;
					document.getElementById('enemy-message').textContent = document.querySelectorAll('.active-enemy .player-name')[0].textContent + ' attacked ' + document.querySelectorAll('.active-hero .player-name')[0].textContent + ' and reduced their health by ' + heroAttack + ' points!';
				if (activeEnemyHp > 0) {
					activeHeroHp -= enemyAttack;
					document.querySelectorAll('.active-hero .hp')[0].textContent = activeHeroHp;
					document.getElementById('hero-message').textContent = document.querySelectorAll('.active-hero .player-name')[0].textContent + ' attacked ' + document.querySelectorAll('.active-enemy .player-name')[0].textContent + ' and reduced their health by ' + enemyAttack + ' points!';
				}
			}
			this.calcWinner();
		}
	}

	calcWinner() {
		var randomHeroHP = (Math.floor(Math.random() * 60) + 70);
		var currentHeroHP = parseInt(document.querySelectorAll('.active-hero .hp')[0].textContent);
		var currentEnemyHP = parseInt(document.querySelectorAll('.active-enemy .hp')[0].textContent);

		if (currentHeroHP <= 0) {

			document.getElementById('the-message').textContent = 'Pick it up soldier you got killed out there!';
			document.getElementById('reset-button').style.display = 'inline-block';

		} else if (currentEnemyHP <= 0) {

			if (currentEnemyHP <= 0 && document.getElementById('players').innerHTML == false) {

				document.getElementById('the-message').textContent = 'You Win!';

			} else  {
				document.getElementById('the-message').textContent = 'You desimated ' + document.querySelectorAll('.active-enemy .player-name')[0].textContent + ' select another opponent to start your next mission!';
				document.querySelectorAll('.active-hero .hp')[0].textContent = currentHeroHP + randomHeroHP;
				document.getElementById('hp-message').textContent = 'You gained ' + randomHeroHP + ' hp!';
				document.getElementById('enemy-message').textContent = '';	
				document.getElementsByClassName('active-enemy')[0].remove();
				

			}

		}
	}
}

const rpg = new RPG();
rpg.playerNames(['Synaptic', 'Merc', 'Warfighter', 'Phantom']);
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
