sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/commons/TextField",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/GroupHeaderListItem",
	"sap/m/MessageToast",
	"sap/ui/model/Filter"
], function (Controller, History, JSONModel, Dialog, Button, TextField, SimpleForm, GroupHeaderListItem, MessageToast, Filter) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.Pronostics", {
/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication.view.Pronostics
		 * Test pour synchro
		 */
		onInit: function() {
/*			// Définition du modèle de la vue
            var ogModel=sap.ui.getCore().getModel("global");
			var sUser = ogModel.getProperty("/iduser");
			var sUrl = "https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&idPlayer=" + sUser;
			var oModel = new JSONModel();
			oModel.loadData(sUrl,{},false);
			this.getView().setModel(oModel, "remote");
			this.getView().setModel(ogModel, "global");*/
			
			// Récupération du paramètre passé à la vue
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("mesPronostics").attachPatternMatched(this.onUserMatched, this);
			this.getView().addEventDelegate({  
				onAfterShow: function() {  
					var getDialog = sap.ui.getCore().byId("GlobalBusyDialog");  
					getDialog.close();  
				}  
			}, this);
		},
	
		onUserMatched: function(oEvent) {
			// récupération du paramètre idUser
			var sIdUser = decodeURIComponent(oEvent.getParameter("arguments").idUser);
			var sPseudo = decodeURIComponent(oEvent.getParameter("arguments").oPseudo);
			
			// Définition du modèle de la vue
			var ogModel = sap.ui.getCore().getModel("global");
			var sUser = ogModel.getProperty("/iduser");
			var sLogin = ogModel.getProperty("/pseudo");
  			var sPass = ogModel.getProperty("/pwd");
			var sPreURL = ogModel.getProperty("/preURL");  			
			var sUrl = sPreURL + "JSON_V2016.php?action=MATCHLIST&idPlayer=" + sIdUser + "&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				oModel.loadData("../webapp/localService/matchlist.json", {}, false);
			} else {
				oModel.loadData(sUrl,{},false);				
			}
			//taille des drapeaux a 200% si utilisation d'un telephone
			if(sap.ui.Device.system.phone) {
				oModel.setProperty("/flagsize","15%");	
				oModel.setProperty("/teamsize","26%");
			} else {
				oModel.setProperty("/flagsize","9%");	
				oModel.setProperty("/teamsize","32%");
			}
			
			this.getView().setModel(oModel, "remote");
			//this.getView().setModel(ogModel, "global");
			
			var title;
			if(sUser === sIdUser) {
				// mon user, autoriser la saisie
				this._myUser = true;
				title = "Mes pronostics";
			}  else { 
				//	autre user, refuser la saisie
				this._myUser = false;
				title = "Pronostics de "+sPseudo;
			}

			this.getView().byId("idPage").setTitle(title);
		},
	
		openPopup: function(oEvent) {
			if(this._myUser) {
				var oView = this.getView();
				
				var bindingContext = oEvent.getSource().getBindingContext("remote");
				var title = bindingContext.getProperty("txtequipeA")+" - "+bindingContext.getProperty("txtequipeB");
				var idMatch = bindingContext.getProperty("idMatch");
				var enCours = bindingContext.getProperty("encours");
				var matchfini = bindingContext.getProperty("matchfini");
				
				if(enCours === "N" & matchfini === "N") {
				
					var label = new sap.m.Label({ text : title });
	
					// Dropdown box pour pronostic A
					var oDropdownBox1 = new sap.ui.commons.DropdownBox("DropdownBox1");
					oDropdownBox1.setTooltip("Pronostic "+bindingContext.getProperty("txtequipeA"));
					oDropdownBox1.setEditable(true);
					oDropdownBox1.setWidth("40px");
					var oItem = new sap.ui.core.ListItem("ScoreA0");
					oItem.setText("0");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA1");
					oItem.setText("1");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA2");
					oItem.setText("2");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA3");
					oItem.setText("3");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA4");
					oItem.setText("4");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA5");
					oItem.setText("5");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA6");
					oItem.setText("6");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA7");
					oItem.setText("7");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA8");
					oItem.setText("8");
					oDropdownBox1.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreA9");
					oItem.setText("9");
					oDropdownBox1.addItem(oItem);
					oDropdownBox1.setValue(bindingContext.getProperty("pronoA"));
					
					// Dropdown box pour pronostic B
					var oDropdownBox2 = new sap.ui.commons.DropdownBox("DropdownBox2");
					oDropdownBox2.setTooltip("Pronostic "+bindingContext.getProperty("txtequipeB"));
					oDropdownBox2.setEditable(true);
					oDropdownBox2.setWidth("40px");
					oItem = new sap.ui.core.ListItem("ScoreB0");
					oItem.setText("0");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB1");
					oItem.setText("1");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB2");
					oItem.setText("2");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB3");
					oItem.setText("3");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB4");
					oItem.setText("4");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB5");
					oItem.setText("5");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB6");
					oItem.setText("6");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB7");
					oItem.setText("7");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB8");
					oItem.setText("8");
					oDropdownBox2.addItem(oItem);
					oItem = new sap.ui.core.ListItem("ScoreB9");
					oItem.setText("9");
					oDropdownBox2.addItem(oItem);
					oDropdownBox2.setValue(bindingContext.getProperty("pronoB"));
					
					var simpleForm = new SimpleForm({editable: true,content: [label, oDropdownBox1, oDropdownBox2]});
					
					var dialog = new Dialog({
						title: "Mon pronostic",
						content: simpleForm,
						beginButton: new Button({
							text: "Sauvegarder",
							type: "Emphasized",
							press: function () {
								if(enCours === "N" & matchfini === "N") {
									var newPronoA = oDropdownBox1.getValue();
									var newPronoB = oDropdownBox2.getValue();
									
									// Récupération du pseudo + pwd car la session ne fonctionne pas
									var olModel=sap.ui.getCore().getModel("global");
									var sPseudo = olModel.getProperty("/pseudo");
									var sPwd = olModel.getProperty("/pwd");
									var sPreURL = olModel.getProperty("/preURL");
									var updateURL = sPreURL + "JSON_V2016.php?action=SAVESCORE&idmatch="+idMatch+"&scoreA="+newPronoA+"&scoreB="+newPronoB+"&email="+sPseudo+"&pass="+sPwd;
									$.ajax({
										type: "POST",
										data: "",
										crossDomain: true,
										url: updateURL,
										
										contentType: "application/json",
										success: function (res, status, xhr) {
										    //success code
										    //jQuery.sap.log.error("Success response: " + status + res);
										    var ogModel=sap.ui.getCore().getModel("global");
											var sUser = ogModel.getProperty("/iduser");
											var sPreURL2 = ogModel.getProperty("/preURL");
											var sUrl = sPreURL2 + "JSON_V2016.php?action=MATCHLIST&idPlayer=" + sUser;
											var oModel = new JSONModel();
											oModel.loadData(sUrl,{},false);
											dialog.close();
											oView.setModel(oModel, "remote");
										},
											error: function (jqXHR, textStatus, errorThrown) {
											jQuery.sap.log.error("Got an error response: " + textStatus + errorThrown);
										}
										});
								}
								else {
									MessageToast.show("Le match est déjà commencé ou terminé !");
								}
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
				}
				else {
									MessageToast.show("Le match est déjà commencé ou terminé !");
								}
			} else {
				MessageToast.show("Vous ne pouvez pas saisir les pronostics d'un autre joueur");
			}
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
		
/*		onOpenPopover: function (oEvent) {
 
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
		},*/
		
		getGroupHeader: function (oGroup){
			var keyStr = oGroup.key;
			var day = keyStr.substr(6,2);
			var month = keyStr.substr(4,2);
			var year = keyStr.substr(0,4);
/*
			var newDate = year+"-"+month+"-"+day;
			var d = new Date(newDate);
			jQuery.sap.require("sap.ui.core.format.DateFormat");
			//var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern: "dddd dS mmmm yyyy", style: "long"});
			
			//var d2 = oDateFormat.parse(newDate);
			//oDateFormat.format(d2);
			d.toDateString();
			console.log(d);*/
			return new GroupHeaderListItem( {
				//title: oGroup.key,
				title: day + "/" + month + "/" + year,
				upperCase: false
			} );
		},
		
/*		getTitle: function (pseudo){
			var ogModel = this.getView().getModel("remote");
			var sPseudo = ogModel.getProperty("/reponse/pseudo");
			var title;
			console.log(pseudo);
			if(sPseudo === pseudo.pseudo) {
				title = "Mes pronostics";
			} else {
				title = "Pronostics de "+pseudo.pseudo;
			}
			return title;
		},*/
		
/*		saveScore: function (oEvent) {
			//console.log(oEvent.getSource());
			//var bindingContext = oEvent.getSource().getBindingContext();
			//var txt = bindingContext.getProperty("/match");
			//console.log(bindingContext);
			console.log(this._oPopover.getId("oCombo1").getValue());
			console.log(sap.ui.getCore().getId("oCombo1").getValue());
			this._oPopover.close();
		},*/
		
		_applyFilter: function(oFilter) {
			// Get the table (last thing in the VBox) and apply the filter
			var aTableItems = this.getView().byId("idVBox").getItems();
			var oTable = aTableItems[aTableItems.length-1];
			oTable.getBinding("items").filter(oFilter);
		},
 
		handleFacetFilterReset: function(oEvent) {
			var oFacetFilter = sap.ui.getCore().byId(oEvent.getParameter("id"));
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i=0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			this._applyFilter([]);
		},
 
		handleListClose: function(oEvent) {
			// Get the Facet Filter lists and construct a (nested) filter for the binding
			var oFacetFilter = oEvent.getSource().getParent();
			var mFacetFilterLists = oFacetFilter.getLists().filter(function(oList) {
					return oList.getSelectedItems().length;
				});
 
			if(mFacetFilterLists.length) {
				// Build the nested filter with ORs between the values of each group and
				// ANDs between each group
				var oFilter = new Filter(mFacetFilterLists.map(function(oList) {
					return new Filter(oList.getSelectedItems().map(function(oItem) {
						var filterKey = oList.getTitle();
						var filterItem;
						switch(filterKey) {
						    case "Date du match":
						        filterItem = "matchdate";
						        break;
						    case "Match en cours":
						        filterItem = "encours";
						        break;
						    case "Groupes/Phase":
						        filterItem = "phase";
						        break;
						    case "Equipe domicile":
						        filterItem = "txtequipeA";
						        break;
						    case "Equipe extérieur":
						        filterItem = "txtequipeB";
						        break;
						}
						var oItemText = oItem.getText();
						switch(oItemText) {
						    case "8ème de finale":
						        oItemText = "8";
						        break;
						    case "1/4 de finale":
						        oItemText = "4";
						        break;
						    case "1/2 finale":
						        oItemText = "2";
						        break;
						    case "Finale":
						        oItemText = "1";
						        break;
						}
						return new Filter(filterItem, "EQ", oItemText);
					}), false);
				}), true);
				this._applyFilter(oFilter);
			} else {
				this._applyFilter([]);
			}
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