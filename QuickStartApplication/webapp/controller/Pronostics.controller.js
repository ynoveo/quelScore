sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/commons/TextField",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/GroupHeaderListItem"
], function (Controller, History, JSONModel, Dialog, Button, TextField, SimpleForm, GroupHeaderListItem) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.Pronostics", {
/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.Pronostics
		 */
		onInit: function() {
            //var oModel = new JSONModel();
            //oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty");
            //oModel.loadData("../webapp/localService/matchlist.json");
            //this.getView().setModel(oModel);
            
            var ogModel=sap.ui.getCore().getModel("global");
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
			var sUrl = "https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			oModel.loadData(sUrl,{},false);
			this.getView().setModel(oModel);
	},
	
		openPopup: function(oEvent) {
			var oView = this.getView();
			
			var bindingContext = oEvent.getSource().getBindingContext();
			var title = bindingContext.getProperty("txtequipeA")+" - "+bindingContext.getProperty("txtequipeB");
			var idMatch = bindingContext.getProperty("idMatch");
			var oldPronoA = bindingContext.getProperty("pronoA");
			var oldPronoB = bindingContext.getProperty("pronoB");

			var label = new sap.m.Label({ text : title });
			var pronoA = new TextField({value:bindingContext.getProperty("pronoA"), width:"2em", maxLength:1});
			var pronoB = new TextField({value:bindingContext.getProperty("pronoB"), width:"2em", maxLength:1});
			var simpleForm = new SimpleForm({editable: true,content: [label, pronoA, pronoB]});
			
			var dialog = new Dialog({
				title: "Mon pronostic",
				content: simpleForm,
				beginButton: new Button({
					text: "Sauvegarder",
					type: "Emphasized",
					press: function (oEvent2) {
						jQuery.sap.log.error(idMatch);
						jQuery.sap.log.error(pronoA.getProperty("value"));
						jQuery.sap.log.error(pronoB.getProperty("value"));
						var newPronoA = pronoA.getProperty("value");
						var newPronoB = pronoB.getProperty("value");
						
						var olModel=sap.ui.getCore().getModel("global");
						var sPseudo = olModel.getProperty("/pseudo");
						var sPwd = olModel.getProperty("/pwd");

						var updateURL = "https://www.quelscore.com/JSON_V2016.php?action=SAVESCORE&idmatch="+idMatch+"&scoreA="+newPronoA+"&scoreB="+newPronoB+"&email="+sPseudo+"&pass="+sPwd;
						$.ajax({
							type: "POST",
							data: "",
							crossDomain: true,
							url: updateURL,
							
							contentType: "application/json",
							success: function (res, status, xhr) {
							    //success code
							    //jQuery.sap.log.error("Success response: " + status + res);
							    //bindingContext.setProperty("/match/pronoA", newPronoA);
							    //bindingContext.setProperty("/match/pronoB", newPronoB);
							    oldPronoA = newPronoA;
							    oldPronoB = newPronoB;
							    //oView.setModel(oView.getModel());
							    //oView.getModel().refresh(true);
							    console.log(oldPronoA);
							    console.log(oView.getModel());
							    //oView.byId("scores").setText(newPronoA+" - "+newPronoB);
							    dialog.close();
							},
								error: function (jqXHR, textStatus, errorThrown) {
								jQuery.sap.log.error("Got an error response: " + textStatus + errorThrown);
							}
							});
					}
				}),
				endButton: new Button({
					text: "Annuler",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

 
			//to get access to the global model
			this.getView().addDependent(dialog);
			dialog.open();
		},
		
		test: function (toPrint, isJson) {
			var jsonToPrint = JSON.stringify(toPrint);
			if(isJson) {
				jQuery.sap.log.error(jsonToPrint);
			} else {
				jQuery.sap.log.error(toPrint);
			}
		},
		
		matchIcon :  function (enCours, matchFini) {
			try {
				if (matchFini === "Y") {
					return "../webapp/localService/complete.png";
				} else if (enCours === "Y") {
					jQuery.sap.log.error("match en cours");
					return "../webapp/localService/inprogress.png";
				} else {
					return "../webapp/localService/pending.png";
				}
			} catch (err) {
				return "None";
			}
		},
		
		heureOuScore :  function (enCours, matchFini, scoreA, scoreB, heurematch) {
			try {
				if (matchFini === "Y") {
					var string = scoreA + " - " + scoreB;
					return string;
				} else if (enCours === "Y") {
					return "En cours";
				} else {
					return heurematch;
				}
			} catch (err) {
				return "None";
			}
		},
		
		onOpenPopover: function (oEvent) {
 
			// create popover
			if (! this._oPopover) {
				//this._oPopover = sap.ui.xmlfragment("../webapp/view/Popover", this.getView().getController());
				this._oPopover = sap.ui.xmlfragment("QuickStartApplication.view.Popover", this);
				var popModel = new sap.ui.model.json.JSONModel({
					  data: [
					    { id: 0 },
					    { id: 1 },
					    { id: 2 },
					    { id: 3 },
					    { id: 4 },
					    { id: 5 },
					    { id: 6 },
					    { id: 7 },
					    { id: 8 },
					    { id: 9 }
					  ]
					  
					});
				this._oPopover.setModel(popModel);
				this.getView().addDependent(this._oPopover);
				//console.log(this._oPopover.getParent().getModel());
				
			}
 
			// delay because addDependent will do a async rerendering and the popover will immediately close without it
			var oColumnListItem = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oColumnListItem);
			});
		},
		
		getGroupHeader: function (oGroup){
			return new GroupHeaderListItem( {
				title: oGroup.key,
				upperCase: false
			} );
		},
		
		getTitle: function (oEvent){
			//var title = this.getModel().getProperty("txtequipeA");
			//console.log(JSON.stringify(title));
			var bindingContext = oEvent.getSource().getBindingContext();
			var title = bindingContext.getProperty("txtequipeA");
			return title;
		},
		
		saveScore: function (oEvent) {
			//console.log(oEvent.getSource());
			//var bindingContext = oEvent.getSource().getBindingContext();
			//var txt = bindingContext.getProperty("/match");
			//console.log(bindingContext);
			console.log(this._oPopover.getId("oCombo1").getValue());
			console.log(sap.ui.getCore().getId("oCombo1").getValue());
			this._oPopover.close();
		},
/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf QuickStartApplication.view.Pronostics
		 *///	onBeforeRendering: function() {
//
//	},
/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf QuickStartApplication.view.Pronostics
		 *///	onAfterRendering: function() {
//
//	},
/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf QuickStartApplication.view.Pronostics
		 *///	onExit: function() {
//
//	}
		/**
	*@memberOf QuickStartApplication.controller.Pronostics
	*/
    onNavBack: function () {
//      This code was generated by the layout editor.
            var oHistory, sPreviousHash;
 
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}
	});
});
/**
var oModel = new JSONModel(Device);
oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty&phase=A");
this.getView().setModel(oModel);
*/