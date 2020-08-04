(function(){
    var menusTpl = '<div class="content-title">' +
                        '<p>$name</p>' +  
                    '</div>' + 
                    '<div class="content-item-wrapper">' + 
                    '</div>';
    var tpl = 
    '<div class="content-item">' + 
        '<div class="content-item-img">' +
            '<img src="$itemImg" alt="">' +
        '</div>' +
        '<div class="content-item-info">' +
            '<p class="name">$infoName</p>' +
            '<p class="desc">$infoDesc</p>' +
            '<p class="zan">$infoZan</p>' +
            '<p class="price"><i class="price-num">¥$priceNum</i>/$priceUnit </p>' +
        '</div>' +
        '<div class="select-area">' +
            '<div class="minus">-</div>' +
            '<div class="num">$chooseCount</div>' +
            '<div class="plus">+</div>' +
        '</div>' +
    '</div>';
    function MenusContent(container){
        this._init(container);
    }
    MenusContent.prototype = {
        contructor: this,
        _init: function(container){
            this.tpl = '';
            this.data = {};
            this.parseTpl = '';
            this.container = container;
        },
        _getTpl: function(){
            return menusTpl || '';
        },
        _getData: function(){
            return  data || [];
        },
        _parseTpl: function(tpl, data){
            
            return  tpl.replace('$name', data.name);
        },
        _getContentItem: function(data){
            var menusContentTpl = tpl;
            data = data || [];
            var _temp = '';
            data.forEach(function(item, index){
                if(!item.chooseCount){ item.chooseCount =0}
                _temp += 
                menusContentTpl.replace('$itemImg', item.picture)
                    .replace('$infoName', item.name)
                    .replace('$infoDesc', item.description)
                    .replace('$infoZan', item.praise_content)
                    .replace('$priceNum', item.min_price)
                    .replace('$priceUnit', item.unit)
                    .replace('$chooseCount', item.chooseCount);
            });
            return _temp;
        },
        _getContentItemDom: function(data){
            var menusContentTpl = tpl;
            data = data || [];
            var div = document.createElement('div');
            data.forEach(function(item, index){
                if(!item.chooseCount){ item.chooseCount = 0}
                var menu =  
                menusContentTpl.replace('$itemImg', item.picture)
                    .replace('$infoName', item.name)
                    .replace('$infoDesc', item.description)
                    .replace('$infoZan', item.praise_content)
                    .replace('$priceNum', item.min_price)
                    .replace('$priceUnit', item.unit)
                    .replace('$chooseCount', item.chooseCount);
                    var $menu = $(menu);
                    $menu.data('itemData', item);
                    div.append($menu.get(0));
                });
                return div.childNodes || '';
        },
        show: function(data){
            this.tpl = this._getTpl();
            this.data = data || {};
            this.parseTpl = this._parseTpl(this.tpl, this.data);
            this.container = this.container || 'body';
            $(this.container).html('');
            $(this.container).append(this.parseTpl);
            $('.content-item-wrapper').append(this._getContentItemDom(data.spus));
            this._addEvent();
        },
        _addEvent: function(){
            //-
            $('.select-area').on('click', '.minus', function(){
                var $count = $(this).parent().find('.num');
                if($count.text() === '0' ) return;
                var chooseCount = parseInt($count.text() || '0') -1;
                $count.text(chooseCount);
                var itemData = $count.parent().parent().data('itemData');
                if(!itemData.chooseCount){ itemData.chooseCount = '0'} else { itemData.chooseCount = chooseCount;}
                console.info(itemData);
            });
            //+ 
            $('.select-area').on('click', '.plus', function(){
                var $count = $(this).parent().find('.num');
                var chooseCount = parseInt($count.text() || '0') + 1;
                $count.text(chooseCount);
                var itemData = $count.parent().parent().data('itemData');
                if(!itemData.chooseCount){ itemData.chooseCount = '1'} else { itemData.chooseCount = chooseCount;}
                console.info(itemData);
            });
        },
        refresh: function(data){
            this.show(data);
        }
    }
    window.MenusContent = MenusContent;
}());
