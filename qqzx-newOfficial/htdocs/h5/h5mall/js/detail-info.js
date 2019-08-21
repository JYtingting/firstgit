$(function () {
    $.ajax({
        url: "js/nav-info1.json",
        type: "GET",
        dataType: "json",
        success: (res) => {
            const data = res.data;
            let topImg ='';
            let content='';
            let contentImg='';
            let mp4='';
            for(let i=0;i<data.list.length;i++){
                if(getQueryString('id') === String(data.list[i].id)){
                    $('.classInfo i').text(`共${data.list[i].audioCount}节课`);
                    topImg +=`<img src="${JSON.parse(data.list[i].gallery)[0].img}" alt="">`;
                    // content += `<h4>${data.list[i].name}</h4><div class="priceInfo"><span class="price vipFree tag">会员免费</span></div><div class="buyer">${data.list[i].listenCountDesc}</div>`;
                    content += `<h4>${data.list[i].name}</h4><div class="priceInfo"><span class="price vipFree tag">会员免费</span></div><div class="share"><i class="iconfont">&#xe624;</i><span> 分享</span></div><div class="buyer">${data.list[i].listenCountDesc}</div>`
                    contentImg +=`${data.list[i].detail}`;
                    for(let j=0;j<data.list[i].audioCount;j++){
                        mp4 += `<li><a href="vedioPage.html?index=${j}&id=${data.list[i].id}"><div class="left"><h6>${data.list[i].courseAudioVoList[j].name}</h6><div class="time"><span>时长:${data.list[i].courseAudioVoList[j].durationDesc}</span></div></div><div class="right iconfont">试看</div></a></li>`
                    }
                }
            }
            $('.detialTop').append(topImg);
            $('.goodsInfo').append(content);
            $('.container').append(contentImg);
            $('.classInfo ul').append(mp4);


            $('.share').click(function () {
                $('#share').css("display","block")
            })
            $('#share').click(function () {
                $('#share').css("display","none")
            })

        }
    });
});

