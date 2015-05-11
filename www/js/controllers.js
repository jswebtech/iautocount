angular.module('starter.controllers',['pickadate'])

.controller('UrlCtrl', function($scope, $http,$ionicLoading,$state) {
	
	 var url='http://tmcs.no-ip.info:82/iAutoCount/Profile.svc/json/GetValidateURLResult?authenticalKey=x72VSJU5ceoER+kwgDu3zw==';
  
  $scope.onblur = function() {
	//   $ionicLoading.show({ template: 'Loading...' });
	
	$http.head(url).success(function(data) {
		//alert("success");
		$state.go("app.seldb"); 
	//$ionicLoading.hide();

  }).error(function(data) {
   
	alert("error");
  });
      
  };
  
  
})


.controller('SeldbCtrl', function($scope, $http,$ionicLoading,$state,$cordovaSQLite) {
	
	 var url='http://tmcs.no-ip.info:82/iAutoCount/Profile.svc/json/GetAvailableDB?authenticalKey=x72VSJU5ceoER+kwgDu3zw==';
  
	$http.get(url).success(function(data) {
		$scope.dbrow = data.GetAvailableDatabaseResult; 
	 })
 
})

.controller('SettingsCtrl', function($scope, $http,$ionicLoading,$cordovaSQLite) {
	
	
	//get profile check.
	
	/*var prourl="http://tmcs.no-ip.info:82/iAutoCount/Profile.svc/json/GetProfile?dbName=2fP1N25PkIgL/D3kqJ/DETaVgM5hLD2GAQDUur5mY5YEiFp6GyuX2GebMFh0Do+7&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&appsVersion=1.8.8&deviceUsage=60&appRealVersion=1.28.11.01&osVersion=8.1.3";
		$http.get(prourl).success(function(data) 
		{*/
			//alert("hello")
			//$scope.prorow = data.Profile[0];
			//console.log($scope.prorow.URL);
			//var approved = $scope.prorow.Approved;
				//window.alert(approved)
			//if(approved == 'T')
					//{
						
						//if approved T then we store in db
						//$scope.prodata =  JSON.stringify(data);
						
					
						var query = "INSERT INTO profile (profiledata) VALUES (?)";
						$cordovaSQLite.execute(db, query, ["jayatest"]).then(function(res) {
							console.log("INSERT ID -> " + res.insertId);
						}, function (err) {
							console.error(err);
						});
						
						
						
        var query = "SELECT profiledata FROM profile";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
              //  console.log("SELECTED -> " + res.rows.item(0).profiledata);
				$scope.profdata=res.rows.item(0).profiledata;
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    
 

		
	/*var que = "SELECT profiledata FROM profile" ;
  	$cordovaSQLite.execute(db, que, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.profdata=res.rows.item(0).profiledata;
				 //window.alert($scope.profdata)
			  } 
		  });*/
	
													 
													 
					//UPDATE SYNC FOR ITEM AND DEBTOR DATA 
					 var iturl='http://tmcs.no-ip.info:83/iAutoCount/Item.svc/json/ItemSynchronization?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=1413788985&pageNo=1&perPage=2000'
				  
				$http.get(iturl).success(function(data) {
						$scope.itemdata =  JSON.stringify(data);
						
						itemquery = "INSERT INTO item (itemdata) VALUES (?)";
					
						$cordovaSQLite.execute(db, itemquery, [$scope.itemdata]).then(function(res) {
							//console.log("INSERT ID -> " + res.insertId);
							//alert($scope.itemdata.Data[0].Description);
						  });
						
					
				  })
					
					 var deburl='http://tmcs.no-ip.info:82/iAutoCount/Debtor.svc/json/DebtorSynchronization?dbName=2fP1N25PkIgL/D3kqJ/DETaVgM5hLD2GAQDUur5mY5YEiFp6GyuX2GebMFh0Do+7&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=0&pageNo=1&perPage=1000'
					 
					$http.get(deburl).success(function(data) {
						$scope.debtdata =  JSON.stringify(data);
						
						debtorquery = "INSERT INTO debtor (debtordata) VALUES (?)";
					
						$cordovaSQLite.execute(db, debtorquery, [$scope.debtdata]).then(function(res) {
							//console.log("INSERT ID -> " + res.insertId);
					//		console.log($scope.debtdata)
						//	console.log($scope.debtdata.DebtorSynchronizationResult[0].AccNo);
						  });
				
				  })
					
					
					
					//}
					//else
					//{
						//alert("User Not Approved");	
					//}
		
		//})
	
 })


.controller('DashCtrl', function($scope, $http,$ionicLoading) {
	$ionicLoading.show({ template: 'Loading...' });
									  var dashurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetSalesInfo?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDid=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM';
  $http.get(dashurl,{cache:true}).success(function(data) {
			$scope.dashrow = data[0];
   			$ionicLoading.hide();
			
			
			 //$document[0].body.classList.remove('loading-active');
			 //angular.element(document.querySelector('body')).removeClass('loading-active');
  })
})

.controller('IncSalesCtrl', function($scope, $http,$ionicLoading) {
			$ionicLoading.show({ template: 'Loading...' })
								 var incsalesurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetSalesOrderGroupByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&dateFrom=11/01/2014&dateTo=11/30/2014'
								 
  $http.get(incsalesurl,{cache:true}).success(function(data) {
	 $scope.salesrow = data.GetSalesOrderGroupByDateRangeResult.DebtorNameGroup;
	$ionicLoading.hide()
   
	//console.log(salesrow);
  })
 
})

.controller("IncSalesDetailsCtrl", ['$scope','$http','$stateParams',
	 function($scope, $http, $stateParams)
		{ 
		
		 var cid = $stateParams.DebtorName
		//console.log(cid);
		var incsalesdurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetDocumentInfoListByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&type=SO&groupby=Debtor%20Name&groupPara='+cid+'&dateFrom=11/01/2014&dateTo=11/30/2014'
			$http.get(incsalesdurl,{cache:true}).success(function(data){
				$scope.salesrow = data.GetDocumentInfoListByDateRangeResult.Data;
				
				
			}); 
		}]
)

.controller("IncSalesPdfCtrl", ['$scope','$http','$stateParams','$sce','$ionicLoading',
	 function($scope, $http, $stateParams,$sce,$ionicLoading)
		{ 
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.DocKey
		//console.log(cid);
		var incsalespurl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetSalesDocument?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&docType=SO&docKey='+cid
				$http.get(incsalespurl,{cache:true}).success(function(data){
				$scope.salesrow = data.GetSalesDocumentResult;
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.salesrow.Path + ".pdf");
				
				$ionicLoading.hide()		
			}); 
		}]
)

.controller('SpCtrl', function($scope, $http,$ionicLoading) {
							   $ionicLoading.show({ template: 'Loading...' })
								 var spurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetSalesGroupByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&dateFrom=11/01/2014&dateTo=11/30/2014'
								 
  $http.get(spurl,{cache:true}).success(function(data) {
	 $ionicLoading.hide()
    $scope.sprow = data.GetSalesGroupByDateRangeResult.DebtorNameGroup;
	//console.log(salesrow);
  })
 
})

.controller("SpDetailsCtrl", ['$scope','$http','$stateParams',
	 function($scope, $http, $stateParams)
		{ 
		
		 var cid = $stateParams.DebtorName
		//console.log(cid);
		var spdurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetDocumentInfoListByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&type=SI&groupby=Debtor%20Name&groupPara='+cid+'&dateFrom=11/01/2014&dateTo=11/30/2014'
			$http.get(spdurl,{cache:true}).success(function(data){
				$scope.sprow = data.GetDocumentInfoListByDateRangeResult.Data;
				
				
			}); 
		}]
)


.controller("SpPdfCtrl", ['$scope','$http','$stateParams','$sce','$ionicLoading',
	 function($scope, $http, $stateParams,$sce,$ionicLoading)
		{ 
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.DocKey
		//console.log(cid);
		var sppurl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetSalesDocument?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&docType=IV&docKey='+cid
			$http.get(sppurl,{cache:true}).success(function(data){
				$scope.sprow = data.GetSalesDocumentResult;
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.sprow.Path + ".pdf");
							$ionicLoading.hide();
	
				//console.log($scope.pdfurl);			
			}); 
		}]
)

.controller('McCtrl', function($scope, $http,$ionicLoading) {
			$ionicLoading.show({ template: 'Loading...' })
								var mcurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetCollectionGroupByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&dateFrom=11/01/2014&dateTo=11/30/2014'
								 
  $http.get(mcurl,{cache:true}).success(function(data) {
	$scope.mcrow = data.GetCollectionGroupByDateRangeResult.DebtorNameGroup;
			$ionicLoading.hide();
    
	//console.log(salesrow);
  })
 
})

.controller("McDetailsCtrl", ['$scope','$http','$stateParams',
	 function($scope, $http, $stateParams)
		{ 
		
		 var cid = $stateParams.DebtorName
		//console.log(cid);
		var mcdurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetDocumentInfoListByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&type=RP&groupby='+cid+'&groupPara=300-B001&dateFrom=11/01/2014&dateTo=11/30/2014'
			$http.get(mcdurl,{cache:true}).success(function(data){
				$scope.mcrow = data.GetDocumentInfoListByDateRangeResult.Data;
				
				
			}); 
		}]
)

.controller("McPdfCtrl", ['$scope','$http','$stateParams','$sce','$ionicLoading',
	 function($scope, $http, $stateParams,$sce,$ionicLoading)
		{ 
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.DocKey
		//console.log(cid);
		var mcpurl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetSalesDocument?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&docType=RP&docKey='+cid
			$http.get(mcpurl,{cache:true}).success(function(data){
				
				$scope.mcrow = data.GetSalesDocumentResult;
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.mcrow.Path + ".pdf");
				$ionicLoading.hide();
				//console.log($scope.pdfurl);			
			}); 
		}]
)

.controller('DebtCtrl', function($scope, $http, $ionicLoading,$timeout,$cordovaSQLite) {
								 var debturl='http://tmcs.no-ip.info:83/iAutoCount/Debtor.svc/json/DebtorSynchronization?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=1413788985&pageNo=1&perPage=1000'
 //referesh code start// 
  $scope.doRefresh = function() {
  //  console.log('Refreshing!');
    $timeout( function() {
	 var query = "SELECT * FROM debtor" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.debtrow=JSON.parse(res.rows.item(0).debtordata);
					//console.log($scope.debtrow);
			  } 
		  });
    //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
      
  };
   //referesh code end//
   
   /* $http.get(debturl).success(function(data) {
      $scope.debtrow  = data.DebtorSynchronizationResult;
      
    });*/
//default when load code start//
	var query = "SELECT * FROM debtor" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.debtrow=JSON.parse(res.rows.item(0).debtordata);
					
			  } 
		  });
   
   //default when load code end//

   //load more code start///
   /*$scope.data = [];
     $scope.loadMore = function() {
		  $ionicLoading.show({ template: 'Loading...' })
		  
		  var query = "SELECT * FROM debtor" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.debtrow=JSON.parse(res.rows.item(0).debtordata);
					//console.log($scope.debtrow);
			  } 
		  });
   $scope.$broadcast('scroll.infiniteScrollComplete');
	  $ionicLoading.hide();
	  
   
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });*/
  //load more code end///
 
 /*$http.get(debturl,{cache:true}).success(function(data) {
        $scope.debtrow  = data.DebtorSynchronizationResult;
		//console.log('withoutreferesh!');
		

  })*/
  
  
})


.controller("DebtDetailsCtrl", ['$scope','$http','$stateParams','$ionicLoading','$cordovaSQLite',
	 function($scope, $http, $stateParams,$ionicLoading,$cordovaSQLite)
		{    
		$ionicLoading.show({ template: 'Loading...' })
		/*var debturl='http://tmcs.no-ip.info:83/iAutoCount/Debtor.svc/json/DebtorSynchronization?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=1413788985&pageNo=1&perPage=1000'
			$http.get(debturl,{cache:true}).success(function(data){
				$scope.debtrow = data.DebtorSynchronizationResult;
				$scope.cid = $stateParams.AccNo
				$ionicLoading.hide();
				//console.log($stateParams.AccNo);
			}); */
			
			//default when load code start//
	var query = "SELECT * FROM debtor" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.debtrow=JSON.parse(res.rows.item(0).debtordata);
					$scope.cid = $stateParams.AccNo
					//console.log($scope.cid)
					$ionicLoading.hide();
			  } 
		  });
   
   //default when load code end//
		}]
)

.controller("DebtItemhistCtrl", ['$scope','$http','$stateParams','$ionicLoading',
	 function($scope, $http, $stateParams,$ionicLoading)
		{   
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.AccNo;
		//console.log(cid)
				
		var debtitemurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetItemPriceHistoryByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&sAccNo='+cid+'&itemCode=&pageNo=1&dateFrom=11/01/2013&dateTo=11/26/2014&docType=QT,SO,DO,IV,CS,DN,CN'
			
			$http.get(debtitemurl,{cache:true}).success(function(data){
				$scope.debtitemrow = data.GetItemPriceHistoryByDateRangeResult.Data;
				$ionicLoading.hide();
			}); 
		}]
)

.controller("DebtItemhistPdfCtrl", ['$scope','$http','$stateParams','$sce','$ionicLoading',
	 function($scope, $http, $stateParams,$sce,$ionicLoading)
		{ 
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.AccNo;
		//console.log(cid);
		var debtitempurl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetSalesDocument?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&docType=SO&docKey='+cid		
			$http.get(debtitempurl,{cache:true}).success(function(data){
				$scope.debtitemrow = data.GetSalesDocumentResult;
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.debtitemrow.Path + ".pdf");
				$ionicLoading.hide();
				//console.log($scope.pdfurl);			
			}); 
		}]
)

.controller("DebtAgingCtrl", ['$scope','$http','$stateParams','$ionicLoading','$sce','$ionicModal','$timeout','$filter',
	 function($scope, $http, $stateParams,$ionicLoading,$sce,$ionicModal,$timeout,$filter)
		{   
		//$ionicLoading.show({ template: 'Loading...' })
		  
		  
		  $scope.submit = function() {
			  if($scope.agdate)
			  {
			  	var input=$scope.agdate;
			  	var agdate = $filter('date')(new Date(input), 'MM-dd-yyyy');
			  }
			  else
			  var agdate='11-26-2014';
			  
			 if($scope.pdc)
			 	var pdc=$scope.pdc;
			else
				var pdc=0;
			 if($scope.wd)
			 	var wd=$scope.wd;
				else
				var wd=0
			  
   	
		var cid = $stateParams.AccNo;
		
		var debtageurl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetDebtorAging?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&agingDate='+agdate+'&withPDC='+pdc+'&withDetails='+wd+'&sDebtorCode='+cid
			$http.get(debtageurl).success(function(data){
				$ionicLoading.show({ template: 'Loading...' })
				$scope.debtagerow = data.GetDebtorAgingResult;
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.debtagerow.Path + ".pdf");
				  $ionicLoading.hide()
				  // Create the login modal that we will use later
				  $ionicModal.fromTemplateUrl('templates/debtor-aging-pdf.html', {
					scope: $scope
				  }).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				  });
				
				  // Triggered in the login modal to close it
				  $scope.closeLogin = function() {
					$scope.modal.hide();
				  };
				  

				
				
			}); 
			}
		}]
)


.controller("DebtOutstandingCtrl", ['$scope','$http','$stateParams','$ionicLoading',
	 function($scope, $http, $stateParams,$ionicLoading)
		{   
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.AccNo;
		//console.log(cid)
				
		var debtosurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetOutstandingARInvoice?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&sAccNo='+cid
			
			$http.get(debtosurl,{cache:true}).success(function(data){
					$scope.debtitemrow = data.GetOutstandingARInvoiceResult;
				$ionicLoading.hide();
			}); 
		}]
)

.controller("DebtStmtCtrl", ['$scope','$http','$stateParams','$ionicLoading','$sce','$ionicModal','$timeout','$filter',
	 function($scope, $http, $stateParams,$ionicLoading,$sce,$ionicModal,$timeout,$filter)
		{
			
			
		/* var cid = $stateParams.AccNo;
		
				
		var debtstmturl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetDebtorStatement2?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&debtorCode='+cid+'&statementFrom=1414800000&statementTo=1416960000&type=tBvDAnZIyXPrVkX84bYu4Q==&knockOff=qWviyhkvvwVcFNz+DWQmR+By9Ej+WZpNz/xWPZ++22E='
			
			$http.get(debtstmturl,{cache:true}).success(function(data){
				$scope.debtitemrow = data;
				
			}); */
			
			$scope.submit = function() {
			 
			 if($scope.fromdt)
			  {
			  					
				var myDate = new Date($scope.fromdt); // Your timezone!
				var fromdt = myDate.getTime()/1000.0;
			  }
			  else
			  var fromdt='1414800000';
			  
			
			  if($scope.todt)
			  {
			  	var myDate = new Date($scope.todt); // Your timezone!
				var todt = myDate.getTime()/1000.0;
			  }
			  else
			  var todt='1416960000';
			  
			  
			  
			  
			  var seltype1=$scope.seltype1;
			  var seltype2=$scope.seltype2;
			  
			  console.log(seltype1)
			   console.log(seltype2)
			  
   	
		var cid = $stateParams.AccNo;
		
		var debtstmturl='http://tmcs.no-ip.info:83/iAutoCount/AutoCountReport.svc/json/GetDebtorStatement2?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&debtorCode='+cid+'&statementFrom='+fromdt+'&statementTo='+todt+'&type=tBvDAnZIyXPrVkX84bYu4Q==&knockOff=qWviyhkvvwVcFNz+DWQmR+By9Ej+WZpNz/xWPZ++22E=';
		
			$http.get(debtstmturl).success(function(data){
				$ionicLoading.show({ template: 'Loading...' })
				$scope.debtitemrow = data;
			
				$scope.pdfurl=$sce.trustAsResourceUrl("http://docs.google.com/gview?embedded=true&url=http://tmcs.no-ip.info:83" + $scope.debtitemrow.Path + ".pdf");
				 
				  $ionicLoading.hide()
				  // Create the login modal that we will use later
				  $ionicModal.fromTemplateUrl('templates/debtor-stmt-pdf.html', {
					scope: $scope
				  }).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				  });
				
				  // Triggered in the login modal to close it
				  $scope.closeLogin = function() {
					$scope.modal.hide();
				  };
				  

				
				
			}); 
			}
		
		
		
		}]
)



.controller('ItemCtrl', function($scope, $http, $ionicLoading,$timeout,$cordovaSQLite) {
   
  /*var itemurl='http://tmcs.no-ip.info:83/iAutoCount/Item.svc/json/ItemSynchronization?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=1413788985&pageNo=1&perPage=2000'*/
  $ionicLoading.show({ template: 'Loading...' })
  $scope.doRefresh = function() {
  //  console.log('Refreshing!');
    $timeout( function() {
	//default when load code start//
	var query = "SELECT * FROM item" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.itemrow=JSON.parse(res.rows.item(0).itemdata);
					//console.log($scope.debtrow);
			  } 
		  });  
    //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
      
  };
  
  //default when load code start//
	var query = "SELECT * FROM item" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.itemrow=JSON.parse(res.rows.item(0).itemdata);
					//console.log($scope.debtrow);
			  } 
		  });
   $ionicLoading.hide();
   //default when load code end//

  /*$http.get(itemurl,{cache:true}).success(function(data) {
    $scope.itemrow = data.ItemSynchronizationResult.Data;
	$ionicLoading.hide();
  })*/
  
  
})

.controller("ItemDetailsCtrl", ['$scope','$http','$stateParams','$cordovaSQLite',
	 function($scope, $http, $stateParams,$cordovaSQLite)
		{    
					 /*var itemdurl='http://tmcs.no-ip.info:83/iAutoCount/Item.svc/json/ItemSynchronization?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=iKNColFa+oztAVriouDfvMpoNDwsYn9H4aJxSVWFIWpqyPnE1k47C5VUkpntIVPr&isFullSync=true&lastUpdate=1413788985&pageNo=1&perPage=2000'
			$http.get(itemdurl,{cache:true}).success(function(data){
				$scope.itemrow = data.ItemSynchronizationResult.Data;
				$scope.iid = $stateParams.ItemCode;
				//console.log(cid);
			}); */
			//default when load code start//
	var query = "SELECT * FROM item" ;
  $cordovaSQLite.execute(db, query, []).then(function(res) {
			 if(res.rows.length > 0) {
                    $scope.row=JSON.parse(res.rows.item(0).itemdata);
					$scope.itemrow=$scope.row.ItemSynchronizationResult.Data;
					$scope.iid = $stateParams.ItemCode;
					//console.log($scope.itemrow[$scope.iid].ItemCode);
			  } 
			   $ionicLoading.hide();
		  });
  
   //default when load code end//
		}]
)

.controller("ItemPheCtrl", ['$scope','$http','$stateParams','$ionicLoading','$timeout',
	 function($scope, $http, $stateParams,$ionicLoading,$timeout)
		{   
		 $ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.AccNo;
		//console.log(cid)
				
		var itempurl='http://tmcs.no-ip.info:83/iAutoCount/Sales.svc/json/GetItemPriceHistoryByDateRange?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&sAccNo=&itemCode=1&pageNo=1&dateFrom=11/01/2013&dateTo=11/26/2014&docType=QT,SO,DO,IV,CS,DN,CN'
			
			$scope.doRefresh = function() {
  //  console.log('Refreshing!');
    $timeout( function() {
	  $http.get(itempurl,{cache:true}).success(function(data){
			 
				$scope.itemrow = data.GetItemPriceHistoryByDateRangeResult.Data;
			
 })
    //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
      
  };
			$http.get(itempurl,{cache:true}).success(function(data){
			 
				$scope.itemrow = data.GetItemPriceHistoryByDateRangeResult.Data;
			$ionicLoading.hide();	
			}); 
		}]
)

.controller("ItemInfoCtrl", ['$scope','$http','$stateParams','$ionicLoading',
	 function($scope, $http, $stateParams,$ionicLoading)
		{   
		$ionicLoading.show({ template: 'Loading...' })
		 var cid = $stateParams.AccNo;
		//console.log(cid)
				
		var itemiurl='http://tmcs.no-ip.info:83/iAutoCount/item.svc/json/GetItemInstanceInfo?dbName=5bvq9pq8EokHTf+uB/yLD61bh48juTfB/Up19EK4bks=&uDId=d2CISC2oLtdTBGx1gji36fEKYt26vjLyY7h0ngIxj5QfkdjTQBXJRrgjHJCB0WtM&itemCode='+cid
			
			$http.get(itemiurl,{cache:true}).success(function(data){
				$scope.itemrow = data.GetItemInstanceInfoResult;
				$ionicLoading.hide();	
			}); 
		}]
)



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});

