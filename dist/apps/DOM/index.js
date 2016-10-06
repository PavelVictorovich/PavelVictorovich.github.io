window.onload = function () {
    var body = document.querySelectorAll('body')[0],
        findBtn = document.querySelector('.selector-find'),
        nextBtn = document.querySelector('.selector-next'),
        prevBtn = document.querySelector('selector-prev'),
        parentBtn = document.getElementsByClassName('nav-top')[0],
        firstChildBtn = document.getElementsByClassName('nav-bottom')[0],
        prevSiblingBtn = document.getElementsByClassName('nav-left')[0],
        nextSiblingBtn = document.getElementsByClassName('nav-right')[0],
        input = document.querySelector('.selector');

    var state = {
        results: [],
        position: 0,
        currEl: null
    };

    function update(){
        function enableBtn(btn, condition){
            if(condition){
                btn.removeAttribute('disabled');
            }else{
                btn.setAttribute('disabled','disabled');
            }
        }
        enableBtn(nextBtn, state.position !== state.results.length - 1 || state.results[state.position] === state.currEl);
        enableBtn(prevBtn, state.position === 0 || state.results[state.position] === state.currEl);
        enableBtn(parentBtn, state.currEl.parentNode);
        enableBtn(firstChildBtn, state.currEl.firstElementChild);
        enableBtn(prevSiblingBtn, state.currEl.previousElementSibling);
        enableBtn(nextSiblingBtn, state.currEl.nextElementSibling);

        var oldEl = body.querySelector('.active');

        if(oldEl){
            oldEl.style.backgroundColor = '';
            oldEl.style.border = '';
            oldEl.classList.remove('active');
        }

        state.currEl.style.backgroundColor = 'lightblue';
        state.currEl.style.border = '5px solid red';
        state.currEl.classList.add('active');
    }

    function findEl(){
        state.currEl = input.value;
        state.position = 0;
        state.results = body.querySelectorAll(state.currEl);
        state.currEl = state.results[0];
        update();
    }
    findBtn.addEventListener('click', findEl, false);

    function nextEl(){
        state.position ++;
        state.currEl = state.results[state.position];
        update();
    }
    nextBtn.addEventListener('click', nextEl, false);

    function prevEl(){
        state.position --;
        state.currEl = state.results[state.position];
        update();
    }
    prevBtn.addEventListener('click', prevEl, false);

    function parentEl(){
        state.currEl = state.currEl.parentNode;
        update();
    }
    parentBtn.addEventListener('click', parentEl, false);

    function firstChild(){
        state.currEl = state.currEl.firstElementChild;
        update();
    }
    firstChildBtn.addEventListener('click', firstChild, false);

    function prevSib(){
        state.currEl = state.currEl.previousElementSibling;
        update();
    }
    prevSiblingBtn.addEventListener('click', prevSib, false);

    function nextSib(){
        state.currEl = state.currEl.nextElementSibling;
        update();
    }
    nextSiblingBtn.addEventListener('click', nextSib, false);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJET00vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYm9keScpWzBdLFxyXG4gICAgICAgIGZpbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3ItZmluZCcpLFxyXG4gICAgICAgIG5leHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3ItbmV4dCcpLFxyXG4gICAgICAgIHByZXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3Rvci1wcmV2JyksXHJcbiAgICAgICAgcGFyZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2LXRvcCcpWzBdLFxyXG4gICAgICAgIGZpcnN0Q2hpbGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXYtYm90dG9tJylbMF0sXHJcbiAgICAgICAgcHJldlNpYmxpbmdCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXYtbGVmdCcpWzBdLFxyXG4gICAgICAgIG5leHRTaWJsaW5nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2LXJpZ2h0JylbMF0sXHJcbiAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0b3InKTtcclxuXHJcbiAgICB2YXIgc3RhdGUgPSB7XHJcbiAgICAgICAgcmVzdWx0czogW10sXHJcbiAgICAgICAgcG9zaXRpb246IDAsXHJcbiAgICAgICAgY3VyckVsOiBudWxsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZSgpe1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZUJ0bihidG4sIGNvbmRpdGlvbil7XHJcbiAgICAgICAgICAgIGlmKGNvbmRpdGlvbil7XHJcbiAgICAgICAgICAgICAgICBidG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbmFibGVCdG4obmV4dEJ0biwgc3RhdGUucG9zaXRpb24gIT09IHN0YXRlLnJlc3VsdHMubGVuZ3RoIC0gMSB8fCBzdGF0ZS5yZXN1bHRzW3N0YXRlLnBvc2l0aW9uXSA9PT0gc3RhdGUuY3VyckVsKTtcclxuICAgICAgICBlbmFibGVCdG4ocHJldkJ0biwgc3RhdGUucG9zaXRpb24gPT09IDAgfHwgc3RhdGUucmVzdWx0c1tzdGF0ZS5wb3NpdGlvbl0gPT09IHN0YXRlLmN1cnJFbCk7XHJcbiAgICAgICAgZW5hYmxlQnRuKHBhcmVudEJ0biwgc3RhdGUuY3VyckVsLnBhcmVudE5vZGUpO1xyXG4gICAgICAgIGVuYWJsZUJ0bihmaXJzdENoaWxkQnRuLCBzdGF0ZS5jdXJyRWwuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIGVuYWJsZUJ0bihwcmV2U2libGluZ0J0biwgc3RhdGUuY3VyckVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xyXG4gICAgICAgIGVuYWJsZUJ0bihuZXh0U2libGluZ0J0biwgc3RhdGUuY3VyckVsLm5leHRFbGVtZW50U2libGluZyk7XHJcblxyXG4gICAgICAgIHZhciBvbGRFbCA9IGJvZHkucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpO1xyXG5cclxuICAgICAgICBpZihvbGRFbCl7XHJcbiAgICAgICAgICAgIG9sZEVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnO1xyXG4gICAgICAgICAgICBvbGRFbC5zdHlsZS5ib3JkZXIgPSAnJztcclxuICAgICAgICAgICAgb2xkRWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0ZS5jdXJyRWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0Ymx1ZSc7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsLnN0eWxlLmJvcmRlciA9ICc1cHggc29saWQgcmVkJztcclxuICAgICAgICBzdGF0ZS5jdXJyRWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZEVsKCl7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgc3RhdGUucG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHN0YXRlLnJlc3VsdHMgPSBib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoc3RhdGUuY3VyckVsKTtcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5yZXN1bHRzWzBdO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZmluZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpbmRFbCwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5leHRFbCgpe1xyXG4gICAgICAgIHN0YXRlLnBvc2l0aW9uICsrO1xyXG4gICAgICAgIHN0YXRlLmN1cnJFbCA9IHN0YXRlLnJlc3VsdHNbc3RhdGUucG9zaXRpb25dO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRFbCwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXZFbCgpe1xyXG4gICAgICAgIHN0YXRlLnBvc2l0aW9uIC0tO1xyXG4gICAgICAgIHN0YXRlLmN1cnJFbCA9IHN0YXRlLnJlc3VsdHNbc3RhdGUucG9zaXRpb25dO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByZXZFbCwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBhcmVudEVsKCl7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gc3RhdGUuY3VyckVsLnBhcmVudE5vZGU7XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBwYXJlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJlbnRFbCwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpcnN0Q2hpbGQoKXtcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5jdXJyRWwuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBmaXJzdENoaWxkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmlyc3RDaGlsZCwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXZTaWIoKXtcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5jdXJyRWwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIHByZXZTaWJsaW5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldlNpYiwgZmFsc2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5leHRTaWIoKXtcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5jdXJyRWwubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgbmV4dFNpYmxpbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0U2liLCBmYWxzZSk7XHJcbn07Il0sImZpbGUiOiJET00vaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
