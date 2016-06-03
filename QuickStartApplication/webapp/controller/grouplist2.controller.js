sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, Mst, History) {
	"use strict";
	return Controller.extend("QuickStartApplication.controller.grouplist2", {
		onInit: function () {
//			this._oPage = this.byId("PageGroup");
			var ogModel=sap.ui.getCore().getModel("global");
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("UserList").attachPatternMatched(this.onIDMatched, this);
		},

		// This method is registered with the router in onInit. Therefore, it is called whenever the URL is changed.
		// Note that there are two possible reasons for such a change:
		// - The user has entered a URL manually (or using browser facilities, such as a favorite)
		// - Navigation to a route was triggered programmatically
		onIDMatched: function(oEvent) {
			var sId = decodeURIComponent(oEvent.getParameter("arguments").groupId);
			sap.ui.getCore().getModel("global").setProperty("/activeGroupID", sId);
			var ogModel=sap.ui.getCore().getModel("global");
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
			var sUrl = "https://www.quelscore.com/JSON_V2016.php?action=PLAYERLIST&groupe=" + sId + "&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			oModel.loadData(sUrl,{},false);
			this.getView().setModel(oModel);
			this._oPage = this.byId("PageGroup");
			if(sId === "0"){
				this._oPage.setTitle("Classement : Top 100");	
				this.byId("bt_reject").setVisible(false);
				this.byId("bt_join").setVisible(false);				
			}  else { 
			//	this._oPage.setTitle(decodeURIComponent(oEvent.getParameter("arguments").groupT));
			// adapter le JSON pour retourner également le nom du groupe dans ce cas
				
			}
			ogModel.setProperty("/activeGroupID", sId);
		},

			/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QuickStartApplication.QuickStartApplication..view.view.grouplist2
		 */
    	onBeforeRendering: function() {
//			this._oPage = this.byId("PageGroup");
//			var oCModel=sap.ui.getCore().getModel("global");
//			this._oPage.setTitle(oCModel.getProperty("/activeGroupID"));    
    	},
    /**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QuickStartApplication.QuickStartApplication..view.view.grouplist2
		 */
    	onAfterRendering: function() {
//			this._oPage = this.byId("PageGroup");
//			var oCModel=sap.ui.getCore().getModel("global");
//			this._oPage.setTitle(oCModel.getProperty("/activeGroupID"));        
    	},
    	onNavBack: function () {
			//      This code was generated by the layout editor.
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true	/*no history*/);
			}
		},
    /**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QuickStartApplication.QuickStartApplication..view.view.grouplist2
		 */
    //	onExit: function() {
    //
    //	}

		/**
	*@memberOf QuickStartApplication.controller.grouplist2
	*/
onJoinGroup: function () {
//This code was generated by the layout editor.
			var ogModel=sap.ui.getCore().getModel("global");
			var sId = ogModel.getProperty("/activeGroupID"); 
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
			var sUrl = "https://www.quelscore.com/JSON_V2016.php?action=ASKGROUP&idgroup=" + sId + "&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			oModel.loadData(sUrl,{},false);
			if(oModel.getProperty("/reponse/retcode")==="0"){
				Mst.show("Demande envoyée");
			} else {
				Mst.show(oModel.getProperty("/reponse/retmsg"));
			}
		},
onQuitGroup: function () {
//This code was generated by the layout editor.
			var ogModel=sap.ui.getCore().getModel("global");
			var sId = ogModel.getProperty("/activeGroupID"); 
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
//			var sIdUser = ogModel.getProperty("/iduser");
			var sUrl = "https://www.quelscore.com/JSON_V2016.php?action=QUITGROUP&idgroup=" + sId + "&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			oModel.loadData(sUrl,{},false);
			if(oModel.getProperty("/reponse/retcode")==="0"){
				Mst.show("Vous avez quitté le groupe");
				this.onNavBack();
			} else {
				Mst.show(oModel.getProperty("/reponse/retmsg"));
			}
		}		
	});
});