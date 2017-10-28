<cfscript>
    function getAssetHref( required string fileName ){
    	var includesLocation    = "includes";
        var event               = getRequestContext();
        var mapping             = event.getModuleRoot();
        var href                = "#mapping#/#includesLocation#/#arguments.fileName#";
        return href;
    }	

</cfscript>