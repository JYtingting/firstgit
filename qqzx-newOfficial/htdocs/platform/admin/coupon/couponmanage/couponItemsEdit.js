$(function(){
	var ckAll_goodId = {};
	var ckAll_goodIdForActivity_1 = {};
	var ckAll_goodIdForActivity_2 = {};
	var ckAll_goodIdForActivity_3 = {};
	var ckAll_goodIdForActivity_4 = {};
	var ckAll_goodIdForActivity_5 = {};
	var ckAll_countryCode = {};
	var ckAll_memberID = {};
	
	var ckAll_coupon = {};
	
	//选择关联商品信息
	$("#select_pro").bind("click", function(e) {
		
		var page = '';
		getArr();
		getitemSerach(page,false);
	});
	
	//选择关联优惠券运营赠送信息
	$("#select_coupon").bind("click", function(e) {
		var page = '';
		getoperationgivingCouponSerach(page,true);
	});
	
	$('[id^="select_coupon_prize_"]').bind("click", function(e) {
		var prizeId = $(this).attr("prizeId");
		$("#prizeIdInCoupon").val(prizeId);
		var page = '';
		getoperationgivingCouponSerach(page,true);
	});
	
	//选择优惠券组合信息
	$('[id^="give_coupon_com_"]').bind("click", function(e) {
		var page = '';
		var mid = $(this).attr("mid");
		var depositId = $(this).attr("depositId");
		var requestNo = $(this).attr("requestNo");
		$("#memberCoupon").val(mid);
		$("#depositId").val(depositId);
		$("#requestNo").val(requestNo);
		getgivingCouponComSerach(page,true);
	});
	
	 $('[id^="select_pro_"]').bind("click", function(e) {
		 	
			var idArr = $(this).attr("id").split("_");
			var num = idArr[2];
			var page = '';
			getArrForActivity(num);
			getitemSerachForActivity(page,false,num);
			
	});

    $("#select_category_recommend").bind("click", function(e) {
        getArr();
        getCategoryRecommendSerach();
    });


    //选择产销国
	$("#select_countrycode").bind("click", function(e) {
		var page = '';
		getCountrySerach();
	});
	
	$(".select_pro").bind("click",function(e){
		var page = '';
		getitemSerach(page,false);
	});
	
	//关联会员
	$("#select_member").bind("click",function(e){
		var page = '';
		getmemberSerach(page,true);
	});

	//关联仓库
	$("#select_address").bind("click", function () {
		debugger;
		getAddressSearch();
	});


	//关联会员多选
    $("#select_member_pro").bind("click",function(e){
        var page = '';
        getmemberSerach(page,false);
    });
    //关联单个商品
    $("#select_single_item").bind("click",function(e){
        var page = '';
        getitemSerach(page,true);
    });
	
	//选择订单sku
	 $('[id^="select_sku_"]').bind("click", function(e) {
		var subOrderNo = $(this).attr("subOrderNo");
		getOrderSkuDetailList(subOrderNo);
	});
	 
	//399分佣明细
	 $('[id^="memberCommissionDetail_"]').bind("click", function(e) {
		var orderNo = $(this).attr("orderNo");
		getMemberCommissionDetail(orderNo);
	});
	 
	//用户月结详情显示
	 $('[id^="commission_month_"]').bind("click", function(e) {
		 var page = '';
		var mid = $(this).attr("mid");
		var memberName = $(this).attr("memberName");
		
		$("#mid").val(mid);
		$("#memberName").text(memberName);
		$("#yearMonth").text($("#month").val());
		 var yearMonth = $("#month").val();
		 $(".commission_menus a:first").click();
	});
	 
	 //菜单切换
	 $(".commission_menus a").bind("click", function(e) {
		 var page = '';
		 var type = $(this).attr("type");
		 var mid = $("#mid").val();
		 var yearMonth = $("#month").val();
		 
		 $(".mennu").removeClass('menuactive');
		 $(this).parent().addClass('menuactive');
		 
		 if(type=='normal'){
			 $(".comSkuDetail").show();
			 $("#totalNormalH").show();
			 $(".memberSkuDetail").hide();
			 $("#totalmemberH").hide();
			 getCommissionMonthNormalOrderDetailByMid(page,mid,yearMonth);
		 }else if(type=='399'){
			 $(".comSkuDetail").hide();
			 $("#totalNormalH").hide();
			 $(".memberSkuDetail").show();
			 $("#totalmemberH").show();
			 getCommissionMonth399DetailByMid(page,mid,yearMonth);
		 }
	});
	 
	 
	 
	 
		//选择订单
	 $('[id^="select_mid_"]').bind("click", function(e) {	
		var subOrderNo = $(this).attr("subOrderNo");
		getOrderSkuDetailList(subOrderNo);
	});
	 
	 $('[id^="select_399_"]').bind("click", function(e) {	
			var orderNo = $(this).attr("orderNo");
			getMemberDetailList(orderNo);
		});
		//获取 订单商品分佣明细
		function getMemberDetailList(orderNo){
			$.ajax({
	            url: "/admin/base/commissionmanage/memOrderSkuDetailListView.json?orderNo=" + orderNo,
	            type: "get",
	            success: function (data) {
	                if (data != null) {
	                	console.info("===========");
	                	console.info(data);
	                  	var comOrderCommissionSkuDetailList = data.data;
		        		var tpl = '';
		        		if(comOrderCommissionSkuDetailList.length > 0 ){
		        			$('#skuDetailList').html('');
		        			
		        			for(var i = 0; i < comOrderCommissionSkuDetailList.length; i++){
					    		var tr1 = '<tr>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].itemName +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].itemSkuId +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].nickName +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].midLevel +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].playNumber +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].savePrice +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].commissionFloor +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].commssionStatus +'</td>'+
										  '<td>'+ comOrderCommissionSkuDetailList[i].commissionPrice +'</td>'+
								 	      '</tr>';
					    		
					    		tpl += tr1;
							}
							$('#skuDetailList').html(tpl);
		        		}
	                }
	            }
	        });
		}
	 
	  
	 
	// 订单商品分佣列表
	function getOrderSkuList(subOrderNo){
		$.ajax({
            url: "/admin/base/commissionmanage/comOrderSkuListView.json?subOrderNo=" + subOrderNo,
            type: "get",
            success: function (data) {
            	
            	console.info(data);
                if (data != null) {
                  	var comOrderCommissionSkuList = data.data;
	        		var tpl = '';
	        		if(comOrderCommissionSkuList.length > 0 ){
	        			$('#skuList').html('');
	        			
	        			for(var i = 0; i < comOrderCommissionSkuList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td>'+ comOrderCommissionSkuList[i].itemName +'</td>'+
									  '<td>'+ comOrderCommissionSkuList[i].itemSkuId +'</td>'+
									  '<td>'+ comOrderCommissionSkuList[i].marketPrice +'</td>'+
									  '<td>'+ comOrderCommissionSkuList[i].savePrice +'</td>'+
									  '<td>'+ comOrderCommissionSkuList[i].memberPrice +'</td>'+
									  '<td>'+ comOrderCommissionSkuList[i].amount +'</td>'+
							 	      '</tr>';
				    		
				    		tpl += tr1;
						}
						$('#skuList').html(tpl);
	        		}
                }
            }
        });
	}
	
	//获取 订单商品分佣明细
	function getOrderSkuDetailList(subOrderNo){
		$.ajax({
            url: "/admin/base/commissionmanage/comOrderSkuDetailListView.json?subOrderNo=" + subOrderNo,
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var comOrderCommissionSkuDetailList = data.data;
	        		var tpl = '';
	        		$('#skuDetailList').html('');
	        		if(comOrderCommissionSkuDetailList.length > 0 ){
	        			for(var i = 0; i < comOrderCommissionSkuDetailList.length; i++){   
	        				var trStar = '<tr>'+ 
	        							 '<td title="'+comOrderCommissionSkuDetailList[i].itemName+'" rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemName.substring(0, 10)+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemSkuName+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].amount+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+priceFormat(comOrderCommissionSkuDetailList[i].sellPrice)+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+priceFormat(comOrderCommissionSkuDetailList[i].memberPrice)+'</td>';
	        							var flag = false;
	        							for(var j = 0; j < comOrderCommissionSkuDetailList[i].list.length; j++){
	        								
	        								if(flag==true){
	        									trStar = trStar + ' <tr> <td>'+ comOrderCommissionSkuDetailList[i].list[j].nickName +'</td>';
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].mid +'</td>';
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td> </tr> ';
	        								}
	        								if(flag==false){
	        									trStar = trStar + '<td>'+ comOrderCommissionSkuDetailList[i].list[j].nickName +'</td>';
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].mid +'</td>';
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td>';
		        								trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].commssionStatus+'</td>';
		        		        				trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].supplierName+'</td></tr>';
		        		        				flag = true;
	        								}
	        							}
	        				
				    		tpl += trStar;
						}
						$('#skuDetailList').html(tpl);
	        		}
                }
            }
        });
	}
	
	
	//获取 399分佣明细 弹框
	function getMemberCommissionDetail(orderNo){
		$.ajax({
            url: "/admin/base/commissionmanage/memberCommissionDetail.json?orderNo=" + orderNo,
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var memOrderCommissionDetailList = data.data;
	        		var tpl = '';
	        		if(memOrderCommissionDetailList.length > 0 ){
	        			$('#memberCommissionDetailList').html('');
	        			for(var i = 0; i < memOrderCommissionDetailList.length; i++){   
	        				var trStar = '<tr>'+
	        							 '<td>'+memOrderCommissionDetailList[i].memberName+'</td>'+
	        							 '<td>'+memOrderCommissionDetailList[i].memberId+'</td>'+
	        							 '<td>'+memOrderCommissionDetailList[i].midLevel+'</td>'+
	        							 '<td>'+priceFormat(memOrderCommissionDetailList[i].commissionPrice)+'</td>'+
	        							 '<td>'+memOrderCommissionDetailList[i].commssionStatus+'</td></tr>';
				    		tpl += trStar;
						}
						$('#memberCommissionDetailList').html(tpl);
	        		}
                }
            }
        });
	}
	
	
	//获取用户月结表普通订单分佣明细
	function getCommissionMonthNormalOrderDetailByMid(page,mid,yearMonth){
		$.ajax({
            url: "/admin/base/commissionmanage/commissionMonthDetailByMid.json?page="+page+"&mid=" + mid+"&yearMonth="+yearMonth,
            type: "get",
            success: function (data) {
            	
                if (data != null) {
                	$('#skuDetailList').html('');
        			$('#memberSkuDetailList').html('');
                  	var comOrderCommissionSkuDetailList = data.data;
	        		var tpl = '';
	        		if(comOrderCommissionSkuDetailList&&comOrderCommissionSkuDetailList.length > 0 ){
	        			var totalCommissionPrice = 0;
	        			for(var i = 0; i < comOrderCommissionSkuDetailList.length; i++){   
	        				var trStar = '<tr>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemName+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemSkuName+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].amount+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+priceFormat(comOrderCommissionSkuDetailList[i].sellPrice)+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+priceFormat(comOrderCommissionSkuDetailList[i].memberPrice)+'</td>';
	        							var flag = false;
	        							for(var j = 0; j < comOrderCommissionSkuDetailList[i].list.length; j++){
	        								totalCommissionPrice += comOrderCommissionSkuDetailList[i].list[j].commissionPrice;
	        								if(flag==true){
		        								trStar = trStar +  '<tr> <td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td> </tr> ';
	        								}
	        								if(flag==false){
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td>';
		        								trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].commssionStatus+'</td>';
		        		        				trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].supplierName+'</td></tr>';
		        		        				flag = true;
	        								}
	        							}
	        				
				    		tpl += trStar;
						}
	        			$('#totalNormal').text('');
	        			$('#totalmember').text('');
	        			$('#totalNormal').text(priceFormat(totalCommissionPrice));
						$('#skuDetailList').html(tpl);
	        		}
                }
            }
        });
	}
	
	//获取用户月结表399分佣明细
	function getCommissionMonth399DetailByMid(page,mid,yearMonth){
		
		$.ajax({
            url: "/admin/base/commissionmanage/commissionMonth399DetailByMid.json?page="+page+"&mid=" + mid+"&yearMonth="+yearMonth,
            type: "get",
            success: function (data) {
            	
                if (data != null) {
                	$('#skuDetailList').html('');
        			$('#memberSkuDetailList').html('');
                  	var comOrderCommissionSkuDetailList = data.data;
	        		var tpl = '';
	        		var totalCommissionPrice = 0;
	        		if(comOrderCommissionSkuDetailList&&comOrderCommissionSkuDetailList.length > 0 ){
	        			for(var i = 0; i < comOrderCommissionSkuDetailList.length; i++){   
	        				var trStar = '<tr>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemName+'</td>'+
	        							 '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].itemSkuName+'</td>';
	        							var flag = false;
	        							for(var j = 0; j < comOrderCommissionSkuDetailList[i].list.length; j++){
	        								totalCommissionPrice += comOrderCommissionSkuDetailList[i].list[j].commissionPrice;
	        								if(flag==true){
		        								trStar = trStar +  '<tr> <td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td> </tr> ';
	        								}
	        								if(flag==false){
		        								trStar = trStar +  '<td>'+ comOrderCommissionSkuDetailList[i].list[j].midLevel +'</td>';
		        								trStar = trStar +  '<td>'+ priceFormat(comOrderCommissionSkuDetailList[i].list[j].commissionPrice) +'</td>';
		        								trStar = trStar +   '<td>'+ comOrderCommissionSkuDetailList[i].list[j].commissionFloor +'</td>';
		        								trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].commssionStatus+'</td>';
		        		        				trStar = trStar + '<td rowspan='+comOrderCommissionSkuDetailList[i].list.length+'>'+comOrderCommissionSkuDetailList[i].supplierName+'</td></tr>';
		        		        				flag = true;
	        								}
	        							}
	        				
				    		tpl += trStar;
						}
	        			$('#totalNormal').text('');
	        			$('#totalmember').text('');
	        			$('#totalmember').text(priceFormat(totalCommissionPrice));
						$('#memberSkuDetailList').html(tpl);
	        		}
                }
            }
        });
	}
	
	//获取订单信息
	function getOrderDetailList(subOrderNo){
		$.ajax({
            url: "/admin/base/commissionmanage/findByOrderNo.json?subOrderNo=" + subOrderNo,
            type: "get",
            success: function (data) {
            	
                if (data != null) {
                  	var orderDetail = data.data;
	        		var tpl = '';
	        		$('#orderDetail').html('');
	        		if(orderDetail){
			    		var tr1 = '<tr>'+
								  '<td>'+ orderDetail.nickName +'</td>'+
								  '<td>'+ orderDetail.subOrderNo +'</td>'+
								  '<td>'+ orderDetail.orderStatus +'</td>'+
						 	      '</tr>';
			    		tpl += tr1;
					
						$('#orderDetail').html(tpl);
	        		}
                }
            }
        });
	}

    //获取一级推荐
    function getCategoryRecommendSerach(){
        $.ajax({
            url: "/admin/commondatamanage/searchLevel1Category.json",
            type: "get",
            success: function (data) {
                if (data != null) {
                    var category1List = data.data;
                    console.log(category1List)
                    var tpl = '';
                    if(category1List.length > 0 ){
                        for(var i = 0; i < category1List.length; i++){
                            var tr1 = '<tr>'+
                                '<td><input type="checkbox" class="ckid" value="'+ category1List[i].id +'"/></td>'+
                                '<td>'+ category1List[i].id +'</td>'+
                                '<td>'+ category1List[i].name +'</td>'+
                                '</tr>';
                            for (var j in ckAll_goodId) {
                                if(j == category1List[i].id){
                                    tr1 = '<tr>'+
                                        '<td><input type="checkbox" class="ckid" checked="checked" value="'+ category1List[i].id +'"/></td>'+
                                        '<td>'+ category1List[i].id +'</td>'+
                                        '<td>'+ category1List[i].name +'</td>'+
                                        '</tr>';
                                }
                            }
                            tpl += tr1;
                        }
                        $('#catIdList').html(tpl);
                    }
                    getArr();
                    ckIs();
                }
            }
        });
    }

    
    //获取商品信息
	function getitemSerach(page,isSingle){
		
		var id = $('#good_id').val();
	 	var name = $('#good_name').val();
		$.ajax({
            url: "/admin/commondatamanage/itemSerach.json?page=" + page +"&cid=" +id+ "&name="+name,
            type: "get",
            success: function (data) {
            	
                if (data != null) {
                  	var data = data.data;
	        		var goodList = data.recordList;
	        		var tpl = '';
	        		if(goodList.length > 0 ){
	        			for(var i = 0; i < goodList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td><input type="checkbox" class="ckid" value="'+ goodList[i].id +'"/></td>'+
									  '<td><img class="left rowimg" src='+pictureFormat(goodList[i].picUrls[0],200)+' /></td>'+
									  '<td>'+ goodList[i].id +'</td>'+
									  '<td>'+ goodList[i].name +'</td>'+
							 	      '</tr>';
				    		for (var j in ckAll_goodId) {
				    			if(j == goodList[i].id){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ goodList[i].id +'"/></td>'+
									 '<td><img class="left rowimg" src='+pictureFormat(goodList[i].picUrls[0],200)+' /></td>'+
									 '<td>'+ goodList[i].id +'</td>'+
									 '<td>'+ goodList[i].name +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
						}
						$('#goodList').html(tpl);
	        		}

                    if(isSingle){
                        pages(data.pages, data.page,isSingle);
                        ckItemIs();
                    }else {
                        pages(data.pages, data.page,isSingle);
                        getArr();
                        ckIs();
                    }

                }
            }
        });
	}
	
	//获取运营赠送优惠券信息  *******提升为全局函数
	getoperationgivingCouponSerach = function (page,isSingle){
		var id = $('#coupon_id').val();
	 	var name = $('#coupon_name').val();
		$.ajax({
            url: "/admin/activity/couponmanage/operationgivingCoupon.json?page=" + page +"&couponId=" +id+ "&name="+name,
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var data = data.data;
	        		var couponList = data.recordList;
	        		var tpl = '';
	        		if(couponList.length > 0 ){
	        			for(var i = 0; i < couponList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td><input type="checkbox" class="ckid" value="'+ couponList[i].id +'"/></td>'+
									  '<td>'+ couponList[i].id +'</td>'+
									  '<td>'+ couponList[i].name +'</td>'+
									   '<td>'+ priceFormat(couponList[i].denomination) +'</td>'+
									   '<td>'+ priceFormat(couponList[i].thresholdPrice) +'</td>'+
							 	      '</tr>';
				    		for (var j in ckAll_goodId) {
				    			if(j == couponList[i].id){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ couponList[i].id +'"/></td>'+
									 '<td>'+ couponList[i].id +'</td>'+
									 '<td>'+ couponList[i].name +'</td>'+
									 '<td>'+ priceFormat(couponList[i].denomination) +'</td>'+
									 '<td>'+ priceFormat(couponList[i].thresholdPrice) +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
						}
						$('#couponList').html(tpl);
	        		}

                    if(isSingle){
                    	pagesForCoupon(data.pages, data.page,isSingle);
                        ckOperCoupons();
                    }else {
                    	pagesForCoupon(data.pages, data.page,isSingle);
                        getArr();
                        ckIs();
                    }
                }
            }
        });
	}
	
	
	//获取优惠券组合信息
	function getgivingCouponComSerach(page,isSingle){
		$.ajax({
            url: "/admin/activity/couponcommanage/givingCouponComSerach.json",
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var couponComList = data.data;
                  	$('#couponComList').empty();
	        		var tpl = '';
	        		if(couponComList.length > 0 ){
	        			for(var i = 0; i < couponComList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td><input type="checkbox" class="ckid" value="'+ couponComList[i].id +'"/></td>'+
									  '<td>'+ couponComList[i].name +'</td>'+
									  '<td title="'+couponComList[i].couponIdCounts+'">'+ couponComList[i].couponIdCounts.substring(0, 35) +'</td>'+
							 	      '</tr>';
				    		for (var j in ckAll_goodId) {
				    			if(j == couponComList[i].id){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ couponComList[i].id +'"/></td>'+
									 '<td>'+ couponComList[i].name +'</td>'+
									 '<td title="'+couponComList[i].couponIdCounts+'">'+ couponComList[i].couponIdCounts.substring(0, 35) +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
						}
						$('#couponComList').html(tpl);
	        		}

                    if(isSingle){
                        pages(data.pages, data.page,isSingle);
                        ckOperCoupons();
                    }else {
                        pages(data.pages, data.page,isSingle);
                        getArr();
                        ckIs();
                    }
                }
            }
        });
	}
    
  //获取活动商品信息
	function getitemSerachForActivity(page,isSingle,num){
		var id = $('#good_id_'+num).val();
	 	var name = $('#good_name_'+num).val();
		$.ajax({
            url: "/admin/commondatamanage/itemSerach.json?page=" + page +"&cid=" +id+ "&name="+name,
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var data = data.data;
	        		var goodList = data.recordList;
	        		var tpl = '';
	        		if(goodList.length > 0 ){
	        			for(var i = 0; i < goodList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td><input type="checkbox" class="ckid" value="'+ goodList[i].id +'"/></td>'+
									  '<td><img class="left rowimg" src='+pictureFormat(goodList[i].picUrls[0],200)+' /></td>'+
									  '<td>'+ goodList[i].id +'</td>'+
									  '<td>'+ goodList[i].name +'</td>'+
							 	      '</tr>';
				    		for (var j in eval("ckAll_goodIdForActivity_"+num)) {
				    			if(j == goodList[i].id){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ goodList[i].id +'"/></td>'+
									 '<td><img class="left rowimg" src='+pictureFormat(goodList[i].picUrls[0],200)+' /></td>'+
									 '<td>'+ goodList[i].id +'</td>'+
									 '<td>'+ goodList[i].name +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
						}
						$('#goodList_'+num).html(tpl);
	        		}

                    if(isSingle){
                    	pagesForActivity(data.pages, data.page,isSingle,num);
                    	ckItemIsForActivity(num);
                    }else {
                    	pagesForActivity(data.pages, data.page,isSingle,num);
                        getArrForActivity(num);
                        ckIsForActivity(num);
                    }

                }
            }
        });
	}
	
	
	//获取会员信息
	function getmemberSerach(page,isSingle){
		
		var mid = $('#member_id').val();
	 	var name = $('#member_name').val();
		$.ajax({
            url: "/admin/commondatamanage/memberSerach.json?page=" + page +"&mid=" +mid+ "&memberName="+name,
            type: "get",
            success: function (data) {
                if (data != null) {
                  	var data = data.data;
	        		var memberList = data.recordList;
	        		var tpl = '';
	        		if(memberList.length > 0 ){
	        			for(var i = 0; i < memberList.length; i++){
				    		var tr1 = '<tr>'+
				    		 		  '<td><input type="checkbox" class="ckid" value="'+ memberList[i].id +'"/></td>'+
									  '<td>'+ memberList[i].id +'</td>'+
									  '<td>'+ memberList[i].nickName +'</td>'+
							 	      '</tr>';
				    		for (var j in ckAll_memberID) {
				    			if(j == memberList[i].id){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ memberList[i].id +'"/></td>'+
									 '<td>'+ memberList[i].id +'</td>'+
									 '<td>'+ memberList[i].nickName +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
						}
						$('#memberList').html(tpl);
	        		}

                    if(isSingle){
                        memberpages(data.pages, data.page,isSingle);
                        ckMemberIs();
                    }else {
                        memberpages(data.pages, data.page,isSingle);
                        getArrForMember();
                        ckIsForMember();
                    }

                }
            }
        });
	}

	//获取需要关联的地址
	function getAddressSearch() {
		$.ajax({
			url: "/admin/commondatamanage/addressSearch.json",
			type: "get",
			success: function (data) {
				if (data != null) {
					var addressList = data.data;
					console.info(addressList);
					var tpl = '';
					for (var i = 0; i < addressList.length; i++) {
						var tr1 =
							'<tr>' +
							'<td>' +
							'<input type="checkbox" class="ckid" value="' + addressList[i].id + '"/>' +
							'<input type="hidden" value="{whCode:'+ addressList[i].whCode+',whName:'+formatStr(addressList[i].name)+',id:'+addressList[i].id+'}"> </td>' +
							'<td>' + addressList[i].whCode + '</td>' +
							'<td>' + addressList[i].name + '</td>' +
							'</tr>';
						tpl += tr1;
					}
					$('#addressList').html(tpl);
				}
			}
		});
	}


	//分页
	function pages(pages,page,isSingle){
		var pageCount = pages;
        var currentPage = page;
        var options = {
            bootstrapMajorVersion: 2, //版本
            currentPage: currentPage, //当前页数
            totalPages: pageCount, //总页数
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },//点击事件，用于通过Ajax来刷新整个list列表
            onPageClicked: function (event, originalEvent, type, page) {
            	getitemSerach(page,isSingle);
            }
        };
        $('#example').bootstrapPaginator(options);
	}
	
	//分页 运营赠送优惠券
	function pagesForCoupon(pages,page,isSingle,num){
		var pageCount = pages;
        var currentPage = page;
        var options = {
            bootstrapMajorVersion: 2, //版本
            currentPage: currentPage, //当前页数
            totalPages: pageCount, //总页数
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },//点击事件，用于通过Ajax来刷新整个list列表
            onPageClicked: function (event, originalEvent, type, page) {
            	getoperationgivingCouponSerach(page,true);
            }
        };
        $('#example').bootstrapPaginator(options);
	}
	
	//分页 活动商品
	function pagesForActivity(pages,page,isSingle,num){
		var pageCount = pages;
        var currentPage = page;
        var options = {
            bootstrapMajorVersion: 2, //版本
            currentPage: currentPage, //当前页数
            totalPages: pageCount, //总页数
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },//点击事件，用于通过Ajax来刷新整个list列表
            onPageClicked: function (event, originalEvent, type, page) {
            	getitemSerachForActivity(page,isSingle,num);
            }
        };
        $('#example_'+num).bootstrapPaginator(options);
	}
	
	//会员分页
	function memberpages(pages,page,isSingle){
		var pageCount = pages;
        var currentPage = page;
        var options = {
            bootstrapMajorVersion: 2, //版本
            currentPage: currentPage, //当前页数
            totalPages: pageCount, //总页数
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },//点击事件，用于通过Ajax来刷新整个list列表
            onPageClicked: function (event, originalEvent, type, page) {
            	getmemberSerach(page,isSingle);
            }
        };
        $('#example').bootstrapPaginator(options);
	}
	
	//获取国家列表
	function getCountrySerach(){
		var name = $('#country_name').val();
		$.ajax({
            url: "/admin/commondatamanage/countrySerach.json?description="+name,
            type: "get",
            success: function (data) {
                if (data != null) {
                	
                  	var countryList = data.data;
	        		var tpl = '';
	        		if(countryList.length > 0 ){
	        			$('#countryList').html("");
	        			for(var i = 0; i < countryList.length; i++){
				    		var tr1 = '<tr>'+
									  '<td><input type="checkbox" class="ckid" value="'+ countryList[i].code+"_"+ countryList[i].description +'"/></td>'+
									  '<td>'+ countryList[i].id +'</td>'+
									  '<td>'+ countryList[i].code +'</td>'+
									  '<td>'+ countryList[i].description +'</td>'+
							 	      '</tr>';
				    		for (var j in ckAll_countryCode) {
				    			if(j == countryList[i].code){
						            tr1 = '<tr>'+
									 '<td><input type="checkbox" class="ckid" checked="checked" value="'+ countryList[i].code +'"/></td>'+
									  '<td>'+ countryList[i].id +'</td>'+
									  '<td>'+ countryList[i].code +'</td>'+
									  '<td>'+ countryList[i].description +'</td>'+
							 	     '</tr>';
						        }
				    		}
				    		tpl += tr1;
				    		
						}
						$('#countryList').html(tpl);
	        		}
	        		ckCountryIs();
                }
            }
        });
	}

	//将用户之前选定的商品id放到公共的数组里面
	function getArr(){
		var arr = [];
    	var str = $('#goodsId').val();
    	if(str != "" && str != "undefined"){
    		arr = str.split(",");
	    	for(var m = 0; m < arr.length; m++){
	    		ckAll_goodId[arr[m]] = arr[m];
	    	}
    	}
	}
	
	//将用户之前选定的活动商品id放到公共的数组里面
	function getArrForActivity(num){
		var arr = [];
    	var str = $('#goodsId_'+num).val();
    	if(str != "" && str != "undefined"){
    		arr = str.split(",");
	    	for(var m = 0; m < arr.length; m++){
	    		eval("ckAll_goodIdForActivity_"+num)[arr[m]] = arr[m];
	    	}
    	}
	}

    //将用户之前选定的活动商品id放到公共的数组里面
    function getArrForMember(){
        var arr = [];
        var str = $('#memberId').val();
        if(str != "" && str != "undefined"){
            arr = str.split(",");
            for(var m = 0; m < arr.length; m++){
                ckAll_memberID[arr[m]] = arr[m];
            }
        }
    }
	//确定按钮事件
	$('#btn_ok').bind("click", function() {
		
		delete ckAll_goodId['on'];
		var list_goodId = [];
		for(var i in ckAll_goodId){
			list_goodId.push(i);
		}
		list_goodId.sort(compareGoodId);
		$('#goodsId').val(list_goodId);
		
	    $('#myModal').removeClass('in');
	});

	$('#addressOkBtn').bind("click", function () {
		var jsonStr = "";
		$("input:checkbox").each(function(){
			if(this.checked===true){
				var str = $(this).next().val();
				if(str!==undefined) {
					jsonStr += str;
				}
			}
		});

		$('#addressJson').val("["+jsonStr+"]");
	});
	
	function compareGoodId(value1,value2){
		if (value1 < value2){
		return 1;
		}else if (value1 > value2){
		return -1;
		}else{
		return 0;
		}
	}
	
	//确定按钮事件
	$('#coupon_btn_ok').bind("click", function() {
		delete ckAll_goodId['on'];
		var list_couponId = [];
		for(var i in ckAll_goodId){
			list_couponId.push(i);
		}
		 $('#myModal').hide();
	    $('#myModal').removeClass('in');
	    
	    $.ajax({
	    	url: "/admin/activity/couponmanage/givingCoupon.json?couponIds=" + list_couponId +"&mid=" + $('#memberCoupon').val(),
            type: "get",
            success: function (data) {
            	
                if (data != null&&data.success) {
                	swal('赠送成功!');
                	setTimeout(function(){
                		window.location = $('#couponGive').attr("href");
                	},800)
                }else{
                	swal('赠送失败,已领过或优惠券数量发放完毕!')
                }
                $('#myModal').hide();
               
            }
	    });
	});
	
	//确定按钮事件
	$('#coupon_prize_btn_ok').bind("click", function() {
		var prizeIdInCoupon = $("#prizeIdInCoupon").val();
		$("#objectId_"+prizeIdInCoupon).val(ckAll_coupon.couponId);
		$("#objectName_"+prizeIdInCoupon).val(ckAll_coupon.couponName);
		$('#myModal').hide();
	    $('#myModal').removeClass('in');
	    toContentData();
	});
	
	//优惠券组合确定按钮事件
	$('#coupon_com_btn_ok').bind("click", function() {
		delete ckAll_goodId['on'];
		var list_couponComId = [];
		for(var i in ckAll_goodId){
			list_couponComId.push(i);
		}
		$('#myModal').hide();
	    $('#myModal').removeClass('in');
	    
	    if(list_couponComId.length==0){
	    	swal('请选择优惠券组合!');
	    	return 
	    }
	    $.ajax({
	    	url: "/admin/activity/couponcommanage/givingCouponCom.json?couponComIds=" + list_couponComId +"&mid=" + $('#memberCoupon').val()+"&depositId="+ + $('#depositId').val()+"&requestNo="+$('#requestNo').val(),
            type: "get",
            success: function (data) {
            	
                if (data != null&&data.success) {
                	swal('赠送成功!');
                }else{
                	swal('赠送失败!'+data.errorInfo)
                }
                $('#myModal').hide();
            }
	    });
	});
	
	
	//优惠券组合确定按钮事件  for 会员
	$('#coupon_com_member_btn_ok').bind("click", function() {
		delete ckAll_goodId['on'];
		var list_couponComId = [];
		for(var i in ckAll_goodId){
			list_couponComId.push(i);
		}
		$('#myModal').hide();
	    $('#myModal').removeClass('in');
	    
	    if(list_couponComId.length==0){
	    	swal('请选择优惠券组合!');
	    	return 
	    }
	    $.ajax({
	    	url: "/admin/activity/couponcommanage/givingCouponComForMember.json?couponComIds=" + list_couponComId +"&mid=" + $('#memberCoupon').val(),
            type: "get",
            success: function (data) {
            	
                if (data != null&&data.success) {
                	swal('赠送成功!');
                	setTimeout(function(){
                		window.location = $('#couponGive').attr("href");
                	},800)
                }else{
                	swal('赠送失败!'+data.errorInfo)
                }
                $('#myModal').hide();
            }
	    });
	});
	
	
	

	
	//活动商品选定按钮事件
	$('[id^="btn_ok_"]').bind("click", function() {
		var idArr = $(this).attr("id").split("_");
		var num = idArr[2];
		
		delete eval("ckAll_goodIdForActivity_"+num)['on'];
		var list_goodId = [];
		for(var i in eval("ckAll_goodIdForActivity_"+num)){
			list_goodId.push(i);
			$('#goodsId_'+num).val(list_goodId);
		}
		
	    $('#myModal_'+num).removeClass('in');
	    //触发表格input事件
	    $('#goodsId_'+num).trigger("change");
	});
	
	$('#member_btn_ok').bind("click", function() {
		for(var obj in ckAll_memberID){
			$('#memberId').val(obj);
		}
	    $('#myModal').removeClass('in');
	});


    //确定按钮事件
    $('#member_pro_btn_ok').bind("click", function() {

        delete ckAll_memberID['on'];
        var list_memberId = [];
        for(var i in ckAll_memberID){
            list_memberId.push(i);
        }
        $('#memberId').val(list_memberId);

        $('#myModal').removeClass('in');
    });
	
	$('#country_btn_ok').bind("click", function() {
		for(var obj in ckAll_countryCode){
			var countryArr = obj.split("_");
			$('#countryCode').val(countryArr[0]);
			$('#countryName').val(countryArr[1]);
		}
	    $('#myModal').removeClass('in');
	});

	
	
	//单选
	function ckIs(){
		$("input[type='checkbox']").each(function() {  
			$(this).on("click",function(){
				if(!this.checked){
					isCheckAll = false;
					$('#swapCheck').attr('checked',false);
					delete ckAll_goodId[this.value];
		 		} else{
		 			ckAll_goodId[this.value] = this.value;
	 			}  
			});
     	}); 
	}
	
	function ckIsForActivity(num){
		$("input[type='checkbox']").each(function() {  
			$(this).on("click",function(){
				if(!this.checked){
					isCheckAll = false;
					$('#swapCheck').attr('checked',false);
					delete eval("ckAll_goodIdForActivity_"+num)[this.value];
		 		} else{
		 			eval("ckAll_goodIdForActivity_"+num)[this.value] = this.value;
	 			}  
			});
     	}); 
	}

    function ckIsForMember(){
        $("input[type='checkbox']").each(function() {
            $(this).on("click",function(){
                if(!this.checked){
                    isCheckAll = false;
                    $('#swapCheck').attr('checked',false);
                    delete ckAll_memberID[this.value];
                } else{
                    ckAll_memberID[this.value] = this.value;
                }
            });
        });
    }
	//全选
	var isCheckAll = false; 
	$('#swapCheck').bind("click", function() {
		
	 	if (isCheckAll) {  
            $("input[type='checkbox']").each(function() {  
                this.checked = false;  
                delete ckAll_goodId[this.value];
            });  
            isCheckAll = false;  
        } else {  
            $("input[type='checkbox']").each(function() {  
                this.checked = true;  
                ckAll_goodId[this.value] = this.value;
            });  
            isCheckAll = true;  
        }  
		delete ckAll_goodId['on'];
	});
	
	//单选会员
	function ckMemberIs(){
		$("input[type='checkbox']").each(function() {  
			$(this).on("click",function(){
				$("input[type='checkbox']").each(function() {  
	                this.checked = false;  
	            }); 
				this.checked = true;  
				ckAll_memberID = {};
				ckAll_memberID[this.value] = this.value;
	 			
			});
     	}); 
	}
    //单选商品
    function ckItemIs(){
        $("input[type='checkbox']").each(function() {
            $(this).on("click",function(){
                $("input[type='checkbox']").each(function() {
                    this.checked = false;
                });
                this.checked = true;
                ckAll_goodId = {};
                ckAll_goodId[this.value] = this.value;

            });
        });
    }
    
    //单选运营优惠券
    function ckOperCoupons(){
        $("input[type='checkbox']").each(function() {
            $(this).on("click",function(){
            	
                $("input[type='checkbox']").each(function() {
                    this.checked = false;
                });
                this.checked = true;
                ckAll_goodId = {};
                ckAll_coupon = {};
                ckAll_goodId[this.value] = this.value;
                ckAll_coupon.couponId = this.value;
                ckAll_coupon.couponName = $(this).parent().next().next().text();
            });
        });
    }
    
    function ckItemIsForActivity(num){
        $("input[type='checkbox']").each(function() {
            $(this).on("click",function(){
                $("input[type='checkbox']").each(function() {
                    this.checked = false;
                });
                this.checked = true;
                eval("ckAll_goodIdForActivity_"+num) = {};
                eval("ckAll_goodIdForActivity_"+num)[this.value] = this.value;

            });
        });
    }


    //单选国家
	function ckCountryIs(){
		$("input[type='checkbox']").each(function() {  
			$(this).on("click",function(){
				$("input[type='checkbox']").each(function() {  
	                this.checked = false;  
	            }); 
				this.checked = true;  
				ckAll_countryCode = {};
				ckAll_countryCode[this.value] = this.value;
	 			
			});
     	}); 
	}

	//搜索
	$('#search_good').bind('click',function(){
	 	var page = '';
		getitemSerach(page,false);
	});


    $('#select_single_item1').bind('click',function(){
        var page = '';
        getitemSerach(page,true);
    });
	//搜索
	$('[id^="search_good_"]').bind('click',function(){
	 	var page = '';
	 	var idArr = $(this).attr("id").split("_");
		var num = idArr[2];
		getitemSerachForActivity(page,false,num);
	});
	
	//搜索会员
	$('#search_member').bind('click',function(){
	 	var page = '';
	 	getmemberSerach(page,true);
	});
	
	$('#search_country').bind('click',function(){
		getCountrySerach();
	});
	
	function pictureFormat(picUrl,size) {
		return picUrl + "_" + size +"w.jpg";

	}
});


$('[id^="withdrawalDetail_"]').bind("click", function(e) {	
	var mid = $(this).attr("mid");
	var month = $(this).attr("month");
	getWithdrawalDetailList(mid,month);
});

	//获取提现明细
	function getWithdrawalDetailList(mid,month){
	$.ajax({
        url: "/admin/member/memberwithdrawalrecordmanage/withdrawalDetailList.json?mid=" + mid+"&month="+month,
        type: "get",
        success: function (data) {      	
            if (data != null) {
              	var withdrawalDetailList = data.data;
        		var tpl = '';
        		$('#withdrawalDetails').html('');
        	    		
        		if(withdrawalDetailList.length > 0 ){
        			for(var i = 0; i < withdrawalDetailList.length; i++){
        	    		var tr1 = '<tr>'+
						  '<td>'+ formatCSTDate(withdrawalDetailList[i].askTime,"yyyy-MM-dd hh:mm:ss") +'</td>'+
						  '<td>'+ withdrawalDetailList[i].mid +'</td>'+
						  '<td>'+ withdrawalDetailList[i].name +'</td>'+
						  '<td>'+ priceFormat(withdrawalDetailList[i].withDrawalNum) +'</td>'+
						  '<td>'+ withDrawalStatusTranslate(withdrawalDetailList[i].withDrawalStatus) +'</td>'+
						
						  '<td>'+ removeNull(withdrawalDetailList[i].remark) +'</td>'+
						  
				 	      '</tr>';
        	    		tpl += tr1;				
        			}
        			$('#withdrawalDetails').html(tpl);
        		}
            }
        }
    });
}
	function priceFormat(prize){
		if (prize == null) {
			return "￥0";
		}
		if (prize % 100 == 0) {
			return "￥"+parseInt(prize / 100) ;
		} else if ((prize % 100) >= 10) {
			return"￥"+ parseInt(prize / 100) + "." + prize % 100 ;
		} else {
			return  "￥"+parseInt(prize / 100) + ".0" + prize % 100;
		}		
	}
	function removeNull(remark){
		if(remark==null){
			return '';
			}
		return remark
	}
	function withDrawalStatusTranslate(withDrawalNum){
		if(withDrawalNum==0){
			return '审核中';
		}else if(withDrawalNum==1){
			return '提现成功';
		}else if(withDrawalNum==2){
			return '提现失败';
		} else if(withDrawalNum==3){
            return '审核通过提现中';
        }
	}
	

    function formatCSTDate(strDate,format){
        return formatDate(new Date(strDate),format);
      }
          //格式化日期,
        function formatDate(date,format){
            var paddNum = function(num){
              num += "";
              return num.replace(/^(\d)$/,"0$1");
            }
            //指定格式字符
            var cfg = {
               yyyy : date.getFullYear() //年 : 4位
              ,yy : date.getFullYear().toString().substring(2)//年 : 2位
              ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
              ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
              ,d  : date.getDate()   //日 : 如果1位的时候不补0
              ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
              ,hh : paddNum(date.getHours())  //时
              ,mm : paddNum(date.getMinutes()) //分
              ,ss : paddNum(date.getSeconds()) //秒
            }
            format || (format = "yyyy-MM-dd hh:mm:ss");
            return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
          } 
    
    
    function checkShareCouponForm(){
        var couponId = $.trim($('#couponId').val());
    	var transferNum = $.trim($('#transferNum').val());
    	var shareLinkLimitDate = $.trim($('#shareLinkLimitDate').val());
    	var mid = $('#memberCoupon').val();
        if(!couponId){
        	swal('优惠券ID不能为空！');
            return false;
        }
        if(!transferNum){
        	swal('张数不能为空！');
            return false;
        }
        if(!shareLinkLimitDate){
        	swal('有效期不能为空！');
            return false;
        }
        $.ajax({
                    url: "/admin/activity/couponmanage/sharingCoupon.json",
                    data:{  "couponId":couponId,
	                    	"transferNum":transferNum,
	                    	"shareLinkLimitDate":shareLinkLimitDate,
	                    	"mid":mid
                    },
                    type: "post",
                    success:function(data){
                        if(data.success){
                        	swal({
                        		title:'赠送成功!',
                                showCloseButton: true,
                                confirmButtonText: '确定',
                                width:400,
                                heigth:400
                            }).then((result) => {
                                    if(result.value){
                                    	$('#couponId').val('');
                                    	$('#transferNum').val('');
                                    	$('#shareLinkLimitDate').val('');
                                    	location.reload();
                                    }
                            })
                            
                        }else{
                            swal(data.errorInfo);
                        }
                    },
                    error:function(){
                    	swal('请求出错');
                    }
         });
        return false;
    }


function formatStr(str) {
	return  "'"+str+"'";
}


	