var graph = [   { from: 1, to: 2, price: 7  },
                { from: 1, to: 3, price: 9  },
                { from: 6, to: 1, price: 14 },
                { from: 2, to: 3, price: 10 },
                { from: 4, to: 2, price: 15 },
                { from: 4, to: 3, price: 11 },
                { from: 5, to: 4, price: 6  },
                { from: 5, to: 6, price: 9  },
                { from: 6, to: 3, price: 2  }];

function djkstra(from, to, paths){
    var prices = {};
    var stack = [from];
    prices[from] = {
        price: 0,
        path: [from]
    };
    while(stack.length){
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

console.log(djkstra( 1, 4, graph)); //[ 1, 3, 4]
console.log(djkstra( 1, 5, graph)); //[ 1, 3, 6, 5]

//Done
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJEaWprc3RyYSdzIGFsZ29yaXRobS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ3JhcGggPSBbICAgeyBmcm9tOiAxLCB0bzogMiwgcHJpY2U6IDcgIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDEsIHRvOiAzLCBwcmljZTogOSAgfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogNiwgdG86IDEsIHByaWNlOiAxNCB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiAyLCB0bzogMywgcHJpY2U6IDEwIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDQsIHRvOiAyLCBwcmljZTogMTUgfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogNCwgdG86IDMsIHByaWNlOiAxMSB9LFxyXG4gICAgICAgICAgICAgICAgeyBmcm9tOiA1LCB0bzogNCwgcHJpY2U6IDYgIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZyb206IDUsIHRvOiA2LCBwcmljZTogOSAgfSxcclxuICAgICAgICAgICAgICAgIHsgZnJvbTogNiwgdG86IDMsIHByaWNlOiAyICB9XTtcclxuXHJcbmZ1bmN0aW9uIGRqa3N0cmEoZnJvbSwgdG8sIHBhdGhzKXtcclxuICAgIHZhciBwcmljZXMgPSB7fTtcclxuICAgIHZhciBzdGFjayA9IFtmcm9tXTtcclxuICAgIHByaWNlc1tmcm9tXSA9IHtcclxuICAgICAgICBwcmljZTogMCxcclxuICAgICAgICBwYXRoOiBbZnJvbV1cclxuICAgIH07XHJcbiAgICB3aGlsZShzdGFjay5sZW5ndGgpe1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gc3RhY2suc2hpZnQoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXRoc1tpXS5mcm9tID09PSBjdXJyZW50IHx8IHBhdGhzW2ldLnRvID09PSBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhdGhzW2ldLmZyb20gPT09IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBwYXRoc1tpXS50bztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gcGF0aHNbaV0uZnJvbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJpY2VzW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VzW3RhcmdldF0gPSB7cHJpY2U6IEluZmluaXR5fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcmljZXNbY3VycmVudF0ucHJpY2UgKyBwYXRoc1tpXS5wcmljZSA8IHByaWNlc1t0YXJnZXRdLnByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VzW3RhcmdldF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBwcmljZXNbY3VycmVudF0ucHJpY2UgKyBwYXRoc1tpXS5wcmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcHJpY2VzW2N1cnJlbnRdLnBhdGguY29uY2F0KHRhcmdldClcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5pbmRleE9mKHRhcmdldCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpY2VzW3RvXS5wYXRoO1xyXG59XHJcblxyXG5jb25zb2xlLmxvZyhkamtzdHJhKCAxLCA0LCBncmFwaCkpOyAvL1sgMSwgMywgNF1cclxuY29uc29sZS5sb2coZGprc3RyYSggMSwgNSwgZ3JhcGgpKTsgLy9bIDEsIDMsIDYsIDVdXHJcblxyXG4vL0RvbmUiXSwiZmlsZSI6IkRpamtzdHJhJ3MgYWxnb3JpdGhtL2luZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
