sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	"sap/m/Input",
	"sap/m/Label"
], function (Controller, Dialog, Button, Text, JSONModel, MessageToast, Input, Label) {
	"use strict";
	return Controller.extend("QuickStartApplication.controller.Home", {

		onInit: function () {
			var oModel = new JSONModel();
//			oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty&phase=A");
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
		onNavToGroupe: function () {
			//      This code was generated by the layout editor.
sap.ui.core.UIComponent.getRouterFor(this).navTo("mesGroupes");
		},
		onDialogPress: function () {
			var dialog = new Dialog({
				title: "R\xE8gles du jeu",
				type: "Message",
				content: new Text({ text: "5 points si vous trouvez le score exact, (apr\xE8s prolongation)\\n\\n3 points si vous avez la bonne diff\xE9rence de buts\\n\\n1 point si vous avez pronostiqu\xE9 le bon vainqueur (ou match nul)" }),
				beginButton: new Button({
					text: "OK",
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function () {
					dialog.destroy();
				}
			});
			//to get access to the global model
this.getView().addDependent(dialog);
			dialog.open();
		},
		/**
	*@memberOf QuickStartApplication.controller.Home
	*/
onLogon: function () {
//This code was generated by the layout editor.
var dialog = new Dialog({
				title: "Connexion",
				type: "Message",
				content: [
//					new Text({ text: 'Entrer vos identifiants' }),
					new Label({ text: 'Pseudo ou email' }),
					new Input('login'),
					new Label({ text: 'Mot de passe' }),					
					new Input('pass', {type: 'Password'})					
//					new TextArea('rejectDialogTextarea', {
//						width: '100%',
//						placeholder: 'Add note (optional)'
//					})
				],
				beginButton: new Button({
					text: 'Connexion',
					press: function () {
						var sLogin = encodeURIComponent(sap.ui.getCore().byId('login').getValue());
						var sPass = encodeURIComponent(sap.ui.getCore().byId('pass').getValue());
						var sUrl = "http://www.quelscore.com/JSON_V2016.php?action=CONNECT&email=" + sLogin + "&pass=" + sPass;
						var otModel = new JSONModel();
//						otModel.loadData(sUrl);
						otModel.loadData("../webapp/localService/connect.json");						
						MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		
		userInfo :  function (iduser) {
			try {
				if (iduser === "") {
					return "Connexion";
				} else {
					return iduser;
				}
			} catch (err) {
				return "Erreur";
			}
		}
	});
});