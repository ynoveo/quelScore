sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel"
], function (Controller, Dialog, Button, Text, JSONModel) {
	"use strict";
	return Controller.extend("QuickStartApplication.controller.Home", {
	    
	    onInit: function() {
            var oModel = new JSONModel();
            // TODO: supprimer la virgule qui traine dans le JSON du serveur
            //oModel.loadData("http://www.quelscore.com/JSON_V2016.php?action=CONNECT&pseudo=francois&email=francois.dumont@ynoveo.fr&pass=azerty");
            oModel.loadData("../webapp/localService/connect.json");
            this.getView().setModel(oModel);
	},
		/**
	*@memberOf QuickStartApplication.controller.View1
	*/
        onNavToPronostics: function () {
//      This code was generated by the layout editor.
            sap.ui.core.UIComponent.getRouterFor(this).navTo("mesPronostics");
		},
		/**
	*@memberOf QuickStartApplication.controller.Home
	*/
        onNavToCompte: function () {
//      This code was generated by the layout editor.
            sap.ui.core.UIComponent.getRouterFor(this).navTo("monCompte");
		},
		
		onDialogPress: function () {
			var dialog = new Dialog({
				title: "Règles du jeu",
				type: "Message",
					content: new Text({
						text: "5 points si vous trouvez le score exact, (après prolongation)\\n\\n3 points si vous avez la bonne différence de buts\\n\\n1 point si vous avez pronostiqué le bon vainqueur (ou match nul)"
					}),
				beginButton: new Button({
					text: "OK",
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
	});
});