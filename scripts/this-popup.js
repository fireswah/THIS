/*
	Interactive Icon to access info content in scene popups
	for Tree Hazard Identification Simulation
	Author: Matt Gibson
			Training Specialist
			Northern Rockies Training Center
			Missoula, MT
*/
AFRAME.registerComponent('this-popup', {
	schema: {
		name: {type: 'string', default: ''},
		on: {type: 'string', default: 'click'},
    pos: {type: 'vec3', default: {x:0, y:0, z:0}},
    icon: {type: 'selector', default: '#hazard'},
		title: {type: 'string', default: 'TITLE'},
		bestline: {type: 'string', default: 'Best seen from: xx'},
		para: {type: 'string', default: 'Para 1.'}
	},

	init: function () {
		var data = this.data;
		var el = this.el;
    var scene = el.sceneEl;
    var scenecenter = new THREE.Vector3(0, 1.2, 0);

		//Setup the basic attributes of the info icon

    el.setAttribute('geometry', {
      primitive: 'circle',
      radius: .3,
      segments: 32
    })

    el.setAttribute('position', {
			//multiply vector so distance doesn't "hide" icon
			//with background skybox
			x: scenecenter.x + (data.pos.x - scenecenter.x) * .95,
      y: scenecenter.y + (data.pos.y - scenecenter.y) * .95,
      z: scenecenter.z + (data.pos.z - scenecenter.z) * .95
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
			popupT = document.createElement('a-entity');
			popupB = document.createElement('a-entity');
			popupP = document.createElement('a-entity');

			//Set a unique name selector so we can remove the popup later
			popup.setAttribute('id', data.name );

      popup.setAttribute('geometry', {
        primitive: 'plane',
        width: 2.04,
        height: 2.04
      });

			popup.setAttribute('material', {
        shader: 'flat',
        color: 'gray'
      });

			//Setup title portion of hazard key
			popupT.setAttribute('geometry', {
				primitive: 'plane',
				width: 2,
				height: .4
			});

			popupT.setAttribute('position', {
				x: 0,
				y: .8,
				z: .01
			});

			popupT.setAttribute('material', {
        shader: 'flat',
        color: 'black'
      });

			popupT.setAttribute('text', 'value', data.title );
			popupT.setAttribute('text', 'align', 'center' );

			//Setup best seen from portion of hazard key
			popupB.setAttribute('geometry', {
				primitive: 'plane',
				width: 2,
				height: .2
			});

			popupB.setAttribute('position', {
				x: 0,
				y: .5,
				z: .01
			});

			popupB.setAttribute('material', {
        shader: 'flat',
        color: 'black'
      });

			popupB.setAttribute('text', 'value', data.bestline );
			popupB.setAttribute('text', 'color', 'yellow');
			popupB.setAttribute('text', 'xOffset', '0.05');

			//Setup text paragraph from portion of hazard key
			popupP.setAttribute('geometry', {
				primitive: 'plane',
				width: 2,
				height: 1.4
			});

			popupP.setAttribute('position', {
				x: 0,
				y: -0.3,
				z: .01
			});

			popupP.setAttribute('material', {
        shader: 'flat',
        color: 'black'
      });

			popupP.setAttribute('text', 'value', data.para );
			//popupP.setAttribute('text', 'baseline', 'top' );
			//popupP.setAttribute('text', 'xOffset', '0.05');

			//Add the entities to to overall Popup
			popup.appendChild(popupT);
			popup.appendChild(popupB);
			popup.appendChild(popupP);

			//calculate location of popup menu
			var length = 2;
			var iconloc = new THREE.Vector3(data.pos.x, data.pos.y, data.pos.z);
			var dir = iconloc.sub(scenecenter).normalize().multiplyScalar(length);
			var popuplocation = new THREE.Vector3();
			popuplocation = scenecenter.clone().add(dir);

      popup.setAttribute('position', {
				x: popuplocation.x,
				y: popuplocation.y,
				z: popuplocation.z
      });

			//Sets a listener on the popup for completion of loading so we can add
			//the button to it as a child entity.
			popup.addEventListener("loaded", function () {

				//Create and setup close button
				closebtn = document.createElement('a-entity');
				closebtnBack = document.createElement('a-plane');
				closebtnBack.setAttribute('height', '0.25');
				closebtnBack.setAttribute('width', '0.45');
				closebtnBack.setAttribute('position', {
					x: 0,
					y: 0,
					z: -0.008
				});
				closebtnBack.setAttribute('color', 'silver');

				closebtn.appendChild(closebtnBack);

	      closebtn.setAttribute('class', 'link');

	      closebtn.setAttribute('material', {
	        shader: 'flat',
	        color: 'gray'
	      });

	      closebtn.setAttribute('geometry', {
	        primitive: 'plane',
	        width: '0.4',
	        height: '0.2'
	      });

				closebtn.setAttribute('text', 'value', 'Close' );
				closebtn.setAttribute('text', 'color', 'white');
				closebtn.setAttribute('text', 'align', 'center' );
				closebtn.setAttribute('text', 'width', '3' );

	      closebtn.setAttribute('position', {
	        x: 1.25,
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
