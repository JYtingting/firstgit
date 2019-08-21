$(function() {
	$(".deleteRecord").bind("click", function(e) {
		e.preventDefault(); // 阻止默认的打开事件
		// 注意 $(e.target) == $(this)
		var disname = $(e.target).attr("disname");
		var methodname = $(e.target).attr("methodname");
		var dataid = $(e.target).attr("dataid");
		var entity= $(e.target).attr("entity");
		var skuValue= $(e.target).attr("skuValue");
        swal({
            title: "确认要删除"+disname+"吗?",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmbtn',
            cancelButtonClass: 'canclebtn',
            buttonsStyling: false,
            width:400,
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
                if(result.value){
                    var url = "/admin/ajax/" + methodname ;
                    $.post(url, {
                        "id" : dataid,
                        "entity":entity
                    }, function(result) {
                        if (result.success) {
                            $("#object_" + dataid).hide(1000);
                            if(methodname=='delete_item_sku.json'){
                            	 $("#tr_" + skuValue).remove();
                            }
                        } else {
                            swal(result.errorInfo)
                        }
                    })
                }
        })
	});
	
	$(".translateRecord").bind("click", function(e) {
		e.preventDefault(); // 阻止默认的打开事件
		// 注意 $(e.target) == $(this)
		var disname = $(e.target).attr("disname");
		var methodname = $(e.target).attr("methodname");
		var dataid = $(e.target).attr("dataid");
		var entity= $(e.target).attr("entity");
		var skuValue= $(e.target).attr("skuValue");
        swal({
            title: "确认审核通过"+disname+"吗?",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmbtn',
            cancelButtonClass: 'canclebtn',
            buttonsStyling: false,
            width:400,
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
                if(result.value){
                    var url = "/admin/ajax/" + methodname ;
                    $.post(url, {
                        "id" : dataid,
                        "entity":entity
                    }, function(result) {
                        if (result.success) {
                       
                        } else {
                            swal(result.errorInfo)
                        }
                    })
                }
        })
	});

	$(".deleteRecordLiitBuy").bind("click", function(e) {
		e.preventDefault(); // 阻止默认的打开事件
		// 注意 $(e.target) == $(this)
		var disname = $(e.target).attr("disname");
		var methodname = $(e.target).attr("methodname");
		var dataid = $(e.target).attr("dataid");
		var entity= $(e.target).attr("entity");
        swal({
            title: "确认要删除"+disname+"吗?",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmbtn',
            cancelButtonClass: 'canclebtn',
            buttonsStyling: false,
            width:400,
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
                if(result.value){
                    var url = "/admin/ajax/" + methodname ;
                    $.post(url, {
                        "id" : dataid,
                        "entity":entity
                    }, function(result) {
                        if (result.success) {
                            $(".object_" + dataid).hide(1000);
                        } else {
                            swal(result.errorInfo)
                        }
                    })
                }
        })
	});

    $(".ajaxEnable").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)

        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var status = $(e.target).attr("status");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/enable.json";
        swal({
            title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmbtn',
            cancelButtonClass: 'canclebtn',
            buttonsStyling: false,
            width:400,
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
            if(result.value){
                $.post(url, {
                    "id" : dataid,
                    "entity" : entity,
                    "enable" : (status =="true"? false: true)
                }, function(result) {
                    if (result.success) {
                        var currentStatus=result.data.enable;
                        if(currentStatus){
                            $("#" + mcid).html(truemsg);
                        }
                        else{
                            $("#" + mcid).html(falsemsg);
                        }
                        $("#" + mcid).attr("status",currentStatus);
                    } else {
                        swal(result.errorInfo);
                    }
                })
            }
        })
    });

    //上下架日期输入框
    $(".ajaxEnableShangjia").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)
        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var status = $(e.target).attr("status");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/enable.json";
        if(status =="true"){
        	swal({
                title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmbtn',
                cancelButtonClass: 'canclebtn',
                buttonsStyling: false,
                width:400,
                cancelButtonAriaLabel: 'Thumbs down'
            }).then((result) => {
                if(result.value){
                    $.post(url, {
                        "id" : dataid,
                        "entity" : entity,
                        "enable" : (status =="true"? false: true)
                    }, function(result) {
                        if (result.success) {
                            var currentStatus=result.data.enable;
                            if(currentStatus){
                                $("#" + mcid).html(truemsg);
                            }
                            else{
                                $("#" + mcid).html(falsemsg);
                            }
                            $("#" + mcid).attr("status",currentStatus);
                        } else {
                            swal(result.errorInfo);
                        }
                    })
                }
            })
        }else{ //上架时间输入框

        	swal({
           	  title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
           	  text: "请选择上架时间",
           	  showCancelButton: true,
              showCloseButton: true,
           	  inputPlaceholder: "输入信息",
           	  inputClass:"form_date ",
           	  input:"text",
              confirmButtonClass: 'confirmbtn',
              cancelButtonClass: 'canclebtn',
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              buttonsStyling: false,
              width:400,
              cancelButtonAriaLabel: 'Thumbs down'
           	},
           	function(inputValue){
           	  if (inputValue === false) return false;
           	  if (inputValue === "") {
           		  swal.showInputError("上架时间不能为空！");
           		  return false
           	  }
           	}).then((result) => {
           		var shelfTime = result.value;
                if(result.value){
                    $.post(url, {
                        "id" : dataid,
                        "entity" : entity,
                        "enable" : (status =="true"? false: true),
                        "shelfTime" : shelfTime
                    }, function(result) {
                        if (result.success) {
                            var currentStatus=result.data.enable;
                            if(currentStatus){
                                $("#" + mcid).html(truemsg);
                                if(shelfTime!=""&&shelfTime!=undefined){
                                	$("#shelfTime_" + dataid).html(shelfTime.split(" ")[0]);
                                }
                            }
                            else{
                                $("#" + mcid).html(falsemsg);
                            }
                            $("#" + mcid).attr("status",currentStatus);
                        } else {
                            swal(result.errorInfo);
                        }
                    })
                }
            });
            setTimeout(function () {
                if ($(":input").hasClass("swal2-input")) {
                    $(".swal2-input").datetimepicker({
                        format: 'YYYY-MM-DD HH:mm',
                        showMeridian: true,
                        minView: 'month',
                        autoclose:true,
                        todayBtn: true,
                        todayHighlight:true
                    });
                }
            }, 0)
        }

    });
    
    
    //优惠券上下架
    $(".ajaxCouponEnableShangjia").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)

        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var status = $(e.target).attr("status");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/couponEnableShangjia.json";
        swal({
            title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'confirmbtn',
            cancelButtonClass: 'canclebtn',
            buttonsStyling: false,
            width:400,
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
            if(result.value){
                $.post(url, {
                    "id" : dataid,
                    "entity" : entity,
                    "enable" : (status =="true"? false: true)
                }, function(result) {
                    if (result.success) {
                        var currentStatus=result.data.enable;
                        if(currentStatus){
                            $("#" + mcid).html(truemsg);
                        }
                        else{
                            $("#" + mcid).html(falsemsg);
                        }
                        $("#" + mcid).attr("status",currentStatus);
                    } else {
                        swal(result.errorInfo);
                    }
                })
            }
        })
    });


    //是否包邮
    $(".ajaxFreeFreight").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)

        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var freeFreight = $(e.target).attr("freeFreight");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/freeFreight.json";
        swal({
            title: '确认要'+(freeFreight =="true" ?falsemsg : truemsg)+'吗?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((result) => {
            if(result.value){
                $.post(url, {
                    "id" : dataid,
                    "entity" : entity,
                    "freeFreight" : (freeFreight =="true"? false: true)
                }, function(result) {
                    if (result.success) {
                        var currentStatus=result.data.freeFreight;
                        if(currentStatus){
                            $("#" + mcid).html(truemsg);
                        }
                        else{
                            $("#" + mcid).html(falsemsg);
                        }
                        $("#" + mcid).attr("freeFreight",currentStatus);
                    } else {
                        swal(result.errorInfo);
                    }
                })
            }
        })
    });

	$(".deletecarouselpic").bind("click", function(e) {
		e.preventDefault(); // 阻止默认的打开事件
		// 注意 $(e.target) == $(this)
		var picnum = $(e.target).attr("picnum");
		var url = "/admin/ajax/del_carousel_pic.json"
		$.post(url, {
			num : picnum
		}, function(result) {
			if (result.success) {
				swal("删除成功")
				$("#pic" + picnum).attr("src", "");
				$("#pictext" + picnum).attr("value", "");
			} else {
				swal(result.errorInfo);
			}
		});

	});

	 $(".form_datetime").datetimepicker({format: 'YYYY-MM-DD HH:mm', showMeridian: true, autoclose:true, todayBtn: true});

	 $(".form_date").datetimepicker({
	    	format: 'YYYY-MM-DD HH:mm',
	    	 showMeridian: true,
	    	  minView: 'month',
	    	  autoclose:true,
	    	  todayBtn: true,
	    	  todayHighlight:true
	 });


	 //点击查看大图
	 $('.pic').bind("click", function(e) {
	 	e.preventDefault(); // 阻止默认的打开事件
		// 注意 $(e.target) == $(this)
		var picurl = $(e.target).attr("data-url");
	 	$('.big_pic').attr('src',picurl);
	 });

	 //商品显示或隐藏
    $(".ajaxDisplay").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)

        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var status = $(e.target).attr("status");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/display.json";
        swal({
            title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((result) => {
            if(result.value){
                $.post(url, {
                    "id" : dataid,
                    "entity" : entity,
                    "displayGood" : (status =="true"? false: true)
                }, function(result) {
                    if (result.success) {
                        var currentStatus=result.data.displayGood;
                        if(currentStatus){
                            $("#" + mcid).html(truemsg);
                        }
                        else{
                            $("#" + mcid).html(falsemsg);
                        }
                        $("#" + mcid).attr("status",currentStatus);
                    } else {
                        swal(result.errorInfo);
                    }
                })
            }
        })
    });
    
    
    
    //评论显示或隐藏
    $(".ajaxCommentDisplay").bind("click", function(e) {
        e.preventDefault(); // 阻止默认的打开事件
        // 注意 $(e.target) == $(this)

        var truemsg=$(e.target).attr("truemsg");
        var falsemsg=$(e.target).attr("falsemsg");

        var mcid = $(e.target).attr("id");// mcid:message_contain_id
        var entity = $(e.target).attr("entity");
        var status = $(e.target).attr("status");
        var dataid = $(e.target).attr("dataid");
        var url = "/admin/ajax/displayComment.json";
        swal({
            title: '确认要'+(status =="true" ?falsemsg : truemsg)+'吗?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then((result) => {
            if(result.value){
                $.post(url, {
                    "id" : dataid,
                    "entity" : entity,
                    "display" : (status =="true"? false: true)
                }, function(result) {
                    if (result.success) {
                        var currentStatus=result.data.displayGood;
                        if(currentStatus){
                            $("#" + mcid).html(truemsg);
                        }
                        else{
                            $("#" + mcid).html(falsemsg);
                        }
                        $("#" + mcid).attr("status",currentStatus);
                    } else {
                        swal(result.errorInfo);
                    }
                })
            }
        })
    });

});
