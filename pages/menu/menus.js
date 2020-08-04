(function(){
    var menusType = new MenusType('.menus-type-wrapper');
    var MENUS = menusType._getData();
    menusType.show();
    var menusContent = new MenusContent('.menus-content-wrapper');
    menusType._addEvent(function(data){
        menusContent.refresh(data);
    })
    $($('.menus-type-wrapper').children()[0]).trigger('click');

    console.info(MENUS);
}());