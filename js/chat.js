$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text == '') {
            alert('请输入要发送的内容！')
        }
        $('.talk_list').append(
            `
            <li class="right_word">
              <img src="img/person02.png" /> <span>${text}</span>
            </li>
            `
        )
        $('#ipt').val('')

    })
    function getMsg(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            success: function (res) {
                console.log(res);
            }

        })
    }
})

