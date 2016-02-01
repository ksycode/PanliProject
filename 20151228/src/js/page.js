
(function($){
 var ms = {
   init:function(obj,args){
     return (function(){
       ms.fillHtml(obj,args);
       ms.bindEvent(obj,args);
     })();
   },
   //填充html
   fillHtml:function(obj,args){
     return (function(){
       obj.empty();
       //上一页sdf
       if(args.current > 1){
         obj.append('<a href="http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page='+(parseInt(args.current)-1)+'" class="prevPage" style="width:55px;">上一页</a>');
       }else{
         obj.remove('.prevPage');
         obj.append('<span class="disabled"></span>');
       }
       //中间页码
       if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
         obj.append('<a href="http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page=1" class="tcdNumber">'+1+'</a>');
       }
       if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
         obj.append('<span>...</span>');
       }
       var start = args.current -2,end = args.current+2;
       if((start > 1 && args.current < 4)||args.current == 1){
         end++;
       }
       if(args.current > args.pageCount-4 && args.current >= args.pageCount){
         start--;
       }
       for (;start <= end; start++) {
         if(start <= args.pageCount && start >= 1){
           if(start != args.current){

             obj.append('<a href="http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page='+start+'" class="tcdNumber">'+ start +'</a>');
           }else{
             obj.append('<span class="current">'+ start +'</span>');
           }
         }
       }
       if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
         obj.append('<span>...</span>');
       }
       if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
         obj.append('<a href="http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page='+args.pageCount+'" class="tcdNumber">'+args.pageCount+'</a>');
       }



       var inputT = '<input id="goPageText" type="text" name="name" onkeyup="control(event,this)"   class="txtclass" value="">';
       //下一页
       if(args.current < args.pageCount){
        var num=args.current-0+1; 
         obj.append('<a href="http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page='+num+'" class="nextPage" style="width:55px;">下一页</a> 到第 '+ inputT +' 页 <a href="javascript:void(0)"   class="btn" id="btnPage"> Go</a>');
       }else{

         obj.remove('.nextPage');
         obj.append('到第 '+ inputT +' 页<a href="javascript:void(0)"   class="btn" id="btnPage"> Go</a>');

       }
     })();
   },
   //绑定事件sdsasd
   bindEvent:function(obj,args){
     return (function(){
       obj.on("click","a.tcdNumber",function(){
         var current = parseInt($(this).text());
         ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
         if(typeof(args.backFn)=="function"){
        //   window.location.href='http://www.panli.com/Special/Topic.aspx?id=365&page='+current;
           //args.backFn(current);
         }
       });
       //go Page
       obj.on("click","#btnPage",function(){
         var current = parseInt($('#goPageText').val());
          if(!current || current > args.pageCount  || current < 1 ){
            $('#goPageText').val('')
           return false;
         }

           ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});



           if(typeof(args.backFn)=="function"){
             window.location.href='http://www.panli.com/Special/Topic.aspx?id='+args.id+'&page='+current;
           }
       });
       //上一页
       obj.on("click","a.prevPage",function(){
         var current = parseInt(obj.children("span.current").text());
         ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
         if(typeof(args.backFn)=="function"){
           $(this).attr("src","asd="+current-1)
           // args.backFn(current-1);
         }
       });
       //下一页
       obj.on("click","a.nextPage",function(){
         var current = parseInt(obj.children("span.current").text());
         ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
         if(typeof(args.backFn)=="function"){
           args.backFn(current+1);
         }
       });
     })();
   }
 }
 $.fn.createPage = function(options,id){

   var args = $.extend({
     pageCount : 10,
     current : 3,
     id:3,
     backFn : function(){}
   },options);
   ms.init(this,args);
 }
})(jQuery);
