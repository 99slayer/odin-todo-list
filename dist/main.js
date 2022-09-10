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
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newEdit',textElement)
            };
        };
        return {editText};
    })();

    const taskCreation = (() =>{
        //x is the taskObj
        const generateTaskCard = (x) =>{
            console.log(`The generated card is using this ID ${x.taskID}`);
            // console.log(`THIS CARD WAS GENERATED USING THIS INFO ${x.}`);
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
        
            // for(let i=elementNameArray.length-1;i>=0;--i){
            //     elementObj[elementNameArray[i]].classList.add(`${elementNameArray[i]}`);
            // };
            for(let i=elementNameArray.length-1;i>=0;--i){
                elementObj[elementNameArray[i]].setAttribute('id',`${elementNameArray[i]}`);
            };
            main.append(card);
            card.append(cardHeader,cardMain);
            cardHeader.append(title,priority,dueDate);
            cardMain.append(description);
            console.log(x);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('cardGenerated',x.taskID);
        };
        const clearTask = () =>{
            main.replaceChildren();
        };
        return{generateTaskCard,clearTask};
    })();
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        const generateTaskTabs = function(x){
            taskTabs.replaceChildren();
            // console.log(`x is ${x[0].taskID}`);
            x.forEach((e)=>{
                // const taskInfo = e;
                //can add more elements to the tabs later on
                const tab = document.createElement('div')
                const tabHeading = document.createElement('h3');
                tabHeading.textContent = `${e.title}`;
                tab.classList.add('tab')
                tab.setAttribute('data-tab-ID',`${e.taskID}`);
                tab.addEventListener('click',()=>{
                    taskCreation.generateTaskCard(e);
                });
                //taskInfo should be tab id?
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
    let currentTaskCardID = '';
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
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newTask',createTaskObj);
    const storeTask=(x)=>{
        taskStorageArray.push(x);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskObjStored',taskStorageArray);
        console.log('task has been stored and storage array has been published.');
    };
    const setCurrentTaskCard=(x)=>{
        currentTaskCardID = x;
        console.log(`currentTaskCard is ${currentTaskCardID}`);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('cardGenerated',setCurrentTaskCard);
    const editTaskObj=(textElement)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        //returns index of object that matches the currentTaskCardID
        taskStorageArray[index][`${textElement.id}`] = textElement.innerHTML;
        console.log(taskStorageArray[index]);
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editTaskObj);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTlk7QUFDWixDQUE0QyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9ET01GdW5jLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBjb25zdCBET01Nb2QgPSAoKCk9PntcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBjb25zdCB0YXNrVGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrVGFicycpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4gICAgY29uc3QgZWRpdEZ1bmMgPSAoKCk9PntcbiAgICAgICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3RWRpdCcsdGV4dEVsZW1lbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge2VkaXRUZXh0fTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICAvL3ggaXMgdGhlIHRhc2tPYmpcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrQ2FyZCA9ICh4KSA9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGUgZ2VuZXJhdGVkIGNhcmQgaXMgdXNpbmcgdGhpcyBJRCAke3gudGFza0lEfWApO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRISVMgQ0FSRCBXQVMgR0VORVJBVEVEIFVTSU5HIFRISVMgSU5GTyAke3gufWApO1xuICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL2dvaW5nIHRvIHRyeSBhbmQgbWFrZSB0aGlzIGEgZmFuY3kgY2hlY2sgYm94IHRoaW5nIHdpdGggNCBsZXZlbHNcbiAgICAgICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5fWA7XG4gICAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9zZXR0aW5nICdjb250ZW50ZWRpdGFibGUnIGF0dHJpYnV0ZSB0byB0cnVlIHNlZW1zIHRvIHllaWxkIGJldHRlciByZXN1bHRzIGZvciBkZXNjcmlwdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgY2FyZE1haW4sXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgLy8gICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLnNldEF0dHJpYnV0ZSgnaWQnLGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChjYXJkSGVhZGVyLGNhcmRNYWluKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXIuYXBwZW5kKHRpdGxlLHByaW9yaXR5LGR1ZURhdGUpO1xuICAgICAgICAgICAgY2FyZE1haW4uYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NhcmRHZW5lcmF0ZWQnLHgudGFza0lEKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYXJUYXNrID0gKCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVUYXNrQ2FyZCxjbGVhclRhc2t9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgeCBpcyAke3hbMF0udGFza0lEfWApO1xuICAgICAgICAgICAgeC5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRhc2tJbmZvID0gZTtcbiAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbW9yZSBlbGVtZW50cyB0byB0aGUgdGFicyBsYXRlciBvblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgdGFiSGVhZGluZy50ZXh0Q29udGVudCA9IGAke2UudGl0bGV9YDtcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0YXNrQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL3Rhc2tJbmZvIHNob3VsZCBiZSB0YWIgaWQ/XG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJIZWFkaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqU3RvcmVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKVxufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICBldmVudHM6e30sXG4gICAgc3Vic2NyaWJlOmZ1bmN0aW9uKGV2ZW50LGZuKXtcbiAgICAgICAgLy9jaGVja3MgZm9yIGV2ZW50IGFuZCBpZiBpdHMgYW4gYXJyYXlcbiAgICAgICAgLy9ub3Qgc3VyZSBpZiB0aGlzIGlzIHdvcmtpbmcgY29ycmVjdGx5IG8zbyAqXG4gICAgICAgIGlmKCEodGhpcy5ldmVudHNbZXZlbnRdKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtldmVudH0gYXJyYXkgZG9lc250IGV4aXN0IHdpdGhpbiBldmVudHMgb2JqZWN0LmApXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfVxuICAgICAgICAvL3B1c2hlcyBzdWJzY3JpYmVyIGZ1bmN0aW9uIGludG8gZXZlbnQgYXJyYXlcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goZm4pO1xuICAgICAgICBjb25zb2xlLmxvZygnZnVuY3Rpb24gcHVzaGVkLicpXG4gICAgfSxcbiAgICBwdWJsaXNoOmZ1bmN0aW9uKGV2ZW50LGRhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQgb2YgcHVibGlzaCBmdW5jdGlvbicpXG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBoYXMgYmVlbiBwdWJsaXNoZWQuJylcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuXG4gICAgLy8gfSxcbn07XG5leHBvcnQge3B1YnN1Yn07XG4vLyBjb25zdCB0YXNrRmFjdG9yeSA9ICh4KSA9Pntcbi8vICAgICAvL3ggaXMgZm9ybURhdGFcbi8vICAgICBjb25zdCB0aXRsZSA9IHgudGl0bGU7XG4vLyAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB4LmRlc2NyaXB0aW9uO1xuLy8gICAgIGNvbnN0IGR1ZURhdGUgPSB4LmR1ZURhdGU7XG4vLyAgICAgY29uc3QgcHJpb3JpdHkgPSB4LnByaW9yaXR5O1xuLy8gICAgIGNvbnN0IGxvZ1ByaW9yaXR5PSgpPT57XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHByaW9yaXR5KTtcbi8vICAgICB9O1xuLy8gICAgIC8vIGZ1bmN0aW9ucyBmb3IgZWRpdGluZyBlYWNoIHByb3BlcnR5PyBpbmhlcml0YW5jZSBpc3N1ZSpcbi8vICAgICBwdWJzdWIucHVibGlzaCgndGFza0NyZWF0ZWQnLHt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LGxvZ1ByaW9yaXR5fSlcbi8vICAgICByZXR1cm57dGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxsb2dQcmlvcml0eX1cbi8vIH1cbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2Zvcm1HcmFiJyx0YXNrRmFjdG9yeSlcblxuLy8gY29uc3QgdGFza1N0b3JhZ2UgPSBbXTtcbi8vIGNvbnN0IHN0b3JlVGFzayA9IGZ1bmN0aW9uKHgpe1xuLy8gICAgIGNvbnNvbGUubG9nKHgpO1xuLy8gICAgIHRhc2tTdG9yYWdlLnB1c2goeCk7XG4vLyAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2UpO1xuLy8gfTtcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tDcmVhdGVkJyxzdG9yZVRhc2spO1xuXG4vLyBjb25zdCB0ZXN0ID0gZnVuY3Rpb24oKXtcbi8vICAgICB0YXNrTGlzdC5mb3JFYWNoKChlKT0+e1xuLy8gICAgICAgICBlLmxvZ1ByaW9yaXR5KCk7XG4vLyAgICAgfSk7XG4vLyB9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YXNrT2JqTW9kdWxlID0gKCgpPT57XG4gICAgY29uc3QgdGFza1N0b3JhZ2VBcnJheSA9IFtdO1xuICAgIGxldCBjdXJyZW50VGFza0NhcmRJRCA9ICcnO1xuICAgIGNvbnN0IGNyZWF0ZVRhc2tPYmogPSh4KT0+e1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgSUQgaGVyZT8gYW5kIHBhc3MgaXQgdG8gRE9NRnVuYz9cbiAgICAgICAgY29uc3QgdGFza01ha2VyID0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAndGVzdCc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ3Rlc3QnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAndGVzdCc7XG4gICAgICAgICAgICAvL2NoZWNrIGZvciBkdXBsaWNhdGUgaWQncyBpbiB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24sdGFza0lEfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBzdG9yZVRhc2sodGFza01ha2VyKCkpO1xuICAgICAgICAgICAgLy9wdWJsaXNoZXMgbmV3IHRhc2tPYmpcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrT2JqQ3JlYXRlZCcsdGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2snLGNyZWF0ZVRhc2tPYmopO1xuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YXNrIGhhcyBiZWVuIHN0b3JlZCBhbmQgc3RvcmFnZSBhcnJheSBoYXMgYmVlbiBwdWJsaXNoZWQuJyk7XG4gICAgfTtcbiAgICBjb25zdCBzZXRDdXJyZW50VGFza0NhcmQ9KHgpPT57XG4gICAgICAgIGN1cnJlbnRUYXNrQ2FyZElEID0geDtcbiAgICAgICAgY29uc29sZS5sb2coYGN1cnJlbnRUYXNrQ2FyZCBpcyAke2N1cnJlbnRUYXNrQ2FyZElEfWApO1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnY2FyZEdlbmVyYXRlZCcsc2V0Q3VycmVudFRhc2tDYXJkKTtcbiAgICBjb25zdCBlZGl0VGFza09iaj0odGV4dEVsZW1lbnQpPT57XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5maW5kSW5kZXgoZSA9PiBlLnRhc2tJRCA9PSBjdXJyZW50VGFza0NhcmRJRCk7XG4gICAgICAgIC8vcmV0dXJucyBpbmRleCBvZiBvYmplY3QgdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50VGFza0NhcmRJRFxuICAgICAgICB0YXNrU3RvcmFnZUFycmF5W2luZGV4XVtgJHt0ZXh0RWxlbWVudC5pZH1gXSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza09iaik7XG59KSgpO1xuXG5leHBvcnR7dGFza09iak1vZHVsZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NTW9kIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuaW1wb3J0IHsgdGFza09iak1vZHVsZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy90YXNrQ3JlYXRvclwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9