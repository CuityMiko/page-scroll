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
    }
  };

  var pageScroll = {
    init: function () {
      var me = this;

      me.root = doc.querySelector(config.selector.root);
      me.documentHeight = me.getDocumentRect().height;

      me.root.addEventListener('click', function (e) {
        e.preventDefault();

        var p = e.target.parentNode;

        var currentY = me.getScrollPos().y;
        var viewportHeight = me.getViewportSize();
        var targetY = 0;

        if (p.classList.contains(config.cls.toBottom)) {
          targetY = me.documentHeight - viewportHeight;
        }
        console.log(targetY)
        window.scrollTo(0, targetY);
      }, false);
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
