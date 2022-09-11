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
            if(x.priority == 'critical'){
                criticalInput.setAttribute('checked','true');
            };

            criticalInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',criticalInput);
            })

            criticalInput.onclick = function(){
                console.log(criticalInput.checked);
                console.log(importantInput.checked);
                console.log(normalInput.checked);
                console.log(finishedInput.checked);
            }

            const importantInput = document.createElement('input');
            importantInput.setAttribute('type','radio');
            importantInput.setAttribute('value','important');
            importantInput.setAttribute('name','priority');
            if(x.priority == 'important'){
                importantInput.setAttribute('checked','true');
            };

            importantInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',importantInput);
            });

            importantInput.onclick = function(){
                console.log(criticalInput.checked);
                console.log(importantInput.checked);
                console.log(normalInput.checked);
                console.log(finishedInput.checked);
            }

            const normalInput = document.createElement('input');
            normalInput.setAttribute('type','radio');
            normalInput.setAttribute('value','normal');
            normalInput.setAttribute('name','priority');
            if(x.priority == 'normal'){
                normalInput.setAttribute('checked','true');
            };

            normalInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',normalInput);
            });

            normalInput.onclick = function(){
                console.log(criticalInput.checked);
                console.log(importantInput.checked);
                console.log(normalInput.checked);
                console.log(finishedInput.checked);
            }
            
            const finishedInput = document.createElement('input');
            finishedInput.setAttribute('type','radio');
            finishedInput.setAttribute('value','finished');
            finishedInput.setAttribute('name','priority');
            if(x.priority == 'finished'){
                finishedInput.setAttribute('checked','true');
            };

            finishedInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',finishedInput);
            });

            finishedInput.onclick = function(){
                console.log(criticalInput.checked);
                console.log(importantInput.checked);
                console.log(normalInput.checked);
                console.log(finishedInput.checked);
            }

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

    const editTaskText=(textElement)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        //returns index of object that matches the currentTaskCardID
        taskStorageArray[index][`${textElement.id}`] = textElement.innerHTML;
        console.log(taskStorageArray[index]);
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editTaskText);

    const editTaskPriority=(x)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        if(x.checked){
            taskStorageArray[index].priority = x.value;
            console.log(taskStorageArray[index]);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('priorityChange',editTaskPriority)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQTRDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdGFza0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGNvbnN0IERPTU1vZCA9ICgoKT0+e1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IHRhc2tUYWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tUYWJzJyk7XG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdUYXNrQnV0dG9uJyk7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbiAgICBjb25zdCBlZGl0RnVuYyA9ICgoKT0+e1xuICAgICAgICBjb25zdCBlZGl0VGV4dCA9KGV2ZW50KT0+eyAgICBcbiAgICAgICAgICAgIGNvbnN0IHRleHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHRFZGl0Jyk7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCx0ZXh0RWxlbWVudCk7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuXG4gICAgICAgICAgICAvL2ZvciBlbnRlciBrZXlcbiAgICAgICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICAgICAgaWYoZXYua2V5ID09ICdFbnRlcicpe1xuICAgICAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgICAgICBpbnB1dC5vbmJsdXIgPSAoKSA9PntcbiAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZmluaXNoRWRpdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdFZGl0Jyx0ZXh0RWxlbWVudClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7ZWRpdFRleHR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB0YXNrQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIC8veCBpcyB0aGUgdGFza09ialxuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tDYXJkID0gKHgpID0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZSBnZW5lcmF0ZWQgY2FyZCBpcyB1c2luZyB0aGlzIElEICR7eC50YXNrSUR9YCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgVEhJUyBDQVJEIFdBUyBHRU5FUkFURUQgVVNJTkcgVEhJUyBJTkZPICR7eC59YCk7XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL2dvaW5nIHRvIHRyeSBhbmQgbWFrZSB0aGlzIGEgZmFuY3kgY2hlY2sgYm94IHRoaW5nIHdpdGggNCBsZXZlbHNcbiAgICAgICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgICAgIC8vZGl2IGZvcm0gbGFiZWwraW5wdXQqNFxuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9ICd0ZXN0IHRleHQnO1xuICAgICAgICAgICAgLy8gYWxsY2Fwcz9cbiAgICAgICAgICAgIC8vIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGFjdGl2ZSByYWRpbyBidXR0b25cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjcml0aWNhbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnY3JpdGljYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdpbXBvcnRhbnRJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbm9ybWFsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBmaW5pc2hlZExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnZmluaXNoZWRJbnB1dCcpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdjcml0aWNhbCcpe1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGNyaXRpY2FsSW5wdXQpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjcml0aWNhbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGFudElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vcm1hbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbmlzaGVkSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnaW1wb3J0YW50Jyl7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxpbXBvcnRhbnRJbnB1dCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3JpdGljYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub3JtYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5pc2hlZElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ25vcm1hbCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ25vcm1hbCcpe1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG5vcm1hbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsbm9ybWFsSW5wdXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5vcm1hbElucHV0Lm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNyaXRpY2FsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0YW50SW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobm9ybWFsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmluaXNoZWRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmaW5pc2hlZElucHV0Lm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNyaXRpY2FsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0YW50SW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobm9ybWFsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmluaXNoZWRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAvLyBwcmlvcml0eS50ZXh0Q29udGVudCA9IGAke3gucHJpb3JpdHl9YDtcbiAgICAgICAgICAgIC8vIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICAvLyBwcmlvcml0eS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vd2UncmUgZ29ubmEgdHJ5IHNvbWV0aGluZyB3aXRoIGFuIG91dHNpZGUgbGlicmFyeSBoZXJlIGxhdGVyLlxuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHt4LmR1ZURhdGV9YDtcbiAgICAgICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3NldHRpbmcgJ2NvbnRlbnRlZGl0YWJsZScgYXR0cmlidXRlIHRvIHRydWUgc2VlbXMgdG8geWVpbGQgYmV0dGVyIHJlc3VsdHMgZm9yIGRlc2NyaXB0aW9uP1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsJ3RydWUnKVxuICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt4LmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50T2JqID0ge1xuICAgICAgICAgICAgICAgIGNhcmQsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlcixcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyQ29udDEsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0sXG4gICAgICAgICAgICAgICAgY3JpdGljYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LFxuICAgICAgICAgICAgICAgIGltcG9ydGFudExhYmVsLFxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LFxuICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLFxuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dCxcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyQ29udDIsXG4gICAgICAgICAgICAgICAgY2FyZE1haW4sXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgLy8gICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLnNldEF0dHJpYnV0ZSgnaWQnLGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChjYXJkSGVhZGVyLGNhcmRNYWluKTtcbiAgICAgICAgICAgIC8vIGNhcmRIZWFkZXIuYXBwZW5kKHRpdGxlLHByaW9yaXR5LGR1ZURhdGUpO1xuICAgICAgICAgICAgY2FyZEhlYWRlci5hcHBlbmQoY2FyZEhlYWRlckNvbnQxLGNhcmRIZWFkZXJDb250Mik7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkTWFpbi5hcHBlbmQoZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coeCk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY2FyZEdlbmVyYXRlZCcseC50YXNrSUQpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhclRhc2sgPSAoKSA9PntcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybntnZW5lcmF0ZVRhc2tDYXJkLGNsZWFyVGFza307XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2Z1bmN0aW9uIHRvIGdlbmVyYXRlIHNpZGViYXIgdGFicyB3aGVuZXZlciBhIG5ldyB0YXNrT2JqIGlzIHN0b3JlZC4ob3IgY2hhbmdlZCkuXG4gICAgY29uc3QgdGFza1RhYkNyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tUYWJzID0gZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB0YXNrVGFicy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGB4IGlzICR7eFswXS50YXNrSUR9YCk7XG4gICAgICAgICAgICB4LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgLy8gY29uc3QgdGFza0luZm8gPSBlO1xuICAgICAgICAgICAgICAgIC8vY2FuIGFkZCBtb3JlIGVsZW1lbnRzIHRvIHRoZSB0YWJzIGxhdGVyIG9uXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRhc2tDcmVhdGlvbi5nZW5lcmF0ZVRhc2tDYXJkKGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vdGFza0luZm8gc2hvdWxkIGJlIHRhYiBpZD9cbiAgICAgICAgICAgICAgICB0YXNrVGFicy5hcHBlbmQodGFiKTtcbiAgICAgICAgICAgICAgICB0YWIuYXBwZW5kKHRhYkhlYWRpbmcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpTdG9yZWQnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlVGFza1RhYnN9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBuZXdUYXNrTW9kID0oKCk9PntcbiAgICAgICAgbmV3VGFza0J1dHRvbi5vbmNsaWNrID0oKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1Rhc2snLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZClcbiAgICB9KSgpXG59KSgpOyIsIi8vIGNvbnN0IGdyYWJGb3JtID0gZnVuY3Rpb24oKXtcbi8vICAgICBjb25zdCBmb3JtR3JhYiA9IHtcbi8vICAgICAgICAgdGl0bGU6dGl0bGUudmFsdWUsXG4vLyAgICAgICAgIGRlc2NyaXB0aW9uOmRlc2NyaXB0aW9uLnZhbHVlLFxuLy8gICAgICAgICBkdWVEYXRlOmR1ZURhdGUudmFsdWUsXG4vLyAgICAgICAgIHByaW9yaXR5OnByaW9yaXR5LnZhbHVlLFxuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhmb3JtR3JhYik7XG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ2Zvcm1HcmFiJyxmb3JtR3JhYik7XG4vLyAgICAgLy9jbGVhcnMgb2xkIGlucHV0XG4vLyAgICAgY29uc3QgZG9tQXJyYXkgPSBbdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eV07XG4vLyAgICAgZG9tQXJyYXkuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS52YWx1ZSA9ICcnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgcHVic3ViID0ge1xuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICAvL25vdCBzdXJlIGlmIHRoaXMgaXMgd29ya2luZyBjb3JyZWN0bHkgbzNvICpcbiAgICAgICAgaWYoISh0aGlzLmV2ZW50c1tldmVudF0pKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2V2ZW50fSBhcnJheSBkb2VzbnQgZXhpc3Qgd2l0aGluIGV2ZW50cyBvYmplY3QuYClcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vcHVzaGVzIHN1YnNjcmliZXIgZnVuY3Rpb24gaW50byBldmVudCBhcnJheVxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChmbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBwdXNoZWQuJylcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBvZiBwdWJsaXNoIGZ1bmN0aW9uJylcbiAgICAgICAgLy9jaGVjayBmb3IgZXZlbnQgYXJyYXlcbiAgICAgICAgaWYodGhpcy5ldmVudHNbZXZlbnRdKXtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGhhcyBiZWVuIHB1Ymxpc2hlZC4nKVxuICAgICAgICAgICAgICAgIGUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vIHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7XG5cbiAgICAvLyB9LFxufTtcbmV4cG9ydCB7cHVic3VifTtcbi8vIGNvbnN0IHRhc2tGYWN0b3J5ID0gKHgpID0+e1xuLy8gICAgIC8veCBpcyBmb3JtRGF0YVxuLy8gICAgIGNvbnN0IHRpdGxlID0geC50aXRsZTtcbi8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHguZGVzY3JpcHRpb247XG4vLyAgICAgY29uc3QgZHVlRGF0ZSA9IHguZHVlRGF0ZTtcbi8vICAgICBjb25zdCBwcmlvcml0eSA9IHgucHJpb3JpdHk7XG4vLyAgICAgY29uc3QgbG9nUHJpb3JpdHk9KCk9Pntcbi8vICAgICAgICAgY29uc29sZS5sb2cocHJpb3JpdHkpO1xuLy8gICAgIH07XG4vLyAgICAgLy8gZnVuY3Rpb25zIGZvciBlZGl0aW5nIGVhY2ggcHJvcGVydHk/IGluaGVyaXRhbmNlIGlzc3VlKlxuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrQ3JlYXRlZCcse3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9KVxuLy8gICAgIHJldHVybnt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LGxvZ1ByaW9yaXR5fVxuLy8gfVxuLy8gcHVic3ViLnN1YnNjcmliZSgnZm9ybUdyYWInLHRhc2tGYWN0b3J5KVxuXG4vLyBjb25zdCB0YXNrU3RvcmFnZSA9IFtdO1xuLy8gY29uc3Qgc3RvcmVUYXNrID0gZnVuY3Rpb24oeCl7XG4vLyAgICAgY29uc29sZS5sb2coeCk7XG4vLyAgICAgdGFza1N0b3JhZ2UucHVzaCh4KTtcbi8vICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZSk7XG4vLyB9O1xuLy8gcHVic3ViLnN1YnNjcmliZSgndGFza0NyZWF0ZWQnLHN0b3JlVGFzayk7XG5cbi8vIGNvbnN0IHRlc3QgPSBmdW5jdGlvbigpe1xuLy8gICAgIHRhc2tMaXN0LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUubG9nUHJpb3JpdHkoKTtcbi8vICAgICB9KTtcbi8vIH07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgbGV0IGN1cnJlbnRUYXNrQ2FyZElEID0gJyc7XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBJRCBoZXJlPyBhbmQgcGFzcyBpdCB0byBET01GdW5jP1xuICAgICAgICBjb25zdCB0YXNrTWFrZXIgPSgpPT57XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICdVbnRpdGxlZCc7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9ICd0ZXN0JztcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ3Rlc3QnO1xuICAgICAgICAgICAgLy9jaGVjayBmb3IgZHVwbGljYXRlIGlkJ3MgaW4gdGFzayBzdG9yYWdlIGFycmF5XG4gICAgICAgICAgICBjb25zdCB0YXNrSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9uLHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcbiAgICAgICAgICAgIC8vcHVibGlzaGVzIG5ldyB0YXNrT2JqXG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakNyZWF0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0YXNrIGhhcyBiZWVuIHN0b3JlZCBhbmQgc3RvcmFnZSBhcnJheSBoYXMgYmVlbiBwdWJsaXNoZWQuJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrQ2FyZD0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2tDYXJkSUQgPSB4O1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudFRhc2tDYXJkIGlzICR7Y3VycmVudFRhc2tDYXJkSUR9YCk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXJkR2VuZXJhdGVkJyxzZXRDdXJyZW50VGFza0NhcmQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tUZXh0PSh0ZXh0RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnRUYXNrQ2FyZElEXG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdW2Ake3RleHRFbGVtZW50LmlkfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRUYXNrVGV4dCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1ByaW9yaXR5PSh4KT0+e1xuICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBpZih4LmNoZWNrZWQpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF0ucHJpb3JpdHkgPSB4LnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlDaGFuZ2UnLGVkaXRUYXNrUHJpb3JpdHkpXG59KSgpO1xuXG5leHBvcnR7dGFza09iak1vZHVsZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NTW9kIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuaW1wb3J0IHsgdGFza09iak1vZHVsZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy90YXNrQ3JlYXRvclwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9