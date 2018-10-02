'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(90, 0, 420, 270);

  ctx.fillStyle = '#26486f';
  ctx.font = '14px PT Mono';
  ctx.fillText('Ура, вы победили!', 100, 40);
  ctx.font = '14px PT Mono';
  ctx.fillText('Список результатов:', 100, 60);

  var max = 0;
  var min = times[0];
  var loser = 0;
  for (var j = 0; j < times.length; j++) {
    if (times[j] >= max) {
      max = times[j];
    } else if (times[j] < min) {
      min = times[j];
      loser = j;
    }
  }
  ctx.font = '14px PT Mono';
  ctx.fillText('Худшее время: ' + Math.floor(min) + ' мс' + ' у игрока ' + names[loser], 100, 80);

  var heightStat = 150;
  var paddingLeft = 200;
  var paddingBetween = 50;
  var paddingBottom = 90;
  var gistoWidth = 40;
  var textPadBot = heightStat + paddingBottom + 15;
  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(52, 45, 255, 0.5)';
    }
    ctx.fillRect((paddingLeft + (i * paddingBetween)), heightStat - (times[i] * heightStat / max) + paddingBottom, gistoWidth, times[i] * heightStat / max);
    ctx.fillText(names[i], (paddingLeft + (i * paddingBetween)), textPadBot);
  }

};
