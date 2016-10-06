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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIVE1MX0NTUy9jbGljay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gY2xpY2soKSB7XHJcbiAgICBjbGljayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCcuY29udGFpbmVyJyk7XHJcbiAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgZG9jdW1lbnQuYm9keS5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlID0gZSB8fCBldmVudDtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2U1ZTVlNyc7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNjY2NjY2YnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjYjJiMmI3JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlMScpLmNsYXNzTGlzdC5hZGQoJ2hpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZTExJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlMicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM5OTk5OWYnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjN2Y3Zjg3JztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDYpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzY2NjY2Zic7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZTInKS5jbGFzc0xpc3QuYWRkKCdoaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UzJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDcpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzRjNGM1Nyc7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMzMjMyM2UnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gOSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMTkxOTI2JztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDAwMDAnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2t0ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il0sImZpbGUiOiJIVE1MX0NTUy9jbGljay5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
