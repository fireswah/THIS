/*
	Set, Fade in and out on skybox photos
	for VR Tree Sizeup
	Author: Matt Gibson
			Training Specialist
			Northern Rockies Training Center
			Missoula, MT
*/
AFRAME.registerComponent('set-image', {
	schema: {
		on: {type: 'string'},
		target: {type: 'selector'},
		src: {type: 'string'},
		dur: {type: 'number', default: 300},
		iskey: {type: 'boolean', default: false}
	},

	init: function () {
		var data = this.data;
		var el = this.el;

		var north = document.querySelector('#northbutton');
		var south = document.querySelector('#southbutton');
		var east = document.querySelector('#eastbutton');
		var west = document.querySelector('#westbutton');
		var answer = document.querySelector('#answerbutton');
		var skybox = document.querySelector('#image360');

		//Adds event listener for the "click"
		el.addEventListener(data.on, function () {
			//make an array of all the hazard entities in scene
			var keylist = el.sceneEl.querySelectorAll('#hazard');

			//emits to start the fade event below
			data.target.emit('fadeout');
			//sets timer to match fade time, then replaces image
			//then starts fade back in.
			setTimeout(function () {
				//Set the new skybox image.
				data.target.setAttribute('material', 'src', data.src);
				//Emit to start the fadein again.
				data.target.emit('fadein');
				//Setting the thumbnails to show which view we're on.
				//console.log(data.src);
				if(data.src == '#north') {
					north.setAttribute('material', {src: '#selectN'});
					south.setAttribute('material', {src: '#thumbS'});
					east.setAttribute('material', {src: '#thumbE'});
					west.setAttribute('material', {src: '#thumbW'});
					answer.setAttribute('material', {src: '#thumbanswer'});
					//specific to Ambrose photo from north
					skybox.setAttribute('rotation', {x:0, y: -105, z: 0});
					for (var i = 0; i < keylist.length; i++) {
						keylist[i].setAttribute('class', '');
						keylist[i].setAttribute('visible', false);
					}
				}
				if(data.src == '#south') {
					north.setAttribute('material', {src: '#thumbN'});
					south.setAttribute('material', {src: '#selectS'});
					east.setAttribute('material', {src: '#thumbE'});
					west.setAttribute('material', {src: '#thumbW'});
					answer.setAttribute('material', {src: '#thumbanswer'});
					//specific to Ambrose photo from south
					//Use the same setting in the html file for initial skybox rotation
					//on the south option only, since that's where each scene loads unless
					//you've changed it.
					skybox.setAttribute('rotation', {x:0, y: 55, z: 0});
					for (var i = 0; i < keylist.length; i++) {
						keylist[i].setAttribute('class', '');
						keylist[i].setAttribute('visible', false);
					}
				}
				if(data.src == '#east') {
					north.setAttribute('material', {src: '#thumbN'});
					south.setAttribute('material', {src: '#thumbS'});
					east.setAttribute('material', {src: '#selectE'});
					west.setAttribute('material', {src: '#thumbW'});
					answer.setAttribute('material', {src: '#thumbanswer'});
					//specific to Ambrose photo from east
					skybox.setAttribute('rotation', {x:0, y: -50, z: 0});
					for (var i = 0; i < keylist.length; i++) {
						keylist[i].setAttribute('class', '');
						keylist[i].setAttribute('visible', false);
					}
				}
				if(data.src == '#west') {
					north.setAttribute('material', {src: '#thumbN'});
					south.setAttribute('material', {src: '#thumbS'});
					east.setAttribute('material', {src: '#thumbE'});
					west.setAttribute('material', {src: '#selectW'});
					answer.setAttribute('material', {src: '#thumbanswer'});
					//specific to Ambrose photo from west
					skybox.setAttribute('rotation', {x:0, y: 150, z: 0});
					for (var i = 0; i < keylist.length; i++) {
						keylist[i].setAttribute('class', '');
						keylist[i].setAttribute('visible', false);
					}
				}
				if(data.src == '#south' && data.iskey == true) {
					north.setAttribute('material', {src: '#thumbN'});
					south.setAttribute('material', {src: '#thumbS'});
					east.setAttribute('material', {src: '#thumbE'});
					west.setAttribute('material', {src: '#thumbW'});
					answer.setAttribute('material', {src: '#selectanswer'});
					//specific to Ambrose photo from south for answer key
					//should be same as south
					skybox.setAttribute('rotation', {x:0, y: 55, z: 0});
					for (var i = 0; i < keylist.length; i++) {
						keylist[i].setAttribute('class', 'link');
						keylist[i].setAttribute('visible', true);
					}

				}
			}, data.dur);
		});
	},
});
