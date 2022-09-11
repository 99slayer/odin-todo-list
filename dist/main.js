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
            const cardHeaderCont1 = document.createElement('div');
            const cardHeaderCont2 = document.createElement('div');
            const cardMain = document.createElement('div');
        
            const title = document.createElement('h2');
            title.textContent = `${x.title}`;
            title.classList.add('editable');
            title.addEventListener('click',editFunc.editText);
        
            //going to try and make this a fancy check box thing with 4 levels
            //priority will have 4 levels: critical, important, normal, and finished.
            //div form label+input*4

            const priorityCont = document.createElement('div');
            
            const priorityText = document.createElement('h5');
            priorityText.textContent = 'test text';
            // allcaps?
            // priorityText.textContent = active radio button
            const priorityForm = document.createElement('form');

            const criticalLabel = document.createElement('label');
            criticalLabel.setAttribute('for','criticalInput');
            const importantLabel = document.createElement('label');
            importantLabel.setAttribute('for','importantInput');
            const normalLabel = document.createElement('label');
            normalLabel.setAttribute('for','normalInput');
            const finishedLabel = document.createElement('label');
            finishedLabel.setAttribute('for','finishedInput');

            const criticalInput = document.createElement('input');
            criticalInput.setAttribute('type','radio');
            criticalInput.setAttribute('value','critical');
            criticalInput.setAttribute('name','priority');
            const importantInput = document.createElement('input');
            importantInput.setAttribute('type','radio');
            importantInput.setAttribute('value','important');
            importantInput.setAttribute('name','priority');
            const normalInput = document.createElement('input');
            normalInput.setAttribute('type','radio');
            normalInput.setAttribute('value','normal');
            normalInput.setAttribute('name','priority');
            const finishedInput = document.createElement('input');
            finishedInput.setAttribute('type','radio');
            finishedInput.setAttribute('value','finished');
            finishedInput.setAttribute('name','priority');

            // const priority = document.createElement('p');
            // priority.textContent = `${x.priority}`;
            // priority.classList.add('editable');
            // priority.addEventListener('click',editFunc.editText);
        
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
                cardHeaderCont1,
                priorityCont,
                priorityText,
                priorityForm,
                criticalLabel,
                criticalInput,
                importantLabel,
                importantInput,
                normalLabel,
                normalInput,
                finishedLabel,
                finishedInput,
                cardHeaderCont2,
                cardMain,
                title,
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
            // cardHeader.append(title,priority,dueDate);
            cardHeader.append(cardHeaderCont1,cardHeaderCont2);
            cardHeaderCont1.append(title,priorityCont);
            priorityCont.append(priorityText,priorityForm);
            priorityForm.append(criticalLabel,criticalInput,importantLabel,importantInput,normalLabel,normalInput,finishedLabel,finishedInput);
            cardHeaderCont2.append(dueDate);
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
            const priority = '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWdCO0FBQ3BCO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBLElBQUkscURBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxlQUFlO0FBQ2xEO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjtBQUNwQixDQUFDOzs7Ozs7OztVQzFDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBNEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kID0gKCgpPT57XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgY29uc3QgdGFza1RhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1RhYnMnKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Rhc2tCdXR0b24nKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcblxuICAgIGNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgICAgIGNvbnN0IGVkaXRUZXh0ID0oZXZlbnQpPT57ICAgIFxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dEVkaXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlucHV0LHRleHRFbGVtZW50KTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vZm9yIGVudGVyIGtleVxuICAgICAgICAgICAgaW5wdXQub25rZXlkb3duID0gKGV2KSA9PntcbiAgICAgICAgICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2ZvciBjbGlja2luZyBvZmYgaW5wdXRcbiAgICAgICAgICAgIGlucHV0Lm9uYmx1ciA9ICgpID0+e1xuICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5pbm5lckhUTUwgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLHRleHRFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtlZGl0VGV4dH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0NhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlIGdlbmVyYXRlZCBjYXJkIGlzIHVzaW5nIHRoaXMgSUQgJHt4LnRhc2tJRH1gKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUSElTIENBUkQgV0FTIEdFTkVSQVRFRCBVU0lORyBUSElTIElORk8gJHt4Ln1gKTtcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZE1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGAke3gudGl0bGV9YDtcbiAgICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vZ29pbmcgdG8gdHJ5IGFuZCBtYWtlIHRoaXMgYSBmYW5jeSBjaGVjayBib3ggdGhpbmcgd2l0aCA0IGxldmVsc1xuICAgICAgICAgICAgLy9wcmlvcml0eSB3aWxsIGhhdmUgNCBsZXZlbHM6IGNyaXRpY2FsLCBpbXBvcnRhbnQsIG5vcm1hbCwgYW5kIGZpbmlzaGVkLlxuICAgICAgICAgICAgLy9kaXYgZm9ybSBsYWJlbCtpbnB1dCo0XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Q29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gJ3Rlc3QgdGV4dCc7XG4gICAgICAgICAgICAvLyBhbGxjYXBzP1xuICAgICAgICAgICAgLy8gcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYWN0aXZlIHJhZGlvIGJ1dHRvblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdjcml0aWNhbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ltcG9ydGFudElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBub3JtYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ25vcm1hbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdmaW5pc2hlZElucHV0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnY3JpdGljYWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdub3JtYWwnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG5cbiAgICAgICAgICAgIC8vIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgLy8gcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5fWA7XG4gICAgICAgICAgICAvLyBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgLy8gcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9zZXR0aW5nICdjb250ZW50ZWRpdGFibGUnIGF0dHJpYnV0ZSB0byB0cnVlIHNlZW1zIHRvIHllaWxkIGJldHRlciByZXN1bHRzIGZvciBkZXNjcmlwdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwsXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRMYWJlbCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dCxcbiAgICAgICAgICAgICAgICBub3JtYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZExhYmVsLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLFxuICAgICAgICAgICAgICAgIGNhcmRNYWluLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgIC8vICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5zZXRBdHRyaWJ1dGUoJ2lkJyxgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kKGNhcmQpO1xuICAgICAgICAgICAgY2FyZC5hcHBlbmQoY2FyZEhlYWRlcixjYXJkTWFpbik7XG4gICAgICAgICAgICAvLyBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXIuYXBwZW5kKGNhcmRIZWFkZXJDb250MSxjYXJkSGVhZGVyQ29udDIpO1xuICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLmFwcGVuZCh0aXRsZSxwcmlvcml0eUNvbnQpO1xuICAgICAgICAgICAgcHJpb3JpdHlDb250LmFwcGVuZChwcmlvcml0eVRleHQscHJpb3JpdHlGb3JtKTtcbiAgICAgICAgICAgIHByaW9yaXR5Rm9ybS5hcHBlbmQoY3JpdGljYWxMYWJlbCxjcml0aWNhbElucHV0LGltcG9ydGFudExhYmVsLGltcG9ydGFudElucHV0LG5vcm1hbExhYmVsLG5vcm1hbElucHV0LGZpbmlzaGVkTGFiZWwsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDIuYXBwZW5kKGR1ZURhdGUpO1xuICAgICAgICAgICAgY2FyZE1haW4uYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NhcmRHZW5lcmF0ZWQnLHgudGFza0lEKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYXJUYXNrID0gKCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVUYXNrQ2FyZCxjbGVhclRhc2t9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgeCBpcyAke3hbMF0udGFza0lEfWApO1xuICAgICAgICAgICAgeC5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRhc2tJbmZvID0gZTtcbiAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbW9yZSBlbGVtZW50cyB0byB0aGUgdGFicyBsYXRlciBvblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgdGFiSGVhZGluZy50ZXh0Q29udGVudCA9IGAke2UudGl0bGV9YDtcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0YXNrQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvL3Rhc2tJbmZvIHNob3VsZCBiZSB0YWIgaWQ/XG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJIZWFkaW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqU3RvcmVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKVxufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICBldmVudHM6e30sXG4gICAgc3Vic2NyaWJlOmZ1bmN0aW9uKGV2ZW50LGZuKXtcbiAgICAgICAgLy9jaGVja3MgZm9yIGV2ZW50IGFuZCBpZiBpdHMgYW4gYXJyYXlcbiAgICAgICAgLy9ub3Qgc3VyZSBpZiB0aGlzIGlzIHdvcmtpbmcgY29ycmVjdGx5IG8zbyAqXG4gICAgICAgIGlmKCEodGhpcy5ldmVudHNbZXZlbnRdKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtldmVudH0gYXJyYXkgZG9lc250IGV4aXN0IHdpdGhpbiBldmVudHMgb2JqZWN0LmApXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfVxuICAgICAgICAvL3B1c2hlcyBzdWJzY3JpYmVyIGZ1bmN0aW9uIGludG8gZXZlbnQgYXJyYXlcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goZm4pO1xuICAgICAgICBjb25zb2xlLmxvZygnZnVuY3Rpb24gcHVzaGVkLicpXG4gICAgfSxcbiAgICBwdWJsaXNoOmZ1bmN0aW9uKGV2ZW50LGRhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQgb2YgcHVibGlzaCBmdW5jdGlvbicpXG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBoYXMgYmVlbiBwdWJsaXNoZWQuJylcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuXG4gICAgLy8gfSxcbn07XG5leHBvcnQge3B1YnN1Yn07XG4vLyBjb25zdCB0YXNrRmFjdG9yeSA9ICh4KSA9Pntcbi8vICAgICAvL3ggaXMgZm9ybURhdGFcbi8vICAgICBjb25zdCB0aXRsZSA9IHgudGl0bGU7XG4vLyAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB4LmRlc2NyaXB0aW9uO1xuLy8gICAgIGNvbnN0IGR1ZURhdGUgPSB4LmR1ZURhdGU7XG4vLyAgICAgY29uc3QgcHJpb3JpdHkgPSB4LnByaW9yaXR5O1xuLy8gICAgIGNvbnN0IGxvZ1ByaW9yaXR5PSgpPT57XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHByaW9yaXR5KTtcbi8vICAgICB9O1xuLy8gICAgIC8vIGZ1bmN0aW9ucyBmb3IgZWRpdGluZyBlYWNoIHByb3BlcnR5PyBpbmhlcml0YW5jZSBpc3N1ZSpcbi8vICAgICBwdWJzdWIucHVibGlzaCgndGFza0NyZWF0ZWQnLHt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LGxvZ1ByaW9yaXR5fSlcbi8vICAgICByZXR1cm57dGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxsb2dQcmlvcml0eX1cbi8vIH1cbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2Zvcm1HcmFiJyx0YXNrRmFjdG9yeSlcblxuLy8gY29uc3QgdGFza1N0b3JhZ2UgPSBbXTtcbi8vIGNvbnN0IHN0b3JlVGFzayA9IGZ1bmN0aW9uKHgpe1xuLy8gICAgIGNvbnNvbGUubG9nKHgpO1xuLy8gICAgIHRhc2tTdG9yYWdlLnB1c2goeCk7XG4vLyAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2UpO1xuLy8gfTtcbi8vIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tDcmVhdGVkJyxzdG9yZVRhc2spO1xuXG4vLyBjb25zdCB0ZXN0ID0gZnVuY3Rpb24oKXtcbi8vICAgICB0YXNrTGlzdC5mb3JFYWNoKChlKT0+e1xuLy8gICAgICAgICBlLmxvZ1ByaW9yaXR5KCk7XG4vLyAgICAgfSk7XG4vLyB9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YXNrT2JqTW9kdWxlID0gKCgpPT57XG4gICAgY29uc3QgdGFza1N0b3JhZ2VBcnJheSA9IFtdO1xuICAgIGxldCBjdXJyZW50VGFza0NhcmRJRCA9ICcnO1xuICAgIGNvbnN0IGNyZWF0ZVRhc2tPYmogPSh4KT0+e1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgSUQgaGVyZT8gYW5kIHBhc3MgaXQgdG8gRE9NRnVuYz9cbiAgICAgICAgY29uc3QgdGFza01ha2VyID0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAndGVzdCc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICd0ZXN0JztcbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgdGFza0lEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbix0YXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlVGFzayh0YXNrTWFrZXIoKSk7XG4gICAgICAgICAgICAvL3B1Ymxpc2hlcyBuZXcgdGFza09ialxuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3VGFzaycsY3JlYXRlVGFza09iaik7XG4gICAgY29uc3Qgc3RvcmVUYXNrPSh4KT0+e1xuICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnB1c2goeCk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrT2JqU3RvcmVkJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3Rhc2sgaGFzIGJlZW4gc3RvcmVkIGFuZCBzdG9yYWdlIGFycmF5IGhhcyBiZWVuIHB1Ymxpc2hlZC4nKTtcbiAgICB9O1xuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrQ2FyZD0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2tDYXJkSUQgPSB4O1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudFRhc2tDYXJkIGlzICR7Y3VycmVudFRhc2tDYXJkSUR9YCk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXJkR2VuZXJhdGVkJyxzZXRDdXJyZW50VGFza0NhcmQpO1xuICAgIGNvbnN0IGVkaXRUYXNrT2JqPSh0ZXh0RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnRUYXNrQ2FyZElEXG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdW2Ake3RleHRFbGVtZW50LmlkfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRUYXNrT2JqKTtcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=