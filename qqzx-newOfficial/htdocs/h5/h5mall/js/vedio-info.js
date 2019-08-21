function play(a) {
    if($(".mp4list ul li").eq(a).find(".icon-bofang").length===0){
        alert("您还未解锁该节课哦！")
    }else {
        $(".mp4list ul li").eq(a).find("i").addClass("active");
        $(".mp4list ul li").eq(a).siblings().find("i").removeClass("active");
    }
    $.ajax({
        url: "js/nav-info1.json",
        type: "GET",
        dataType: "json",
        success: (res) => {
            const data = res.data;
            for(let i=0;i<data.list.length;i++){
                if(getQueryString('id') === String(data.list[i].id)) {
                    $("video").attr("src", `${data.list[i].courseAudioVoList[a].url}`);
                }
            }
            // console.log(typeof getQueryString('id'))
        }

    });

    // switch (i) {
    //     case 0:
    //         $("video").attr("src","https://img.mall.xc2018.com.cn/mall/upload/20190625/145019_11_b4tt.mp4");
    //         break;
    //     case 1:
    //         $("video").attr("src","https://img.mall.xc2018.com.cn/mall/upload/20190625/164123_46_c7a1.mp4");
    //         break
}
$(function () {
    $.ajax({
        url: "js/nav-info1.json",
        type: "GET",
        dataType: "json",
        success: (res) => {
            const data = res.data;
            let content='';
            for(let i=0;i<data.list.length;i++){
                if(getQueryString('id') === JSON.stringify(data.list[i].id)) {
                    $('.mp4list .title h6').text(`共${data.list[i].audioCount}节课`);
                    for (let j = 0; j < data.list[i].audioCount; j++) {
                        content += `<li onclick="play(${j})"><span>${data.list[i].courseAudioVoList[j].name}</span> <i class="iconfont icon-bofang active">&#xe62c;</i></li>`
                    }
                }
            }
            $('.mp4list ul').append(content);
            $(".mp4list ul li").eq(getQueryString('index')).onclick=play(parseInt(getQueryString('index')));

        }
    });
});

