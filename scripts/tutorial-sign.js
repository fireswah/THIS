AFRAME.registerComponent('tut-control', {
	schema: {
		on: {type: 'string', default: 'click'},
		cmd: {type: 'string', default: ''},
		openingTitle: {type: 'string', default: 'GETTING STARTED'},
		openingText: {type: 'string', default: 'Point the reticle at a button for two seconds to activate it.\n\nIn VR mode, you just need to turn your head to look around.\n\nIn 2D mode, left-click and hold to turn the view with your mouse.'},
		welcomeTitle: {type: 'string', default: 'WELCOME'},
		welcomeText: {type: 'string', default: 'Welcome to the Tree Hazard Identification Simulation (THIS).\n\nThe purpose of THIS is to practice hazard recognition in relation to saw operations with less exposure to actual hazards.  The more hazards a sawyer identifies prior to cutting, informs decision making on whether to cut or not, and can greatly increase safety margins in cut plans.\n\nWhile nothing can prepare you for every hazard you will encounter while cutting, THIS intends to increase your skills in hazard recognition.'},
		scenesTitle: {type: 'string', default: 'SCENES'},
		scenesText: {type: 'string', default: 'Specific scenes can be found linked from the trail sign behind you.  Select from the Geographic Area list.\n\nEach scene contains four 360 spherical photos of a tree to practice with, along with a link to come back to this home scene.'},
		howtoTitle: {type: 'string', default: 'HOW TO'},
		howtoText: {type: 'string', default: 'In-scene buttons are similar to the buttons you have been using here.  They are gaze-activated.\n\nEach scene has four view buttons for the cardinal directions so you can move around the tree.\n\nThe best way to use this simulation is to spend as much time as you need in each of the four photos in a scene, and when ready, compare your answers to the hazard key.'},
		smeTitle: {type: 'string', default: 'SUBJECT MATTER EXPERTS'},
		smeText: {type: 'string', default: 'Each scene is produced with assistance from C-Faller, C-Evaluator (USFS) or FAL1 (NWCG) sawyers to identify as many hazards as possible.\n\nAs experts, they recognize that they may have missed a potential hazard in a scene.  Cutting areas are full of risk, and can be very complex.  Always assume that you could have missed something as well.'},
		feedbackTitle: {type: 'string', default: 'FEEDBACK'},
		feedbackText: {type: 'string', default: 'To contact us, identify a hazard we missed in a scene, or to get involved with this project as an SME or to offer other assistance, please contact: \n\nMatt Gibson - matthew.gibson@usda.gov'},
	},

	init: function () {
		var data = this.data;
    var el = this.el;
		var initTitle = document.querySelector('#display-title');
		var initText = document.querySelector('#display-text');

		initTitle.setAttribute('text', 'value', data.openingTitle);
		initText.setAttribute('text', 'value', data.openingText );		

		el.addEventListener(data.on, function () {
			var sceneEl = document.querySelector('a-scene');
			var title = document.querySelector('#display-title');
			var text = document.querySelector('#display-text');

			//Make an array of all the buttons on the menu so we can switch colors easier.
			var allButtons = sceneEl.querySelectorAll('#btn');

			if (data.cmd === 'welcome') {
				for (i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute('color', 'red');
				}
				el.setAttribute('color', 'green');
				title.setAttribute('text', 'value', data.welcomeTitle);
				text.setAttribute('text', 'value', data.welcomeText );
			} else if (data.cmd === 'scenes') {
				for (i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute('color', 'red');
				}
				el.setAttribute('color', 'green');
				title.setAttribute('text', 'value', data.scenesTitle);
				text.setAttribute('text', 'value', data.scenesText );
			} else if (data.cmd === 'howto') {
				for (i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute('color', 'red');
				}
				el.setAttribute('color', 'green');
				title.setAttribute('text', 'value', data.howtoTitle);
				text.setAttribute('text', 'value', data.howtoText );
			} else if (data.cmd === 'sme') {
				for (i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute('color', 'red');
				}
				el.setAttribute('color', 'green');
				title.setAttribute('text', 'value', data.smeTitle);
				text.setAttribute('text', 'value', data.smeText );
			} else if (data.cmd === 'feedback') {
				for (i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute('color', 'red');
				}
				el.setAttribute('color', 'green');
				title.setAttribute('text', 'value', data.feedbackTitle);
				text.setAttribute('text', 'value', data.feedbackText);
			};
		});
	},

});
