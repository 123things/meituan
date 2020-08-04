(function(){
    var tpl = 
    '<div class="footer-item" data-key="$key" data-url=$url>' +
        '<i class="iconfont">$unicode</i>' +
        '<span>$name</span>' +
    '</div>';
    var data = [
        {
            'key' : 'index',
            'name': '首页',
            'unicode' : '&#xe613;',
            'url': 'index/index.html'
        },
        {
            'key' : 'order',
            'name': '订单',
            'unicode' : '&#xe61a;',
            'url': 'order/order.html'
        },
        {
            'key' : 'my',
            'name': '我的',
            'unicode' : '&#xe638;',
            'url': 'my/my.html'
        }
    ]
    function Footer(){
        this._init();
    }
    Footer.prototype = {
        contructor : this,
        _init:function(){
            this.tpl = this._paresTpl(tpl,data);
        },
        _paresTpl: function(tpl,data){
            var temp = '';
            data.forEach(function(item, index){
                temp += tpl.replace('$key', item.key)
                            .replace('$name', item.name)
                            .replace('$unicode', item.unicode)
                            .replace('$url', item.url);
            });
            return temp;
        },
        _parseDom:function(str){
            var dom = document.createAttribute('div');
            dom.innerHTML = str;
            return dom.childNodes ;
        },
        getTpl: function(){
            return this.tpl || '';
        },
        addEvent:function(){
            $('.footer').on('click', '.footer-item', function(ev){
                // var e = ev || window.event;
                // var target = e.target || window.event.srcElement;
                var url = this.getAttribute('data-url');
                window.location = "../" + url;
            })
        },
        show: function(){
            $('.container').append('<div class="footer">'+this.tpl + '</div>');
            this.addEvent();
            console.info(window.location.pathname);
            var oPath  = window.location.pathname.split('/');
            var key = oPath[oPath.length-1].split('.')[0];
            $('.footer-item[data-key='+ key+ ']').addClass('active');
        }
    }
    window.Footer = Footer;
}());

new Footer().show();