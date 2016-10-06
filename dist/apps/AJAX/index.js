window.addEventListener("load", function () {

    var request = new XMLHttpRequest();
    request.open("GET", "http://bowling.smartjs.academy/list");
    request.send();

    request.addEventListener("readystatechange", function () {
        if (request.readyState === request.DONE) {
            var list = JSON.parse(request.responseText);
            cb(list);
        }
    });

    function cb(list) {
        var lanes = document.querySelector('select.lanes');
        for (var i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            var id = list[i];
            option.textContent = id;
            option.value = id;
            lanes.appendChild(option);
        }
    }

    var interval;
    var trTrows = document.querySelector('.throws');
    var trScore = document.querySelector('.score');

    document.querySelector('button').addEventListener('click', function (e) {

        var lanes = document.querySelector('select.lanes');
        var laneNumber = lanes.options[lanes.options.selectedIndex].value;

        clearInterval(interval);
        interval = setInterval(function () {
            var request2 = new XMLHttpRequest();
            request2.open("GET", "http://bowling.smartjs.academy/lane?num=" + laneNumber);
            request2.send();

            request2.addEventListener('readystatechange', function () {
                if (request2.readyState === request2.DONE) {
                    var throws = JSON.parse(request2.responseText); //ответ с сервера

                    callback2(throws);

                }
            });
        }, 3000);
    }, false);
    
    function callback2(throws) {
        var allGame = [];
        var round = [];
        throws.forEach(function (item) {
            round.push(item);

            if (item === 10) {
                allGame.push(round);
                round = [];
            }
            else {
                if (round.length === 2) {
                    allGame.push(round);
                    if (round.length === 2) {
                        round = [];
                    }
                }
            }
        });
        function render(array) {
            trTrows.innerHTML = '';
            var score = [];
            var strike = 0;
            var spare = 0;
            var nextStrike = 0;
            array.forEach(function (item) {
                var td = document.createElement('td');
                var td2 = document.createElement('td');
                var tdScore = document.createElement('td');
                if (item[0] === 10) {
                    td.textContent = 'X';
                    if(strike === 20){
                        strike = strike + 10;//30
                        score.push(strike);//30
                        strike = nextStrike + 10;//20
                        nextStrike = 10;
                    }
                    if (strike === 10) {
                        strike = strike + 10;//20
                        nextStrike = 10;
                    }

                    if(spare === 10){
                        spare = spare + 10;
                        score.push(spare);
                        spare = 0;
                        strike = 10;
                    }
                    if(strike === 0) {
                        strike = 10;
                    }
                }
                else {
                    td.textContent = item[0];
                    if (item[0] + item[1] === 10) {
                        td2.textContent = '/';
                        if (spare === 10) {
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 10;
                        }
                        if(spare === 0) {
                            spare = 10;
                        }
                        if (strike === 10) {
                            strike = strike + spare;
                            score.push(strike);
                            strike = 0;
                            spare = 10;
                        }
                        if(strike === 20){
                            strike = strike + item[0];//26
                            score.push(strike);
                            strike = 0;
                            nextStrike = nextStrike + item[0] + item[1];
                            score.push(nextStrike);
                            nextStrike = 0;
                            spare = 10;
                        }
                    }
                    else {
                        td2.textContent = item[1];
                        score.push(item[0] + item[1]);
                        tdScore.textContent = item[0] + item[1];
                        if (spare !== 0) {
                            spare = spare + item[0];
                            score.push(spare);
                            spare = 0;
                        }
                        if (strike === 10) {
                            strike = strike + item[0] + item[1];
                            score.push(strike);
                            strike = 0;
                        }
                        if(strike === 20){
                            strike = strike + item[0];
                            nextStrike = nextStrike + item[0] + item[1];
                            score.push(strike);
                            score.push(nextStrike);
                            strike = 0;
                            nextStrike = 0;
                        }
                    }
                }
                trTrows.appendChild(td);
                trTrows.appendChild(td2);
            });
            if(array.length === score.length){
                score.reduce(function (prev, item) {
                    return prev + item;
                }, 0);
            }
        }
        render(allGame);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJBSkFYL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBcImh0dHA6Ly9ib3dsaW5nLnNtYXJ0anMuYWNhZGVteS9saXN0XCIpO1xyXG4gICAgcmVxdWVzdC5zZW5kKCk7XHJcblxyXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gcmVxdWVzdC5ET05FKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNiKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNiKGxpc3QpIHtcclxuICAgICAgICB2YXIgbGFuZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QubGFuZXMnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBpZDtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gaWQ7XHJcbiAgICAgICAgICAgIGxhbmVzLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbnRlcnZhbDtcclxuICAgIHZhciB0clRyb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRocm93cycpO1xyXG4gICAgdmFyIHRyU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIHZhciBsYW5lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdC5sYW5lcycpO1xyXG4gICAgICAgIHZhciBsYW5lTnVtYmVyID0gbGFuZXMub3B0aW9uc1tsYW5lcy5vcHRpb25zLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG5cclxuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3QyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QyLm9wZW4oXCJHRVRcIiwgXCJodHRwOi8vYm93bGluZy5zbWFydGpzLmFjYWRlbXkvbGFuZT9udW09XCIgKyBsYW5lTnVtYmVyKTtcclxuICAgICAgICAgICAgcmVxdWVzdDIuc2VuZCgpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdDIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0Mi5yZWFkeVN0YXRlID09PSByZXF1ZXN0Mi5ET05FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRocm93cyA9IEpTT04ucGFyc2UocmVxdWVzdDIucmVzcG9uc2VUZXh0KTsgLy/QvtGC0LLQtdGCINGBINGB0LXRgNCy0LXRgNCwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrMih0aHJvd3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9LCBmYWxzZSk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrMih0aHJvd3MpIHtcclxuICAgICAgICB2YXIgYWxsR2FtZSA9IFtdO1xyXG4gICAgICAgIHZhciByb3VuZCA9IFtdO1xyXG4gICAgICAgIHRocm93cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHJvdW5kLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gMTApIHtcclxuICAgICAgICAgICAgICAgIGFsbEdhbWUucHVzaChyb3VuZCk7XHJcbiAgICAgICAgICAgICAgICByb3VuZCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdW5kLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbEdhbWUucHVzaChyb3VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdW5kLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlcihhcnJheSkge1xyXG4gICAgICAgICAgICB0clRyb3dzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc2NvcmUgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHN0cmlrZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBzcGFyZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RyaWtlID0gMDtcclxuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgICAgICAgICAgIHZhciB0ZDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRkU2NvcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1bMF0gPT09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGQudGV4dENvbnRlbnQgPSAnWCc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RyaWtlID09PSAyMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlrZSA9IHN0cmlrZSArIDEwOy8vMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUucHVzaChzdHJpa2UpOy8vMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gbmV4dFN0cmlrZSArIDEwOy8vMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0cmlrZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaWtlID09PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpa2UgPSBzdHJpa2UgKyAxMDsvLzIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdHJpa2UgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXJlID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlID0gc3BhcmUgKyAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUucHVzaChzcGFyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0cmlrZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpa2UgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZC50ZXh0Q29udGVudCA9IGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bMF0gKyBpdGVtWzFdID09PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZDIudGV4dENvbnRlbnQgPSAnLyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFyZSA9PT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlID0gc3BhcmUgKyBpdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUucHVzaChzcGFyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFyZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwYXJlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFyZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpa2UgPT09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpa2UgPSBzdHJpa2UgKyBzcGFyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLnB1c2goc3RyaWtlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlrZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFyZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0cmlrZSA9PT0gMjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gc3RyaWtlICsgaXRlbVswXTsvLzI2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5wdXNoKHN0cmlrZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpa2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFN0cmlrZSA9IG5leHRTdHJpa2UgKyBpdGVtWzBdICsgaXRlbVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLnB1c2gobmV4dFN0cmlrZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U3RyaWtlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkMi50ZXh0Q29udGVudCA9IGl0ZW1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLnB1c2goaXRlbVswXSArIGl0ZW1bMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZFNjb3JlLnRleHRDb250ZW50ID0gaXRlbVswXSArIGl0ZW1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFyZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhcmUgPSBzcGFyZSArIGl0ZW1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5wdXNoKHNwYXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaWtlID09PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gc3RyaWtlICsgaXRlbVswXSArIGl0ZW1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5wdXNoKHN0cmlrZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpa2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0cmlrZSA9PT0gMjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gc3RyaWtlICsgaXRlbVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdHJpa2UgPSBuZXh0U3RyaWtlICsgaXRlbVswXSArIGl0ZW1bMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5wdXNoKHN0cmlrZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZS5wdXNoKG5leHRTdHJpa2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWtlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTdHJpa2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdHJUcm93cy5hcHBlbmRDaGlsZCh0ZCk7XHJcbiAgICAgICAgICAgICAgICB0clRyb3dzLmFwcGVuZENoaWxkKHRkMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihhcnJheS5sZW5ndGggPT09IHNjb3JlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBzY29yZS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldiArIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXIoYWxsR2FtZSk7XHJcbiAgICB9XHJcbn0pOyJdLCJmaWxlIjoiQUpBWC9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
