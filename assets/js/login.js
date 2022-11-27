$(function(){
    $("#link_reg").on('click',function(){
        $(".loginBox").hide()
        $(".regBox").show()
    })
    $("#link_login").on('click',function(){
        $(".loginBox").show()
        $(".regBox").hide()
    })

    let form = layui.form
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repsd:function(value){
            let psd = $(".regBox [name=password]").val()
            if(psd !== value){
                return "两次密码不相等"
            }
        }
    })


    // 监听注册表单
    $(".regForm").on('submit',function(e){
        e.preventDefault()
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',
        {username:$('.regForm [name=username]').val(),
        password:$('.regForm [name=password]').val()},
        function(res){
            if(res.status !== 0){
              return  layer.msg(res.message); ;
            }
            layer.msg('注册成功');
        })
        
    })
    $(".loginForm").on('submit',function(e){
        e.preventDefault()
        let data = $(this).serialize()
        $.post('http://api-breakingnews-web.itheima.net/api/login',
        data,
        function(res){
            if(res.status !== 0){
              return  layer.msg(登录失败); ;
            }
            layer.msg('登录成功');
            // console.log(res.token);
            localStorage.setItem('token',res.token)
            location.href="/index.html "
        })
    })


})