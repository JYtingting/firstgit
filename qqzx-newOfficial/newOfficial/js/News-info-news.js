let articleType = 0;
window.onload = function () {

    if(getQueryString('type')==='dynamic'){
       navClick(0);
    }
    if(getQueryString('type')==='media'){
       navClick(1);
    }
    if(getQueryString('type')==='industry'){
       navClick(2);
    }
    if(window.location.href.indexOf('type') === -1){
       navClick(0);
    }

};


function information(articleType,page){
    let data = {
        articleType:articleType,
        page:page
    };
    getData(data, 0)
}

function getData(data,type){
    $.ajax({
        type: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${baseUrl}/doc/api/common/newsArticle/findArticleInformation`,
        data: `data=${JSON.stringify(data)}`,
        success: (res) => {
            const data = res.data;
            // console.log(res.data.total)
            let content = '';
            if(res.data.total===0){
               let content =''
            }else {
                for (let i = 0; i < data.list.length; i++) {
                    if (content === '') {
                        content = `<div class="news-content"><div class="news-content-img"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><img src="${data.list[0].picUrls}" width="100%" height="100%" alt="${data.list[i].title}"></a></div><div class="news-content-aside"><div class="news-content-text"><div class="news-content-topic"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><h1>${data.list[i].title}</h1></a></div><div class="news-content-brief">${data.list[i].description}</div></div><div class="news-content-bottom"><div class="news-content-time">${moment(data.list[i].createTime).format('YYYY-MM-DD')}</div><div class="news-content-heat">热度：<span style="color: #0e9aef">${data.list[i].clickNum}</span></div></div></div></div>`
                    } else {
                        content += `<div class="line"></div><div class="news-content"><div class="news-content-img"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><img src="${data.list[i].picUrls}" width="100%" height="100%" alt="${data.list[i].title}"></a></div><div class="news-content-aside"><div class="news-content-text"><div class="news-content-topic"><a href="${baseUrl}/doc/news-${data.list[i].id}.htm"><h1>${data.list[i].title}</h1></a></div><div class="news-content-brief">${data.list[i].description}</div></div><div class="news-content-bottom"><div class="news-content-time">${moment(data.list[i].createTime).format('YYYY-MM-DD')}</div><div class="news-content-heat">热度：<span style="color: #0e9aef">${data.list[i].clickNum}</span></div></div></div></div>`
                    }
                }
            }
            $('.news-content-container').html(content);
            if (type === 0) {
                new Page({
                    id: 'pagination',
                    pageTotal: (data.total/5)>=1?Math.ceil(data.total/5):1, //必填,总页数
                    pageAmount: 5,  //每页多少条
                    dataTotal: data.total||0, //总共多少条数据
                    curPage:1, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag:true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag:true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                        let data = {
                            articleType:articleType,
                            page:page
                        };
                        // 再执行一次函数，只是这次type不为0所以只执行到if(type === 0)上面部分，即只插入数据(递归)
                        getData(data,1)
                    }
                });
            }
        }
    })
}
$(function () {
const orderId = {
        order : "id"
    };
    const orderHot = {
        order : "clickNum"
    };
    // 资讯页最新文章推荐
$.ajax({
        type: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${baseUrl}/doc/api/common/newsArticle/searchArticleList`,
        data: `data=${JSON.stringify(orderId)}`,
        success: (res) => {
            const data = res.data;
            let rec1 = '';
            for(let i=0; i<data.list.length; i++){
                rec1 += `<div><a href="${baseUrl}/doc/news-${data.list[i].id}.htm">${data.list[i].title}</a></div>`
            }
            $('.new-rec-container').append(rec1);
        }
});

    // 资讯页最热文章推荐
$.ajax({
        type: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${baseUrl}/doc/api/common/newsArticle/searchArticleList`,
        data: `data=${JSON.stringify(orderHot)}`,
        success: (res) => {
            const data = res.data;
            let rec1 = '';
            for(let i=0; i<data.list.length; i++){
                rec1 += `<div><a href="${baseUrl}/doc/news-${data.list[i].id}.htm">${data.list[i].title}</a></div>`
            }
            $('.hot-rec-container').append(rec1);
        }
});
});

function navClick(type) {
    $(".top-guide-name").text($(".news-nav-text").eq(type).text());
    $(".news-nav-text").eq(type).addClass("news-nav-text-choose");
    $(".news-nav-text").eq(type).siblings().removeClass("news-nav-text-choose");
    information(type,1);
    articleType = type;
}


