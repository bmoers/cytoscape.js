$v(function(jQuery, $, version){
	
	// use only if `performance` flag set
	var search = window.location.search;
	var doPerformanceTests = false;
	if( search.match(/[\?\&]?filter\=Performance/) ){
		doPerformanceTests = true;
	}

	if( !doPerformanceTests ){
		return;
	}

	module("Performance", {
		setup: function(){
			stop();
			


			var n = 100000;
			var nodes = [];
			for(var i = 0; i < n; i++){
				nodes.push( {} );
			}

			console.time("init");
			console.profile("initprof");

			$("#cytoscape").cytoscape({
				renderer: {
					name: "null"
				},
				layout: {
					name: "null"
				},
				elements: {
					nodes: nodes
				},
				ready: function(cy){
					window.cy = cy;

					console.timeEnd("init");
					console.profileEnd("initprof");

					start();
				}
			});
			
		},
		
		teardown: function(){
		}
	});
	
	test(".pdata() versus _private with loop", function(){ return;
		var times = 10000;
		var eles = cy.elements();

		console.time("pdata");
		for(var i = 0; i < times; i++){
			eles.pdata(true, "set", "animation", "queue", []);
		}
		console.timeEnd("pdata");

		console.time("_private");
		for(var i = 0; i < times; i++){
			for(var j = 0, l = eles.length; j < l; j++){
				eles[j]._private.animation.queue = [];
			}
		}
		console.timeEnd("_private");

	});
	
});