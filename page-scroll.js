var pageScroll = (function (w) {
  var doc = w.document;
  var config = {
    cls: {
      root: 'page-scroll',
      toTop: 'to-top',
      toBottom: 'to-bottom'
    },
    selector: {
      root: '.page-scroll',
      toTop: '.to-top',
      toBottom: '.to-bottom'
    },
    duration: 10,
    tpl: '  <ul class="page-scroll">\n    <li class="to-top">\n      <a class="iconfont icon-to-top" href="#">&#xe601;</a>\n      <div class="info">\u8fd4\u56de\u9876\u90e8</div>\n    </li>\n    <li class="to-bottom">\n      <a class="iconfont icon-to-bottom" href="#">&#xe600;</a>\n      <div class="info">\u8fd4\u56de\u5e95\u90e8</div>\n    </li>\n  </ul>\n'
  };

  var pageScroll = {
    init: function (arg) {
      var me = this;

      var container = doc.querySelector(arg.container);
      container.innerHTML = config.tpl;

      me.root = doc.querySelector(config.selector.root);
      me.documentHeight = me.getDocumentRect().height;

      me.root.addEventListener('click', function (e) {
        e.preventDefault();

        var p = e.target.parentNode;

        var currentY = me.getScrollPos().y;
        var viewportHeight = me.getViewportSize().height;
        var targetY = 0;

        if (p.classList.contains(config.cls.toBottom)) {
          targetY = me.documentHeight - viewportHeight;
        }

        me.pageScroll(currentY, targetY);
      }, false);
    },
    pageScroll: function (currentY, targetY) {
      var distance = targetY - currentY;
      var step = 0.1 * distance;

      function animate() {
        currentY += step;
        step = 0.1 * (targetY - currentY);

        window.scrollTo(0, currentY);

        if (Math.abs(targetY - currentY) > 5) {
          setTimeout(animate, config.duration);
        }
      }

      animate();
    },
    getScrollPos: function (win) {
      win = win || w;
      if (win.pageXOffset != null) {
        return {
          x: win.pageXOffset,
          y: win.pageYOffset
        };
      }

      var d = win.document;
      if (document.compatMode === 'CSS1Compat') {
        return {
          x: d.documentElement.scrollLeft,
          y: d.documentElement.scrollTop
        };
      }
      return {
        x: d.body.scrollLeft,
        y: d.body.scrollTop
      };
    },
    getViewportSize: function (win) {
      win = win || w;
      if (win.innerWidth != null) {
        return {
          width: w.innerWidth,
          height: w.innerHeight
        };
      }
      var d = win.document;
      if (document.compatMode === 'CSS1Compat') {
        return {
          width: d.documentElement.clientWidth,
          height: d.documentElement.clientHeight
        };
      }
      return {
        width: d.body.clientWidth,
        height: d.body.clientHeight
      };
    },
    getDocumentRect: function () {
      var body = doc.body;
        html = doc.documentElement;

      return {
        height: Math.max(body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight),
        width: Math.max(body.scrollWidth, body.offsetWidth,
          html.clientWidth, html.scrollWidth, html.offsetWidth)
      };
    }
  };

  return pageScroll;
}(window));
