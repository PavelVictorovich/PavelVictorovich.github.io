function Validation() {
    this.valid = function(type) {
        var items = document.querySelectorAll('[required]'),
            len = items.length,
            current, text, re, isfilled = false, blank = [];

        for(var i=0; i<len; i++) {
            current = items[i];
            current.addEventListener('focus', function(e){
                text = this.parentNode.querySelector('.error').childNodes[0];
                //this.removeAttribute('class');
                this.className = 'normal';
                if(text) {
                    this.parentNode.querySelector('.error').removeChild(text);
                }
            });
            if(!current.value) {
                current.className = 'warn';
                blank.push(current)
            } else {
                re = new RegExp(current.pattern);
                if(!re.test(current.value)) {
                    switch(type){
                        case 'box': this.box(current); break;
                        case 'tip': this.tips(current); break;
                    }
                    blank.push(current)
                }
            }
        }
        isfilled = blank.length ? false : true;
        return isfilled;
    };
    Validation.prototype.box = function(el) {
        var body = document.querySelector('body'),
            shadow = document.createElement('div'),
            tips = document.createElement('div'),
            tipstext = document.createTextNode(el.dataset.tip || 'error');

        shadow.className = 'shadow';
        tips.className = 'tips';
        tips.appendChild(tipstext);
        shadow.appendChild(tips);
        body.appendChild(shadow);
        shadow.addEventListener('click', function(e){
            e.preventDefault();
            body.removeChild(shadow);
        });
    };
    Validation.prototype.tips = function(el) {
        var pa = el.parentNode.childNodes,
            error = el.parentNode.querySelector('.error'),
            tiptext = document.createTextNode(el.dataset.tip || 'error');

        if(error.childNodes.length == 0) {
            error.appendChild(tiptext)
        }
    }
}

function submit() {
    var isvalid;
    var btn = document.querySelector('button[type=submit]');
    var currentform = document.querySelector('#new');

    currentform.addEventListener('submit', function(e) {
        e.preventDefault();
        var myvalid = new Validation();
        isvalid = myvalid.valid('tip');
        if (isvalid) {
            console.log('isvalid');
        } else {
            console.log('isvalid');
        }
    })
}
submit();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJWYWxpZGF0aW9uIGZvcm0vdmFsaWRhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLnZhbGlkID0gZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbcmVxdWlyZWRdJyksXG4gICAgICAgICAgICBsZW4gPSBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICBjdXJyZW50LCB0ZXh0LCByZSwgaXNmaWxsZWQgPSBmYWxzZSwgYmxhbmsgPSBbXTtcblxuICAgICAgICBmb3IodmFyIGk9MDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgY3VycmVudCA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHRleHQgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmVycm9yJykuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgICAgICAgICAvL3RoaXMucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gJ25vcm1hbCc7XG4gICAgICAgICAgICAgICAgaWYodGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmVycm9yJykucmVtb3ZlQ2hpbGQodGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZighY3VycmVudC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQuY2xhc3NOYW1lID0gJ3dhcm4nO1xuICAgICAgICAgICAgICAgIGJsYW5rLnB1c2goY3VycmVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKGN1cnJlbnQucGF0dGVybik7XG4gICAgICAgICAgICAgICAgaWYoIXJlLnRlc3QoY3VycmVudC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm94JzogdGhpcy5ib3goY3VycmVudCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGlwJzogdGhpcy50aXBzKGN1cnJlbnQpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBibGFuay5wdXNoKGN1cnJlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlzZmlsbGVkID0gYmxhbmsubGVuZ3RoID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICByZXR1cm4gaXNmaWxsZWQ7XG4gICAgfTtcbiAgICBWYWxpZGF0aW9uLnByb3RvdHlwZS5ib3ggPSBmdW5jdGlvbihlbCkge1xuICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAgICAgICAgIHNoYWRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdGlwc3RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlbC5kYXRhc2V0LnRpcCB8fCAnZXJyb3InKTtcblxuICAgICAgICBzaGFkb3cuY2xhc3NOYW1lID0gJ3NoYWRvdyc7XG4gICAgICAgIHRpcHMuY2xhc3NOYW1lID0gJ3RpcHMnO1xuICAgICAgICB0aXBzLmFwcGVuZENoaWxkKHRpcHN0ZXh0KTtcbiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKHRpcHMpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHNoYWRvdyk7XG4gICAgICAgIHNoYWRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChzaGFkb3cpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFZhbGlkYXRpb24ucHJvdG90eXBlLnRpcHMgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICB2YXIgcGEgPSBlbC5wYXJlbnROb2RlLmNoaWxkTm9kZXMsXG4gICAgICAgICAgICBlcnJvciA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLmVycm9yJyksXG4gICAgICAgICAgICB0aXB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWwuZGF0YXNldC50aXAgfHwgJ2Vycm9yJyk7XG5cbiAgICAgICAgaWYoZXJyb3IuY2hpbGROb2Rlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgZXJyb3IuYXBwZW5kQ2hpbGQodGlwdGV4dClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3VibWl0KCkge1xuICAgIHZhciBpc3ZhbGlkO1xuICAgIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1zdWJtaXRdJyk7XG4gICAgdmFyIGN1cnJlbnRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldycpO1xuXG4gICAgY3VycmVudGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBteXZhbGlkID0gbmV3IFZhbGlkYXRpb24oKTtcbiAgICAgICAgaXN2YWxpZCA9IG15dmFsaWQudmFsaWQoJ3RpcCcpO1xuICAgICAgICBpZiAoaXN2YWxpZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2lzdmFsaWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpc3ZhbGlkJyk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuc3VibWl0KCk7Il0sImZpbGUiOiJWYWxpZGF0aW9uIGZvcm0vdmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
