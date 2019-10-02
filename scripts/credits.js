/*
* Cycles a list of credits in THIS home scene from the hard-coded array below.
*/
AFRAME.registerComponent('credits', {
	schema: {
		target: {type: 'selector', default: ''},
		state: {type: 'boolean', default: false},
	},

	init: function () {
		var data = this.data;
    var el = this.el;

		/*
		* Update this list for support or SME work with THIS
		*/
		var thankList = [
			"A special thank you to the following supporting organizations:",
			"Northern Rockies Interagency Hotshot Crews",
			"National Technology and Development Center",
			"Rocky Mountain Research Station",
			"USFS National Saw Technical Advisory Group",
			"Thanks to the following Subject Matter Experts:",
			"JD Bauman, Missoula Ranger District, Lolo National Forest",
			"Jake Fallis, Missoula Ranger District, Lolo National Forest",
			"Ander Jayo, Missoula Ranger District, Lolo National Forest",
			"Built with:",
			"A-Frame",
			"Atom",
			"Blender",
			"Google Slides"
		];

		el.addEventListener('roll-credits', function () {

			var time = 1000;

			if (data.state === false) {
				data.state = true;
				for (var i = 0; i < thankList.length; i++) {
					//set value of text from list index.
					var textvalue = thankList[i];
					//call separate discrete funciton with textvalue and time delay value.
					el.components.credits.timeOut(textvalue, time);
					//adds a delay per item in milliseconds.
					time = time + 3000;
				}
			}else if (data.state === true) {
				data.state = false;
				data.target.setAttribute('value', '');
			}

		});

		//testing function for text this emit will activate the credits.
		//Comment out when using a different object to emit.
		setTimeout(function(){el.emit('roll-credits')}, 3000);

	},

	update: function () {},

	tick: function (time, timeDelta) {},

	remove: function () {},

	pause: function () {},

	play: function () {},

	timeOut: function (textvalue, time) {
		var data = this.data;
		setTimeout( function () {data.target.setAttribute('text', 'value', textvalue);}, time);
		//setTimeout( function () {data.target.text.setAttribute('value', textvalue);}, time);
	}

});
