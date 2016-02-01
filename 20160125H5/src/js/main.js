;(function(){

PD(function(){


  PD(".layerBtn").on("click",function(){
    var _t = PD(this),
        _n = _t.data("num");
        PL.open({
           type: 1, //1代表页面层
           content: '<img src="http://img.panlidns.com/CMS/special/456/css/images/'+_n+'.png" alt="">',
           style: 'width:8.5rem;  border:none;background:none;'
       });


  })



})




})();
