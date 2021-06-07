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
    "sap/ui/model/Filter",
    "sap/m/Input",
	"sap/m/Label"
], function (Controller, History, JSONModel, Dialog, Button, TextField, SimpleForm, GroupHeaderListItem, MessageToast, Filter, Input, Label) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.InitPassword", {
        onUserMatched: function(oEvent){
            
            var passkey = decodeURIComponent(oEvent.getParameter("arguments").initkey);
			var oController = this;
			var dialog = new Dialog({
				title: "Se Désinscrire",
				type: "Message",
				content: [
					new Label({ text: "Souhaitez-vous vraiment vous désinscrire de quelscore ?" }),
				],
				buttons: 
				[ 
//				beginButton: 
				new Button({
					id: "idValid",
					text: "Valider",
					type: "Reject",
					press: function () {
						var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
						var sUrl = sPreURL + "JSON_V2021.php?action=UNSUBSCRIBE&key=" + passkey;
						var otModel = new JSONModel();

						if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
							otModel.loadData("../webapp/localService/connect.json", {}, false);
						} else {
							otModel.loadData(sUrl, {}, false);	
						}
						oController.getView().setModel(otModel);
						//MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
						if(otModel.getProperty("/reponse/retcode") === "0") {
                            MessageToast.show("Demande de désinscription bien reçu, elle sera effective d'ici 24h");
                           
                            // ++ redirection vers l'accueil : https://www.quelscore.com
	    					dialog.close();
						} else {
                            // message d'erreur 
                            MessageToast.show(otModel.getProperty("/reponse/retmsg"));

                            // si message d'erreur avec apikey non valide 
                            // MessageToast.show("La clé de réactivation n'est pas valide, vous devez faire une nouvelle demande de réinitilisation");
                         // ++ redirection vers l'accueil : https://www.quelscore.com
						}
					}
				}),
//				endButton:
				new Button({
					text: 'Annuler',
					press: function () {
                        dialog.close();
					}
				})
			],
				afterClose: function() {
                            if (screen.width<1250) {			
                                   	setTimeout(sap.ui.core.UIComponent.getRouterFor(oController).navTo("HomePhone"), 5000);
                            } else {
                                setTimeout(sap.ui.core.UIComponent.getRouterFor(oController).navTo("appHome"), 5000);        
                            }                              
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
		

        },
		onInit: function() {
//--------  
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("unsubscribe").attachPatternMatched(this.onUserMatched, this);
          
//-------

        }
    });
});