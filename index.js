$(function(){
    function lunbo(win,number){
        var box=$('.box')[0];
        var bigimgs=$('li',box);
        var imgbox=$('ul',win)[0];
        var imgs=$('li',imgbox);
        var btnl=$('.left',win)[0];
        var btnr=$('.right',win)[0];
        var widths=273;
        function moveL(){
            animate(imgbox,{left:-widths*number},function(){
                for(var i=0;i<number;i++){
                    var first=firstChild(imgbox);
                    imgbox.appendChild(first);
                    imgbox.style.left=0;
                }
            });
        }
        function moveR(){
            for(var i=0;i<number;i++){
                var first=firstChild(imgbox);
                var last=lastChild(imgbox);
                imgbox.insertBefore(last,first);
            }
            imgbox.style.left=-widths*number+'px';
            animate(imgbox,{left:0});
        }
        btnr.onclick=function(){
            moveL();
        }
        btnl.onclick=function(){
            moveR();
        }
        for(var i=0;i<imgs.length;i++){
            imgs[i].index=i;
            imgs[i].onclick=function(){
                for(var j=0;j<imgs.length;j++){
                    imgs[j].id='';
                    bigimgs[j].className='';
                }
                this.id='active';
                bigimgs[this.index].className='active';
            }
        }
    }
//------------------------getClass1函数用于在固定范围内获取固定类名的元素
    function getClass1(classname,range){
        var arr=[];
        range=range?range:document;
        if(document.getElementsByClassName){
            return range.getElementsByClassName(classname);
        }else{
            var all=range.getElementsByTagName('*');
            for(var i=0;i<all.length;i++){
                if(all[i].className==classname){
                    arr.push(all[i]);
                }
            }
        }
        return arr;
    }
//getClass2函数获取类名中只要包括指定类名即可的元素。如<div class='one two'><div>
    function getClass2(classname){
        var arr=[];
        if(document.getElementByClassName){
            return document.getElementByClassName(classname);
        }else{
            var all=document.getElementsByTagName('*')
            for(var i=0;i<all.length;i++){
                if(check(all[i].className,classname)){
                    arr.push(all[i]);
                }
            }
        }
        return arr;
    }
    function check(aa,bb){
        var brr=aa.split(' ');
        for(var i=0;i<brr.length;i++){
            if(brr[i]==bb){
                return true;
            }else{
                return false;
            }
        }
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>$函数用于选择元素>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//简易的函数。使上面的函数调用更方便。
    function $(selecter,range){
        if(typeof selecter=='string'){
            var selecter=trim(selecter);
            var range=range?range:document;
            if(selecter.charAt(0)=='.'){
                return getClass1(selecter.slice(1),range)
            }else if(selecter.charAt(0)=='#'){
                return document.getElementById(selecter.slice(1))
            }else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
                return range.getElementsByTagName(selecter)
            }else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selecter)){
                return document.createElement(selecter.slice(1,-1))
            }
        }else if(typeof selecter=='function'){
            addEvent(window,'load',selecter)
        }
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>trim(str,type)去除字符串空格的函数>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//type
    //left   去除左边的空格
    //right  去除右边的空格
    //all  去除所有的空格
    //side 去除两边的空格
    function trim(str,type){
        var type=type?type:'side';
        if(type=='left'){
            var reg=/^\s*/;
            return   str.replace(reg,'');
        }else if(type=='right'){
            var reg=/\s*$/;
            return   str.replace(reg,'');
        }else if(type=='all'){
            var reg=/\s/g;
            return   str.replace(reg,'');
        }else if(type=='side'){
            var reg=/^\s*|\s*$/g;
            return   str.replace(reg,'');
        }
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>getStyle(obj,attr)获取对象的属性，宽高等>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//getStyle用于获取对象obj的属性
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,null)[attr];
        }
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/用于获取一个节点的下一个节点>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 如果有下一个兄弟节点，就返回该节点的下一个兄弟节点，如果没有，就返回false
// obj 是指定的对象
// type  true 忽略文本(默认)     false 不忽略文本
// type=type==undefined?true:type;
    function getNext(obj,type){
        var next=obj.nextSibling;
        if(type==true){
            if(next==null){
                return false;
            }
            while(next.nodeType!=1){
                next=next.nextSibling;
                if(next==null){
                    return false;
                }
                return next;
            }
        } else if(type==false){
            if(next==null){
                return false;
            }
            while((next.nodeType=3&&/^\s+$/.test(next.nodeValue))||next.nodeType==8){
                next=next.nextSibling;
                if(next==null){
                    return false;
                }
            }
            return next;
        }
    }
// 《《《《《《《《《《《《《《《《《《获取一个节点的上一个兄弟元素》》》》》》》》》》》》》》》》》》》
    function getPrevious(obj,type){
        var previous=obj.previousSibling;
        if(type==true){
            if(previous==null){
                return false;
            }
            while(previous.nodeType!=1){
                previous=previous.previousSibling;
                if(previous==null){
                    return false;
                }
                return previous;
            }
        } else if(type==false){
            if(previous==null){
                return false;
            }
            while((previous.nodeType=3&&/^\s+$/.test(previous.nodeValue))||previous.nodeType==8){
                previous=previous.previousSibling;
                if(previous==null){
                    return false;
                }
            }
            return prev;
        }
    }
//insertAfter()用于在一个节点之后插进去一个节点。
//newobj要插进去的节点，obj在谁后面插，type，两种插的方法，true，忽略文本，false，在文本前面插
// 思路
    function insertAfter(newobj,obj,type){
        var parent=obj.parentNode;
        var type=type?type:false;
        var pos=getNext(obj,type);
        if(!pos){
            parent.appendChild(newobj);
        }else{
            pos.insertBefore(newobj);
        }
    }
//《《《《《《《《《《《《《《《getChilds用以获取节点中标签子元素》》》》》》》》》》》》》》》》》》》》
    function getChilds(obj){
        var arr=obj.childNodes;
        var brr=[];
        for(var i=0;i<arr.length;i++){
            if(arr[i].nodeType==1){
                brr.push(arr[i]);
            }
        }
        return brr;
    }
//《《《《《《《《《《《《getChild()用以获取有效的子元素或者是标签元素，以type来区分》》》》》》》》》》》》》》》》》
    function getChild(obj,type){
        var type=type?type:false;
        var arr=obj.childNodes;
        var brr=[];
        if(type==true){
            for(var i=0;i<arr.length;i++){
                if(arr[i].nodeType==1||(arr[i].nodeType==3 && !(/^\s+$/.test(arr[i].nodeValue)))){
                    brr.push(arr[i]);
                }
            }
            return brr;
        }else if(type==false){
            for(var i=0;i<arr.length;i++){
                if(arr[i].nodeType==1){
                    brr.push(arr[i]);
                }
            }
            return brr
        }
    }
//《《《《《《《《《《《《《《《用于获取节点的第一个子元素》》》》》》》》》》》》》》
    function firstChild(obj){
        return getChilds(obj)[0];
    }
//《《《《《《《《《《《《《《用于获取最后一个子元素》》》》》》》》》》》》》
    function lastChild(obj){
        var length=getChilds(obj).length;
        return getChilds(obj)[length-1];
    }
//《《《《《《《《《《《《《《《《《用于获取第num个子元素》》》》》》》》》》》》》》》》》》》
    function lastChilds(obj,num){
        var length=getChilds(obj).length;
        if(num>=length){
            return 'error';
        }
        return getChilds(obj)[num];
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//给对象添加事件>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function addEvent(obj,type,fn){
        if(obj.attachEvent){
            obi.attachEvent('on'+type,fn);
        }else{
            obj.addEventListener(type,fn,false);
        }
    }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>删除对象的事件>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function removeEvent(obj,type,fn){
        if(obj.attachEvent){
            obi.detachEvent('on'+type,fn);
        }else{
            obj.removeEventListener(type,fn,false);
        }
    }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>给元素的最前面插入一个元素>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// beforeChild(obj,div)     给元素的最前面插入一个元素
// obj 插入的对象
// div 插入的元素
    function beforeChild(obj,child){
        var first=firstChild(obj);
        obj.insertBefore(child,first);
    }






    var zhishi=$('.zhishi')[0];
    lunbo(zhishi,1)


})