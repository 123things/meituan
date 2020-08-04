(function(){
var tpl = 
'<div class="business-item">' +
'<div class="content-icon">' +
    '<img src="$imgUrl" alt="">'+
'</div>'+
 '<div class="content-desc">'+
      '<div class="desc-title">$name</div>' +
      '<div class="desc-sale-info clearfix">' +
          '<div class="sale-info-left">' +
            '<div class="star">' +
                '$star'+
            '</div>' +
            '<div class="month-sale-num">月售$monthSale</div>' +
          '</div>' +
          '<div class="sale-info-right">'+
              '<div class="deliver-time">$deliverTime</div>'+
              '<div class="deliver-distance">$deliverDistance</div>'+
          '</div>'+
       '</div>'+
       '<div class="desc-send-off-start-price">' +
            '$sendOffPrice'+
       '</div>' +
       '<div class="desc-activity">'+
           '$activity' +
       '</div>' +
    '</div>' +
'</div>';
 
function BusinessList(){
    this._init();
    
}
BusinessList.prototype = {
    contructor: this,
    _init: function(){
        this.data = this._getData();
        this.tpl = tpl;
        this.parseTpl = this._parseTpl(this.tpl, this.data);
        this.isLoadding = false;
        this.page = 0;
    },
    _getData:function(){
        var data = [];
        $.ajaxSettings.async = false;
        $.get('../../../mock/homelist.json', function(result){
             data = result.data.poilist || [];
        });
        $.ajaxSettings.async = true;
        this.page ++;
        return data;
    },
    _parseTpl:function(tpl, data){
        var temp = '';
        var _this = this;
        data.forEach(function(item, index){
            temp += tpl.replace('$imgUrl', item.pic_url)
                        .replace('$name', item.name)
                        .replace('$star', _this._getStar(item.wm_poi_score))
                        .replace('$monthSale', _this._getMonthSaleNum(item.month_sale_num))
                        .replace('$deliverTime', item.mt_delivery_time)
                        .replace('$deliverDistance', item.distance)
                        .replace('$sendOffPrice', item.min_price_tip)
                        .replace('$activity', _this._getActivity(item.discounts2));
        });
        return temp;
    },
    _getActivity: function(activityList){
        var temp = '';
        var activityTpl = '<div class="activity-item"><img src=$imgUrl/><span>$activityDesc<span></div>';
        activityList.forEach(function(item, index){
            temp += activityTpl
                            .replace('$imgUrl', item.icon_url)
                            .replace('$activityDesc', item.info);
        })
        return temp;
    },
    _getMonthSaleNum: function(monthSaleNum){
        if(monthSaleNum > 999){
            return '999+'
        } 
        return monthSaleNum;
    },
    _getStar: function(store){
        if(!(/^[1-9](\.[1-9]){0,1}$/g.test(store+''))) return;
        var starTpl = '<i class="iconfont star-item star-$num">&#xe62b;</i>';
        var aStore = (store+'').split('.');
        var full = aStore[0];
        var half = aStore[1] ? 1 : 0;
        var empty = 5 - full -half;
        var temp = '';
        for(var i=0; i<full; i++){
            temp += starTpl.replace('$num', '10');
        }
        if(half==1) temp += starTpl.replace('$num', aStore[1]);
        for(var j=0; j<empty; j++){
            temp += starTpl.replace('$num', empty);   
        }
        return temp;
    },
    _addEvent: function(){
        $('.business-wrapper').on('click', '.business-item', function(e){
            console.info('单击了.business-item');
        });
        var _this = this;
        this._addScrollEvent(function(){
            if(_this.isLoadding){ return;}
            if(_this.page > 3) return;
            $('.isLoadding').text('加载中')
            _this.isLoadding = true;
            _this.data = _this._getData();
            _this.parseTpl = _this._parseTpl(_this.tpl, _this.data);
            _this.show();  
            $('.isLoadding').text('加载完成');
            _this.isLoadding = false; 
        });
    },
    _addScrollEvent: function(callback){
        var _this = this;
        window.addEventListener('scroll', function(){
            console.info('scorll')
            var clientHeight = document.documentElement.clientHeight;
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var proDis = 30;
            if((clientHeight + scrollTop) >= (scrollHeight-proDis)){
                callback && callback();
            }
        })
    },
    show: function(){
        $('.business-wrapper').append(this.parseTpl);
        this._addEvent();
    }
}
window.BusinessList = BusinessList;
}());

var businessList = new BusinessList();
businessList.show();