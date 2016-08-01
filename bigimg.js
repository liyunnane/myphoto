$(function(){
    var bigimg=$('.box li');
    bigimg.on('click',function(){
        $('.mask').addClass('show');
        $('.mask img').attr('src',$(this).find('img').attr('src'));/*给遮罩里面的图片加上地址为当前点解的li标签里面的img的地址*/
        $('.mask').attr('srcid',$(this).index())
    })

    $('.mask img').on('click',function(e){
        e.stopPropagation();
        $('.mask').removeClass('show');/*关闭按钮事件触发以后，将show类名移除，让遮罩消失*/
    });



    $('.mask .rightbtn').on('click',function(){
        var index=parseInt($('.mask').attr('srcid'));
            index+=1;
        if(index===$('#myphoto .box li').length){
            return;
        }
        if(index===-1){
            return;
        }
        // imgs.eq(index).attr('src')
        $('.mask').attr('srcid',index);
        $('.mask img').attr('src',$($('#myphoto .box li')[index]).find('img').attr('src'));
    })





    $('.mask .leftbtn').on('click',function(e){
        var index=parseInt($('.mask').attr('srcid'));
            index-=1;
        if(index===$('#myphoto .box li').length){
            return;
        }
        if(index===-1){
            return;
        }
        // imgs.eq(index).attr('src')
        $('.mask').attr('srcid',index);
        $('.mask img').attr('src',$($('#myphoto .box li')[index]).find('img').attr('src'));
    })

})