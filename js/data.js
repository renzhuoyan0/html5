$(function(){
    $(function(){
        $(document).on("mousedown",function(e){
            var obj = e.target;
            //console.log($(obj).offsetX);
            var ox = e.offsetX;
            var oy = e.offsetY;
            $(document).on("mousemove",function(e){
                var px = e.pageX;
                var py = e.pageY;
                $(obj).trigger("drag",{left:px-ox,top:py-oy})
            })
            $(document).on("mouseup",function(){
                $(document).off("mouseup");
                $(document).off("mousemove");

            })

        })
    })


    var add=$(".add");

    var form=$("form");

    var formClose=$(".formclose");
    var flag=true;

    add.click(function(){

        if(flag) {
            form.attr({"data-a":"animate-fadein"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-fadeout"})
            flag=true;
        }
    })
    formClose.click(function(){
        form.attr({"data-a":"animate-up"})
        flag=true;
    })




    $(".submitbtn").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();

        if(textv==""){
            alert("请输入标题");

            return;
        }
        if(conv==""){
            alert("请输入你要发布的内容");
            return;
        }
        if(timev==""){
            alert("请选择时间");
            return;
        }


        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);

        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");


        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random(),
            display:"block"
        }).attr("data-a","animate-sd").attr("id",obj.id);
        copy.find('.title-con').html(textv);
        copy.find('.con-con').html(conv);
        copy.find('.time-con').html(timev);


    })

    var messages = localStorage.message == null?[]:JSON.parse(localStorage.message);
    var bgImg = ['1.png','2.png','3.png','4.png'];
    for(var i=0;i<messages.length;i++){
        var random = Math.floor(Math.random()*4);
        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random()
        }).attr("id",messages[i].id);
        $(".con").eq(i).css({background:"url(images/"+bgImg[random]+") no-repeat center",backgroundSize:"110% 110%"})
        copy.find('.title-con').html(messages[i].title);
        copy.find('.con-con').html(messages[i].con);
        copy.find('.time-con').html(messages[i].time);
    }

    //拖拽事件
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            left:data.left+"px",
            top:data.top+"px"
        })
        $('.con').css({
            zIndex:0
        })
        $(this).css({zIndex:1})
        e.preventDefault()
    })
    $(document).delegate(".close","click",function(){
        var id = $(this).parent().attr("id");
        var arr =JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.message= JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })

})