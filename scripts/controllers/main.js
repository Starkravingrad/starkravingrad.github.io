'use strict';

/**
 * @ngdoc function
 * @name lycrabeatscomApp.controller:MainCtrl
 * @description
 * # MainCtrl holla
 * Controller of the lycrabeatscomApp
 */
angular.module('lycrabeatscomApp')
  .controller('MainCtrl', function ($scope) {
  $scope.modalOpen = false;
  $scope.loading = true;
      	var container;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;


			init();
			animate();


			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
				camera.position.z = 1800;
                camera.position.y = 400;

				// scene

				scene = new THREE.Scene();

				var ambient = new THREE.AmbientLight( 0x601001 );
				scene.add( ambient );

				var directionalLight = new THREE.DirectionalLight( 0xffeeff );
				directionalLight.position.set( 0, 0, 1 );
				scene.add( directionalLight );

				// texture

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );
                   
					//$( "progressbar" ).style.display = "none";

				};


				var onProgress = function ( xhr ) {
                 
					   console.log(xhr.total);
						var percentComplete = xhr.loaded / xhr.total * 100;
                      	console.log( Math.round(xhr.loaded, 2) / 100000 + '% downloaded' );
                        
					
				};

				var onError = function ( xhr ) {
				};


				// model

				var loader = new THREE.OBJLoader( manager );
				loader.load( 'https://dl.dropboxusercontent.com/u/90538180/LycraBeet_005.obj', function ( object ) {

					object.traverse( function ( child ) {


					} );

					object.position.y = - 500;
          
					scene.add( object );
                  $scope.$apply(function () {
                     $scope.loading = false;
                  });
				}, onProgress, onError );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();

			}
  
  function onDocumentMouseDown( e ) {
  e.preventDefault();
    $scope.modalOpen = false;
  }
			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .20;
				camera.position.y += ( - mouseY - camera.position.y ) * .15;

				camera.lookAt( scene.position );
        
				renderer.render( scene, camera );

			}
  
  });
