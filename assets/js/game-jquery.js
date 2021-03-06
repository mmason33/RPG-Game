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
		$('.directions h3').text('Click a player to select your opponent');
		$('.hero-title').text('Black Ops');
		$('#hero').html($(this).clone().addClass('active-hero col-md-12').removeClass('col-md-3'));
		$(this).remove();
	} else if ($('#enemy').html() == false) {
		$('.hp-message').text('');
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

	if(parseInt($('.active-hero .hp').attr('data-hp')) > 0 && parseInt($('.active-enemy .hp').attr('data-hp')) > 0) {
		$('.active-enemy .hp').text(
			(parseInt($('.active-enemy .hp').attr('data-hp')) - parseInt($('.active-hero').attr('data-attack'))) + ' hp'
		);
		$('.active-enemy .hp').attr('data-hp', parseInt($('.active-enemy .hp').attr('data-hp')) - parseInt($('.active-hero').attr('data-attack')));
		$('.hero-message').text(
			$('.active-hero h3').attr('data-name') + 
			' attacked ' + 
			$('.active-enemy h3').attr('data-name') + 
			' and reduced their health by ' + 
			parseInt($('.active-hero').attr('data-attack')) + 
			' points!'
		);
		if(parseInt($('.active-enemy .hp').attr('data-hp')) > 0) {
			$('.active-hero .hp').text((parseInt($('.active-hero .hp').attr('data-hp')) - parseInt($('.active-enemy').attr('data-attack'))) + ' hp');
			$('.active-hero .hp').attr('data-hp', parseInt($('.active-hero .hp').attr('data-hp')) - parseInt($('.active-enemy').attr('data-attack')));
			$('.enemy-message').text(
				$('.active-enemy h3').attr('data-name') + 
				' attacked ' + 
				$('.active-hero h3').attr('data-name') + 
				' and reduced their health by ' + 
				parseInt($('.active-enemy').attr('data-attack')) + 
				' points!'
			);
		}
	}
	calculateWinner();

}

function calculateWinner() {
	var randomHeroHP = (Math.floor(Math.random() * 60) + 70);
	var currentHP = parseInt($('.active-hero .hp').attr('data-hp'));
	if (parseInt($('.active-hero .hp').attr('data-hp')) <= 0) {
		$('.the-message').text('Pick it up soldier you got killed out there');
		$('#reset-button').show();
	} else if (parseInt($('.active-enemy .hp').attr('data-hp')) <= 0) {
		if(parseInt($('.active-enemy .hp').attr('data-hp')) <= 0 && $('#Players').html() == false) {
			$('.the-message').text('You Win!');
		} else {
			$('.the-message').text('You desimated ' + $('.active-enemy .player-name-wrap h3').attr('data-name') + ' begin your next mission!');
			$('.active-hero .hp').attr('data-hp', currentHP + randomHeroHP);
			$('.active-hero .hp').text($('.active-hero .hp').attr('data-hp') + ' hp');
			$('.hp-message').text('You gained ' + randomHeroHP + ' hp!');
			$('.hero-message').text('');
			$('.enemy-message').text('');
			$('.active-enemy').remove();
		}
	}
}


$(document).ready(function() {

if (window.innerWidth >= 768) {
	playerNames(['Synaptic', 'Merc', 'Warfighter', 'Phantom']);
	healthPoints();
	$('.select-player').click(handlePlayerClick);
	$('#attack-button').click(attackClick);
} else {
	document.write('Please view this project on a larger screen. (min:768px wide)');
}

});