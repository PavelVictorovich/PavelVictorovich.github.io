var graph = [   { from: 1, to: 2, price: 7  },
                { from: 1, to: 3, price: 9  },
                { from: 6, to: 1, price: 14 },
                { from: 2, to: 3, price: 10 },
                { from: 4, to: 2, price: 15 },
                { from: 4, to: 3, price: 11 },
                { from: 5, to: 4, price: 6  },
                { from: 5, to: 6, price: 9  },
                { from: 6, to: 3, price: 2  }];

function floyd2(paths) {

    function pathes(from, to, paths) {
        var prices = {};
        var stack = [from];
        prices[from] = {
            price: 0,
            path: [from]
        };
        while (stack.length) {
            var current = stack.shift();
            for (var i = 0; i < paths.length; i++) {
                if (paths[i].from === current || paths[i].to === current) {
                    var target;
                    if (paths[i].from === current) {
                        target = paths[i].to;
                    } else {
                        target = paths[i].from;
                    }
                    if (typeof prices[target] === 'undefined') {
                        prices[target] = {price: Infinity};
                    }
                    if (prices[current].price + paths[i].price < prices[target].price) {
                        prices[target] = {
                            price: prices[current].price + paths[i].price,
                            path: prices[current].path.concat(target)
                        };
                        if (stack.indexOf(target) === -1) {
                            stack.push(target);
                        }
                    }
                }
            }
        }

        return prices[to].path;
    }

    var arr = [];

    paths.forEach(function (item) {
        arr[item.from] = arr[item.from] = arr[item.from] || [];
        arr[item.to] = arr[item.to] = arr[item.to] || [];
        arr[item.from][item.to] = item.from;
        arr[item.to][item.from] = item.from;
    });

    for (var l = 1; l < arr.length; l++) {
        arr[l] = arr[l] || [];
        arr[l].length = arr.length;
        for (var d = 1; d < arr[l].length; d++) {
            if (typeof arr[l][d] === 'undefined') {
                arr[l][d] = Infinity;
            }
        }
    }

    var str = "";

    for (var i = 1; i < arr.length; i++) {
        for (var j = i; j < arr[i].length; j++) {
            if (i !== j) {
                str += i + '-->' + j + '\t' + pathes(i, j, paths);
                str += '\n';
            }
        }
    }
    return str;
}

console.log(floyd2(graph));
/*
 1 --> 2: 1 2
 1 --> 3: 1 3
 1 --> 4: 1 3 4
 1 --> 5: 1 3 6 5
 1 --> 6: 1 3 6
 2 --> 3: 2 3
 2 --> 4: 2 4
 2 --> 5: 2 3 6 5
 2 --> 6: 2 3 6
 3 --> 4: 3 4
 3 --> 5: 3 6 5
 3 --> 6: 3 6
 4 --> 5: 4 5
 4 --> 6: 4 3 6
 5 --> 6: 5 6
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJGbG95ZC1XYXJzaGFsbCBhbGdvcml0aG0vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdyYXBoID0gWyAgIHsgZnJvbTogMSwgdG86IDIsIHByaWNlOiA3ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiAxLCB0bzogMywgcHJpY2U6IDkgIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDYsIHRvOiAxLCBwcmljZTogMTQgfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogMiwgdG86IDMsIHByaWNlOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiA0LCB0bzogMiwgcHJpY2U6IDE1IH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDQsIHRvOiAzLCBwcmljZTogMTEgfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogNSwgdG86IDQsIHByaWNlOiA2ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiA1LCB0bzogNiwgcHJpY2U6IDkgIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDYsIHRvOiAzLCBwcmljZTogMiAgfV07XHJcblxyXG5mdW5jdGlvbiBmbG95ZDIocGF0aHMpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBwYXRoZXMoZnJvbSwgdG8sIHBhdGhzKSB7XHJcbiAgICAgICAgdmFyIHByaWNlcyA9IHt9O1xyXG4gICAgICAgIHZhciBzdGFjayA9IFtmcm9tXTtcclxuICAgICAgICBwcmljZXNbZnJvbV0gPSB7XHJcbiAgICAgICAgICAgIHByaWNlOiAwLFxyXG4gICAgICAgICAgICBwYXRoOiBbZnJvbV1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBzdGFjay5zaGlmdCgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0aHNbaV0uZnJvbSA9PT0gY3VycmVudCB8fCBwYXRoc1tpXS50byA9PT0gY3VycmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGhzW2ldLmZyb20gPT09IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gcGF0aHNbaV0udG87XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gcGF0aHNbaV0uZnJvbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcmljZXNbdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzW3RhcmdldF0gPSB7cHJpY2U6IEluZmluaXR5fTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaWNlc1tjdXJyZW50XS5wcmljZSArIHBhdGhzW2ldLnByaWNlIDwgcHJpY2VzW3RhcmdldF0ucHJpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzW3RhcmdldF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogcHJpY2VzW2N1cnJlbnRdLnByaWNlICsgcGF0aHNbaV0ucHJpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBwcmljZXNbY3VycmVudF0ucGF0aC5jb25jYXQodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2suaW5kZXhPZih0YXJnZXQpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcHJpY2VzW3RvXS5wYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcnIgPSBbXTtcclxuXHJcbiAgICBwYXRocy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgYXJyW2l0ZW0uZnJvbV0gPSBhcnJbaXRlbS5mcm9tXSA9IGFycltpdGVtLmZyb21dIHx8IFtdO1xyXG4gICAgICAgIGFycltpdGVtLnRvXSA9IGFycltpdGVtLnRvXSA9IGFycltpdGVtLnRvXSB8fCBbXTtcclxuICAgICAgICBhcnJbaXRlbS5mcm9tXVtpdGVtLnRvXSA9IGl0ZW0uZnJvbTtcclxuICAgICAgICBhcnJbaXRlbS50b11baXRlbS5mcm9tXSA9IGl0ZW0uZnJvbTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAodmFyIGwgPSAxOyBsIDwgYXJyLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgYXJyW2xdID0gYXJyW2xdIHx8IFtdO1xyXG4gICAgICAgIGFycltsXS5sZW5ndGggPSBhcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGQgPSAxOyBkIDwgYXJyW2xdLmxlbmd0aDsgZCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJyW2xdW2RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2xdW2RdID0gSW5maW5pdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0ciA9IFwiXCI7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gaTsgaiA8IGFycltpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoaSAhPT0gaikge1xyXG4gICAgICAgICAgICAgICAgc3RyICs9IGkgKyAnLS0+JyArIGogKyAnXFx0JyArIHBhdGhlcyhpLCBqLCBwYXRocyk7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcblxyXG5jb25zb2xlLmxvZyhmbG95ZDIoZ3JhcGgpKTtcclxuLypcclxuIDEgLS0+IDI6IDEgMlxyXG4gMSAtLT4gMzogMSAzXHJcbiAxIC0tPiA0OiAxIDMgNFxyXG4gMSAtLT4gNTogMSAzIDYgNVxyXG4gMSAtLT4gNjogMSAzIDZcclxuIDIgLS0+IDM6IDIgM1xyXG4gMiAtLT4gNDogMiA0XHJcbiAyIC0tPiA1OiAyIDMgNiA1XHJcbiAyIC0tPiA2OiAyIDMgNlxyXG4gMyAtLT4gNDogMyA0XHJcbiAzIC0tPiA1OiAzIDYgNVxyXG4gMyAtLT4gNjogMyA2XHJcbiA0IC0tPiA1OiA0IDVcclxuIDQgLS0+IDY6IDQgMyA2XHJcbiA1IC0tPiA2OiA1IDZcclxuICovIl0sImZpbGUiOiJGbG95ZC1XYXJzaGFsbCBhbGdvcml0aG0vaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
