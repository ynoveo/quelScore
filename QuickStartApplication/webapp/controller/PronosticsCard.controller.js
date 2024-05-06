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
    'sap/ui/core/Fragment'
], function (Controller, History, JSONModel, Dialog, Button, TextField, SimpleForm, GroupHeaderListItem, MessageToast, Filter, Fragment) {
	"use strict";

	return Controller.extend("QuickStartApplication.controller.Pronostics2", {

		onInit: function() {
//                  Si l'écran est trop grand on limite la taille du caroussel
                /*if (screen.width>1250) {
                    this.getView().byId("carousel").setWidth('1250px');
                }*/

//
			// Récupération du paramètre passé à la vue
			sap.ui.core.UIComponent.getRouterFor(this).getRoute("mesPronostics").attachPatternMatched(this.onUserMatched, this);
			
			this.getView().addEventDelegate({  
				onAfterShow: function() {  
					var getDialog = sap.ui.getCore().byId("GlobalBusyDialog");  
					getDialog.close();
					
					// A l'ouverture, illustration pour la navigation
						var ogModel = sap.ui.getCore().getModel("global");
						//if(!ogModel.getProperty("/donotshow")){
						//desactivation du message dialogue (condition if(false) pour désactiver)
						if(false){
							if(sap.ui.Device.support.touch){
								var dialog = new Dialog({
									icon: 'sap-icon://lightbulb',
									type: 'Message',
									
									content: [new sap.m.Image({src:"./view/finger_scroll.png", width:"100%"}),new sap.m.Text({text:"Balayez l'écran pour changer de page."})],
			
									beginButton: new Button({
										text: 'J\'ai compris',
										press: function () {
											dialog.close();
										}
									}),
									afterClose: function() {
										dialog.destroy();
										ogModel.setProperty("/donotshow",true);
									}
							});} else {
								var dialog = new Dialog({
								icon: 'sap-icon://lightbulb',
								type: 'Message',
								
								content: new sap.m.Text({text:"Utilisez les flèches sur les côtés pour changer d'écran."}),
		
								beginButton: new Button({
									text: 'J\'ai compris',
									press: function () {
										dialog.close();
									}
								}),
								afterClose: function() {
									dialog.destroy();
									
								}
							});
							}
						
		
					//to get access to the global model
					this.getView().addDependent(dialog);
					dialog.open();
					var _timeout;
					
					// simulate end of operation
					_timeout = jQuery.sap.delayedCall(3000, this, function () {
						dialog.close();
					});
				}
				}  
			}, this);
	
			//Affichage du classement des groupes
			var x = ["A", "B","C","D","E","F","G","H"];
			var i;
			for (i = 0; i < x.length; i++) { 
				var oModelClGroupe = new JSONModel();
				var ogModel = sap.ui.getCore().getModel("global");
				var sUser = ogModel.getProperty("/iduser");
				var sLogin = ogModel.getProperty("/pseudo");
	  			var sPass = ogModel.getProperty("/pwd");
				var sPreURL = ogModel.getProperty("/preURL");  			
				var sUrl = sPreURL + "JSON_V2021.php?action=TOPTEAM&phase=" + x[i];
				
				//
				if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				oModelClGroupe.loadData("../webapp/localService/topteam"+x[i]+".json", {}, false);
				} else {
					oModelClGroupe.loadData(sUrl,{},false);				
				}
				
				this.getView().setModel(oModelClGroupe, "remoteClgroupe"+x[i]);
				
				var maTable = new sap.m.Table({
					columns:[
			          new sap.m.Column({
			        	width:"8%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"10%", hAlign:"Center", vAlign:"Middle", demandPopin:true, minScreenWidth:"Tablet"
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"Pts"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle", demandPopin:true, minScreenWidth:"Tablet", popinDisplay:"Inline"
			          })
			          ,new sap.m.Column({
			        	width:"5%", hAlign:"Center", vAlign:"Middle", visible:sap.ui.Device.system.phone
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"J"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle"
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"G"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle"
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"N"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle"
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"P"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle"
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"p"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle", visible:!(sap.ui.Device.system.phone)
			          }),new sap.m.Column({
			          header:[
			                  new sap.m.Label({
			                  text:"+/-"
			                  })
			                  ],
			          width:"10%", hAlign:"Center", vAlign:"Middle"
			          })
			          ],
					items:{
						path: 'remoteClgroupe'+x[i]+'>/equipes',
						template: new sap.m.ColumnListItem({
						  cells:[             
						       new sap.m.Image({
						       		src:"./flag/{remoteClgroupe"+x[i]+">flag}",
						       		width:"100%"
						       }),
						       new sap.m.Text({
						       text:"{remoteClgroupe"+x[i]+">txtequipe}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">Nbpoints}"
						        }),
						        new sap.m.Text({
						        text:""
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">play}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">win}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">nul}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">perdu}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">buts}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">encaisse}"
						        }),
						        new sap.m.Text({
						        text:"{remoteClgroupe"+x[i]+">dif}"
						        })
						     ]
						  })
						}
				});
				
				var monPanel = new sap.m.Panel();
				monPanel.setExpandable(true);
				monPanel.setExpanded(true);
				monPanel.setHeaderText("Classement Groupe " + x[i]);
				monPanel.setWidth("auto");
				monPanel.addStyleClass("sapUiResponsiveMargin");
				monPanel.addContent(maTable);
				
				this.getView().byId("classementGroupe").addContent(monPanel);
				
			}
			
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
			var sUrl = sPreURL + "JSON_V2021.php?action=MATCHLIST&idPlayer=" + sIdUser + "&email=" + sLogin + "&pass=" + sPass;
			var sUrlOuvert=sUrl +"&pronoOuvert=Y";
			var sUrlClos=sUrl +"&pronoOuvert=N";
			var oModel = new JSONModel();
			var oModelClos = new JSONModel();
			var oModelGroupe = new JSONModel();
			var oModelTest = new JSONModel();
			if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
				oModel.loadData("../webapp/localService/matchlist.json", {}, false);
				oModelClos.loadData("../webapp/localService/matchlistClos.json", {}, false);
				oModelGroupe.loadData("../webapp/localService/topteam.json", {}, false);
				oModelTest.loadData("../webapp/localService/userGroup.json");
			} else {
				oModel.loadData(sUrlOuvert,{},false);
				oModelClos.loadData(sUrlClos,{},false);
			}
			//taille des drapeaux si utilisation d'un telephone
			if(sap.ui.Device.system.phone) {
				oModel.setProperty("/flagsize","15%");	
				oModel.setProperty("/teamsize","26%");
				oModelGroupe.setProperty("/flagsize","8%");
				oModelGroupe.setProperty("/nophone",false);
				oModelGroupe.setProperty("/isphone",true);
			} else {
				oModel.setProperty("/flagsize","9%");	
				oModel.setProperty("/teamsize","32%");
				oModelGroupe.setProperty("/flagsize","8%");
				oModelGroupe.setProperty("/nophone",true);
				oModelGroupe.setProperty("/isphone",false);
			}
			
			this.getView().setModel(oModel, "remote");
			this.getView().setModel(oModelClos, "remoteClos");
			this.getView().setModel(oModelGroupe, "remotegroupe");
			this.getView().setModel(oModelTest, "Test");
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
			//affichage de la page 1 du carousel
				/*var page1 = this.getView().byId("carousel").getPages()[0];
				this.getView().byId("carousel").setActivePage(page1);*/
			
		},
	
		onPrevious:function(){
			this.getView().byId("carousel").previous();
		},
		
		onNext:function(){
			this.getView().byId("carousel").next();
		},
		
		openPopup: function(oEvent) {
			if(this._myUser) {
				var oView = this.getView();
				var id =oEvent.getSource().getId();
				if(String(id).indexOf("matchTable2") === -1){
					var bindingContext = oEvent.getSource().getBindingContext("remote");
				} else
				{
					var bindingContext = oEvent.getSource().getBindingContext("remoteClos");
				}
				var title = bindingContext.getProperty("txtequipeA")+" - "+bindingContext.getProperty("txtequipeB");
				var idMatch = bindingContext.getProperty("idMatch");
				var enCours = bindingContext.getProperty("encours");
				var matchfini = bindingContext.getProperty("matchfini");
				
				var label = new sap.m.Label({ text : title });
	
					// Dropdown box pour pronostic A
					//var oDropdownBox1 = new sap.ui.commons.DropdownBox("DropdownBox1");
					var oDropdownBox1 = new sap.m.ComboBox("DropdownBox1");
					//var oDropdownBox1 = new sap.m.Select("DropdownBox1");
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
					//var oDropdownBox2 = new sap.ui.commons.DropdownBox("DropdownBox2");
					var oDropdownBox2 = new sap.m.ComboBox("DropdownBox2");
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
					
					//Ajout des statistiques en %
					// Définition du modèle de la vue
					var ogModel = sap.ui.getCore().getModel("global");
					var sUser = ogModel.getProperty("/iduser");
					var sLogin = ogModel.getProperty("/pseudo");
		  			var sPass = ogModel.getProperty("/pwd");
					var sPreURL = ogModel.getProperty("/preURL");  			
					var sUrl = sPreURL + "JSON_V2021.php?action=MATCHSTATS&idmatch=" + idMatch;
					var oStatModel = new JSONModel();

					if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
						oStatModel.loadData("../webapp/localService/matchstats.json", {}, false);
					}else{
						oStatModel.loadData(sUrl,{},false);
					}
					
					this.getView().setModel(oStatModel, "remotestatmodel");

					var tableStat = new sap.m.Table({
					columns:[
			          new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"62.5%",hAlign:"Right"
			          })
			          ],
					items:{
						path: 'remotestatmodel>/stats',
						template: new sap.m.ColumnListItem({
						  cells:[             
						       new sap.m.Text({
						       text:"{remotestatmodel>scoreA}"
						       }),
						       new sap.m.Text({
						       text:"-"
						        }),
						       new sap.m.Text({
						       text:"{remotestatmodel>scoreB}"
						        }),
						       new sap.m.Text({
						       text:
						       {
						        parts: [
						            {path: 'remotestatmodel>pourcentage'}
						            ],
						        formatter: function(pourcent){ // string, string, float, float
						            return Math.round(pourcent*10)/10 + "%";
						        }
						       }
						       })
						     ]
						  })
						}
					});
					
					//Statistique joueurs de mes groupes
					var tableJoueur = new sap.m.Table({
					columns:[
			          new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"12.5%",hAlign:"Center"
			          }),new sap.m.Column({
			        	width:"62.5%",hAlign:"Right"
			          })
			          ],
					items:{
						path: 'remotestatmodel>/friend_stats',
						template: new sap.m.ColumnListItem({
						  cells:[             
						       new sap.m.Text({
						       text:"{remotestatmodel>scoreA}"
						       }),
						       new sap.m.Text({
						       text:"-"
						        }),
						       new sap.m.Text({
						       text:"{remotestatmodel>scoreB}"
						        }),
						       new sap.m.Text({
						       text:"{remotestatmodel>pseudo}"
						        })
						     ]
						  })
						}
					});
			
			if(enCours === "N" & matchfini === "N") {
					
					//Contenu de la fenêtre de dialog par onglet, cas pronostic ouvert
					var contenu=new sap.m.IconTabBar({
						items:[
							new sap.m.IconTabFilter({
								text:"Mon pronostic",
								content:simpleForm
							}),
							new sap.m.IconTabFilter({
								text:"Stats(%)",
								content:tableStat
							})
							]
					}
					);
			
			}
				else {
						//Contenu de la fenêtre de dialog par onglet, cas pronostic fermé
					var contenu=new sap.m.IconTabBar({
						items:[
							new sap.m.IconTabFilter({
								text:"Mon pronostic",
								content:simpleForm,
								visible:false
							}),
							new sap.m.IconTabFilter({
								text:"Stats(%)",
								content:tableStat
							}),
							new sap.m.IconTabFilter({
								text:"Autres joueurs",
								content:tableJoueur
							})
							]
					}
					);
								}		
					
					var dialog = new Dialog({
						//title: "Mon pronostic",
						showHeader: false,
						content: contenu,
						contentWidth: "25%",
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
									var updateURL = sPreURL + "JSON_V2021.php?action=SAVESCORE&idmatch="+idMatch+"&scoreA="+newPronoA+"&scoreB="+newPronoB+"&email="+sPseudo+"&pass="+sPwd;
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
											var sUrl = sPreURL2 + "JSON_V2021.php?action=MATCHLIST&idPlayer=" + sUser+"&pronoOuvert=Y";
											var oModel = new JSONModel();
											oModel.loadData(sUrl,{},false);
											var i;
											var x = ["A", "B","C","D","E","F","G","H"];
											for (i = 0; i < x.length; i++) { 
											var oModelClGroupe = new JSONModel();
											var sPreURL = ogModel.getProperty("/preURL");  			
											var sUrl = sPreURL + "JSON_V2021.php?action=TOPTEAM&phase=" + x[i];
											
											//
											if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
											oModelClGroupe.loadData("../webapp/localService/topteam"+x[i]+".json", {}, false);
											} else {
												oModelClGroupe.loadData(sUrl,{},false);				
											}
											
//											this.getView().setModel(oModelClGroupe, "remoteClgroupe"+x[i]);
											oView.setModel(oModelClGroupe, "remoteClgroupe"+x[i]);
												
											}
											dialog.close();
											//taille des drapeaux si utilisation d'un telephone
												if(sap.ui.Device.system.phone) {
													oModel.setProperty("/flagsize","15%");	
													oModel.setProperty("/teamsize","26%");
												} else {
													oModel.setProperty("/flagsize","9%");	
													oModel.setProperty("/teamsize","32%");
												}
											oView.setModel(oModel, "remote");
											
										},
											error: function (jqXHR, textStatus, errorThrown) {
											jQuery.sap.log.error("Got an error response: " + textStatus + errorThrown);
										}
										});
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
					if 	(!(enCours === "N" & matchfini === "N")){
						dialog.destroyBeginButton();
					}
					this.getView().addDependent(dialog);
					dialog.open();
				
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
		
		onPlusMoinsScorev2:function(oEvent){
			if(this._myUser) {
			var oView = this.getView();
			var bindingContext = oEvent.getSource().getBindingContext("remote");
			var nomBouton = oEvent.getSource().getId();
			
			if (nomBouton.includes("plusA")){
				var nomBoutonA=nomBouton;
				var nomBoutonB = nomBoutonA.replace("plusA","plusB")
				if (this.getView().byId(nomBoutonA).getText(newPronoA)==="+"){
					var scorenumA=1;
				} else {
					var scorenumA=+this.getView().byId(nomBoutonA).getText(newPronoA)+1;
				}
				if (scorenumA > 9){
					return;
				}
				var newPronoA = scorenumA.toString();				
				if (this.getView().byId(nomBoutonB).getText(newPronoB)==="+"){
					var newPronoB = "0";
				} else {
					newPronoB = this.getView().byId(nomBoutonB).getText(newPronoB);
				}
			} else if (nomBouton.includes("plusB")){
				var nomBoutonB=nomBouton;
				var nomBoutonA = nomBoutonB.replace("plusB","plusA")
				if (this.getView().byId(nomBoutonB).getText(newPronoB)==="+"){
					var scorenumB=1;
				} else {
					var scorenumB=+this.getView().byId(nomBoutonB).getText(newPronoB)+1;
				}
				if (scorenumB > 9){
					return;
				}
				var newPronoB = scorenumB.toString();
				
				if (this.getView().byId(nomBoutonA).getText(newPronoA)==="+"){
					var newPronoA = "0";
				} else {
					newPronoA = this.getView().byId(nomBoutonA).getText(newPronoA);
				}
			} else if (nomBouton.includes("moinsA")){
				var nomBoutonA=nomBouton.replace("moinsA","plusA");
				var nomBoutonB = nomBoutonA.replace("plusA","plusB")
				if (this.getView().byId(nomBoutonA).getText(newPronoA)==="+"){
					var scorenumA=-1;
				} else {
					var scorenumA=+this.getView().byId(nomBoutonA).getText(newPronoA)-1;
				}
				if (scorenumA < 0){
					return;
				}
				var newPronoA = scorenumA.toString();				
				if (this.getView().byId(nomBoutonB).getText(newPronoB)==="+"){
					var newPronoB = "0";
				} else {
					newPronoB = this.getView().byId(nomBoutonB).getText(newPronoB);
				}
			} else if (nomBouton.includes("moinsB")){
				var nomBoutonB=nomBouton.replace("moinsB","plusB");
				var nomBoutonA = nomBoutonB.replace("plusB","plusA")
				if (this.getView().byId(nomBoutonB).getText(newPronoB)==="+"){
					var scorenumB=-1;
				} else {
					var scorenumB=+this.getView().byId(nomBoutonB).getText(newPronoB)-1;
				}
				if (scorenumB < 0){
					return;
				}
				var newPronoB = scorenumB.toString();				
				if (this.getView().byId(nomBoutonA).getText(newPronoA)==="+"){
					var newPronoA = "0";
				} else {
					newPronoA = this.getView().byId(nomBoutonA).getText(newPronoA);
				}
			} else {
				return
			}
			this.getView().byId(nomBoutonA).setText(newPronoA);
			this.getView().byId(nomBoutonB).setText(newPronoB);
			if (+newPronoA>+newPronoB){
				this.getView().byId(nomBoutonA).setType("Accept");
				this.getView().byId(nomBoutonB).setType("Reject");
			} else if (+newPronoA<+newPronoB) {
				this.getView().byId(nomBoutonB).setType("Accept");
				this.getView().byId(nomBoutonA).setType("Reject");
			} else {
				this.getView().byId(nomBoutonA).setType("Default");
				this.getView().byId(nomBoutonB).setType("Default");
			}
			// Récupération du pseudo + pwd car la session ne fonctionne pas
			var olModel=sap.ui.getCore().getModel("global");
			var sPseudo = olModel.getProperty("/pseudo");
			var sPwd = olModel.getProperty("/pwd");
			var sPreURL = olModel.getProperty("/preURL");
			var idMatch = bindingContext.getProperty("idMatch");
			var updateURL = sPreURL + "JSON_V2021.php?action=SAVESCORE&idmatch="+idMatch+"&scoreA="+newPronoA+"&scoreB="+newPronoB+"&email="+sPseudo+"&pass="+sPwd;
			$.ajax({
				type: "POST",
				data: "",
				crossDomain: true,
				url: updateURL,
				
				contentType: "application/json",
				success: function (res, status, xhr) {
					/*//success code
					//jQuery.sap.log.error("Success response: " + status + res);
					var ogModel=sap.ui.getCore().getModel("global");
					var sUser = ogModel.getProperty("/iduser");
					var sPreURL2 = ogModel.getProperty("/preURL");
					var sUrl = sPreURL2 + "JSON_V2021.php?action=MATCHLIST&idPlayer=" + sUser+"&pronoOuvert=Y";
					var oModel = new JSONModel();
					oModel.loadData(sUrl,{},false);
					var i;
					var x = ["A", "B","C","D","E","F","G","H"];
					for (i = 0; i < x.length; i++) { 
					var oModelClGroupe = new JSONModel();
					var sPreURL = ogModel.getProperty("/preURL");  			
					var sUrl = sPreURL + "JSON_V2021.php?action=TOPTEAM&phase=" + x[i];
					
					//
					if(sap.ui.getCore().getModel("global").getProperty("/mode") === "test") {
					oModelClGroupe.loadData("../webapp/localService/topteam"+x[i]+".json", {}, false);
					} else {
						oModelClGroupe.loadData(sUrl,{},false);				
					}
					
	//											this.getView().setModel(oModelClGroupe, "remoteClgroupe"+x[i]);
					oView.setModel(oModelClGroupe, "remoteClgroupe"+x[i]);
						
					}
					oView.setModel(oModel, "remote");
					MessageToast.show('Pronostic sauvegardé', {
						duration: 1000, 
						width: "15rem", // default max width supported 
					});
					
				},
					error: function (jqXHR, textStatus, errorThrown) {
					jQuery.sap.log.error("Got an error response: " + textStatus + errorThrown);*/
				}
				});
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
		
		formatpourcent :  function (pourcent) {
			
				return "Salut";
			
		},
		
		heureOuScore :  function (enCours, matchFini, scoreA, scoreB, heurematch) {
			try {
				if (matchFini === "Y") {
					//var string = scoreA + " - " + scoreB;
					//return string;
					return heurematch;
				} else if (enCours === "Y") {
					return "En cours";
				} else {
					return heurematch;
				}
			} catch (err) {
				return "None";
			}
		},
		
		couleursPoints :  function (nbpoints) {
			try {
				if (nbpoints === "0") {
					return 2;
				} else {
					return 8;
				}
			} catch (err) {
				return 5;
			}
		},
		
		typeMatch :  function (phase) {
			try {
				var x = ["A", "B","C","D","E","F","G","H"];
				if(x.indexOf(phase) !== -1){
					var suffixe="Groupe " + phase;
				}else{
					var suffixe="";
				}
				return suffixe;
			} catch (err) {
				return "None";
			}
		},
		
		typeIcone :  function (sortdate,encours, matchfini) {
			try {
				var datematch = new Date(sortdate.substr(0,4), sortdate.substr(4,2)-1, sortdate.substr(6,2));
				var aujourdhui = new Date();
				var Difference_In_Time = datematch.getTime() - aujourdhui.getTime();
				var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
				if (matchfini === "Y") {
					return "sap-icon://accept"}
				else if (encours === "Y") {
					return "sap-icon://soccer"}
				else if (Difference_In_Days > 0) {
					return "sap-icon://calendar"}
				else {return "sap-icon://away"} 
			} catch (err) {
				return "None";
			}
		},
		
		couleurScore :  function (scoreA, scoreB) {
			try {
				if (scoreA > scoreB) {
					return 'Accept';
				} else if (scoreA < scoreB) {
					return 'Reject';
				} else {
					return 'Default';
				}
			} catch (err) {
				return 'Default';
			}
		},
		
		scoreNonVide :  function (scoreA) {
			if (scoreA === ""){
				return "+";
			} else {
				return scoreA;
			}
		},
		
		scoreOuVide :  function (scoreA,enCours) {
			if (enCours=== "Y"){
				return "";
			} else {
				return scoreA;
			}
		},
		
		nbpoints : function (points, matchfini){
			if (matchfini === "Y") {
					var string = "(" + points + " points)";
					return string;
			}
		},
		
		getGroup: function (oContext){
			var sKey = oContext.getProperty("sortdate");
			var sPhase = oContext.getProperty("phase");
			var x = ["A", "B","C","D","E","F","G","H"];
			if(x.indexOf(sPhase) !== -1){
				var suffixe="Match de groupe";
			}else{
				var suffixe="";
			}
			return {
				key: sKey.substr(0,8) + suffixe,
				title: sKey.substr(0,8) || "No Specific Region"
			};
		},
		getGroupHeader: function (oGroup){
			var keyStr = oGroup.key;
			var day = keyStr.substr(6,2);
			var month = keyStr.substr(4,2);
			var year = keyStr.substr(0,4);
			var phase = keyStr.substr(8,20);

			return new GroupHeaderListItem( {
				//title: oGroup.key,
				title: day + "/" + month + "/" + year + " - " + phase,
				upperCase: false
			} );
		},
		
		_applyFilter: function(oFilter,idFilter) {
			// Get the table (last thing in the VBox) and apply the filter
			var aTableItems = this.getView().byId(idFilter).getItems();
			var oTable = aTableItems[aTableItems.length-1];
			oTable.getBinding("items").filter(oFilter);
		},
 
		handleFacetFilterReset: function(oEvent) {
			var oFacetFilter = sap.ui.getCore().byId(oEvent.getParameter("id"));
			
			if(String(oFacetFilter).indexOf("idFacetFilter1") !== -1){
				var idfilter="idVBox";
			}else{
				var idfilter="idVBox2";
			}
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i=0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			this._applyFilter([],idfilter);
		},
 
		handleListClose: function(oEvent) {
			// Get the Facet Filter lists and construct a (nested) filter for the binding
			var oFacetFilter = oEvent.getSource().getParent();
			if(String(oFacetFilter).indexOf("idFacetFilter1") !== -1){
				var idfilter="idVBox";
			}else{
				var idfilter="idVBox2";
			}
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
				this._applyFilter(oFilter,idfilter);
			} else {
				this._applyFilter([],idfilter);
			}
		},

        handlePopoverPress: function (oEvent) {
           // var oCtx = oEvent.getSource().getBindingContext("remote"),
             var oButton = oEvent.getSource(),
				oView = this.getView();
                
				var id =oButton.getId();
				if(String(id).indexOf("btn_stats_prono2") === -1){
					var oCtx = oEvent.getSource().getBindingContext("remote")
	//				oPopover.oParent.byId("endflag").setText("X");
				} else
				{
					var oCtx = oEvent.getSource().getBindingContext("remoteClos")
	//				oPopover.oParent.byId("endflag").setText("");
                }
                

			
				// create popover



			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "QuickStartApplication.view.Poptest",	
					controller: this
				}).then(function(oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.attachAfterOpen(function() {
						document.getElementById(this.createId("ifrm")).width =  Math.max(screen.width * 0.6, 375);
//						document.getElementById(this.createId("ifrm")).height = screen.height * 0.65;
						document.getElementById(this.createId("ifrm")).height =Math.max(screen.width * 0.6, 375)*0.5625;
						document.getElementById(this.createId("ifrm")).src = "https://ynoveo-apps.fr/" + "?idmatch=" + this.byId("untest").getText() + "&idj=" + this.byId("idj").getText() + "&clos=" + this.byId("endflag").getText();
					}, this);
					/* 
					oPopover.modal = true;
					var that = this;
					var oCloseButton =  new Button({
						text: "Fermer",
						press: function () {
							that._oPopover.close();
						}
					});					
					oPopover.endButton = oCloseButton;
				*/ 		
					return oPopover;
				}.bind(this));
			}
			this._pPopover.then(function(oPopover) {
 //               oPopover.bindElement(oCtx.getPath());
                // passer l'id du match à la popup
                oPopover.oParent.byId("untest").setText(oCtx.getProperty("idMatch"));
				oPopover.oParent.byId("idj").setText(sap.ui.getCore().getModel("global").getProperty("/iduser"));
//				oPopover.oParent.byId("carousel")
 //               document.getElementById(oPopover.oParent.createId("ifrm")).url = "https://ynoveo-apps.fr/" + "?idmatch=" + oCtx.getProperty("idMatch") ;
				oPopover.openBy(oPopover.oParent.byId("pbiPlace"));
				
			});
		},

		handlClosePress: function () {
			this.byId("myPopover").close();
		},
	    onNavBack: function () {
	//      This code was generated by the layout editor.
	            var oHistory, sPreviousHash;
	 
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
	
				if ((sPreviousHash !== undefined)&&(sPreviousHash !== "")) {
					window.history.go(-1);
				} else {
					this.getOwnerComponent().getRouter().navTo("appHome", {}, true /*no history*/);
				}
			}
		});
});