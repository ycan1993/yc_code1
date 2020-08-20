$(function () {
  $('#link_reg').on('click', function () {
    $('.login').hide()
    $('.reg').show()
  })
  $('#link_login').on('click', function () {
    $('.login').show()
    $('.reg').hide()
  })
  // 自定义表单验证
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
    repwd: function (value) {
      if (value !== $('#form_reg [name=password]').val()) {
        return '两次输入密码不一致'
      }
    }
  })
  //注册功能
  $('#form_reg').on('submit', function (e) {
    //阻止表单默认提交
    // console.log($(this).serialize());
    // console.log(typeof ($(this).serialize()));
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      // data: {
      //   username: $('#form_reg [name=username]').val(),
      //   password: $('#form_reg [name=password]').val()
      // },
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          // return alert(res.message);
          return layui.layer.msg(res.message)
        }
        layui.layer.msg(res.message)
        $('#form_reg')[0].reset()
        $('#link_login').click()
      }
    })
  })
  //登入功能
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // data: {
      //   username: $('#form_login [name=username]').val(),
      //   password: $('#form_login [name=password]').val()
      // },
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        console.log(res);
        layui.layer.msg(res.message)
        //存token
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})