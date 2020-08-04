(function(){
    var tpl = 
        '<div class="order-item">' + 
        '<div class="item-top">' +
            '<div class="item-icon">' +
                '<img src="$imgUrl" alt="">' +
            '</div>' +
            '<div class="item-info">' +
                '<div class="info-title">'+
                    '<div class="title-name">' +
                        '$name' +
                    '</div>' +
                    '<div class="title-status">' +
                        '<div>></div>' +
                        '<div>$orderStatus</div>' +
                    '</div>' +
                '</div>'+
                '<div class="info-list">' +
                    '<div class="info-list-wrapper">' +
                        '$infoListItems' + 
                    '</div>' +
                    '<div class="info-list-summary">' +
                        '<div class="list-item-elipse">...</div>' +
                        '<div class="list-item-summary">' +
                            '总计$productCount个菜，实付<span class="price"><i class="iconfont">&#xe6fb;</i>$price</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="item-bottom  clearfix $display">' +
            '<div class="comment-btn">评价</div>' +
        '</div>' +
    '</div>';

    function Order(){
        this.addOrdersScrollEvent();
    }
    Order.prototype = {
        constructor: this,
        _init: function(){},
        _parseTpl: function(tpl, data){
            var temp = '';
            var _this = this;
            data.forEach(function(item, index){
                temp += tpl.replace('$imgUrl', item.poi_pic)
                            .replace('$name', item.poi_name)
                            .replace('$orderStatus', item.status_description)
                            .replace('$infoListItems', _this._getProduct(item.product_list))
                            .replace('$productCount', item.product_count)
                            .replace('$price', item.total)
                            .replace('$display', _this._displayComment(item.is_comment));
            })
            return temp;
        },
        _displayComment: function(display){
            if(display) return 'hidden'; 
            if(!display) return 'show';
        },
        _getData: function(){
            var data = [];
            $.ajaxSettings.async = false;
            $.get('./../../mock/orders.json', function(result){
                console.info(result);
                data = result.data.digestlist || [];
            })
            $.ajaxSettings.async = true;
            return data;
        },
        _getProduct: function(productList){
            var productTpl = '<div class="info-list-item">' +
                                '<div class="list-item-name">' +
                                '$name' +
                                '</div>' +
                            ' <div class="list-item-num">' +
                                    'X$count' +
                                '</div>' +
                            '</div>' ;
            var temp = '';
            productList.forEach(function(item, index){
                temp += productTpl.replace('$name', item.product_name)
                                    .replace('$count', item.product_count);
            });
            return temp;
        },
        _getProductCount: function(productList){
            return productList.length;
        },
        addEvent: function(){
            $('.order-content').on('click', '.order-item', function(){
                console.info('选中了item')
            });
        },
        show: function(){
            $('.loadding').text('加载中')
            setTimeout(() => {
                if(this.isLoadding) return;
                this.isLoadding = true;
                this.tpl = tpl;
                this.data = this._getData();
                this.parseTpl = this._parseTpl(this.tpl, this.data);
                $('.order-wrapper').append(this.parseTpl);
                this.addEvent();
                this.isLoadding = false;
                $('.loadding').text('加载完成');
                
            }, 3000);
            
        },
        addOrdersScrollEvent: function(){
            var _this = this;
            addScrollEvent(function(){
                _this.show();
            });
        }
    }
    window.Order = Order;
}());
new Order().show();