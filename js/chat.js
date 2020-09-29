$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('#btnSend').click()
        }
    })
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text == '') {
            $('#ipt').val('')
            return alert('请输入要发送的内容！')
        }
        $('.talk_list').append(
            `
            <li class="right_word">
              <img src="img/person02.png" /> <span>${text}</span>
            </li>
            `
        )
        $('#ipt').val('')
        getMsg(text)
        $('#ipt').focus()
        resetui()
    })
    function getMsg(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                var msg = res.data.info.text
                if (res.message != 'success') {
                    return alert('获取回复失败！')
                }
                $('.talk_list').append(
                    `
                    <li class="left_word">
                      <img src="img/person01.png" /> <span>${msg}</span>
                    </li>
                    `
                )
                resetui()
                getVoice(msg)
            }

        })
    }

    function getVoice(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                if (res.status != 200) {
                    return alert('语音转换失败！')
                }
                $('audio').attr('src', res.voiceUrl)
            }
        })
    }
})

