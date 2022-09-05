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

const editFunc = (()=>{
    const editText =(event)=>{    
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
        };
    };
    return {editText};
})();

//makes empty card if subscription comes up with nothing?
const generateTaskCard = function(){
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardMain = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = 'placeholder title';
    title.addEventListener('click',editFunc.editText);

    //priority will have 4 levels: critical, important, normal, and finished.
    const priority = document.createElement('p');
    priority.textContent = 'priority';
    priority.addEventListener('click',editFunc.editText);

    //we're gonna try something with an outside library here later.
    const dueDate = document.createElement('p');
    dueDate.textContent = 'dueDate';
    dueDate.addEventListener('click',editFunc.editText);

    //setting contenteditable attribute to true seems to yeild better results for description?
    const description = document.createElement('p');
    description.setAttribute('contenteditable','true')
    description.textContent = 'description Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis modi fugit distinctio dignissimos molestias animi cum! Perspiciatis sint unde nisi accusamus eaque facere, porro, sequi, sit illo quas eveniet.'
    // description.addEventListener('click',editText);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXdDLEtBQUs7QUFDN0MseURBQXlELG9CQUFvQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBdUQ7QUFDdkQsb0VBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbmNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgIGNvbnN0IHRleHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHRFZGl0Jyk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0ZXh0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCx0ZXh0RWxlbWVudCk7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgIGlucHV0Lm9uYmx1ciA9ICgpID0+e1xuICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4ge2VkaXRUZXh0fTtcbn0pKCk7XG5cbi8vbWFrZXMgZW1wdHkgY2FyZCBpZiBzdWJzY3JpcHRpb24gY29tZXMgdXAgd2l0aCBub3RoaW5nP1xuY29uc3QgZ2VuZXJhdGVUYXNrQ2FyZCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNhcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjYXJkTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ3BsYWNlaG9sZGVyIHRpdGxlJztcbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuXG4gICAgLy9wcmlvcml0eSB3aWxsIGhhdmUgNCBsZXZlbHM6IGNyaXRpY2FsLCBpbXBvcnRhbnQsIG5vcm1hbCwgYW5kIGZpbmlzaGVkLlxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ3ByaW9yaXR5JztcbiAgICBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuXG4gICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gJ2R1ZURhdGUnO1xuICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcblxuICAgIC8vc2V0dGluZyBjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlIHRvIHRydWUgc2VlbXMgdG8geWVpbGQgYmV0dGVyIHJlc3VsdHMgZm9yIGRlc2NyaXB0aW9uP1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywndHJ1ZScpXG4gICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnZGVzY3JpcHRpb24gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUmVwZWxsYXQgb2ZmaWNpaXMgbW9kaSBmdWdpdCBkaXN0aW5jdGlvIGRpZ25pc3NpbW9zIG1vbGVzdGlhcyBhbmltaSBjdW0hIFBlcnNwaWNpYXRpcyBzaW50IHVuZGUgbmlzaSBhY2N1c2FtdXMgZWFxdWUgZmFjZXJlLCBwb3Jybywgc2VxdWksIHNpdCBpbGxvIHF1YXMgZXZlbmlldC4nXG4gICAgLy8gZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRUZXh0KTtcblxuICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgY2FyZCxcbiAgICAgICAgY2FyZEhlYWRlcixcbiAgICAgICAgY2FyZE1haW4sXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgfTtcblxuICAgIGNvbnN0IGVsZW1lbnROYW1lQXJyYXkgPSBPYmplY3Qua2V5cyhlbGVtZW50T2JqKTtcblxuICAgIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5jbGFzc0xpc3QuYWRkKGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgfTtcbiAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICBjYXJkLmFwcGVuZChjYXJkSGVhZGVyLGNhcmRNYWluKTtcbiAgICBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICBjYXJkTWFpbi5hcHBlbmQoZGVzY3JpcHRpb24pO1xufTtcbmV4cG9ydHtnZW5lcmF0ZVRhc2tDYXJkfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBnZW5lcmF0ZVRhc2tDYXJkIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIjtcbmdlbmVyYXRlVGFza0NhcmQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=