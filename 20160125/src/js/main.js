$(window).scroll(function () {
   var scrollTop = $(window).scrollTop();
   $('.fudo')[scrollTop > 400 ? 'show' : 'hide']();

});

$(function(){
  $(".fudo a").on("click",function(){
            var _t = $(this),
                _tf = _t.attr("floor");
            var _afloTop = $("#floor-"+_tf).offset().top;
             $('body,html').animate({ scrollTop: _afloTop }, 300);
  });
  $(".top3").on("click",function(){
             $('body,html').animate({ scrollTop: 0 }, 300);
  });

  $(".liaojie_mian").on("click",function(){
           var _t = $(this),
             _src = _t.attr("data-src");
        var html =  $(".layer-html-"+_src).html();
             PL.open({
               type: 1,
               title: false,
               closeBtn: false,
               area: ['960px', '557px'],
               shadeClose: true,
               skin: 'layui-Pan-nobg', //没有背景色
               content: html
           });
  });
 
  $(".liaojie_jian").on("click",function(){
           var _t = $(this),
             _src = _t.attr("data-src");
        var html =  $(".layer-html-"+_src).html();
             PL.open({
               type: 1,
               title: false,
               closeBtn: false,
               area: ['960px', '557px'],
               shadeClose: true,
               skin: 'layui-Pan-nobg', //没有背景色
               content: html
           });
  });

  $(".liaojie_bi").on("click",function(){
           var _t = $(this),
             _src = _t.attr("data-src");
        var html =  $(".layer-html-"+_src).html();
             PL.open({
               type: 1,
               title: false,
               closeBtn: false,
               area: ['960px', '697px'],
               shadeClose: true,
               skin: 'layui-Pan-nobg', //没有背景色
               content: html
           });
  });


  $("body").on("click",".close-layer",function(){
    PL.closeAll();
  })

})
//
