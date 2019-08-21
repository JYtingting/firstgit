let mobileValue, userInfo,phoneType = false
BASEAPI = 'http://wchoosemall.cn'
// BASEAPI = 'http://192.168.0.162'
// 校验手机号
function checkPhone(){
    mobileValue =  document.getElementById('phone').value
    if(!(/^1[34578]\d{9}$/.test(mobileValue))){
        $(".wrong-num").css('display','block')
        phoneType = false
    } else {
        $(".wrong-num").css('display','none')
        phoneType = true
    }
}

// 跳转模态框(phone)
function getPhone() {
    $("#mobile").css('display','block')
    $(".warpper-modal").css({'display':'block'})
}
// 获取用户信息
function getUserInfo() {
    if (phoneType) {
        $("#mobile").css('display','none')
        $("#userInfo").css('display','block')
        const data = {
            mobile: mobileValue
        }
        $.ajax({
            url:BASEAPI+"/doc/api/h5/memberPrecharge/findMemberInfo.json",
            data:data,
            async : false,
            dataType : "json",
            type: "post",
            success: function (res) {
                const data = res.data
                userInfo = data.memberPrechargeVO
                $("#imgId").attr("src",userInfo.avater)
                $("#name").html(userInfo.nickName)
                $("#userId").html("ID：" + userInfo.mid)
                $(".modal").css("display","block")
                $(".outer").css("background",'#ccc')
            },
            fail: function (err) {
                console.log(err)
            }
        })
    }else {
        $(".wrong-num").css('display','block')
    }
}
// 取消
function cancel() {
    $("#mobile").css('display','none')
    $(".warpper-modal").css({'display':'none'})
}
// 取消支付
function cancelPay() {
    back()
    cancel()
}
// 返回上一步
function back() {
    $("#mobile").css('display','block')
    $("#userInfo").css('display','none')
}
// 去支付
function topay() {
    if (browser.versions.wx) {
        const data = {
            mobile: userInfo.mobile,
            payType:2,
            rechargeType: ''
        }
        $.ajax({
            url:BASEAPI+"/doc/api/h5/memberPrecharge/payPrecharge.json",
            data:data,
            async : false,
            dataType : "json",
            type: "post",
            success: function (res) {
                const data = res.data
                const payReturn = data.memberPrechargeVO.weixinBackVO
                if (data.memberPrechargeVO.payType === 2) {
                    wxPay(payReturn)
                }
            },
            fail: function (err) {
                console.log(err)
            }
        })
    } else {
        window.location.href = `${BASEAPI}/doc/wap/prechargeWap.html?mobile=${userInfo.mobile}&rechargeType=20`
    }
}
// 微信支付
function wxPay (data) {
    function callWxPay () {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': data.appId,
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.packageAttach,
                'signType': 'MD5',
                'paySign': data.paySign
            },
            function (res) {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {

                } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    alert(res.err_msg)
                } else {
                    alert('支付失败')
                }
            })
    }
    if (typeof WeixinJSBridge === 'undefined'){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', callWxPay, false)
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', callWxPay)
            document.attachEvent('onWeixinJSBridgeReady', callWxPay)
        }
    }else{
        callWxPay()
    }
}
