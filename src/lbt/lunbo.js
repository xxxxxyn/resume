var box = document.getElementById("box");
var inner = document.getElementById("inner");
var imgWidth = inner.offsetWidth;//内容的宽也就是图片的宽
var ul = inner.children[0];
var imgList = ul.children;
var ol = inner.children[1];

var pic = 0;//全局变量

// console.log(box,inner,imgWidth,ul,imgList,ol);
//创建下面的数字小按钮,根据ul的个数创建Ol里面同样个数的li，走到这里还是只有三张图片
for (var i = 0; i < imgList.length; i++) {
  var liNum = document.createElement("li");
  ol.appendChild(liNum); //把创建的li全部添加到ol盒子里面
  liNum.innerHTML = (i + 1);//给它们编号，也就是显示出来的数字
  liNum.setAttribute("index", i);//给它们加index，后面要和图片们连接起来

  //注册事件，让鼠标放在那个数字上就跳到第几张图片
  liNum.onmouseover = function () {
    pic = this.getAttribute("index");
    animate(ul, -pic * imgWidth);
  }
}

//自动播放
var timeId= setInterval(arrHandle,1000);

//开始弄左右的

ul.appendChild(ul.children[0].cloneNode(true));
//是否采用深度克隆,如果为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.
var left = document.getElementById("left");
var right = document.getElementById("right");
var arr = document.getElementById("arr");

//鼠标进入到box的div显示左右焦点的div,放出就消失
box.onmouseover = function () {
  left.style.display = "block";
  right.style.display = "block";
  clearInterval(timeId);
};
box.onmouseout = function () {
  left.style.display = "none";
  right.style.display = "none";
  timeId= setInterval(arrHandle,1000);
};//这两组必须是一样的，不能一组是左右，一组是arr

//右边的按钮
right.onclick =arrHandle;
function arrHandle() {
  if (pic == imgList.length - 1) {
    pic = 0;
    ul.style.left = 0 + "px";
  }
  pic++;//马上加1让它移动到第二张图片
  animate(ul, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片

}//先不考虑颜色问题
//
//左边按钮
left.onclick = function () {
  if (pic == 0) {
    //当图片已经是全部图片里面的第一张的时候，也就是说按理它的前面已经没有其他图片，但是用户还是会按向左的按键，他想着将会看到的是
    //全部图片里面的第三张，那么要先跳到全里面的第四张，这时用户以为眼前的是第一张，其实是第四张。
    pic = 3;
    ul.style.left = -pic * imgWidth + "px";
  }
  //通过上面的的代码，终于移到了第四张那里，这时用户看的还是他以为的“第一张”，下面通过改变pic，把ul盒子往左移动，移到第三张那里，搞定
  //如过不是在第一张那里点击这个左按钮，就直接减pic的值就可以移动一格
  pic--;
  animate(ul,-pic*imgWidth);
};

function animate(element, target) {
  clearInterval(element.timeId);
  //定时器的id值存储到对象的一个属性中
  element.timeId = setInterval(function () {
    //获取元素的当前的位置,数字类型
    var current = element.offsetLeft;
    //每次移动的距离
    var step = 10;
    step = current < target ? step : -step;
    //当前移动到位置
    current += step;
    if (Math.abs(current - target) > Math.abs(step)) {
      element.style.left = current + "px";
    } else {
      //清理定时器
      clearInterval(element.timeId);
      //直接到达目标
      element.style.left = target + "px";
    }
  }, 10);
}


