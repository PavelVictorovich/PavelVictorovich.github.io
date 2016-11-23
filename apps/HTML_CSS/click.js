window.onload = function click() {
    click = document.getElementById('.container');
    var count = 0;
    document.body.onclick = function (e) {
        e = e || event;
        var target = e.target || e.srcElement;

        if (target) {
            count++;

            if (count === 1) {
                document.getElementById('container').style.backgroundColor = '#e5e5e7';
                console.log(count);
            }
            if (count === 2) {
                document.getElementById('container').style.backgroundColor = '#cccccf';
                console.log(count);
            }
            if (count === 3) {
                document.getElementById('container').style.backgroundColor = '#b2b2b7';
                document.getElementById('page1').classList.add('hight');
                document.getElementById('page11').classList.remove('hight');
                document.getElementById('page2').classList.remove('hight');
                console.log(count);
            }
            if (count === 4) {
                document.getElementById('container').style.backgroundColor = '#99999f';
                console.log(count);
            }
            if (count === 5) {
                document.getElementById('container').style.backgroundColor = '#7f7f87';
                console.log(count);
            }
            if (count === 6) {
                document.getElementById('container').style.backgroundColor = '#66666f';
                document.getElementById('page2').classList.add('hight');
                document.getElementById('page3').classList.remove('hight');
                console.log(count);
            }
            if (count === 7) {
                document.getElementById('container').style.backgroundColor = '#4c4c57';
                console.log(count);
            }
            if (count === 8) {
                document.getElementById('container').style.backgroundColor = '#32323e';
                console.log(count);
            }
            if (count === 9) {
                document.getElementById('container').style.backgroundColor = '#191926';
                console.log(count);
            }
            if (count === 10) {
                document.getElementById('container').style.backgroundColor = '#000000';
                document.getElementById('kte').classList.remove('hight');
                console.log(count);
            }
        }
    }
};