/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/DOMFunc.js":
/*!**********************************!*\
  !*** ./src/functions/DOMFunc.js ***!
  \**********************************/
/***/ (() => {

const sidebar = document.getElementById('sidebar');
const newTaskButton = document.querySelector('.newTaskButton');
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

const taskCreation = (() =>{
    const generateTaskCard = () =>{
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardMain = document.createElement('div');
    
        const title = document.createElement('h2');
        title.textContent = 'placeholder title';
        title.classList.add('editable');
        title.addEventListener('click',editFunc.editText);
    
        //going to try and make this a fancy check box thing with 4 levels
        //priority will have 4 levels: critical, important, normal, and finished.
        const priority = document.createElement('p');
        priority.textContent = 'priority';
        priority.classList.add('editable');
        priority.addEventListener('click',editFunc.editText);
    
        //we're gonna try something with an outside library here later.
        const dueDate = document.createElement('p');
        dueDate.textContent = 'dueDate';
        dueDate.classList.add('editable');
        dueDate.addEventListener('click',editFunc.editText);
    
        //setting 'contenteditable' attribute to true seems to yeild better results for description?
        const description = document.createElement('p');
        description.setAttribute('contenteditable','true')
        description.textContent = 'description Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis modi fugit distinctio dignissimos molestias animi cum! Perspiciatis sint unde nisi accusamus eaque facere, porro, sequi, sit illo quas eveniet.'
        description.classList.add('editable');
    
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
    const clearTask = () =>{
        main.replaceChildren();
    };
    return{generateTaskCard,clearTask};
})();

// const taskTabCreation = (() =>{
//     const tab = document.createElement('div');
// })();

newTaskButton.onclick = function(){
    taskCreation.clearTask();
    taskCreation.generateTaskCard();
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_DOMFunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/DOMFunc */ "./src/functions/DOMFunc.js");
/* harmony import */ var _functions_DOMFunc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_functions_DOMFunc__WEBPACK_IMPORTED_MODULE_0__);

;
// generateTaskCard();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxLQUFLO0FBQ2pELDZEQUE2RCxvQkFBb0I7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2xHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOWTtBQUNaLENBQWtEO0FBQ2xELHNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbmNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgIGNvbnN0IHRleHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHRFZGl0Jyk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0ZXh0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCx0ZXh0RWxlbWVudCk7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgIGlucHV0Lm9uYmx1ciA9ICgpID0+e1xuICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4ge2VkaXRUZXh0fTtcbn0pKCk7XG5cbmNvbnN0IHRhc2tDcmVhdGlvbiA9ICgoKSA9PntcbiAgICBjb25zdCBnZW5lcmF0ZVRhc2tDYXJkID0gKCkgPT57XG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgY2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBjYXJkTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ3BsYWNlaG9sZGVyIHRpdGxlJztcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICBcbiAgICAgICAgLy9nb2luZyB0byB0cnkgYW5kIG1ha2UgdGhpcyBhIGZhbmN5IGNoZWNrIGJveCB0aGluZyB3aXRoIDQgbGV2ZWxzXG4gICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ3ByaW9yaXR5JztcbiAgICAgICAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICBcbiAgICAgICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSAnZHVlRGF0ZSc7XG4gICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgIFxuICAgICAgICAvL3NldHRpbmcgJ2NvbnRlbnRlZGl0YWJsZScgYXR0cmlidXRlIHRvIHRydWUgc2VlbXMgdG8geWVpbGQgYmV0dGVyIHJlc3VsdHMgZm9yIGRlc2NyaXB0aW9uP1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSAnZGVzY3JpcHRpb24gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gUmVwZWxsYXQgb2ZmaWNpaXMgbW9kaSBmdWdpdCBkaXN0aW5jdGlvIGRpZ25pc3NpbW9zIG1vbGVzdGlhcyBhbmltaSBjdW0hIFBlcnNwaWNpYXRpcyBzaW50IHVuZGUgbmlzaSBhY2N1c2FtdXMgZWFxdWUgZmFjZXJlLCBwb3Jybywgc2VxdWksIHNpdCBpbGxvIHF1YXMgZXZlbmlldC4nXG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgXG4gICAgICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgY2FyZEhlYWRlcixcbiAgICAgICAgICAgIGNhcmRNYWluLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgIFxuICAgICAgICBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgfTtcbiAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgIGNhcmQuYXBwZW5kKGNhcmRIZWFkZXIsY2FyZE1haW4pO1xuICAgICAgICBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICAgICAgY2FyZE1haW4uYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyVGFzayA9ICgpID0+e1xuICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIH07XG4gICAgcmV0dXJue2dlbmVyYXRlVGFza0NhcmQsY2xlYXJUYXNrfTtcbn0pKCk7XG5cbi8vIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9Pntcbi8vICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIH0pKCk7XG5cbm5ld1Rhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgdGFza0NyZWF0aW9uLmNsZWFyVGFzaygpO1xuICAgIHRhc2tDcmVhdGlvbi5nZW5lcmF0ZVRhc2tDYXJkKCk7XG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgdGFza0NyZWF0aW9uIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuLy8gZ2VuZXJhdGVUYXNrQ2FyZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==