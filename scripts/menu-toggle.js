AFRAME.registerComponent('menu-toggle', {
	schema: {
    on: {type: 'string', default: 'click'},
    linklist: {type: 'selector'}
	},

	init: function () {
		var data = this.data;
    var el = this.el;

    el.addEventListener(data.on, function () {
			var sceneEl = document.querySelector('a-scene');
			var alllists = sceneEl.querySelectorAll('.linkdisplay');
			if(data.linklist.getAttribute('visible') === false ) {
        for (var i = 0; i < alllists.length; i++) {
					alllists[i].setAttribute('visible', 'false');
        }
        data.linklist.setAttribute('visible', 'true');
      }else if(data.linklist.getAttribute('visible') === true ) {
				for (var i = 0; i < alllists.length; i++) {
					alllists[i].setAttribute('visible', 'false');
        }
			};

    });

	},

});
