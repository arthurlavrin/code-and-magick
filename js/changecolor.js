;(function () {
  window.changeColor = function (elem, colors) {
    for (var i = 0; i < colors.length; i++) {
      if (elem.hasAttribute('xlink:href')) {
        elem.style.fill = colors[window.randomInteger(0, colors.length - 1)];
      } else {
        elem.style.background = colors[window.randomInteger(0, colors.length - 1)];
      }
    }
  };
})();
