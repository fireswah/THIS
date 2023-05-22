/*
	Interactive Icon to access info content in scene popups
	for VR Tree Sizeup
	Author: Matt Gibson
			Training Specialist
			Northern Rockies Training Center
			Missoula, MT
*/
AFRAME.registerComponent('interactive-icon', {
	schema: {
		name: {type: 'string', default: ''},
		on: {type: 'string', default: 'click'},
		graphic: {type: 'selector'},
		close: {type: 'selector', default: '#close'},
    pos: {type: 'vec3', default: '0 0 0'},
    icon: {type: 'selector', default: '#hazard'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
    var scene = el.sceneEl;
    var scenecenter = new THREE.Vector3(0, 1.2, 0);

		//Setup the basic attributes of the info icon
    //el.setAttribute('class', 'link');

		//el.setAttribute('id', 'marker');

    el.setAttribute('geometry', {
      primitive: 'circle',
      radius: .3,
      segments: 32
    })

    el.setAttribute('position', {
      x: data.pos.x,
      y: data.pos.y,
      z: data.pos.z
    });

    el.setAttribute('material', {
      shader: 'flat',
      src: data.icon,
      transparent: true
    })

		//make the icon point at the scene center, or pos 0 0 0
		el.object3D.lookAt(scenecenter);

    //Listen for click on hazard icon to display custom graphic for that hazard.
    el.addEventListener(data.on, function () {

			el.setAttribute('class', 'selected');

			//Create and setup popup window
      popup = document.createElement('a-entity');

			popup.setAttribute('id', data.name );

      popup.setAttribute('geometry', {
        primitive: 'plane',
        width: 2,
        height: 2
      });

      popup.setAttribute('material', {
        shader: 'flat',
        src: data.graphic
      });

			//calculate location of popup menu
			var length = 3;
			var iconloc = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
			var dir = iconloc.sub(scenecenter).normalize().multiplyScalar(length);
			var popuplocation = new THREE.Vector3();
			popuplocation = scenecenter.clone().add(dir);

      popup.setAttribute('position', {
				x: popuplocation.x,
				y: popuplocation.y,
				z: popuplocation.z
				//x: data.pos.x,
        //y: data.pos.y,
        //z: data.pos.z
      });

			//Sets a listener on the popup for completion of loading so we can add
			//the button to it as a child entity.
			popup.addEventListener("loaded", function () {

				//Create and setup close button
				closebtn = document.createElement('a-entity');

	      closebtn.setAttribute('class', 'link');

	      closebtn.setAttribute('material', {
	        shader: 'flat',
	        src: data.close
	      });

	      closebtn.setAttribute('geometry', {
	        primitive: 'plane',
	        width: .4,
	        height: .2
	      });

	      closebtn.setAttribute('position', {
	        x: 0,
	        y: -.8,
	        z: .02
	      });

				//EventListener to remove the popup graphic and close button on click
				//ask the parent of the top level removal
				closebtn.addEventListener( data.on, function() {
					var delpopup = document.querySelector('#' + data.name);
					delpopup.parentNode.removeChild(delpopup);
					//reactivate the icon to be clickable.
					el.setAttribute('class', "link");
				});

				//add the popup to scene
				popup.appendChild(closebtn);
				//rotate both popup and close button to face the user
				//button is a child of popup
				popup.object3D.lookAt(scenecenter);
				//closebtn.object3D.lookAt(scenecenter);

			});

      scene.appendChild(popup);


    });

	},

});
