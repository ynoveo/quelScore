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

		onInit: function() {
//--------  
            var passkey = decodeURIComponent(oEvent.getParameter("arguments").initkey);
			var oController = this;
			var dialog = new Dialog({
				title: "Nouveau du mot de passe",
				type: "Message",
				content: [
					new Label({ text: "Mot de passe" }),
                    new Input("passc", {type: "Password"}),
                    new Label({ text: "Confirmer le Mot de passe" }),
                    new Input("passc2", {type: "Password"})    
				],
				buttons: 
				[ 
//				beginButton: 
				new Button({
					id: "idValid",
					text: "Valider",
					type: "Accept",
					press: function () {
                        var sPass = encodeURIComponent(sap.ui.getCore().byId("passc").getValue());
                        var sPass2 = encodeURIComponent(sap.ui.getCore().byId("passc2").getValue());
						var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
						var sUrl = sPreURL + "JSON_V2021.php?action=SECINIT&key=" + sLogin + "&pass=" + sPass + "&passb=" + sPass2;
						var otModel = new JSONModel();

						if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
							otModel.loadData("../webapp/localService/connect.json", {}, false);
						} else {
							otModel.loadData(sUrl, {}, false);	
						}
						oController.getView().setModel(otModel);
						//MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
						if(otModel.getProperty("/reponse/retcode") === "0") {
                            MessageToast.show("Mise à jour du mot de passe réussie");
                            // ++ redirection vers l'accueil : https://www.quelscore.com
	    					dialog.close();
						} else {
                            // message d'erreur 
                            MessageToast.show(otModel.getProperty("/reponse/retmsg"));
                            // si message d'erreur avec apikey non valide 
                             MessageToast.show("La clé de réactivation n'est pas valide, vous devez faire une nouvelle demande de réinitilisation");
                         // ++ redirection vers l'accueil : https://www.quelscore.com
						}
					}
				}),
//				endButton:
				new Button({
					text: 'Annuler',
					press: function () {
                        dialog.close();
                         // ++ redirection vers l'accueil : https://www.quelscore.com
					}
				})
			],
				afterClose: function() {
					dialog.destroy();
				},
				afterOpen : function(){
					$(document).bind('keypress', function(e) {
						if(e.keyCode === 13){
							e.preventDefault();
							sap.ui.getCore().byId("idValid").firePress();
						}
					});
				}
			});

			dialog.open();
		
//-------

        }
    });
});