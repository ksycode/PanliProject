;!function(win){
    "use strict";
    var version = '0.0.5'
    var path = ''; //所在路径，如果非模块加载不用配置
    path = path ? path : document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];

    var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function(s){
        return doc[query](s);
    };



//默认配置
    var config = {
        type: 0,
        shade: true,
        shadeClose: true,
        fixed: true,
        anim: true
    };

    win.ready = {
        extend: function(obj){
            var newobj = JSON.parse(JSON.stringify(config));
            for(var i in obj){
                newobj[i] = obj[i];
            }
            return newobj;
        },
        timer: {},
        end: {}
    };

//点触事件
    ready.touch = function(elem, fn){
        var move;
        elem.addEventListener('touchmove', function(){
            move = true;
        }, false);
        elem.addEventListener('touchend', function(e){
            e.preventDefault();
            move || fn.call(this, e);
            move = false;
        }, false);
    };

    var index = 0, classs = ['layermbox'], Layer = function(options){
        var that = this;
        that.config = ready.extend(options);
        that.view();
    };

    Layer.prototype.view = function(){
        var that = this, config = that.config, layerbox = doc.createElement('div');

        that.id = layerbox.id = classs[0] + index;
        layerbox.setAttribute('class', classs[0] + ' ' + classs[0]+(config.type || 0));
        layerbox.setAttribute('index', index);

        var title = (function(){
            var titype = typeof config.title === 'object';
            return config.title
                ? '<h3 style="'+ (titype ? config.title[1] : '') +'">'+ (titype ? config.title[0] : config.title)  +'</h3><button class="layermend"></button>'
                : '';
        }());

        var button = (function(){
            var btns = (config.btn || []).length, btndom;
            if(btns === 0 || !config.btn){
                return '';
            }
            btndom = '<span type="1">'+ config.btn[0] +'</span>'
            if(btns === 2){
                btndom = '<span type="0">'+ config.btn[1] +'</span>' + btndom;
            }
            return '<div class="layermbtn">'+ btndom + '</div>';
        }());

        if(!config.fixed){
            config.top = config.hasOwnProperty('top') ?  config.top : 100;
            config.style = config.style || '';
            config.style += ' top:'+ ( doc.body.scrollTop + config.top) + 'px';
        }

        if(config.type === 2){
            config.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (config.content||'') + '</div>';
        }

        layerbox.innerHTML = (config.shade ? '<div '+ (typeof config.shade === 'string' ? 'style="'+ config.shade +'"' : '') +' class="laymshade"></div>' : '')
            +'<div class="layermmain" '+ (!config.fixed ? 'style="position:static;"' : '') +'>'
            +'<div class="section">'
            +'<div class="layermchild '+ (config.className ? config.className : '') +' '+ ((!config.type && !config.shade) ? 'layermborder ' : '') + (config.anim ? 'layermanim' : '') +'" ' + ( config.style ? 'style="'+config.style+'"' : '' ) +'>'
            + title
            +'<div class="layermcont">'+ config.content +'</div>'
            + button
            +'</div>'
            +'</div>'
            +'</div>';

        if(!config.type || config.type === 2){
            var dialogs = doc[claname](classs[0] + config.type), dialen = dialogs.length;
            if(dialen >= 1){
                Pan.close(dialogs[0].getAttribute('index'))
            }
        }

        document.body.appendChild(layerbox);
        var elem = that.elem = S('#'+that.id)[0];
        config.success && config.success(elem);

        that.index = index++;
        that.action(config, elem);
    };

    Layer.prototype.action = function(config, elem){
        var that = this;

        //自动关闭
        if(config.time){
            ready.timer[that.index] = setTimeout(function(){
                Pan.close(that.index);
            }, config.time*1000);
        }

        //关闭按钮
        if(config.title){
            var end = elem[claname]('layermend')[0], endfn = function(){
                config.cancel && config.cancel();
                Pan.close(that.index);
            };
            ready.touch(end, endfn);
            end.onclick = endfn;
        }

        //确认取消
        var btn = function(){
            var type = this.getAttribute('type');
            if(type == 0){
                config.no && config.no();
                Pan.close(that.index);
            } else {
                config.yes ? config.yes(that.index) : Pan.close(that.index);
            }
        };
        if(config.btn){
            var btns = elem[claname]('layermbtn')[0].children, btnlen = btns.length;
            for(var ii = 0; ii < btnlen; ii++){
                ready.touch(btns[ii], btn);
                btns[ii].onclick = btn;
            }
        }

        //点遮罩关闭
        if(config.shade && config.shadeClose){
            var shade = elem[claname]('laymshade')[0];
            ready.touch(shade, function(){
                Pan.close(that.index, config.end);
            });
            shade.onclick = function(){
                Pan.close(that.index, config.end);
            };
        }

        config.end && (ready.end[that.index] = config.end);
    };

    var Pan = {
        v: version,
        index: index,
        auth: 'zan',
        //核心方法
        open: function(options){
            var o = new Layer(options || {});
            return o.index;
        },

        close: function(index){
            var ibox = S('#'+classs[0]+index)[0];
            if(!ibox) return;
            ibox.innerHTML = '';
            doc.body.removeChild(ibox);
            clearTimeout(ready.timer[index]);
            delete ready.timer[index];
            typeof ready.end[index] === 'function' && ready.end[index]();
            delete ready.end[index];
        },

        //关闭所有layer层
        closeAll: function(){
            var boxs = doc[claname](classs[0]);
            for(var i = 0, len = boxs.length; i < len; i++){
                Pan.close((boxs[0].getAttribute('index')|0));
            }
        },
        /* 谷歌统计代码 */
        googleCount:function(){
            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");

            loadjscssfile(gaJsHost+'google-analytics.com/ga.js','js');

            try { var pageTracker = _gat._getTracker("UA-436090-1"); pageTracker._trackPageview(); } catch (err) { };

            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-436090-2', 'auto');ga('require', 'displayfeatures');
            ga('send', 'pageview');
        },
        googleCountBall:function () {
            try { var pageTracker = _gat._getTracker("UA-436090-1"); pageTracker._trackPageview(); } catch (err) { };
        },
        /* rem 字体转换  */
        remFontSize:function(){
            var fontsize = function () {
                var W = document.body.getBoundingClientRect().width, defaultW = 720, defaultSize = 40;
                W = W > defaultW ? defaultW : W < 320 ? 320 : W;
                window.W = W; document.documentElement.style.fontSize = (W / defaultW * defaultSize).toFixed(2) + 'px';
            };
            var fontset = setTimeout(fontsize, 300);
            window.addEventListener('resize', function () { clearTimeout(fontset); fontset = setTimeout(fontsize, 300) });
            window.addEventListener("DOMContentLoaded", fontsize);
            setTimeout(fontsize, 300);

        },
    };

    'function' === typeof define ? define(function() {
        return Pan;
    }) : win.PL = Pan;

}(window);


//朕知道了弹框
function alertZhen(){

var str='<div class="alert_content"><div class="pa_content"> <p>您已成功下单。</p><p>待商品状态为“已入库”时，微信将通知您前来<span>填写收货地址</span>，并根据转运公司的称重来<span>来支付国际运费</span>。</p><div class="goodbtn">  <p><a href="javascript:void(0)" class="cal_btn closediy" id="alert">朕知道了</a></p></div></div>'
PL.open({
    type: 1, //1代表页面层
    content: str,
    style: 'width:16.7rem; height:200px; border:none;',
    success: function(oPan){
        var cla = 'getElementsByClassName';
        oPan[cla]('closediy')[0].onclick = function(){
            PL.closeAll()
        }
    }

})
}
