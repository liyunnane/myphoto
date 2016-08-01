/*
getClass(classname)用于获取指定类名为classname的标签，具有兼容ie和w3c的兼容性。思路：ie低版本不具有document.getElementsByClassNmae属性，不能通过类名选择元素。因此此处用*选择器将全部的元素选出，再从中挑选类名为指定类名classname的标签。得到的结果是类名为指定类名classname的集合。
getClass1(classname，range)与getClass()函数类似，只不过新加的参数range为选取元素的范围。得到的结果是类名为指定类名classname的集合
getClass2(classname)用于获取类名中只要包括指定类名即可的元素。如<div class='one two'><div>。得到的结果是类名为指定类名classname的集合
$(selecter,range),用于在指定的范围内range获取指定的元素，参数selecter有四种。分别是标签名：div;类名:.one;id:#one;以及函数window.onload=function(){}。
trim(str,type),去除字符串空格的函数，str 是要去除空格的对象，type，是去除的类型。分别是left 去除左边的空格，right：去除右边的空格，side是去除两边的空格，还有all去除字符串中所有的空格
getStyle(obj,attr),获取对象的属性，比如宽高等。思路。w3c中获取对象的属性方法是getComputedStyle(obj,null)[attr];attr是属性。比如宽高等.































*/
//-----getClass函数用于获取固定的类名函数-------------------------
function getClass(classname){
	var arr=[];
	if(document.getElementsByClassName){
		return document.getElementsByClassName(classname);
	}else{
		var all=document.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			if(all[i].className==classname){
               arr.push(all[i]);   
			}
		}
	}
	return arr;
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素到浏览器的距离>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// left=所有具有定位属性的父元素的offsetLeft+所有具有定位属性的父元素的的左边框；
// 1 获取具有定位属性的父元素
// 2 offsetLeft+borderLeftWidth+自身的offsetLeft;
// 3 返回对象（具有两个属性，一个是left,一个是top）
function offset(obj){
     var result={left:0,top:0};
     // arr用于存储他自己本身和具有定位属性的父元素
     var arr=[];
     arr.push(obj)
     var parent=obj.parentNode;
     while(parent.nodeName!='BODY'){
        if(getStyle(parent,'position')=='relative'||getStyle(parent,'position')=='absolute')
         arr.push(parent);
       parent=parent.parentNode;
     }
     for(var i=0;i<arr.length;i++){
      /*
       抛掉自身的边框，以及如果父元素没有边框就让他的边框为0；
      */ 
      var leftWidth=getStyle(arr[i],'borderLeftWidth')?parseInt(getStyle(arr[i],'borderLeftWidth')):0;
      var topWidth=getStyle(arr[i],'borderTopWidth')?parseInt(getStyle(arr[i],'borderTopWidth')):0;
      
      if(i==0){
        leftWidth=0;
        topWidth=0

      }
      result.left+=arr[i].offsetLeft+leftWidth;
      result.top+=arr[i].offsetTop+topWidth;
     }
     return result;
}









//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>给元素的最前面插入一个元素>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// beforeChild(obj,div)     给元素的最前面插入一个元素
// obj 插入的对象
// div 插入的元素
function beforeChild(obj,child){
  var first=firstChild(obj);
  obj.insertBefore(child,first);
}
// <<<<<<<<<<<<<<<<<<<<<任意张图片进行节点轮播封装函数>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*两个参数win是可是窗口，number是轮播的图片*/ 
function seamlessshuffling(win,number){
      var box=$('.box',win)[0]; 
      var tabs=$('.tabs',win)[0];
      var left=$('.tableft',win)[0];
      var right=$('.tabright',win)[0];
      var tupian=$('a',box)[0];
      var iw=parseInt(getStyle(tupian,'width'));
      var flag=0;
      var t=setInterval(movel,1000)
      //从右向左移动
        function movel(){
           animate(box,{left:-iw},function(){
             var first=firstChild(box);
             box.appendChild(first);
             box.style.left=0;
             flag=true;
           })
        }       
         function moveR(){
          var first=firstChild(box);
          var last=lastChild(box);
             box.insertBefore(last,first);
             box.style.left=-iw+'px';
             animate(box,{left:0},function(){flag=true})
        }
        console.log(tabs)
        tabs.style.display='none';
        win.onmouseover=function(){
          clearInterval(t);
            tabs.style.display='block';
        }
        win.onmouseout=function(){
          t=setInterval(movel,1000)
          tabs.style.display='none';
        }
       right.onclick=function(){
           if(flag){
            flag=false;
           moveR();
         }
       }
      left.onclick=function(){
           if(flag){
            flag=false;
           movel();
         }
       }
}
//**************************鼠标滚轮********************************

  /*
    mouseWheel(obj,downFn,upFn)
    给obj添加一个滚轮事件
    让鼠标向下执行 downFn
    向上执行    upFn
  */
  function mouseWheel(obj,downFn,upFn){
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera 
    }else if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollFn,false); //chrome,safari    -webkit
      obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz
    }
    function scrollFn(e){
      var ev=e||window.event;
      if (ev.preventDefault ){
                ev.preventDefault(); //阻止默认浏览器动作(W3C)
            }else{
            ev.returnValue = false
      }
      var direct=ev.detali||ev.wheelDelta;
      if(direct==-120||direct==3){
        downFn.call(obj);
      }
      if(direct==120||direct==-3){
        upFn.call(obj);
      }
    }
  }








/*.........................创建cookie............................................*/ 
function setcookie(obj,value,time){
  if(time){
    var date=new Date();
    date.setDate(date.getDate()+time)
    document.cookie=obj+'='+value+';+expires='+date;
  }else{
    document.cookie=obj+'='+value;
  }  
}
/*.........................删除cookie............................................*/ 
function delcookie(obj){  
 var date=new Date();
 date.setDate(date.getDate()-2);
 document.cookie=obj+'='+'aa;expires='+date;   
}
/*.........................查看cookie............................................*/ 
function lookcookie(obj){  
 var arr=document.cookie.split('; ');
 for(var i=0;i<arr.length;i++){
  arrs=arr[i].split('=');
  if(arrs[0]==obj){
    return arrs[1]
  }
 }   
}





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ajax函数>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*
   ajax({
   url:'1.php',
   type:'get',
   date:{name:'new'},
   asynch:true,
   dataType:'json',
   success:function(data){返回成功后执行函数}
   })


   url        请求的地址
   type       请求的方式get 或者是post   可传可不穿     不传的有默认的形式
   data       要往过带的数据，可传可不传   name=zhangsan&age=18   以字符串的形式传送    ｛'name':'zhangsan','age':'18'｝
   asynch     是否异步
   dataType   返回的数据的过程的形式   text/xml/json
   success    成功后要执行的函数

*/

function ajax(opation){
  var opation=opation||{};//对象初始化
  //是否有请求的地址
  if(!opation.url){
    return;
  }
  //参数初始化
  var type=opation.type?opation.typt:'get';
  var asynch=opation.asynch?opation.asynch:true;
  var dataType=opation.dataType?opation.dataType:'text';
  //数据格式进行初始化
  var data='';
  if(typeof option.data=='string'){
    data=opation.data;
  }else if(opation.data instanceof Object){
    for(var i in opation.data){
      data+=i+'='+opation.data[i]+'&';
    }
    data=data.slice(0,-1);

  }



  //创建ajax对象
  var xml=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHttp')
  //打开url发送请求
  if(type=='get'){
    if(data){
      xml.open('get',opatopn.url+'?'+data,asynch);
      xml.send();
    }else{
      xml.open('get',opatopn.url,asynch);
      xml.send();
    }
      
  }else if(type=='post'){
    xml.setRequestHeader("Content-Type","application/xwww-form-urlencoded");
    xml.open('post',opatopn.url,asynch);
    xml.send(data);
  }
  xml.onreadystatechange=function(){
     if(xml.readyState==4){
      if(xml.status==200){
        if(dataType=='text'){
          opation.success(xml.responseText);
        }else if(dataType=='xml'){
          opation.success(xml.responseXML); 
        }else if(dataType=='json'){
          var obj=eval('('+xml.responseText+')');
          opation.success(obj); 
        }       
      }
     }
  }
}




