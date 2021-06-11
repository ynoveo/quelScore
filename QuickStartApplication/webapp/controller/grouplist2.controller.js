sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/m/Dialog",
	'sap/m/Button',
	'sap/m/Text'
], function (Controller, JSONModel, Mst, History, Dialog, Button, Text) {
	"use strict";
	return Controller.extend("QuickStartApplication.controller.grouplist2", {
		onInit: function () {
//			this._oPage = this.byId("PageGroup");
			// var ogModel=sap.ui.getCore().getModel("global");
			// var sLogin = ogModel.getProperty("/pseudo");
			// var sPass = ogModel.getProperty("/pwd");
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
			var sPreURL = ogModel.getProperty("/preURL");
			var sUrl = sPreURL + "JSON_V2021.php?action=PLAYERLIST&groupe=" + sId + "&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				oModel.loadData("../webapp/localService/userGroup.json");
			} else {
				oModel.loadData(sUrl,{},false);				
			}
			this.getView().setModel(oModel);
			this._oPage = this.byId("PageGroup");
			if(sId === "0"){
				this._oPage.setTitle("Classement : Top 50");	
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
				var sPreURL = ogModel.getProperty("/preURL");
				var sUrl = sPreURL + "JSON_V2021.php?action=ASKGROUP&idgroup=" + sId + "&email=" + sLogin + "&pass=" + sPass;
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
				var sPreURL = ogModel.getProperty("/preURL");
				var sUrl = sPreURL + "JSON_V2021.php?action=QUITGROUP&idgroup=" + sId + "&email=" + sLogin + "&pass=" + sPass;
				var oModel = new JSONModel();
				oModel.loadData(sUrl,{},false);
				if(oModel.getProperty("/reponse/retcode")==="0"){
					Mst.show("Vous avez quitté le groupe");
					this.onNavBack();
				} else {
					Mst.show(oModel.getProperty("/reponse/retmsg"));
				}
			},
	openPronostics: function (oEvent) {
		var bindingContext = oEvent.getSource().getBindingContext();
		var sIdUser = bindingContext.getProperty("idPlayer");
		var sPseudo = bindingContext.getProperty("pseudo");
		sap.ui.core.UIComponent.getRouterFor(this).navTo("mesPronostics", {idUser: sIdUser, oPseudo: sPseudo});
	},
	
	avatarformatter: function (avatar,pseudo) {
		if (pseudo==="GLOU" || pseudo==="JSPI" || pseudo==="VNajean" || pseudo==="YNOVEO BOT"){
			return "./avatars/ynoveo-eo-final.png";
		}else{
			if (avatar==="AUCUN"){
				return "";
			}else{
				return "./avatars/"+avatar ;
			}
		}
	},
	
	onRejectUser: function (oEvent) {
		var but = oEvent.getSource();
		var _sIdJoueur = but.getParent().getBindingContext().getProperty("idPlayer");
		var ogModel=sap.ui.getCore().getModel("global");
		var _sId = ogModel.getProperty("/activeGroupID"); 
		var sLogin = ogModel.getProperty("/pseudo");
		var sPass = ogModel.getProperty("/pwd");
		var sPreURL = ogModel.getProperty("/preURL");
		var sUrl = sPreURL + "JSON_V2021.php?action=DELUSER&idgroup=" + _sId + "&iduser=" + _sIdJoueur + "&email=" + sLogin + "&pass=" + sPass;	
		var oModel = new JSONModel();
		var dialog = new Dialog ({
			title: 'Confirmation de suppression',
			type: 'Message',
			content: new Text({ text: 'Voulez-vous vraiment supprimer ce joueur du groupe ?' }),
			beginButton: new Button({
				text: 'Supprimer',
				type: 'Reject',
				press: function() {
							oModel.loadData(sUrl,{},false);
							if(oModel.getProperty("/reponse/retcode")==="0"){
								Mst.show("Le joueur a été supprimé du groupe");
					// suppression de la ligne de la liste			
								var path = but.getParent().getBindingContext().getPath();
						        var idx = parseInt(path.substring(path.lastIndexOf('/') +1));
						        var m = but.getParent().getModel();
						        var d = m.getData();
						        d.joueur.splice(idx, 1);
						        m.setData(d);
						        
							} else {
								Mst.show(oModel.getProperty("/reponse/retmsg"));
							}	
							dialog.close();
				}
			}),
			endButton: new Button({
				text: 'Annuler',
				press: function () {
					dialog.close();
				}
				
			})
			
		});
		dialog.open();
		

		
		
	},
	
	onAcceptUser: function (oEvent) {
		var but = oEvent.getSource();
		var _sIdJoueur = but.getParent().getBindingContext().getProperty("idPlayer");
		var ogModel=sap.ui.getCore().getModel("global");
		var _sId = ogModel.getProperty("/activeGroupID"); 
		var sLogin = ogModel.getProperty("/pseudo");
		var sPass = ogModel.getProperty("/pwd");
		var sPreURL = ogModel.getProperty("/preURL");
		var sUrl = sPreURL + "JSON_V2021.php?action=CONFIRMUSER&idgroup=" + _sId + "&iduser=" + _sIdJoueur + "&email=" + sLogin + "&pass=" + sPass;	
		var oModel = new JSONModel();
		oModel.loadData(sUrl,{},false);
		if(oModel.getProperty("/reponse/retcode")==="0"){
			Mst.show("Le joueur a été ajouté au groupe");
			but.setVisible(false);
		} else {
			Mst.show(oModel.getProperty("/reponse/retmsg"));
		}	
		
		
	}


	});
});