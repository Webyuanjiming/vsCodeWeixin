wx.ready(function () {
  // 2. 分享接口
  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      }
    });

  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      }
    });

  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      }
    });
  
  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      }
    });
});
wx.error(function (res) {
	  alert(res.errMsg);
	});
