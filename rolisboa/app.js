var leon, canvas, ctx;
var sw = window.innerWidth - 20;
var font_size = (sw / 14).toFixed();
var sh = (font_size * 2) + 10;//because the g drops below the line
var pixelRatio = 2;
function draw(){
    var container = document.getElementById('countdown');
    if(container.firstElementChild){ container.firstElementChild.remove(); }
    canvas = document.createElement('canvas');
    container.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    ctx.scale(pixelRatio, pixelRatio);
    leon = new LeonSans({
        text: tempo(),
        align: 'center', color: ['#f9e001'], size: font_size, weight: 200,
    });
    var i, total = leon.drawing.length;
    for (i = 0; i < total; i++) {
        TweenMax.fromTo(leon.drawing[i], 1.6, { value: 0 }, { delay: i * 0.05, value: 1, ease: Power4.easeOut });
    }
    requestAnimationFrame(animate);
}
function animate(t) {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, sw, sh);
    var x = (sw - leon.rect.w) / 2;
    var y = (sh - leon.rect.h) / 2;
    leon.position(x, y);
    leon.draw(ctx);
}
function tempo(){
    var cd = countdown( new Date('2020-10-24T09:00:00') );
    if(cd.value > 0){
        return 'Já começou! Contamos\ncom a tua presença.';
    }
    var text = cd.toString();
    text = text
    .replace('months', 'meses')
    .replace('days', 'dias')
    .replace('hours', 'horas')
    .replace('minutes', 'minutos')
    .replace('seconds', 'segundos')
    .replace('month', 'mês')
    .replace('day', 'dia')
    .replace('hour', 'hora')
    .replace('minute', 'minuto')
    .replace(' and', ',')
    .replace('second', 'segundo')
    .replace('horas,', 'horas,\n')
    .replace('hora,', 'hora,\n');
    return text;
}
draw();
setInterval(draw, 5000);

