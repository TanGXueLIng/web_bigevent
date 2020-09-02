$(function() {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录账号的链接
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verigy()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 自定义一个叫做repwd的校验规则，用于检测两次输入密码是否相同
        // value为表单的值
        repwd: function(value) {
            // 通过形参拿到确认密码框中的内容，然后进行一次等于判断
            var pwd = $('.reg-box [name = password]').val();
            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    });
    // 监听表单的注册事件
    $('#form_reg').on('submit', function(e) {
            // 阻止默认的提交行为
            e.preventDefault();
            var data = {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                }
                // 发起Ajax的post请求
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功，请登录');
                    $('#link_login').click();
                });
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})