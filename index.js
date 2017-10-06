var inputWord='';
function search () {
  inputWord=document.querySelector('#keyword').value;//保留用户输入的词
  var qsData={'wd':inputWord,'cb':'getData'};
  $.ajax({
    async:false,
    url:"http://suggestion.baidu.com/su",
    type:"GET",
    dataType:"jsonp",
    jsonp:'jsonpcallback',
    data:qsData,
    timeout:5000
  })
}
function getData (data) {
//      console.log(data.s);
  var result=data.s;
  var ul=document.querySelector('#list');
  if(result.length>0){
    $("li").remove();
    result=result.slice(0,4);
    result.forEach(function (item) {
      var li=document.createElement('li');
      li.innerHTML=item;
      ul.appendChild(li);
    });
    $("#list").show();
    $("#list li").mouseover(function () {
      $(this).addClass("selected");
    }).mouseout(function () {
      $(this).removeClass("selected");
    });
  }else{
    $("#list").hide();
  }
}
var count=-1;
$("#keyword").on('keydown',function (e) {
  if(e.keyCode===38){//上
    count--;
    if(count<=-2){
      count=$("#list li:last").index();
      $("#list li:last").addClass("selected");
    }else if(count===-1){
      $("#list li").removeClass('selected');
      $(this).val(inputWord);
      return;
    }else{
      $("#list li").eq(count).addClass("selected").siblings().removeClass("selected");
    }
    $(this).val($('#list li').eq(count).html());
  }else if(e.keyCode==40){//下
    count++;
    if(count>$("#list li:last").index()){
      count=-1;
      $("#list li").removeClass('selected');
      $(this).val(inputWord);
      return;
    }
    $("#list li").eq(count).addClass("selected").siblings().removeClass("selected");
    $(this).val($('#list li').eq(count).html());
  }else if(e.keyCode === 13){//Enter
    // 百度跳转链接
    var url = 'https://www.baidu.com/s?&rsv_spt=1&wd='+$(this).val();
    window.location.href = url;
  }
})
function changeBorderColor (input) {
  input.style.borderColor='#5692F7';
}
function changeBack (input) {
  input.style.borderColor='#B3B3B3';
}
