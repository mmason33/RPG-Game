function playerNames(array) {

	$('.player h3').each(function(index){
		$(this).attr('data-name', array[index]);
		$(this).text($(this).attr('data-name'));
	});

}

function healthPoints() {
	
	$('.hp').each(function(){
		var randomHP = (Math.floor(Math.random() * 100) + 100);
		$(this).text(randomHP + ' hp');
		$(this).attr('data-hp', randomHP);
	});

}

function attackPoints() {

	$('.player').each(function(){
		$(this).attr('data-attack', Math.floor(Math.random() * 25) + 25);
	});

}

function handlePlayerClick() {
	if($('#hero').html() == false) {
		// $('.arena-area').addClass('margin');
		$('.directions h3').text('Click a player to select your opponent');
		$('.hero-title').text('Black Ops');
		$('#hero').html($(this).clone().addClass('active-hero col-md-12').removeClass('col-md-3'));
		$(this).remove();
	} else if ($('#enemy').html() == false) {
		$('.directions h3').text('');
		$('.enemy-title').text('USNA');
		$('.the-message').text('');
		$('#enemy').html($(this).clone().addClass('active-enemy col-md-12').removeClass('col-md-3'));
		$(this).remove();
	}
	$('#attack-button').show();
}

function attackClick() {
	attackPoints();
	var enemyHP = parseInt($('.active-enemy .hp').attr('data-hp'));
	var heroHP = parseInt($('.active-hero .hp').attr('data-hp'));
	var enemyAttack = parseInt($('.active-enemy').attr('data-attack'));
	var heroAttack = parseInt($('.active-hero').attr('data-attack'));

	if(heroHP > 0 && enemyHP > 0) {
		$('.active-enemy .hp').text((enemyHP - heroAttack) + ' hp');
		$('.active-enemy .hp').attr('data-hp', enemyHP - heroAttack);
		$('.hero-message').text(
			$('.active-hero h3').attr('data-name') + 
			' attacked ' + 
			$('.active-enemy h3').attr('data-name') + 
			' and reduced their health by ' + 
			heroAttack + 
			' points!'
		);

		$('.active-hero .hp').text((heroHP - enemyAttack) + ' hp');
		$('.active-hero .hp').attr('data-hp', heroHP - enemyAttack);
		$('.enemy-message').text(
			$('.active-enemy h3').attr('data-name') + 
			' attacked ' + 
			$('.active-hero h3').attr('data-name') + 
			' and reduced their health by ' + 
			enemyAttack + 
			' points!'
		);
	}
	calculateWinner();


}

function calculateWinner() {

	if (parseInt($('.active-hero .hp').attr('data-hp')) <= 0) {
		$('.the-message').text('Pick it up soldier you got killed out there');
		// $('.active-hero').remove();
	} else if (parseInt($('.active-enemy .hp').attr('data-hp')) <= 0) {
		$('.the-message').text('You desimated ' + $('.active-enemy .player-name-wrap h3').attr('data-name') + ' begin your next mission!');
		$('.active-enemy').remove();
	}

}


$(document).ready(function() {

	playerNames(['Synaptic', 'Merc', 'Warfighter', 'Phantom']);
	healthPoints();
	$('.select-player').click(handlePlayerClick);
	$('#attack-button').click(attackClick);

});