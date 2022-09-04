/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/DOMFunc.js":
/*!**********************************!*\
  !*** ./src/functions/DOMFunc.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateTaskCard": () => (/* binding */ generateTaskCard)
/* harmony export */ });
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');

//function that generates task header

//function that generates task card
//makes empty card if subscription comes up with nothing?
const generateTaskCard = function(){
    const editText = function(event){
        const textElement = event.target;
        const input = document.createElement('input');
        textElement.style.display = 'none';
        input.classList.add('textEdit');
        input.value = textElement.innerHTML;
        input.type = 'text';
        textElement.parentNode.insertBefore(input,textElement);
        input.focus();

        //for enter key
        input.onkeydown = (ev) =>{
            if(ev.key == 'Enter'){
                finishEdit()
            }
            return;
        }
        //for clicking off input
        input.onblur = () =>{
            finishEdit();
        };

        const finishEdit = function(){
            textElement.innerHTML = input.value;
            input.parentNode.removeChild(input);
            textElement.style.display = '';
        }
    }
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardMain = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'placeholder title';
    title.addEventListener('click',editText);

    const priority = document.createElement('p');
    priority.textContent = 'priority';
    priority.addEventListener('click',editText);

    const dueDate = document.createElement('p');
    dueDate.textContent = 'dueDate';
    dueDate.addEventListener('click',editText);

    const description = document.createElement('p');
    description.textContent = 'description Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis modi fugit distinctio dignissimos molestias animi cum! Perspiciatis sint unde nisi accusamus eaque facere, porro, sequi, sit illo quas eveniet.'
    description.addEventListener('click',editText);

    // seperate all creation into one module then return an object with all created elements and run in through the class adding function?
    const elementObj = {
        card,
        cardHeader,
        cardMain,
        title,
        priority,
        dueDate,
        description,
    };
    const elementNameArray = Object.keys(elementObj);

    for(let i=elementNameArray.length-1;i>=0;--i){
        elementObj[elementNameArray[i]].classList.add(`${elementNameArray[i]}`);
    };
    main.append(card);
    card.append(cardHeader,cardMain);
    cardHeader.append(title,priority,dueDate);
    cardMain.append(description);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_DOMFunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/DOMFunc */ "./src/functions/DOMFunc.js");

;
(0,_functions_DOMFunc__WEBPACK_IMPORTED_MODULE_0__.generateTaskCard)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxLQUFLO0FBQzdDLHlEQUF5RCxvQkFBb0I7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0VBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOWTtBQUNaLENBQXVEO0FBQ3ZELG9FQUFnQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4vL2Z1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIHRhc2sgaGVhZGVyXG5cbi8vZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGFzayBjYXJkXG4vL21ha2VzIGVtcHR5IGNhcmQgaWYgc3Vic2NyaXB0aW9uIGNvbWVzIHVwIHdpdGggbm90aGluZz9cbmNvbnN0IGdlbmVyYXRlVGFza0NhcmQgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IGVkaXRUZXh0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuXG4gICAgICAgIC8vZm9yIGVudGVyIGtleVxuICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgaWYoZXYua2V5ID09ICdFbnRlcicpe1xuICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICBpbnB1dC5vbmJsdXIgPSAoKSA9PntcbiAgICAgICAgICAgIGZpbmlzaEVkaXQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNhcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjYXJkTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ3BsYWNlaG9sZGVyIHRpdGxlJztcbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdFRleHQpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSAncHJpb3JpdHknO1xuICAgIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0VGV4dCk7XG5cbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSAnZHVlRGF0ZSc7XG4gICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdFRleHQpO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnZGVzY3JpcHRpb24gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUmVwZWxsYXQgb2ZmaWNpaXMgbW9kaSBmdWdpdCBkaXN0aW5jdGlvIGRpZ25pc3NpbW9zIG1vbGVzdGlhcyBhbmltaSBjdW0hIFBlcnNwaWNpYXRpcyBzaW50IHVuZGUgbmlzaSBhY2N1c2FtdXMgZWFxdWUgZmFjZXJlLCBwb3Jybywgc2VxdWksIHNpdCBpbGxvIHF1YXMgZXZlbmlldC4nXG4gICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRUZXh0KTtcblxuICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgY2FyZCxcbiAgICAgICAgY2FyZEhlYWRlcixcbiAgICAgICAgY2FyZE1haW4sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgfTtcbiAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG5cbiAgICBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgIH07XG4gICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgY2FyZC5hcHBlbmQoY2FyZEhlYWRlcixjYXJkTWFpbik7XG4gICAgY2FyZEhlYWRlci5hcHBlbmQodGl0bGUscHJpb3JpdHksZHVlRGF0ZSk7XG4gICAgY2FyZE1haW4uYXBwZW5kKGRlc2NyaXB0aW9uKTtcbn07XG5leHBvcnR7Z2VuZXJhdGVUYXNrQ2FyZH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgZ2VuZXJhdGVUYXNrQ2FyZCB9IGZyb20gXCIuL2Z1bmN0aW9ucy9ET01GdW5jXCI7XG5nZW5lcmF0ZVRhc2tDYXJkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9