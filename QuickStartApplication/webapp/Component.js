sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"QuickStartApplication/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("QuickStartApplication.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once. hello
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel("./model/Global.json"), "global");
			this.getRouter().initialize();
			
			var credentials = {
                mail: "mail@example.com",
                pwd: "******",
                pseudo: "pseudo"
            };
		}
	});

});