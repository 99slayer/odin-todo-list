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
/* harmony export */   "DOMMod": () => (/* binding */ DOMMod)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/functions/pubsub.js");


const DOMMod = (()=>{
    const sidebar = document.getElementById('sidebar');
    const taskTabs = document.getElementById('taskTabs');
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
        //x is the taskObj
        const generateTaskCard = (x) =>{
            main.replaceChildren();
            const card = document.createElement('div');
            const cardHeader = document.createElement('div');
            const cardMain = document.createElement('div');
        
            const title = document.createElement('h2');
            title.textContent = `${x.title}`;
            title.classList.add('editable');
            title.addEventListener('click',editFunc.editText);
        
            //going to try and make this a fancy check box thing with 4 levels
            //priority will have 4 levels: critical, important, normal, and finished.
            const priority = document.createElement('p');
            priority.textContent = `${x.priority}`;
            priority.classList.add('editable');
            priority.addEventListener('click',editFunc.editText);
        
            //we're gonna try something with an outside library here later.
            const dueDate = document.createElement('p');
            dueDate.textContent = `${x.dueDate}`;
            dueDate.classList.add('editable');
            dueDate.addEventListener('click',editFunc.editText);
        
            //setting 'contenteditable' attribute to true seems to yeild better results for description?
            const description = document.createElement('p');
            description.setAttribute('contenteditable','true')
            description.textContent = `${x.description}`;
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
            console.log('card generated')
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('',)
        const clearTask = () =>{
            main.replaceChildren();
        };
        return{generateTaskCard,clearTask};
    })();
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        const generateTaskTabs = function(x){
            taskTabs.replaceChildren();
            x.forEach((e)=>{
                const taskInfo = e;
                console.log(taskInfo);
                //can add more elements to the tabs later on
                const tab = document.createElement('div')
                const tabHeading = document.createElement('h3');
                tabHeading.textContent = `${e.title}`;
                tab.classList.add('tab')
                tab.setAttribute('data-tab-ID',`${e.taskID}`);
                tab.addEventListener('click',()=>{
                    taskCreation.generateTaskCard(taskInfo);
                });
                taskTabs.append(tab);
                tab.append(tabHeading);
            });
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjStored',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newTask',true);
        }
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjCreated',taskCreation.generateTaskCard)
    })()

})();

/***/ }),

/***/ "./src/functions/pubsub.js":
/*!*********************************!*\
  !*** ./src/functions/pubsub.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pubsub": () => (/* binding */ pubsub)
/* harmony export */ });
// const grabForm = function(){
//     const formGrab = {
//         title:title.value,
//         description:description.value,
//         dueDate:dueDate.value,
//         priority:priority.value,
//     }
//     console.log(formGrab);
//     pubsub.publish('formGrab',formGrab);
//     //clears old input
//     const domArray = [title,description,dueDate,priority];
//     domArray.forEach((e)=>{
//         e.value = '';
//     });
// };

const pubsub = {
    events:{},
    subscribe:function(event,fn){
        //checks for event and if its an array
        //not sure if this is working correctly o3o *
        if(!(this.events[event])){
            console.log(`${event} array doesnt exist within events object.`)
            this.events[event] = [];
            console.log(this.events);
        }
        //pushes subscriber function into event array
        this.events[event].push(fn);
        console.log('function pushed.')
    },
    publish:function(event,data){
        console.log('start of publish function')
        //check for event array
        if(this.events[event]){
            this.events[event].forEach((e)=>{
                console.log('data has been published.')
                e(data);
            });
        };
    },
    // unsubscribe:function(){

    // },
};

// const taskFactory = (x) =>{
//     //x is formData
//     const title = x.title;
//     const description = x.description;
//     const dueDate = x.dueDate;
//     const priority = x.priority;
//     const logPriority=()=>{
//         console.log(priority);
//     };
//     // functions for editing each property? inheritance issue*
//     pubsub.publish('taskCreated',{title,description,dueDate,priority,logPriority})
//     return{title,description,dueDate,priority,logPriority}
// }
// pubsub.subscribe('formGrab',taskFactory)

// const taskStorage = [];
// const storeTask = function(x){
//     console.log(x);
//     taskStorage.push(x);
//     console.log(taskStorage);
// };
// pubsub.subscribe('taskCreated',storeTask);

// const test = function(){
//     taskList.forEach((e)=>{
//         e.logPriority();
//     });
// };

/***/ }),

/***/ "./src/functions/taskCreator.js":
/*!**************************************!*\
  !*** ./src/functions/taskCreator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskObjModule": () => (/* binding */ taskObjModule)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/functions/pubsub.js");


const taskObjModule = (()=>{
    const taskStorageArray = [];
    const createTaskObj =(x)=>{
        // console.log(x);
        // generate ID here? and pass it to DOMFunc?
        const taskMaker =()=>{
            const title = 'Untitled';
            const priority = 'test';
            const dueDate = 'test';
            const description = 'test';
            //check for duplicate id's in task storage array
            const taskID = Math.floor(Math.random()*10000);
            return {title,priority,dueDate,description,taskID};
        };
        if(x){
            storeTask(taskMaker());
            //publishes new taskObj
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskObjCreated',taskStorageArray[taskStorageArray.length-1]);
            console.log(taskStorageArray[taskStorageArray.length-1]);
        };
    };
    const storeTask =(x)=>{
        taskStorageArray.push(x);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskObjStored',taskStorageArray);
        console.log('task has been stored and storage array has been published.')
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newTask',createTaskObj);
    // pubsub.subscribe('editTitle',)
})();



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
/* harmony import */ var _functions_taskCreator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/taskCreator */ "./src/functions/taskCreator.js");

;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRTNCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxRQUFRO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxXQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsVUFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEtBQUs7QUFDckQsaUVBQWlFLG9CQUFvQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0Esa0RBQWtELFNBQVM7QUFDM0Q7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsUUFBUSxxREFBZ0I7QUFDeEIsZ0JBQWdCO0FBQ2hCLEtBQUs7O0FBRUw7QUFDQTtBQUNBLFlBQVksbURBQWM7QUFDMUI7QUFDQSxRQUFRLHFEQUFnQjtBQUN4QixLQUFLOztBQUVMLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDbElEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBLFFBQVE7QUFDUjtBQUNnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywrQ0FBK0M7QUFDcEYsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOzs7Ozs7Ozs7Ozs7Ozs7QUN4RWtDOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjtBQUNwQjtBQUNBLENBQUM7Ozs7Ozs7O1VDOUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTlk7QUFDWixDQUE0QyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9ET01GdW5jLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBjb25zdCBET01Nb2QgPSAoKCk9PntcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBjb25zdCB0YXNrVGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrVGFicycpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4gICAgY29uc3QgZWRpdEZ1bmMgPSAoKCk9PntcbiAgICAgICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7ZWRpdFRleHR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB0YXNrQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIC8veCBpcyB0aGUgdGFza09ialxuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tDYXJkID0gKHgpID0+e1xuICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL2dvaW5nIHRvIHRyeSBhbmQgbWFrZSB0aGlzIGEgZmFuY3kgY2hlY2sgYm94IHRoaW5nIHdpdGggNCBsZXZlbHNcbiAgICAgICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5fWA7XG4gICAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9zZXR0aW5nICdjb250ZW50ZWRpdGFibGUnIGF0dHJpYnV0ZSB0byB0cnVlIHNlZW1zIHRvIHllaWxkIGJldHRlciByZXN1bHRzIGZvciBkZXNjcmlwdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgY2FyZE1haW4sXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG4gICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kKGNhcmQpO1xuICAgICAgICAgICAgY2FyZC5hcHBlbmQoY2FyZEhlYWRlcixjYXJkTWFpbik7XG4gICAgICAgICAgICBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRNYWluLmFwcGVuZChkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2FyZCBnZW5lcmF0ZWQnKVxuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCcnLClcbiAgICAgICAgY29uc3QgY2xlYXJUYXNrID0gKCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVUYXNrQ2FyZCxjbGVhclRhc2t9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB4LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0luZm8gPSBlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tJbmZvKTtcbiAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbW9yZSBlbGVtZW50cyB0byB0aGUgdGFicyBsYXRlciBvblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgdGFiSGVhZGluZy50ZXh0Q29udGVudCA9IGAke2UudGl0bGV9YDtcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0YXNrQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZCh0YXNrSW5mbyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJIZWFkaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqU3RvcmVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKVxuXG59KSgpOyIsIi8vIGNvbnN0IGdyYWJGb3JtID0gZnVuY3Rpb24oKXtcbi8vICAgICBjb25zdCBmb3JtR3JhYiA9IHtcbi8vICAgICAgICAgdGl0bGU6dGl0bGUudmFsdWUsXG4vLyAgICAgICAgIGRlc2NyaXB0aW9uOmRlc2NyaXB0aW9uLnZhbHVlLFxuLy8gICAgICAgICBkdWVEYXRlOmR1ZURhdGUudmFsdWUsXG4vLyAgICAgICAgIHByaW9yaXR5OnByaW9yaXR5LnZhbHVlLFxuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhmb3JtR3JhYik7XG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ2Zvcm1HcmFiJyxmb3JtR3JhYik7XG4vLyAgICAgLy9jbGVhcnMgb2xkIGlucHV0XG4vLyAgICAgY29uc3QgZG9tQXJyYXkgPSBbdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eV07XG4vLyAgICAgZG9tQXJyYXkuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS52YWx1ZSA9ICcnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgcHVic3ViID0ge1xuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICAvL25vdCBzdXJlIGlmIHRoaXMgaXMgd29ya2luZyBjb3JyZWN0bHkgbzNvICpcbiAgICAgICAgaWYoISh0aGlzLmV2ZW50c1tldmVudF0pKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2V2ZW50fSBhcnJheSBkb2VzbnQgZXhpc3Qgd2l0aGluIGV2ZW50cyBvYmplY3QuYClcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vcHVzaGVzIHN1YnNjcmliZXIgZnVuY3Rpb24gaW50byBldmVudCBhcnJheVxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChmbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBwdXNoZWQuJylcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBvZiBwdWJsaXNoIGZ1bmN0aW9uJylcbiAgICAgICAgLy9jaGVjayBmb3IgZXZlbnQgYXJyYXlcbiAgICAgICAgaWYodGhpcy5ldmVudHNbZXZlbnRdKXtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGhhcyBiZWVuIHB1Ymxpc2hlZC4nKVxuICAgICAgICAgICAgICAgIGUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vIHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7XG5cbiAgICAvLyB9LFxufTtcbmV4cG9ydCB7cHVic3VifTtcbi8vIGNvbnN0IHRhc2tGYWN0b3J5ID0gKHgpID0+e1xuLy8gICAgIC8veCBpcyBmb3JtRGF0YVxuLy8gICAgIGNvbnN0IHRpdGxlID0geC50aXRsZTtcbi8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHguZGVzY3JpcHRpb247XG4vLyAgICAgY29uc3QgZHVlRGF0ZSA9IHguZHVlRGF0ZTtcbi8vICAgICBjb25zdCBwcmlvcml0eSA9IHgucHJpb3JpdHk7XG4vLyAgICAgY29uc3QgbG9nUHJpb3JpdHk9KCk9Pntcbi8vICAgICAgICAgY29uc29sZS5sb2cocHJpb3JpdHkpO1xuLy8gICAgIH07XG4vLyAgICAgLy8gZnVuY3Rpb25zIGZvciBlZGl0aW5nIGVhY2ggcHJvcGVydHk/IGluaGVyaXRhbmNlIGlzc3VlKlxuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrQ3JlYXRlZCcse3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9KVxuLy8gICAgIHJldHVybnt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LGxvZ1ByaW9yaXR5fVxuLy8gfVxuLy8gcHVic3ViLnN1YnNjcmliZSgnZm9ybUdyYWInLHRhc2tGYWN0b3J5KVxuXG4vLyBjb25zdCB0YXNrU3RvcmFnZSA9IFtdO1xuLy8gY29uc3Qgc3RvcmVUYXNrID0gZnVuY3Rpb24oeCl7XG4vLyAgICAgY29uc29sZS5sb2coeCk7XG4vLyAgICAgdGFza1N0b3JhZ2UucHVzaCh4KTtcbi8vICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZSk7XG4vLyB9O1xuLy8gcHVic3ViLnN1YnNjcmliZSgndGFza0NyZWF0ZWQnLHN0b3JlVGFzayk7XG5cbi8vIGNvbnN0IHRlc3QgPSBmdW5jdGlvbigpe1xuLy8gICAgIHRhc2tMaXN0LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUubG9nUHJpb3JpdHkoKTtcbi8vICAgICB9KTtcbi8vIH07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBJRCBoZXJlPyBhbmQgcGFzcyBpdCB0byBET01GdW5jP1xuICAgICAgICBjb25zdCB0YXNrTWFrZXIgPSgpPT57XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICdVbnRpdGxlZCc7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9ICd0ZXN0JztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAndGVzdCc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICd0ZXN0JztcbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgdGFza0lEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbix0YXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlVGFzayh0YXNrTWFrZXIoKSk7XG4gICAgICAgICAgICAvL3B1Ymxpc2hlcyBuZXcgdGFza09ialxuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgY29uc3Qgc3RvcmVUYXNrID0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YXNrIGhhcyBiZWVuIHN0b3JlZCBhbmQgc3RvcmFnZSBhcnJheSBoYXMgYmVlbiBwdWJsaXNoZWQuJylcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2snLGNyZWF0ZVRhc2tPYmopO1xuICAgIC8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2VkaXRUaXRsZScsKVxufSkoKTtcblxuZXhwb3J0e3Rhc2tPYmpNb2R1bGV9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcbmltcG9ydCB7IERPTU1vZCB9IGZyb20gXCIuL2Z1bmN0aW9ucy9ET01GdW5jXCJcbmltcG9ydCB7IHRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvdGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==