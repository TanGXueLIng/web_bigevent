$(function() {
        getUserInfo();
        var layer = layui.layer;
        // 点击按钮 实现退出功能
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1 清空本地存储的token
                localStorage.removeItem('token');
                // 2 重新跳转到登录页面
                location.href = '/login.html';
            });
        })
    })
    // 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers是请求头配置 因为有访问权限
        // headers: {
        // Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     // console.log('执行了complete');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1 清空本地存储的token
        //         localStorage.removeItem('token');
        //         // 2 重新跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1 获取用户名称 如果有昵称 就以昵称为准 如果没有 则用登录名
    var name = user.nickname || user.username;
    // 2 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}