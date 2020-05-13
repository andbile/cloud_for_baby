(function () {

    if( $('#animate_background_1').length === 0) return;

    // размеры холста
    var ScreenSize = {
        WIDTH: '800',
        HEIGHT: '800'
    };

    var Rectangle = function () {
        this._reset();
    };

    // координаты фигуры на экране
    Rectangle.prototype._reset = function () {
        // начальные координаты фигуры
        this.x = getRandomValue(0, ScreenSize.WIDTH);
        this.y = getRandomValue(0, ScreenSize.HEIGHT);

    };

    Rectangle.prototype.render = function (ctx) {
        ctx.strokeStyle = '#fdeaf0';
        ctx.beginPath();
        ctx.moveTo(this.x + 21, this.y);
        ctx.lineTo(this.x + 41, this.y + 30);
        ctx.lineTo(this.x + 20, this.y + 44);
        ctx.lineTo(this.x, this.y + 14);
        ctx.closePath();
        ctx.stroke();
    };


    var getRandomValue = function (min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        //return Math.floor(rand);
        return Math.round(Math.random() * (max - min + 1) + min);
    };

    // функция которая отрисовует все фигуры
    var renderFrame = function (ctx, rectangles) {
        // пробегаемся по всему массиву фигур
        rectangles.forEach(function (it) {
            // и отрисовуем их на canvas
            it.render(ctx);
        });
    };

    var setup = function () {
        // количество фигур
        var drawings = 40;
        var canvas = document.querySelector('#animate_background_1');
        var ctx = canvas.getContext('2d');

        canvas.width = ScreenSize.WIDTH;
        canvas.height = ScreenSize.HEIGHT;

        var rectangles = new Array(drawings)
            .fill('')
            .map(function () {
                return new Rectangle();
            });

        // функция которая отрисовует все фигуры
        renderFrame(ctx, rectangles);
    };

    setup();


})();