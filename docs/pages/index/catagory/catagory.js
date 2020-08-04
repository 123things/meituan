
(function(){
    var tpl = '<div class="catagory-item">' +
                    '<div class="catagory-img-wrapper">' +
                                '<img class="catagory-img" src="$imgUrl" alt="">'+
                                '</div>' +
                                '<span class="catagory-name">$name</span>' +
                                                    '</div>';
    function CatagoryList(){
        this._init();
    }
    CatagoryList.prototype ={
        contructor:this,
        _init:function(){
            this.tpl = this._parseTpl(tpl);
        },
        _parseTpl: function(){
            var parseTpl = '';
            $.ajaxSettings.async = false;
            $.get('../../../mock/head.json', function(result){
                if(result.code !== 0) return;
                var data = result.data.primary_filter || [];
                data.forEach(function(item, index){
                    if(index > 8) return; 
                    parseTpl += tpl.replace('$imgUrl', item.url).replace('$name', item.name);
                });
            })
            $.ajaxSettings.async = true;
            return parseTpl;
        },
        show:function(){
             $('.catagory-wrapper').append(this.tpl);
             //增加事件
             $('.catagory-wrapper').on('click', '.catagory-item', function(ev){
                 var e = ev || window.event;
                 var target = e.target || window.event.srcElement;
                 console.info(target);
             })
        }
    }
    window.CatagoryList = CatagoryList;
}())

;(function(){
    var catagoryList = new CatagoryList();
    catagoryList.show();
}());