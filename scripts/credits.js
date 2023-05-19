/*
* Cycles a list of credits in THIS home scene from the hard-coded array below.
* Sets text from list, sets attribute of selected scene object
* animates scrolling of list.
*/
AFRAME.registerComponent('credits', {
	schema: {
		target: {type: 'selector', default: ''},
		state: {type: 'boolean', default: false},
	},

	init: function () {
		var data = this.data;
    var el = this.el;
		var textBack = data.target.getObject3D('mesh');

		//this.timeouts = [];

		/*
		* Update this list for support or SME work with THIS
		*/
		var thankList = [
			"*_____A special thank you to the following supporting organizations:_____*",
			"Northern Rockies Interagency Training Center",
			"Northern Rockies Interagency Hotshot Crews",
			"National Technology and Development Center",
			"Rocky Mountain Research Station",
			"USFS National Saw Technical Advisory Group",
			"*_____Thanks to the following Subject Matter Experts:_____*",
			"JD Bauman, Missoula Ranger District, Lolo National Forest",
			"Jake Fallis, Missoula Ranger District, Lolo National Forest",
			"Ander Jayo, Missoula Ranger District, Lolo National Forest",
			"Mike Pennacchio, Missoula Smokejumpers, Region 1",
			"Steven Latham, Missoula Smokejumpers, Region 1",
			"*_____Built with:_____*",
			"A-Frame",
			"Atom",
			"Blender",
			"Google Slides",
			"Three.js",
			"Samsung Gear 360",
			"Insta360 Pro",
		];

		//Set the text on the selected object from the list.
		var allText = '';

		for (var i = 0; i < thankList.length; i++) {
			var textvalue = thankList[i];
			allText = allText.concat(textvalue + '\n' + '\n');
		}

		data.target.setAttribute('text', 'value', allText);

		//Listen for click to start credits.
		el.addEventListener('click', function () {

			if (data.state === false) {
				data.state = true;
				el.emit('roll-credits');
			}else if (data.state === true) {
				data.state = false;
				el.components.credits.resetCredits();
			}

		});

		//activate an animated scroll of the credits.
		el.addEventListener('roll-credits', function () {
			data.target.setAttribute('animation__1', 'property: position; from: 4.5 -22 25; to: 4.5 55 25; dur: 30000');
		});

	},

	update: function () {},

	tick: function (time, timeDelta) {},

	remove: function () {},

	pause: function () {},

	play: function () {},

	//clear the animation and reset position of text.
	resetCredits: function() {
		var data = this.data;

		data.target.removeAttribute('animation__1');
		data.target.setAttribute('position', {
			x: 4.5,
			y: -22,
			z: 25
		});
	}

});
