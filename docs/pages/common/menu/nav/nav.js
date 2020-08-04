(function(){
    var tpl = '<div class="nav-item $key" data-key=$key data-url=$url><i>$name</i></div>';
    var data = [{key:'menus',name:'点菜',url:'./menus.html'},
                {key:'comments', name:'评价', url:'./comments.html'},
                {key:'business', name:'商家', url:'./business.html'}]
    function MenuNav(container){
        this._init(container);
    }
    MenuNav.prototype={
        contructor:this,
        _init:function(container){
            this.tpl = '';
            this.data = [];
            this.parseTpl = '';
            this.container= container;
        },
        _getTpl: function(){
            return tpl || '';
        },
        _getData: function(){
            return data || [];
        },
        _parseTpl: function(tpl, data){
            var temp = '';
            data.forEach(function(item, index){
                temp += tpl.replace('$name', item.name)
                            .replace('/\$key/g', item.key)
                            .replace('$url', item.url);
            });
            return temp;
        },
        _addEvent:function(){
            $(this.container).on('click', '.nav-item', function(){
                var url = this.getAttribute('data-url');
                window.location = url;
            });
        },
        show: function(){
            this.tpl = this._getTpl();
            this.data = this._getData();
            this.parseTpl =this._parseTpl(this.tpl, this.data);
            $(this.container).append(this.parseTpl);
            this._addEvent();
        }
    }
    window.MenuNav = MenuNav;
}());
var menuNav = new MenuNav('.nav');
menuNav.show();