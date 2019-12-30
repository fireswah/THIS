/*
Water colored Shader Component based on:
https://threejs.org/examples/?q=lava#webgl_shader_lava
with randomized movement in the vertical axis
*/

AFRAME.registerComponent('water-mat', {

	schema: {
    fogdensity: {type: 'number', default: 0.45},
    fogcolor: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
		time: {type: 'number', default: 1.0 },
		height: {type: 'number', default: 3.0 },
		uvscale: {type: 'vec2', default: {x: 1.0, y: 1.0}},
  },

	init: function () {
		var el = this.el;
		var data = this.data;
		var mesh = el.getObject3D('mesh');
		var uniforms = {};

		var textureLoader = new THREE.TextureLoader();

		uniforms = {
			"fogDensity": { value: data.fogdensity },
			"fogColor": { value: data.fogcolor },
			"time": { value: data.time },
			"height": { value: data.height },
			"uvScale": { value: data.uvscale },
			"texture1": { value: textureLoader.load( 'images/cloud.png' ) },
			"texture2": { value: textureLoader.load( 'images/watertile.jpg' ) }
		};

		uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
		uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

		/*
		Create the material using glsl.  It is passed to the GPU as text in the
		vertex and fragment shaders
		*/

		this.material = new THREE.ShaderMaterial({
			uniforms: uniforms,

			vertexShader: `
				uniform sampler2D texture1;

				uniform vec2 uvScale;
				uniform float time;

				varying vec2 vUv;

				//I pulled this from a forum somewhere, not sure if there's a better way
				float random (vec2 st) {
					return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
				}

				void main()
				{
					vUv = uvScale * uv;

					vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

					//You can multiply noise by a factor to increase wave height
					float noise = random(vUv) * 0.3;

					//Note glsl appears to have z as the vertical versus AFrame Y
					vec4 moveTo = modelViewMatrix * vec4( position.x, position.y, noise, 1.0 );

					//Multiplying time by noise affects each point separately
					//The calculation is being done for each vertex
					gl_Position = mix( projectionMatrix * mvPosition, projectionMatrix * moveTo, abs(sin(time * noise)));
				}
				`
			,
			fragmentShader: `
		    uniform float time;
		    uniform float fogDensity;
		    uniform vec3 fogColor;

		    uniform sampler2D texture1;
		    uniform sampler2D texture2;

		    varying vec2 vUv;

		    void main( void ) {
		      vec2 position = - 1.0 + 2.0 * vUv;
		      vec4 noise = texture2D( texture1, vUv );
		      vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
		      vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;
		      T1.x -= noise.y * 2.0;
		      T1.y += noise.z * 2.0;
		      T2.x -= noise.y * 0.2;
		      T2.y += noise.z * 0.2;
		      float p = texture2D( texture1, T1 * 2.0 ).a;
		      vec4 color = texture2D( texture2, T2 * 0.08 );
		      vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );
		      if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
		      if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
		      if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }
		      gl_FragColor = temp;
		      float depth = gl_FragCoord.z / gl_FragCoord.w;
		      const float LOG2 = 1.442695;
		      float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
		      fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );
		      gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
		    }
		    `

		});

		mesh.material = this.material;

	},

	update: function () {},

	remove: function () {},

	play: function () {},

	pause: function () {},

  tick: function (t, dt) {
		this.material.uniforms.time.value = t * 0.001;
		//console.log(this.material.uniforms.time.value);
	},


});
