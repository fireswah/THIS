/*
Heading component to use in viewing 360 images for placing of text boxes.
Point reticle at location you want the reference point to be, and it should
return heading and distance?
*/

AFRAME.registerComponent('heading-tool', {

	//could designate initial position in html position of entity
	//could randomize within a range of starting points for the particles to emerge
	//from?  so a Range in the schema as well?
	schema: {
    color: {type: 'string', default: 'yellow' }
  },

	init: function () {
		var el = this.el;
		var scene = el.sceneEl
		var data = this.data;
		this.ray = el.components.raycaster;
		//var camera = document.querySelector('#camera').object3D;

		this.hud = document.createElement('a-text');
		this.hud.setAttribute('text', 'value', "Heading");
		this.hud.setAttribute('text', 'color', data.color);
		this.hud.setAttribute('position', {x: 0, y: .05, z: -3});
		el.appendChild(this.hud);

		el.addEventListener('raycaster-intersected', evt => {
			this.ray = evt.detail.el;
		});
		el.addEventListener('raycaster-intersected-cleared', evt => {
			this.ray = null;
		});


	},

	update: function () {},

	remove: function () {},

	play: function () {},

	pause: function () {},

  tick: function (t, dt) {
		var el = this.el;
		var sky = document.querySelector('#image360');

		if (!this.ray) { return; }

		let intersection = this.ray.getIntersection(sky);

		if (!intersection) { return; }
		this.hud.setAttribute('text', 'value', 'X: ' + intersection.point.x +
			'\nY: ' + intersection.point.y + '\nZ: ' + intersection.point.z );
	},


});
