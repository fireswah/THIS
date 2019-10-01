/*
* Adds/hides/animates a list of credits in THIS home scene
*/

AFRAME.registerComponent('credits', {
	schema: {
		location: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
		state: {type: 'boolean', default: false},
		count: {type: 'int', default: 0}
	},

	init: function () {
		var data = this.data;
    var el = this.el;

		/*
		* Update this list for IMPORTANT support actions for THIS
		*/
		var specialList = [
			'A special thank you to the following supporting organizations:',
			'Northern Rockies Interagency Hotshot Crews',
			'National Technology and Development Center',
			'Rocky Mountain Research Station'
		];

		/*
		* Update this list for any saw SME work, particularly creating answer keys
		* for scenes.
		*/
		var smeList = [
			'Thanks to the following Subject Matter Experts:',
			'JD Bauman, Missoula Ranger District, Lolo National Forest',
			'Jake Fallis, Missoula Ranger District, Lolo National Forest',
			'Ander Jayo, Missoula Ranger District, Lolo National Forest'
		];

		el.addEventListener('click', function () {
			if (data.state === false) {
				data.state = true;
			}else if (data.state === true) {
				data.state = false;
			}

		});

	},

	update: function () {},

	tick: function (time, timeDelta) {
		var data = this.data;

	},

	remove: function () {},

	pause: function () {},

	play: function () {},

	createText: function () {

	},

	animateText: function () {}

});
