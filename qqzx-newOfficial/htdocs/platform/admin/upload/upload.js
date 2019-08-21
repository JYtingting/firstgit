$.extend({
	myExeclAjaxUplad:function(url,target,name,jsonData,buttonName,msgName){
		if(!buttonName){
			buttonName='上传';
		}
		if(!msgName){
			msgName='您确认是否要上传';
		}
		var dom=
	    	'<label class="col-sm-2 col-md-2 control-label">'+name+'</label>'+
	    	'<div class="col-sm-3">'+
	    		'<input id="file" name="file" type="file"/>'+
	    	'</div>'+
	    	'<div class="col-sm-1">'+
	    		'<button type="button" id="submit" class="btn btn-primary">'+buttonName+'</button>'+
	    	'</div>'+
			'<div style="color:red;" class="col-sm-2" data-info >'+
			'</div>';
		$(target).html(dom);
		
		$("#submit").click(function(){
			var data_info= $(this).parent().next();				
			var filePath = $("#file").val();
			 if (filePath == "") {
		        data_info.html("请选择xls或者xlsx的文件");
		        return;
		    }
			 // 判断上传文件的后缀名
		    var strExtension = filePath.substr(filePath.lastIndexOf('.') + 1);
		    if (strExtension != 'xls' && strExtension != 'xlsx') {
		       data_info.html("请选择xls或者xlsx的文件");
		        return;
		    }
		    var r=confirm(msgName);
		    if(r==false){
		    	return ;
		    }
		    
			var formdata = new FormData(); 
			if(!jsonData){
				
				
			}else{
				for(var data in jsonData){
					if( typeof(jsonData[data])!= "function"){
						formdata.append(data,jsonData[data]);
					}
				}
			}
			
			formdata.append('file',$("#file").get(0).files[0]);
			$.ajax({
		        type: "POST",
		        url: url,
		        data: formdata,
				async: false,  
				cache: false,
				timeout:5000,
				contentType: false,
				processData: false,  
		        success: function(data) {
					if(data.success){
						if(data.data=="[]"){
							data_info.html("上传成功");
							history.go(0);// 刷新页面
						}else{
							data_info.html("序号-"+data.data+"--的上传出错");
						}
					}else{
						data_info.html(data.errorInfo);
					}
		        },
		        error: function() {
		            swalr("上传失败，请检查网络后重试");
		        }
		    });
		});
	}
})
