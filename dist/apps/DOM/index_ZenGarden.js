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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJET00vaW5kZXhfWmVuR2FyZGVuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHknKVswXSxcclxuICAgICAgICBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yLWZpbmQnKSxcclxuICAgICAgICBuZXh0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yLW5leHQnKSxcclxuICAgICAgICBwcmV2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0b3ItcHJldicpLFxyXG4gICAgICAgIHBhcmVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdi10b3AnKVswXSxcclxuICAgICAgICBmaXJzdENoaWxkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2LWJvdHRvbScpWzBdLFxyXG4gICAgICAgIHByZXZTaWJsaW5nQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2LWxlZnQnKVswXSxcclxuICAgICAgICBuZXh0U2libGluZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdi1yaWdodCcpWzBdLFxyXG4gICAgICAgIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdG9yJyk7XHJcblxyXG4gICAgdmFyIHN0YXRlID0ge1xyXG4gICAgICAgIHJlc3VsdHM6IFtdLFxyXG4gICAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICAgIGN1cnJFbDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgICAgICBmdW5jdGlvbiBlbmFibGVCdG4oYnRuLCBjb25kaXRpb24pe1xyXG4gICAgICAgICAgICBpZihjb25kaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgYnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBidG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZW5hYmxlQnRuKG5leHRCdG4sIHN0YXRlLnBvc2l0aW9uICE9PSBzdGF0ZS5yZXN1bHRzLmxlbmd0aCAtIDEgfHwgc3RhdGUucmVzdWx0c1tzdGF0ZS5wb3NpdGlvbl0gPT09IHN0YXRlLmN1cnJFbCk7XHJcbiAgICAgICAgZW5hYmxlQnRuKHByZXZCdG4sIHN0YXRlLnBvc2l0aW9uID09PSAwIHx8IHN0YXRlLnJlc3VsdHNbc3RhdGUucG9zaXRpb25dID09PSBzdGF0ZS5jdXJyRWwpO1xyXG4gICAgICAgIGVuYWJsZUJ0bihwYXJlbnRCdG4sIHN0YXRlLmN1cnJFbC5wYXJlbnROb2RlKTtcclxuICAgICAgICBlbmFibGVCdG4oZmlyc3RDaGlsZEJ0biwgc3RhdGUuY3VyckVsLmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICBlbmFibGVCdG4ocHJldlNpYmxpbmdCdG4sIHN0YXRlLmN1cnJFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTtcclxuICAgICAgICBlbmFibGVCdG4obmV4dFNpYmxpbmdCdG4sIHN0YXRlLmN1cnJFbC5uZXh0RWxlbWVudFNpYmxpbmcpO1xyXG5cclxuICAgICAgICB2YXIgb2xkRWwgPSBib2R5LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYob2xkRWwpe1xyXG4gICAgICAgICAgICBvbGRFbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJztcclxuICAgICAgICAgICAgb2xkRWwuc3R5bGUuYm9yZGVyID0gJyc7XHJcbiAgICAgICAgICAgIG9sZEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGUuY3VyckVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdsaWdodGJsdWUnO1xyXG4gICAgICAgIHN0YXRlLmN1cnJFbC5zdHlsZS5ib3JkZXIgPSAnNXB4IHNvbGlkIHJlZCc7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRFbCgpe1xyXG4gICAgICAgIHN0YXRlLmN1cnJFbCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgIHN0YXRlLnBvc2l0aW9uID0gMDtcclxuICAgICAgICBzdGF0ZS5yZXN1bHRzID0gYm9keS5xdWVyeVNlbGVjdG9yQWxsKHN0YXRlLmN1cnJFbCk7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gc3RhdGUucmVzdWx0c1swXTtcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmaW5kRWwsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0RWwoKXtcclxuICAgICAgICBzdGF0ZS5wb3NpdGlvbiArKztcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5yZXN1bHRzW3N0YXRlLnBvc2l0aW9uXTtcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0RWwsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2RWwoKXtcclxuICAgICAgICBzdGF0ZS5wb3NpdGlvbiAtLTtcclxuICAgICAgICBzdGF0ZS5jdXJyRWwgPSBzdGF0ZS5yZXN1bHRzW3N0YXRlLnBvc2l0aW9uXTtcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2RWwsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwYXJlbnRFbCgpe1xyXG4gICAgICAgIHN0YXRlLmN1cnJFbCA9IHN0YXRlLmN1cnJFbC5wYXJlbnROb2RlO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcGFyZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyZW50RWwsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmaXJzdENoaWxkKCl7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gc3RhdGUuY3VyckVsLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZmlyc3RDaGlsZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZpcnN0Q2hpbGQsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2U2liKCl7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gc3RhdGUuY3VyckVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcmV2U2libGluZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByZXZTaWIsIGZhbHNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0U2liKCl7XHJcbiAgICAgICAgc3RhdGUuY3VyckVsID0gc3RhdGUuY3VyckVsLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIG5leHRTaWJsaW5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV4dFNpYiwgZmFsc2UpO1xyXG59OyJdLCJmaWxlIjoiRE9NL2luZGV4X1plbkdhcmRlbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
