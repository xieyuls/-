/**
 * Created by Xieyu on 2016/11/9.
 */
<!doctype html>
<html>
<head>
<meta charset="utf-8">
    <title>css3-rotate环形旋转特效网页摘星分享</title>
    <style>
    * {padding:0; margin:0;}
img {border:none;}
li {list-style:none;}
a { text-decoration:none;}
#div1 {width:100px; height:100px; position:absolute; left:60%; top:50%; margin: -200px;}
#div1 img {position: absolute; left: 0; top: 0;}
</style>
<script>
window.onload=function ()
{
    var oDiv=document.getElementById('div1');
    var aImg=oDiv.children;
    for(var i=0; i<aImg.length; i++)
    {
        aImg[i].I=rndNum(-5,5);
        if(aImg[i].I==0)aImg[i].I=1;
        aImg[i]._I=aImg[i].I;
        aImg[i].style.width=100+i*20+'px';
        aImg[i].style.margin=-10*i+'px';
    }
    setInterval(function ()
    {
        for(var i=0; i<aImg.length; i++)
        {
            aImg[i].style.WebkitTransform='rotate('+aImg[i].I+'deg)';
            aImg[i].style.MozTransform='rotate('+aImg[i].I+'deg)';
            aImg[i].style.msTransform='rotate('+aImg[i].I+'deg)';
            aImg[i].I+=aImg[i]._I;
        }
    });
};
function rndNum(m, n)
{
    n++;
    return parseInt(Math.random()*(n-m)+m);
}
</script>
</head>
<body>
<div id="div1">
    <img src="/jscss/demoimg/201404/cycle.png">
    </div>
    <div style="text-align:center;clear:both">
    </div>
    </body>
    </html>