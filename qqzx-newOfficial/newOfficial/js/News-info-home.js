function getinfo(type,page,area){
    let info={
        articleType:type,
        page:page
    };

    $.ajax({
        type: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${baseUrl}/doc/api/common/newsArticle/findArticleInformation`,
        data: `data=${JSON.stringify(info)}`,
        success: (res) => {
            const data = res.data;
           if(data.total!==0) {
               let state = 0;
               let firArr = '';
               let secArr = '';
               for (let i = 0; i < data.list.length; i++) {
                   if (state === 0) {
                       firArr += `<div class="news-item-img"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><img src="${data.list[i].picUrls}" width="100%" height="100%" alt="${data.list[i].title}"></a></div><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><div class="news-text-topic">${data.list[i].title}</div></a>`
                   } else if (state > 0 && state <= 3) {
                       secArr += `<div style="display:flex;justify-content:space-between"><div class="news-text-content"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm">${data.list[i].title}</a></div><div class="news-time">${moment(data.list[i].createTime).format('YYYY-MM-DD')}</div></div>`
                   }
                   state++
               }
               $(`.${area}`).append(`${firArr}<div class="news-text-container">${secArr}</div>`);
           }
        }
    })
}



$(function () {
    // 首页新闻配置：
    getinfo(0,1,"news-item1");
    getinfo(1,1,"news-item2");
    getinfo(2,1,"news-item3");

    $('#dynamic-more').click(function () {
        sessionStorage.setItem("type","dynamic")
    });

    $('#media-more').click(function () {
        sessionStorage.setItem("type","media")
    });

    $('#industry-more').click(function () {
        sessionStorage.setItem("type","industry")
    });


});


