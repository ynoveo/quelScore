sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/commons/TextField",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/GroupHeaderListItem",
	'sap/ui/core/Fragment'
], function (Controller, History, JSONModel, Dialog, Button, TextField, SimpleForm, GroupHeaderListItem, Fragment) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.Pronostics", {
/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.Pronostics
		 */
		onInit: function() {
            var oModel = new JSONModel();
            oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty");
            //oModel.loadData("../webapp/localService/matchlist.json");
            this.getView().setModel(oModel);
	},
	
		openPopup: function(oEvent) {
			var bindingContext = oEvent.getSource().getBindingContext();
			var title = bindingContext.getProperty("txtequipeA")+" - "+bindingContext.getProperty("txtequipeB");
			var idMatch = bindingContext.getProperty("idMatch");

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
					press: function () {
						jQuery.sap.log.error(idMatch);
						jQuery.sap.log.error(pronoA.getProperty("value"));
						jQuery.sap.log.error(pronoB.getProperty("value"));
						// TODO: updateScore(idMatch, pronoA.getProperty("value"), pronoB.getProperty("value"));
						var updateURL = "https://www.quelscore.com/JSON_V2016.php?action=SAVESCORE&idmatch="+idMatch+"&scoreA="+pronoA.getProperty("value")+"&scoreB="+pronoB.getProperty("value");
						$.ajax({
							type: "POST",
							data: "",
							crossDomain: true,
							url: updateURL,
							headers: {"key1":"value1","key2":"value2"},
							contentType: "application/json",
							success: function (res, status, xhr) {
							    //success code
							    jQuery.sap.log.error("Success response: " + status + res + xhr);
							    jQuery.sap.log.error("Success response: " + status + res);
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
		
		onOpenPopover: function () {
 
			// create popover
			if (! this._oPopover) {
				//this._oPopover = sap.ui.xmlfragment("../webapp/view/Popover", this.getView().getController());
				this._oPopover = sap.ui.xmlfragment("Popover", this);
				this.getView().addDependent(this._oPopover);
			}
		},
		
		getGroupHeader: function (oGroup){
			return new GroupHeaderListItem( {
				title: oGroup.key,
				upperCase: false
			} );
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
