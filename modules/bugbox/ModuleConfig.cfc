/**
*********************************************************************************
* Your Copyright
********************************************************************************
*/
component{

	// Module Properties
	this.title 				= "bugbox";
	this.author 			= "You";
	this.webURL 			= "";
	this.description 		= "Your Module";
	this.version			= "@build.version@+@build.number@";
	// If true, looks for views in the parent first, if not found, then in the module. Else vice-versa
	this.viewParentLookup 	= true;
	// If true, looks for layouts in the parent first, if not found, then in module. Else vice-versa
	this.layoutParentLookup = true;
	// Module Entry Point
	this.entryPoint			= "bugbox";
	// Model Namespace
	this.modelNamespace		= "bugbox";
	// CF Mapping
	this.cfmapping			= "bugbox";
	// Auto-map models
	this.autoMapModels		= true;
	// Module Dependencies That Must Be Loaded First, use internal names or aliases
	this.dependencies		= [ ];

	/**
	* Configure module
	*/
	function configure(){

		// Layout Settings
		layoutSettings = { defaultLayout = "Main.cfm" };

		routes = [ 
			// Module Entry Point
			{ 
				pattern = "", 
				handler = "Main", 
				action  = "index" 
			},
			// Convention Route
			{ pattern 	= ":handler/:action?" }
		]
	}

	/**
	* Fired when the module is registered and activated.
	*/
	function onLoad(){
	}

	/**
	* Fired when the module is unregistered and unloaded
	*/
	function onUnload(){
		
	}

}
