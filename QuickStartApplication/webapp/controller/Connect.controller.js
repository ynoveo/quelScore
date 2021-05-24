sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.Connect", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.Connect
		 */
			onInit: function() {
			if (window.location.href=="https://www.quelscore.com/"){
			if (screen.width<1366) {
			//if (sap.ui.Device.system.phone) {
            	sap.ui.core.UIComponent.getRouterFor(this).navTo("HomePhone");
            } else {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("Home");}
			}},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QuickStartApplication.view.Connect
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QuickStartApplication.view.Connect
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QuickStartApplication.view.Connect
		 */
		//	onExit: function() {
		//
		//	}

	});

});