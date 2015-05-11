// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  //	db = $cordovaSQLite.openDB({ name: "iautocount.db", bgType: 1 }); //device
	//db.transaction("iautocount.db", errorCB, successCB);
	//window.sqlitePlugin.deleteDatabase({name: "iautocount.db"});
	//$cordovaSQLite.deleteDB("iautocount.db");
	//db = $cordovaSQLite.openDB("iautocount.db");
	
	if (window.cordova) 
	{
		db = $cordovaSQLite.openDB("iautocount.db");
			
		//  DebugConsole.log("Trying DB...")
		
    }
	else
	{
		db = window.openDatabase("iautocount.db", '1', 'auto', 1024 * 1024 * 100); // browser
	}
	
	$cordovaSQLite.execute(db, "drop table profile");
	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS profile (id integer primary key, profiledata text)");
	
	$cordovaSQLite.execute(db, "drop table item");
	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS item (id integer primary key, itemdata text)");
	
	
	$cordovaSQLite.execute(db, "drop table debtor");
	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS debtor (id integer primary key, debtordata text)");
	
	
	//alert(db)
	
  });
})




.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
     // controller: 'AppCtrl'
    })

   
	.state('app.urlstep1', {
      url: "/urlstep1",
      views: {
        'menuContent' :{
          templateUrl: "templates/urlstep1.html",
		  controller: 'UrlCtrl'
          
        }
      }
    })
	.state('app.seldb', {
      url: "/seldb",
      views: {
        'menuContent' :{
          templateUrl: "templates/seldb.html",
		  controller: 'SeldbCtrl'
          
        }
      }
    })
	.state('app.selprofile', {
      url: "/selprofile",
      views: {
        'menuContent' :{
          templateUrl: "templates/selprofile.html"
		 // controller: 'SelProCtrl'
          
        }
      }
    })
	.state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/dashboard.html",
		  controller: 'DashCtrl'
          
        }
      }
    })
	
	.state('app.isotm', {
      url: "/isotm",
      views: {
        'menuContent' :{
          templateUrl: "templates/iso-tm.html",
		  controller: 'IncSalesCtrl'
        }
      }
    })
	
	.state('app.isotmdetails', {
      url: "/isotmdetails/:DebtorName",
      views: {
        'menuContent' :{
          templateUrl: "templates/iso-tm-details.html",
		  controller: 'IncSalesDetailsCtrl'
        }
      }
    })
	
	.state('app.isotmpdf', {
      url: "/isotmpdf/:DocKey",
      views: {
        'menuContent' :{
          templateUrl: "templates/iso-tm-pdf.html",
		  controller: 'IncSalesPdfCtrl'
        }
      }
    })
	
	
	.state('app.isolm', {
      url: "/isolm",
      views: {
        'menuContent' :{
          templateUrl: "templates/iso-lm.html"
        }
      }
    })
	
	.state('app.sptm', {
      url: "/sptm",
      views: {
        'menuContent' :{
          templateUrl: "templates/sp-tm.html",
		  controller: 'SpCtrl'
        }
      }
    })
	
	.state('app.sptmdetails', {
      url: "/sptmdetails/:DebtorName",
      views: {
        'menuContent' :{
          templateUrl: "templates/sp-tm-details.html",
		  controller: 'SpDetailsCtrl'
        }
      }
    })
	
	.state('app.sptmpdf', {
      url: "/sptmpdf/:DocKey",
      views: {
        'menuContent' :{
          templateUrl: "templates/sp-tm-pdf.html",
		  controller: 'SpPdfCtrl'
        }
      }
    })
	
	
	.state('app.splm', {
      url: "/splm",
      views: {
        'menuContent' :{
          templateUrl: "templates/sp-lm.html"
        }
      }
    })
	
	.state('app.pstm', {
      url: "/pstm",
      views: {
        'menuContent' :{
          templateUrl: "templates/ps-tm.html"
        }
      }
    })
	
	.state('app.pslm', {
      url: "/pslm",
      views: {
        'menuContent' :{
          templateUrl: "templates/ps-lm.html"
        }
      }
    })
	
	.state('app.mctm', {
      url: "/mctm",
      views: {
        'menuContent' :{
          templateUrl: "templates/mc-tm.html",
		  controller: 'McCtrl'
        }
      }
    })
	
	.state('app.mctmdetails', {
      url: "/mctmdetails/:DebtorName",
      views: {
        'menuContent' :{
          templateUrl: "templates/mc-tm-details.html",
		  controller: 'McDetailsCtrl'
        }
      }
    })
	
	.state('app.mctmpdf', {
      url: "/mctmpdf/:DocKey",
      views: {
        'menuContent' :{
          templateUrl: "templates/mc-tm-pdf.html",
		  controller: 'McPdfCtrl'
        }
      }
    })
	
	
	.state('app.mclm', {
      url: "/mclm",
      views: {
        'menuContent' :{
          templateUrl: "templates/mc-lm.html"
        }
      }
    })
	
	.state('app.debtorlist', {
      url: "/debtorlist",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtorlist.html",
		  controller: 'DebtCtrl'
        }
      }
    })
	
	.state('app.debtor', {
      url: "/debtor/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor.html",
          controller: 'DebtDetailsCtrl'
        }
      }
    })
	
	.state('app.debtor-itemhistory', {
      url: "/debtor-itemhistory/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor-itemhistory.html",
          controller: 'DebtItemhistCtrl'
        }
      }
    })
	
	.state('app.debtor-itemhistory-pdf', {
      url: "/debtor-itemhistory-pdf/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor-itemhistory-pdf.html",
          controller: 'DebtItemhistPdfCtrl'
        }
      }
    })
	
	.state('app.debtor-aging', {
      url: "/debtor-aging/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor-aging.html",
          controller: 'DebtAgingCtrl'
        }
      }
    })
	
	.state('app.debtor-outstanding', {
      url: "/debtor-outstanding/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor-outstanding.html",
          controller: 'DebtOutstandingCtrl'
        }
      }
    })
	
	.state('app.debtor-stmt', {
      url: "/debtor-stmt/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/debtor-stmt.html",
          controller: 'DebtStmtCtrl'
        }
      }
    })
	
	
	.state('app.itemlist', {
      url: "/itemlist",
      views: {
        'menuContent' :{
          templateUrl: "templates/itemlist.html",
		  controller: 'ItemCtrl'
        }
      }
    })
	
	.state('app.itemdetails', {
      url: "/itemdetails/:ItemCode",
      views: {
        'menuContent' :{
          templateUrl: "templates/itemdetails.html",
		  controller: 'ItemDetailsCtrl'
        }
      }
    })
	
	
	.state('app.item-phe', {
      url: "/item-phe",
      views: {
        'menuContent' :{
          templateUrl: "templates/item-price-history.html",
		  controller: 'ItemPheCtrl'
        }
      }
    })
	
	.state('app.item-info', {
      url: "/item-info/:AccNo",
      views: {
        'menuContent' :{
          templateUrl: "templates/item-info.html",
		  controller: 'ItemInfoCtrl'
        }
      }
    })
	
	.state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
		   controller: 'SettingsCtrl'
        }
      }
    })
	
	.state('app.aboutus', {
      url: "/aboutus",
      views: {
        'menuContent' :{
          templateUrl: "templates/aboutus.html",
         // controller: 'MainCtrl'
        }
      }
    })

	
	
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

	
	
    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/urlstep1');
});

