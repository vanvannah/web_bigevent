$(function(){
    getUserInfo()
})

function getUserInfo(){
    $.ajax({
        method:"GET",
        url:"http://api-breakingnews-web.itheima.net/my/userinfo",
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败')
                
            }
             renderavatar(res.data)
             
        },
        complete:function(res){
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
                localStorage.removeItem('token')
        
                location.href="/login.html "
            }
        }
    })
}

function renderavatar(user){
    let name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic !== null){
        $('.layui-nav-img')
        .attr('src',user.user_pic)
        .show()
        $('.text-avatar').hide( )
    }else{
        $('.layui-nav-img').hide( )
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

$('#btnLogout').on('click',function(){
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        
        location.href="/login.html "
        
        layer.close(index);
      });
    
})