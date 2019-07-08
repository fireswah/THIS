AFRAME.registerComponent('vid-control', {
	schema: {
		on: {type: 'string'},
		target: {type: 'selector'},
		src: {type: 'string'},
		cmd: {type: 'string'}
	},

	init: function () {
		var data = this.data;
		//var el = document.querySelector(data.src);
    var el = this.el;
    var vidscreen = document.querySelector('#vidscreen');
		var currentvideo = document.querySelector('#tutorialvid');

		//Adds event listener for the "click"
		el.addEventListener(data.on, function () {
			if (data.cmd === 'play') {
				//play/pause current video
				if (currentvideo.paused) {
					currentvideo.play();
				} else {
					currentvideo.pause();
				}
        /*
        //change button color according to play or pause
				if (currentvideo.paused) {
					el.setAttribute('mixin', 'red');
				} else {
					el.setAttribute('mixin', 'green');
				};
        */
			} else if (data.cmd === 'rewind') {
				//set button color to green then set a timer to turn it back to red.
				el.setAttribute('mixin', 'green');
				setTimeout(function() {
					el.setAttribute('mixin', 'red');
				}, 300);
				currentvideo.currentTime = 0;
			};
		});
	},

});
