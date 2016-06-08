sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Text",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/Input",
	"sap/m/Label"
	
], function (Controller, Dialog, Button, Text, JSONModel, MessageToast, Input, Label) {
	"use strict";
	return Controller.extend("QuickStartApplication.controller.Home", {

		onInit: function () {
			//var oModel = new JSONModel();
//			oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty&phase=A");
			//oModel.loadData("../webapp/localService/connect.json");
			//this.getView().setModel(oModel);
			
			var oBusyDialog_Global = new sap.m.BusyDialog("GlobalBusyDialog");
		},
		/**
	*@memberOf QuickStartApplication.controller.View1
	*/
		onNavToPronostics: function () {
			//      This code was generated by the layout editor.
			// on test si le user est connecté sinon on affiche un message d'erreur
			var ogModel=sap.ui.getCore().getModel("global");
			var sLogin = ogModel.getProperty("/pseudo");
/*			  var oButton1 = new sap.m.Button("Submit", {
                     text: "test",
					 press: function () {
							this.close();
						}
             });
			  var oButton2 = new sap.m.Button("Submit2", {
                     text: "test",
					 press: function () {
							this.close();
						}
             });*/

				if(sLogin===""){
					var oController = this;
					var dialog = new Dialog({
					title: "Identifiez-vous",
					type: "Message",
					content: new Text({ text: "Identifiez-vous ou inscrivez vous pour faire vos pronostics pour l'euro2016" }),
//					
/*					buttons: new Button({
						text: "Fermer",
						type: "Emphasized",
						width: "150px",
						press: function () {
							dialog.close();
						}
						}),*/
					buttons: [new Button({
						text: "S'identifier",
						type: "Accept",
						press: function () {
							oController.onLogon();
							dialog.close();
						}
					}),
					new Button({
						text: "S'inscrire",
						type: "Emphasized",
						press: function () {
							oController.onSubscribe();
							dialog.close();
						}
					}),
					new Button({
						text: "Annuler",
						type: "Reject",
						press: function () {
							dialog.close();
						}
					})],
					
					afterClose: function () {
						dialog.destroy();
					}
				});
				dialog.open();
			}	else {
				var sIdUser = ogModel.getProperty("/iduser");
				var sPseudo = ogModel.getProperty("/pseudo");
				sap.ui.core.UIComponent.getRouterFor(this).navTo("mesPronostics", { idUser: sIdUser, oPseudo: sPseudo});
				
						var getDialog = sap.ui.getCore().byId("GlobalBusyDialog");
						getDialog.open();
					
			}
		},
		/**
	*@memberOf QuickStartApplication.controller.Home
	*/
		onNavToCompte: function () {
			//      Affichage du classement global, on utilise la même vu que pour un groupe mais avec l'id 0
			sap.ui.core.UIComponent.getRouterFor(this).navTo("UserList", { groupId: "0"});
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
onLogout: function (){
    			this.byId("__button1").setVisible(true);
			    this.byId("__button_disc").setVisible(false);
			    this.byId("Bt_sub").setVisible(true);
			    this.byId("__item0").setVisible(false);
				var ogModel=sap.ui.getCore().getModel("global");
				ogModel.setProperty("/pseudo", "");
				ogModel.setProperty("/pwd", "");
				var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
				var sUrl = sPreURL + "JSON_V2016.php?action=DISCONNECT";
				var otModel = new JSONModel();
				otModel.loadData(sUrl, {}, false);
				MessageToast.show("A bientôt");
		
},

onMail: function () {
                    sap.m.URLHelper.triggerEmail("fiori@ynoveo.fr", "SAP FIORI - quelscore", "");
 },

onYnoveo: function () {
                    sap.m.URLHelper.redirect("http://www.ynoveo.fr", true);
 },

/* -----------------------------------------------------------------------
							Formulaire de connexion 
-------------------------------------------------------------------------*/
onLogon: function () {

//This code was generated by the layout editor.
			var oController = this;
			var dialog = new Dialog({
				title: "Connexion",
				type: "Message",
				content: [
//					new Text({ text: 'Entrer vos identifiants' }),
					new Label({ text: "Pseudo ou email" }),
					new Input("loginc"),
					new Label({ text: "Mot de passe" }),
					new Input("passc", {type: "Password"})
				],
				buttons: 
				[ 
				/* new Button({
						text: "S'inscrire",
						type: "Emphasized",
						press: function () {
							oController.onSubscribe();
							dialog.close();
						}
					}),
*/					
//				beginButton: 
				new Button({
					id: "idAccept",
					text: "Connexion",
					type: "Accept",
					press: function () {
						var sLogin = encodeURIComponent(sap.ui.getCore().byId("loginc").getValue());
						var sPass = encodeURIComponent(sap.ui.getCore().byId("passc").getValue());
						var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
						var sUrl = sPreURL + "JSON_V2016.php?action=CONNECT&email=" + sLogin + "&pass=" + sPass;
						var otModel = new JSONModel();

						otModel.loadData(sUrl, {}, false);
						//otModel.loadData("../webapp/localService/connect.json", {}, false);
						oController.getView().setModel(otModel);
						//MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
						if(otModel.getProperty("/reponse/retcode") === "0") {

						//	console.log(oController.byId("__button1"));
						//	oController.byId("__button1").setEnabled(false);
						//	oController.byId("__button1").setText("Connecté");
		    			oController.byId("__button1").setVisible(false);
		    			oController.byId("__button_disc").setVisible(true);
		    			oController.byId("Bt_sub").setVisible(false);
		    			oController.byId("__item0").setVisible(true);
	    				var ogModel=sap.ui.getCore().getModel("global");
						ogModel.setProperty("/pseudo", sLogin);
						ogModel.setProperty("/pwd", sPass);
						ogModel.setProperty("/iduser", otModel.getProperty("/reponse/iduser") );
						MessageToast.show("Bienvenue");
						dialog.close();
						} else {
							MessageToast.show(otModel.getProperty("/reponse/retmsg"));
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
					dialog.destroy();
				},
				afterOpen : function(){
					$(document).bind('keypress', function(e) {
						if(e.keyCode === 13){
							e.preventDefault();
							sap.ui.getCore().byId("idAccept").firePress();
						}
					});
				}
			});

			dialog.open();
		},


/* -----------------------------------------------------------------------
							Formulaire d'e connexion d'inscription 
-------------------------------------------------------------------------*/
onSubscribe: function () {
//This code was generated by the layout editor.
var oController = this;
var dialog = new Dialog({
				title: "Formulaire d'inscription",
				type: "Message",
				content: [
//					new Text({ text: 'Entrer vos identifiants' }),
					new Label({ text: 'E-mail' }),
					new Input('email',  {type: 'Email'}),
					new Label({ text: 'Pseudo' }),
					new Input('pseudo'),					
					new Label({ text: 'Mot de passe' }),					
					new Input('pass', {type: 'Password'}),
					new Label({ text: 'Confirmation du Mot de passe' }),					
					new Input('pass2', {type: 'Password'})
//					new TextArea('rejectDialogTextarea', {
//						width: '100%',
//						placeholder: 'Add note (optional)'
//					})
				],
				beginButton: new Button({
					text: 'Inscription',
					type: "Emphasized",
					press: function () {
						var sEmail = encodeURIComponent(sap.ui.getCore().byId('email').getValue());
						var sPass = encodeURIComponent(sap.ui.getCore().byId('pass').getValue());
						var sPass2 = encodeURIComponent(sap.ui.getCore().byId('pass2').getValue());
						var sPseudo = encodeURIComponent(sap.ui.getCore().byId('pseudo').getValue());
						var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
						var sUrl = sPreURL + "JSON_V2016.php?action=INSCRIPTION&mail=" + sEmail + "&pass1=" + sPass + "&pass2=" + sPass2 + "&pseudo=" + sPseudo;
						var otModel = new JSONModel();
						otModel.loadData(sUrl, {},false);	
						oController.getView().setModel(otModel);
//						console.log(sUrl);
						if(otModel.getProperty("/reponse/retcode") === "0") {
			    			oController.byId("__button1").setVisible(false);
			    			oController.byId("__button_disc").setVisible(true);
			    			oController.byId("Bt_sub").setVisible(false);
			    			oController.byId("__item0").setVisible(true);
		    				var ogModel=sap.ui.getCore().getModel("global");
							ogModel.setProperty("/pseudo", sPseudo);
							ogModel.setProperty("/pwd", sPass);							
							MessageToast.show("Bienvenue");
							dialog.close();
						} else {
							MessageToast.show(otModel.getProperty("/reponse/retmsg"));
						}
					}
				}),
				endButton: new Button({
					text: 'Annuler',
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
