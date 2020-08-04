(function(){
    var tpl = '<div class="menus-type-item"><i class="iconfont icon $styles"></i><span>$name</span></div>';
    function MenusType(container){
        this._init(container);
    }
    MenusType.prototype = {
        constructor: this,
        _init:function(container){
            this.tpl = '';
            this.data = [];
            this.container = container;
        },
        _getTpl: function(){
            return tpl || '';
        },
        _getData: function(){
            var oTypes = [];
            $.ajaxSettings.async = false;
            $.get('./../../../../../mock/food.json', function(result){
                oTypes = result.data.food_spu_tags;
            })
            $.ajaxSettings.async = true;
            return oTypes || [];
        },
        _addEvent: function(callback){
            $(this.container).on('click', '.menus-type-item', function(e){
                var itemData = $(this).data('itemData');
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                callback && callback(itemData);
            });
        },
        _parseTpl:function(tpl, data){
            var typeItem = '';
            data.forEach(function(item, index){
                var temp = tpl;
                if(item.name === '折扣'){
                    temp = temp.replace('$styles', 'discount');
                } else if(item.name === '热销'){
                    temp = temp.replace('$styles', 'hot');
                } else{
                    temp = temp.replace('$styles', 'hidden');
                }
                temp = temp.replace('$name', item.name);
            });
            return typeItem || '';
        },
        _pareseDom: function(tpl, data){
            var _wrapper = document.createElement('div');
            data.forEach(function(item, index){
                var temp = tpl;
                if(item.name === '折扣'){
                    temp = temp.replace('$styles', 'discount');
                } else if(item.name === '热销'){
                    temp = temp.replace('$styles', 'hot');
                } else{
                    temp = temp.replace('$styles', 'hidden');
                }
                temp = temp.replace('$name', item.name);
                var $temp = $(temp);
                $temp.data('itemData', item);
                _wrapper.append($temp.get(0));
            });
            return _wrapper.childNodes || '';
        },
        show: function(){
            this.tpl = this._getTpl();
            this.data = this._getData();
            this.parseTpl = this._pareseDom(this.tpl, this.data);
            $(this.container).append(this.parseTpl);
            this._addEvent();
        }
    }
    window.MenusType = MenusType;
}());
