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
            if (screen.width<1366) {
			//if (sap.ui.Device.system.phone) {
            	sap.ui.core.UIComponent.getRouterFor(this).navTo("HomePhone");
            }
			//var oModel = new JSONModel();
//			oModel.loadData("https://www.quelscore.com/JSON_V2016.php?action=MATCHLIST&email=francois.dumont@ynoveo.fr&pass=azerty&phase=A");
			//oModel.loadData("../webapp/localService/connect.json");
			//this.getView().setModel(oModel);
			//test2
			this.byId("__box_text1").addStyleClass("mybg");
//			this.byId("__box_text2").addStyleClass("mybandeau2");
			this.byId("__box2a").addStyleClass("mybandeau2a");
			this.byId("__box2b").addStyleClass("mybandeau2b");
			this.byId("__box3a").addStyleClass("mybandeau3a");
			this.byId("__box3b").addStyleClass("mybandeau3b");			
			this.byId("__box4a").addStyleClass("mybandeau4a");
			this.byId("__box4b").addStyleClass("mybandeau4b");
			this.byId("__box5a").addStyleClass("mybandeau5a");
			this.byId("__box5b").addStyleClass("mybandeau5b");
			this.byId("__box6a").addStyleClass("mybandeau6a");
			this.byId("__box6b").addStyleClass("mybandeau6b");			
			this.byId("__textR1").addStyleClass("myText");
			this.byId("__textR2").addStyleClass("myText");
			this.byId("__textR3").addStyleClass("myText");
			this.byId("__textR4").addStyleClass("myText");
			this.byId("__box_ynoveo").addStyleClass("mybandeau7");			
			this.byId("__text_pseudo").addStyleClass("myBlackText");
			this.byId("__text_classement").addStyleClass("myBlackText");			
			this.byId("__text_points").addStyleClass("myBlackText");	
			var oBusyDialog_Global = new sap.m.BusyDialog("GlobalBusyDialog");
		},
		onAfterRendering: function (){
		// Add JSPI : test si connexion active
//			var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");			
//			var sUrl = sPreURL + "JSON_V2018.php?action=CONNECT";
			var sUrl = "https://www.quelscore.com/JSON_V2021.php?action=CONNECT";
			var otModel = new JSONModel();
			if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				otModel.loadData("../webapp/localService/connect.json", {}, false);
			} else {
				otModel.loadData(sUrl, {}, false);	
			}
			this.getView().setModel(otModel);
			//MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
			if(otModel.getProperty("/reponse/retcode") === "0") {

				this.byId("__box_login").setVisible(false);
				this.byId("__box_user_info").setVisible(true);
				this.byId("Btn_logout").setVisible(true);
				var myhtmlid = this.createId("userinfo");
				document.getElementById(myhtmlid).style.display = "block";  //masquer
				document.getElementById(this.createId("accueil")).style.display = "none";
				
				if (otModel.getProperty("/reponse/avatar")!=="AUCUN"){
					this.byId("avatar").setSrc("./avatars/"+otModel.getProperty("/reponse/avatar"));
				}
				this.byId("__text_pseudo").setProperty("text", otModel.getProperty("/reponse/pseudo"));
				this.byId("__text_classement").setProperty("text", "Classement général : " +  otModel.getProperty("/reponse/position"));
				this.byId("__text_points").setProperty("text", otModel.getProperty("/reponse/nbpoints") + " pts");
				
				var ogModel=sap.ui.getCore().getModel("global");
				ogModel.setProperty("/pseudo", otModel.getProperty("/reponse/pseudo"));
		//		ogModel.setProperty("/pwd", sPass);
				ogModel.setProperty("/iduser", otModel.getProperty("/reponse/iduser") );
			} 
// fin ajout JSPI 	
			
		//ajout GLOU
			var ogModel=sap.ui.getCore().getModel("global");
			var sLogin = ogModel.getProperty("/pseudo");
			var sPass = ogModel.getProperty("/pwd");
			var sPreURL = ogModel.getProperty("/preURL");
			var sUrl = "https://www.quelscore.com/JSON_V2021.php?action=PLAYERLIST&groupe=0&email=" + sLogin + "&pass=" + sPass;
			var oModel = new JSONModel();
			if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				oModel.loadData("../webapp/localService/userGroup.json");
			} else {
				oModel.loadData(sUrl,{},false);				
			}
						
			var oTable = this.getView().byId("__table0");
			oTable.setModel(oModel);
			var oModel2 = new JSONModel();
			var sUrl2 = "https://www.quelscore.com/JSON_V2021.php?action=MATCHLIST";
			var oTable2 = this.getView().byId("__table1");
			oModel2.loadData(sUrl2,{},false);
			oTable2.setModel(oModel2);
			
		},
		
		avatarformatter: function (avatar,pseudo) {
		if (pseudo==="GLOU" || pseudo==="JSPI"){
			return "./avatars/ynoveo-eo-final.png";
		}else{
			if (avatar==="AUCUN"){
				return "";
			}else{
				return "./avatars/"+avatar ;
			}
		}
	},
			//fin ajout GLOU
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
			sap.ui.core.UIComponent.getRouterFor(this).navTo("accueilGroupes");
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
//    			this.byId("__button1").setVisible(true);
//			    this.byId("__button_disc").setVisible(false);
//			    this.byId("Bt_sub").setVisible(true);
//			    this.byId("__item0").setVisible(false);
		    	this.byId("__box_login").setVisible(true);
		    	this.byId("__box_user_info").setVisible(false);
				this.byId("Btn_logout").setVisible(false);
				var myhtmlid = this.createId("userinfo");
				document.getElementById(myhtmlid).style.display = "none";  //masquer
				document.getElementById(this.createId("accueil")).style.display = "block";
//Ajouter les  évenements pour revenir interface initiale

				var ogModel=sap.ui.getCore().getModel("global");
				ogModel.setProperty("/pseudo", "");
				ogModel.setProperty("/pwd", "");
				var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
				var sUrl = sPreURL + "JSON_V2021.php?action=DISCONNECT";
				var otModel = new JSONModel();
				otModel.loadData(sUrl, {}, false);
				MessageToast.show("A bientôt");
		
},

onMail: function () {
                    sap.m.URLHelper.triggerEmail("fiori@ynoveo.fr", "SAP FIORI - quelscore", "");
 },

onYnoveo: function () {
                    sap.m.URLHelper.redirect("http://www.ynoveo.fr/nos-services/offre-sap-fiori-sap-ui5/", true);
 },
onAvatar  : function () {
				var myAvatar = this.byId("avatar");
		        var oModel = new JSONModel();
				oModel.loadData("https://www.quelscore.com/localService/avatarlist.json", {}, false);
				this.getView().setModel(oModel, "remoteAvatar");
				
		
					var dialog = new sap.m.TableSelectDialog({
						contentWidth: "25%",
						columns:[
				          new sap.m.Column({
				        	hAlign:"Center",
				        	visible:false
				          }),
				          new sap.m.Column({
				        	hAlign:"Center"
				          })
				        ],
			        	confirm: function(oEvent) {
							var selectedItem = oEvent.getParameter("selectedItem");
							var oCells = selectedItem.getCells();
							var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
							var sUrl = sPreURL + "JSON_V2021.php?action=SETAVATAR&avatar=" + oCells[0].getText();
							var otModel = new JSONModel();
							if(sap.ui.getCore().getModel("global").getProperty("/mode") !== "test") {
									otModel.loadData(sUrl,{},false);				
								}
							if (oCells[0].getText() ==="AUCUN"){
								myAvatar.setSrc("sap-icon://person-placeholder");
							}
							else{
								myAvatar.setSrc("./avatars/"+oCells[0].getText());
							}
						}
        			});
        			
        			dialog.bindAggregation("items",{
			            path:"remoteAvatar>/avatarlist",
			            template: new  sap.m.ColumnListItem({
						  cells:[             
						       new sap.m.Text({
						       text:'{remoteAvatar>avatar}'
						        }),
						       new sap.f.Avatar({
						       		src:"./avatars/{remoteAvatar>avatar}",
						       		displaySize:"S",
						       		imageFitType:"Contain",
						       		width:"25%"
						       })
						     ]
						  })
			          });
					dialog.setModel(oModel);
					
					this.getView().addDependent(dialog);
					dialog.open();
					
						
				
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
				new Button({
					text: 'Mot de passe oublié',
					type: "Emphasized",
					press: function () {
						var sMail = sap.ui.getCore().byId('loginc').getValue();
						if(oController.verifMail(sMail) === false) {
							sMail = '';
						}
						oController.onForgotPwd(sMail);
						dialog.close();
					}
				}),
//				beginButton: 
				new Button({
					id: "idAccept",
					text: "Connexion",
					type: "Accept",
					press: function () {
						var sLogin = encodeURIComponent(sap.ui.getCore().byId("loginc").getValue());
						var sPass = encodeURIComponent(sap.ui.getCore().byId("passc").getValue());
						var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
						var sUrl = sPreURL + "JSON_V2021.php?action=CONNECT&email=" + sLogin + "&pass=" + sPass;
						var otModel = new JSONModel();

						if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
							otModel.loadData("../webapp/localService/connect.json", {}, false);
						} else {
							otModel.loadData(sUrl, {}, false);	
						}
						oController.getView().setModel(otModel);
						//MessageToast.show("code retour = " + otModel.getProperty("/reponse/retcode"));
						if(otModel.getProperty("/reponse/retcode") === "0") {

						//	console.log(oController.byId("__button1"));
						//	oController.byId("__button1").setEnabled(false);
						//	oController.byId("__button1").setText("Connecté");
		    		
/* ancienne version		    		
		    			oController.byId("__button1").setVisible(false);
		    			oController.byId("__button_disc").setVisible(true);
		    			oController.byId("Bt_sub").setVisible(false);
		    			oController.byId("__item0").setVisible(true);
*/
		    			oController.byId("__box_login").setVisible(false);
		    			oController.byId("__box_user_info").setVisible(true);
						oController.byId("Btn_logout").setVisible(true);
						var myhtmlid = oController.createId("userinfo");
						document.getElementById(myhtmlid).style.display = "block";  //masquer
						document.getElementById(oController.createId("accueil")).style.display = "none";

		    			if (otModel.getProperty("/reponse/avatar")!=="AUCUN"){
		    				oController.byId("avatar").setSrc("./avatars/"+otModel.getProperty("/reponse/avatar"));
		    			}
		    			oController.byId("__text_pseudo").setProperty("text", otModel.getProperty("/reponse/pseudo"));
		    			oController.byId("__text_classement").setProperty("text", "Classement général : " +  otModel.getProperty("/reponse/position"));
		    			oController.byId("__text_points").setProperty("text", otModel.getProperty("/reponse/nbpoints") + " pts");
		    			
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
						var sUrl = sPreURL + "JSON_V2021.php?action=INSCRIPTION&mail=" + sEmail + "&pass1=" + sPass + "&pass2=" + sPass2 + "&pseudo=" + sPseudo;
						var otModel = new JSONModel();
						otModel.loadData(sUrl, {},false);	
						oController.getView().setModel(otModel);
//						console.log(sUrl);
						if(otModel.getProperty("/reponse/retcode") === "0") {
//			    			oController.byId("__button1").setVisible(false);
//			    			oController.byId("__button_disc").setVisible(true);
//			    			oController.byId("Bt_sub").setVisible(false);
//			    			oController.byId("__item0").setVisible(true);

			    			oController.byId("__box_login").setVisible(false);
			    			oController.byId("__box_user_info").setVisible(true);
							oController.byId("Btn_logout").setVisible(true);
							var myhtmlid = oController.createId("userinfo");
							document.getElementById(myhtmlid).style.display = "block";  //masquer
							document.getElementById(oController.createId("accueil")).style.display = "none";							
			    			oController.byId("__text_pseudo").setProperty("text", otModel.getProperty("/reponse/pseudo"));
//			    			oController.byId("__text_classement").setProperty("text", "Position au classement général : " +  otModel.getProperty("/reponse/position"));
			    			oController.byId("__text_points").setProperty("text", " 0 point");

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
		
/* -----------------------------------------------------------------------
							Formulaire mot de passe oublié 
-------------------------------------------------------------------------*/
onForgotPwd: function (oMail) {
//This code was generated by the layout editor.
var oController = this;
var dialog = new Dialog({
				title: "Mot de passe oublié",
				type: "Message",
				content: [
//					new Text({ text: 'Entrer vos identifiants' }),
					new Label({ text: 'Veuillez entrer votre e-mail pour réinitiliser votre mot de passe svp' }),
					new Input('email',  {type: 'Email', value: oMail})
				],
				beginButton: new Button({
					text: 'Envoyer',
					type: "Emphasized",
					press: function () {
						var sEmail = encodeURIComponent(sap.ui.getCore().byId('email').getValue());
//						if(oController.verifMail(sEmail)) {
							var sPreURL = sap.ui.getCore().getModel("global").getProperty("/preURL");
							var sUrl = sPreURL + "JSON_V2021.php?action=PASSWORD&mail=" + sEmail;
							var otModel = new JSONModel();
							otModel.loadData(sUrl, {},false);	
							oController.getView().setModel(otModel);
	//						console.log(sUrl);
							if(otModel.getProperty("/reponse/retcode") === "0") {
								MessageToast.show("Un email avec le lien de réinitialisation vient de vous être envoyé");
								dialog.close();
							} else {
								MessageToast.show(otModel.getProperty("/reponse/retmsg"));
							}
//						}	else {
//							MessageToast.show("Adresse mail incorrecte");
//						}
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
		
verifMail: function(oMail) {
// !! Cette fonction ne fonctionne pas !!
		   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
		   if(!regex.test(oMail))
		   {
		      return false;
		   }
		   else
		   {
		      return true;
		   }
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
