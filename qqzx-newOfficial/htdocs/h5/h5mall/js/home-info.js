$(function () {
    $.ajax({
        url: "js/info.json",
        type: "GET",
        dataType: "json",
        success: (res) => {
            const data = res.data;
            let a=0;
            // 模块1
            let contentTop = '';
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div></div><div class="bottom-line"></div><div class="videoHot"><ul></ul></div><div class="spacer"></div>`;
            $('.mode1').append(contentTop);
            let content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="cover"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a></div><div class="videoInfo"><h4>${data[a].moduleViewInfoList[i].title}</h4><p class="desc">${data[a].moduleViewInfoList[i].titleDesc}</p><p class="price"></p></div></li>`
            }
            $('.videoHot ul').append(content);


            // 模块2
            contentTop = '';
            a++;
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div><div class="more"><a href="${data[a].moduleView.hrefUrl}">查看全部</a></div></div><div class="bottom-line"></div><div class="studyPlan"><ul class="vipul"></ul><div class="spacer"></div>`;
            $('.mode2').append(contentTop);
            content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="cover"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a></div><div class="classInfo"><h4>${data[a].moduleViewInfoList[i].title}</h4><p>${data[a].moduleViewInfoList[i].titleDesc}</p><p class="desc"><span class="desc1">${data[a].moduleViewInfoList[i].desc1}</span><span class="desc2">${data[a].moduleViewInfoList[i].desc2}</span></p></div></li>`
            }
            $('.mode2 .vipul').append(content);

            //模块3
            contentTop = '';
            a++;
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div><div class="more"><a href="${data[a].moduleView.hrefUrl}">查看全部</a></div></div><div class="bottom-line"></div><div class="studyPlan"><ul class="vipul"></ul><div class="spacer"></div>`;
            $('.mode3').append(contentTop);
            content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="cover"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a></div><div class="classInfo"><h4>${data[a].moduleViewInfoList[i].title}</h4><p>${data[a].moduleViewInfoList[i].titleDesc}</p><p class="desc"><span class="desc1">${data[a].moduleViewInfoList[i].desc1}</span><span class="desc2">${data[a].moduleViewInfoList[i].desc2}</span></p></div></li>`
            }
            $('.mode3 .vipul').append(content);

            //模块4
            contentTop = '';
            a++;
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div><div class="more"><a href="${data[a].moduleView.hrefUrl}">查看全部</a></div></div><div class="bottom-line"></div><ul class="recommend"></ul><div class="spacer"></div>`;
            $('.mode4').append(contentTop);
            content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="graphic"><div class="info"><h5>${data[a].moduleViewInfoList[i].title}</h5><p>${data[a].moduleViewInfoList[i].titleDesc}</p></div><div class="coverList"><div class="cover oneover"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a></div></div></div></li>`
            }
            $('.mode4 .recommend').append(content);

            //模块5
            contentTop = '';
            a++;
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div><div class="more"><a href="${data[a].moduleView.hrefUrl}">查看全部</a></div></div><div class="bottom-line"></div><div class="Ebook"><ul></ul></div><div class="spacer"></div>`;
            $('.mode5').append(contentTop);
            content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="EbookSty"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a><p>${data[a].moduleViewInfoList[i].title}</p><span></span></div></li>`
            }
            $('.Ebook ul').append(content);

            //模块6
            contentTop = '';
            a++;
            contentTop += `<div class="headerline"><div class="line"></div><div class="title">${data[a].moduleView.moduleName}</div><div class="more"><a href="${data[a].moduleView.hrefUrl}">查看全部</a></div></div><div class="bottom-line"></div><ul class="recommend"></ul><div class="spacer"></div>`;
            $('.mode6').append(contentTop);
            content='';
            for(let i=0;i<data[a].moduleViewInfoList.length;i++){
                content += `<li><div class="graphic"><div class="info"><h5>${data[a].moduleViewInfoList[i].title}</h5><p>${data[a].moduleViewInfoList[i].titleDesc}</p></div><div class="coverList"><div class="cover oneover"><a href="${data[a].moduleViewInfoList[i].hrefUrl}"><img alt="" class="cover-img" src="${data[a].moduleViewInfoList[i].imageUrl}"></a></div></div></div></li>`
            }
            $('.mode6 .recommend').append(content);


            $('.navFirst li').click(function () {
                $(this).addClass("active");
                $(this).siblings().removeClass("active")
            });

            let nav=$(".navFirst");
            let win=$(window);
            let dc=$(document);
            let distance = nav.offset().top;
            win.scroll(function(){
                if(dc.scrollTop()>=distance){
                    //防止出现抖动
                    $(".recommended").addClass("navbottom");
                    nav.addClass("fixednav");
                }else{
                    $(".recommended").removeClass("navbottom");
                    nav.removeClass("fixednav");
                }
            })
        }
    })

});

// 下方导航栏点击
function navClick(i){
   switch (i) {
       case 0:
           $.ajax({
               url: "js/nav-info1.json",
               type: "GET",
               dataType: "json",
               success: (res) => {
                  const data=res.data;
                  let content = '';
                   for(let i=0;i<data.list.length;i++){
                        content +=`<li><div class="videoClass"><div class="info"><h5>${data.list[i].name}</h5><p></p><div class="priceinfo"><span>5讲/¥0.00</span></div></div><div class="videoCover"><a href="goodsDetail.html?id=${data.list[i].id}"><img src="${data.list[i].picUrl}" class="cover-img" alt=""></a><i class="iconfont icon-play">&#xe66e;</i><span class="people"><span class="iconfont">&#xe633;</span><span class="learning">${data.list[i].listenCountDesc}</span></span></div></div></li>`
                   }
                   $('.recommended ul').html(content)
               }
           });
           break;
       case 1:
           $.ajax({
               url: "js/nav-info2.json",
               type: "GET",
               dataType: "json",
               success: (res) => {
                   const data=res.data;
                   let content = '';
                   for(let i=0;i<data.list.length;i++){
                       content +=`<li><div class="videoClass"><div class="info"><h5>${data.list[i].name}</h5><p></p><div class="priceinfo"><span>5讲/¥0.00</span></div></div><div class="videoCover"><a href="goodsDetail.html?id=${data.list[i].id}"><img src="${data.list[i].picUrl}" class="cover-img" alt=""></a><i class="iconfont icon-play">&#xe66e;</i><span class="people"><span class="iconfont">&#xe633;</span><span class="learning">${data.list[i].listenCountDesc}</span></span></div></div></li>`
                   }
                   $('.recommended ul').html(content)
               }
           });
           break;
   }
}

window.onload = function () {
    navClick(0)
};
