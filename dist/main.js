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
    // const sidebar = document.getElementById('sidebar');
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

    const taskCardCreation = (() =>{
        //x is the taskObj
        const generateTaskCard = (x) =>{
            main.replaceChildren();
            if(x === undefined){
                return;
            };

            console.log(`The generated card is using this ID ${x.taskID}`);

            const card = document.createElement('div');
            const newSubTaskButton = document.createElement('button');
            const cardHeader = document.createElement('div');
            const deleteButtonCont = document.createElement('div');
            const cardHeaderCont1 = document.createElement('div');
            const cardHeaderCont2 = document.createElement('div');
            const cardHeaderCont3 = document.createElement('div');

            //can maybe add an "are you sure?" message later
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function(){
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskDeleted',true);
            };
            
            newSubTaskButton.onclick = function(){
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('createNewSubTask',true);
            };
            //new subtask 'createNewSubTask'

            const title = document.createElement('h2');
            title.textContent = `${x.title}`;
            title.classList.add('editable');
            title.addEventListener('click',editFunc.editText);
        
            //going to try and make this a fancy check box thing with 4 levels
            //priority will have 4 levels: critical, important, normal, and finished.
            //div form label+input*4

            const priorityCont = document.createElement('div');
            
            const priorityText = document.createElement('h5');
            const generatePriorityText=()=>{
                priorityText.textContent = `${x.priority.toUpperCase()}`;
                priorityCont.style.gap = '10px';
            };
            if(x.priority!==''){
                generatePriorityText();
            };
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
            criticalInput.setAttribute('title','CRITICAL');
            if(x.priority == 'critical'){
                criticalInput.setAttribute('checked','true');
            };

            criticalInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',criticalInput);
                generatePriorityText();
            });

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
            importantInput.setAttribute('title','IMPORTANT')
            if(x.priority == 'important'){
                importantInput.setAttribute('checked','true');
            };

            importantInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',importantInput);
                generatePriorityText();
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
            normalInput.setAttribute('title','NORMAL');
            if(x.priority == 'normal'){
                normalInput.setAttribute('checked','true');
            };

            normalInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',normalInput);
                generatePriorityText();
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
            finishedInput.setAttribute('title','FINISHED');
            if(x.priority == 'finished'){
                finishedInput.setAttribute('checked','true');
            };

            finishedInput.addEventListener('click',()=>{
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityChange',finishedInput);
                generatePriorityText();
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
                newSubTaskButton,
                cardHeader,
                deleteButtonCont,
                deleteButton,
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
                cardHeaderCont3,
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
            card.append(cardHeader,newSubTaskButton);
            // cardHeader.append(title,priority,dueDate);
            cardHeader.append(deleteButtonCont,cardHeaderCont1,cardHeaderCont2,cardHeaderCont3);
            deleteButtonCont.append(deleteButton);
            cardHeaderCont1.append(title,priorityCont);
            priorityCont.append(priorityText,priorityForm);
            priorityForm.append(criticalLabel,criticalInput,importantLabel,importantInput,normalLabel,normalInput,finishedLabel,finishedInput);
            cardHeaderCont2.append(dueDate);
            cardHeaderCont3.append(description);
            console.log(x);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('cardGenerated',x.taskID);
        };
        const clearTask = () =>{
            main.replaceChildren();
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjDeleted',generateTaskCard);
        return{generateTaskCard};
    })();
    
    const subTaskCardCreation = ((x)=>{
        //x is the current task object
    })()
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        const generateTaskTabs = function(x){
            taskTabs.replaceChildren();
            // console.log(`x is ${x[0].taskID}`);
            x.forEach((e)=>{
                // const taskInfo = e;
                //can add more elements to the tabs later on
                const tab = document.createElement('div')
                tab.classList.add('tab')
                tab.setAttribute('data-tab-ID',`${e.taskID}`);
                tab.addEventListener('click',()=>{
                    taskCardCreation.generateTaskCard(e);
                });

                const tabCont1 = document.createElement('div');
                tabCont1.classList.add('tabCont1');

                const tabHeading = document.createElement('h3');
                tabHeading.classList.add('tabHeading');
                tabHeading.textContent = `${e.title}`;
                
                const tabPriority = document.createElement('span');
                tabPriority.classList.add('tabPriority');
                switch(e.priority){
                    case 'critical':
                        tabPriority.style.backgroundColor = 'red';
                        break;
                    case 'important':
                        tabPriority.style.backgroundColor = 'orangered';
                        break;
                    case 'normal':
                        tabPriority.style.backgroundColor = 'yellow';
                        break;
                    case 'finished':
                        tabPriority.style.backgroundColor = 'yellowgreen';
                        break;
                    default:
                        tabPriority.style.backgroundColor = 'rgb(201,201,201)';
                        break;
                };

                const tabCont2 = document.createElement('div');
                tabCont2.classList.add('tabCont2');

                const tabDueDate = document.createElement('p');
                tabDueDate.classList.add('tabDueDate');
                tabDueDate.textContent = `${e.dueDate}`;

                taskTabs.append(tab);
                tab.append(tabCont1,tabCont2);
                tabCont1.append(tabHeading,tabPriority);
                tabCont2.append(tabDueDate);
            });
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjStored',generateTaskTabs);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('textEdit',generateTaskTabs);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('priorityEdit',generateTaskTabs)
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskStorageAdjusted',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newTask',true);
        }
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjCreated',taskCardCreation.generateTaskCard)
    })();
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

/***/ "./src/functions/subTaskCreator.js":
/*!*****************************************!*\
  !*** ./src/functions/subTaskCreator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subTaskObjModule": () => (/* binding */ subTaskObjModule)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/functions/pubsub.js");


const subTaskObjModule = (()=>{
    const subTaskMaker=(x)=>{
        const createSubTask=()=>{
            const title = '';
            const priority = '';
            const dueDate = '';
            const description = '';
            return {title,priority,dueDate,description};
        };
        if(x){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newSubTaskCreated',createSubTask());
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('createNewSubTask',subTaskMaker);
})();


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
    //should i just change this to current task object?
    let currentTaskCardID = '';
    const createTaskObj =(x)=>{
        // console.log(x);
        // generate ID here? and pass it to DOMFunc?
        const taskMaker =()=>{
            const title = 'Untitled';
            const priority = '';
            const dueDate = 'TEST DUE DATE';
            const description = 'TEST DESCRIPTION';
            const subTaskArray = [];

            //check for duplicate id's in task storage array
            const generateTaskID =()=>{
                let ID = Math.floor(Math.random()*10000);
                const TaskIDArray = taskStorageArray.map(x => x.taskID);
                if(TaskIDArray.find(x => x == ID)){
                    console.log('WARNING duplicate ID found');
                    do{
                        ID = Math.floor(Math.random()*10000);
                        console.log(`this objects new ID is ${ID}`);
                    }
                    while(TaskIDArray.find(x => x == ID));
                }
                else{
                    console.log('no duplicate ID found');
                };
                return ID;
            }
            const taskID = generateTaskID();

            return {title,priority,dueDate,description,subTaskArray,taskID};
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
    };

    const storeSubTask=(x)=>{
        let index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        console.log(taskStorageArray[index]);
        taskStorageArray[index].subTaskArray.push(x);
        console.log(taskStorageArray[index]);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newSubTaskCreated',storeSubTask)

    const setCurrentTaskCard=(x)=>{
        currentTaskCardID = x;
        console.log(`currentTaskCard is ${currentTaskCardID}`);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('cardGenerated',setCurrentTaskCard);

    const editTaskText=(textElement)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        //returns index of object that matches the currentTaskCardID
        taskStorageArray[index][`${textElement.id}`] = textElement.innerHTML;

        //Updates sidebar tabs
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('textEdit',taskStorageArray);
        console.log(taskStorageArray[index]);
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editTaskText);

    const editTaskPriority=(x)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        if(x.checked){
            taskStorageArray[index].priority = x.value;
            //Updates sidebar tabs
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('priorityEdit',taskStorageArray);
            console.log(taskStorageArray[index]);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('priorityChange',editTaskPriority)

    const deleteTask=(x)=>{
        if(x){
            let index = taskStorageArray.findIndex(x => x.taskID == currentTaskCardID);
            taskStorageArray.splice(index,1);
            //length has changed 
            if(index==taskStorageArray.length){
                index = index - 1;
            };
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskObjDeleted',taskStorageArray[index]);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskStorageAdjusted',taskStorageArray);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskDeleted',deleteTask);
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
/* harmony import */ var _functions_subTaskCreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/subTaskCreator */ "./src/functions/subTaskCreator.js");

;


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Iiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBjb25zdCBET01Nb2QgPSAoKCk9PntcbiAgICAvLyBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBjb25zdCB0YXNrVGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrVGFicycpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4gICAgY29uc3QgZWRpdEZ1bmMgPSAoKCk9PntcbiAgICAgICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3RWRpdCcsdGV4dEVsZW1lbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge2VkaXRUZXh0fTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NhcmRDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0NhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgaWYoeCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlIGdlbmVyYXRlZCBjYXJkIGlzIHVzaW5nIHRoaXMgSUQgJHt4LnRhc2tJRH1gKTtcblxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICAvL2NhbiBtYXliZSBhZGQgYW4gXCJhcmUgeW91IHN1cmU/XCIgbWVzc2FnZSBsYXRlclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tEZWxldGVkJyx0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NyZWF0ZU5ld1N1YlRhc2snLHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vbmV3IHN1YnRhc2sgJ2NyZWF0ZU5ld1N1YlRhc2snXG5cbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7eC50aXRsZX1gO1xuICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9nb2luZyB0byB0cnkgYW5kIG1ha2UgdGhpcyBhIGZhbmN5IGNoZWNrIGJveCB0aGluZyB3aXRoIDQgbGV2ZWxzXG4gICAgICAgICAgICAvL3ByaW9yaXR5IHdpbGwgaGF2ZSA0IGxldmVsczogY3JpdGljYWwsIGltcG9ydGFudCwgbm9ybWFsLCBhbmQgZmluaXNoZWQuXG4gICAgICAgICAgICAvL2RpdiBmb3JtIGxhYmVsK2lucHV0KjRcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVByaW9yaXR5VGV4dD0oKT0+e1xuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGAke3gucHJpb3JpdHkudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udC5zdHlsZS5nYXAgPSAnMTBweCc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSE9PScnKXtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGFsbGNhcHM/XG4gICAgICAgICAgICAvLyBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBhY3RpdmUgcmFkaW8gYnV0dG9uXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2NyaXRpY2FsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGltcG9ydGFudExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnaW1wb3J0YW50SW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIG5vcm1hbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnbm9ybWFsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgZmluaXNoZWRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ZpbmlzaGVkSW5wdXQnKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdjcml0aWNhbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnQ1JJVElDQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2NyaXRpY2FsJyl7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjcml0aWNhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsY3JpdGljYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjcml0aWNhbElucHV0Lm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNyaXRpY2FsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1wb3J0YW50SW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobm9ybWFsSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmluaXNoZWRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnSU1QT1JUQU5UJylcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ltcG9ydGFudCcpe1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsaW1wb3J0YW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3JpdGljYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub3JtYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5pc2hlZElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ25vcm1hbCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdOT1JNQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ25vcm1hbCcpe1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG5vcm1hbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsbm9ybWFsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm9ybWFsSW5wdXQub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3JpdGljYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub3JtYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5pc2hlZElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdGSU5JU0hFRCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3JpdGljYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub3JtYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5pc2hlZElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIC8vIHByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7eC5wcmlvcml0eX1gO1xuICAgICAgICAgICAgLy8gcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIC8vIHByaW9yaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3guZHVlRGF0ZX1gO1xuICAgICAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vc2V0dGluZyAnY29udGVudGVkaXRhYmxlJyBhdHRyaWJ1dGUgdG8gdHJ1ZSBzZWVtcyB0byB5ZWlsZCBiZXR0ZXIgcmVzdWx0cyBmb3IgZGVzY3JpcHRpb24/XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywndHJ1ZScpXG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3guZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgYWxsIGNyZWF0aW9uIGludG8gb25lIG1vZHVsZSB0aGVuIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgY3JlYXRlZCBlbGVtZW50cyBhbmQgcnVuIGluIHRocm91Z2ggdGhlIGNsYXNzIGFkZGluZyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICAgICAgY2FyZCxcbiAgICAgICAgICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24sXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwsXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRMYWJlbCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dCxcbiAgICAgICAgICAgICAgICBub3JtYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZExhYmVsLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MyxcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROYW1lQXJyYXkgPSBPYmplY3Qua2V5cyhlbGVtZW50T2JqKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAvLyAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5jbGFzc0xpc3QuYWRkKGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uc2V0QXR0cmlidXRlKCdpZCcsYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKGNhcmRIZWFkZXIsbmV3U3ViVGFza0J1dHRvbik7XG4gICAgICAgICAgICAvLyBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXIuYXBwZW5kKGRlbGV0ZUJ1dHRvbkNvbnQsY2FyZEhlYWRlckNvbnQxLGNhcmRIZWFkZXJDb250MixjYXJkSGVhZGVyQ29udDMpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udC5hcHBlbmQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MS5hcHBlbmQodGl0bGUscHJpb3JpdHlDb250KTtcbiAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlUZXh0LHByaW9yaXR5Rm9ybSk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uYXBwZW5kKGNyaXRpY2FsTGFiZWwsY3JpdGljYWxJbnB1dCxpbXBvcnRhbnRMYWJlbCxpbXBvcnRhbnRJbnB1dCxub3JtYWxMYWJlbCxub3JtYWxJbnB1dCxmaW5pc2hlZExhYmVsLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLmFwcGVuZChkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250My5hcHBlbmQoZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coeCk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY2FyZEdlbmVyYXRlZCcseC50YXNrSUQpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhclRhc2sgPSAoKSA9PntcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpEZWxldGVkJyxnZW5lcmF0ZVRhc2tDYXJkKTtcbiAgICAgICAgcmV0dXJue2dlbmVyYXRlVGFza0NhcmR9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgY29uc3Qgc3ViVGFza0NhcmRDcmVhdGlvbiA9ICgoeCk9PntcbiAgICAgICAgLy94IGlzIHRoZSBjdXJyZW50IHRhc2sgb2JqZWN0XG4gICAgfSkoKVxuICAgIFxuICAgIC8vZnVuY3Rpb24gdG8gZ2VuZXJhdGUgc2lkZWJhciB0YWJzIHdoZW5ldmVyIGEgbmV3IHRhc2tPYmogaXMgc3RvcmVkLihvciBjaGFuZ2VkKS5cbiAgICBjb25zdCB0YXNrVGFiQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza1RhYnMgPSBmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHRhc2tUYWJzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHggaXMgJHt4WzBdLnRhc2tJRH1gKTtcbiAgICAgICAgICAgIHguZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB0YXNrSW5mbyA9IGU7XG4gICAgICAgICAgICAgICAgLy9jYW4gYWRkIG1vcmUgZWxlbWVudHMgdG8gdGhlIHRhYnMgbGF0ZXIgb25cbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRhc2tDYXJkQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZChlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuY2xhc3NMaXN0LmFkZCgndGFiQ29udDEnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcuY2xhc3NMaXN0LmFkZCgndGFiSGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtlLnRpdGxlfWA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFiUHJpb3JpdHknKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5wcmlvcml0eSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyaXRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ltcG9ydGFudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlcmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmluaXNoZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvd2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyMDEsMjAxLDIwMSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDIuY2xhc3NMaXN0LmFkZCgndGFiQ29udDInKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YWJEdWVEYXRlJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke2UuZHVlRGF0ZX1gO1xuXG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJDb250MSx0YWJDb250Mik7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuYXBwZW5kKHRhYkhlYWRpbmcsdGFiUHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmFwcGVuZCh0YWJEdWVEYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqU3RvcmVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGV4dEVkaXQnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUVkaXQnLGdlbmVyYXRlVGFza1RhYnMpXG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdG9yYWdlQWRqdXN0ZWQnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlVGFza1RhYnN9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBuZXdUYXNrTW9kID0oKCk9PntcbiAgICAgICAgbmV3VGFza0J1dHRvbi5vbmNsaWNrID0oKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1Rhc2snLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrQ2FyZENyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKTtcbn0pKCk7IiwiLy8gY29uc3QgZ3JhYkZvcm0gPSBmdW5jdGlvbigpe1xuLy8gICAgIGNvbnN0IGZvcm1HcmFiID0ge1xuLy8gICAgICAgICB0aXRsZTp0aXRsZS52YWx1ZSxcbi8vICAgICAgICAgZGVzY3JpcHRpb246ZGVzY3JpcHRpb24udmFsdWUsXG4vLyAgICAgICAgIGR1ZURhdGU6ZHVlRGF0ZS52YWx1ZSxcbi8vICAgICAgICAgcHJpb3JpdHk6cHJpb3JpdHkudmFsdWUsXG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKGZvcm1HcmFiKTtcbi8vICAgICBwdWJzdWIucHVibGlzaCgnZm9ybUdyYWInLGZvcm1HcmFiKTtcbi8vICAgICAvL2NsZWFycyBvbGQgaW5wdXRcbi8vICAgICBjb25zdCBkb21BcnJheSA9IFt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5XTtcbi8vICAgICBkb21BcnJheS5mb3JFYWNoKChlKT0+e1xuLy8gICAgICAgICBlLnZhbHVlID0gJyc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBwdWJzdWIgPSB7XG4gICAgZXZlbnRzOnt9LFxuICAgIHN1YnNjcmliZTpmdW5jdGlvbihldmVudCxmbil7XG4gICAgICAgIC8vY2hlY2tzIGZvciBldmVudCBhbmQgaWYgaXRzIGFuIGFycmF5XG4gICAgICAgIC8vbm90IHN1cmUgaWYgdGhpcyBpcyB3b3JraW5nIGNvcnJlY3RseSBvM28gKlxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZXZlbnR9IGFycmF5IGRvZXNudCBleGlzdCB3aXRoaW4gZXZlbnRzIG9iamVjdC5gKVxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Z1bmN0aW9uIHB1c2hlZC4nKVxuICAgIH0sXG4gICAgcHVibGlzaDpmdW5jdGlvbihldmVudCxkYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IG9mIHB1Ymxpc2ggZnVuY3Rpb24nKVxuICAgICAgICAvL2NoZWNrIGZvciBldmVudCBhcnJheVxuICAgICAgICBpZih0aGlzLmV2ZW50c1tldmVudF0pe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgaGFzIGJlZW4gcHVibGlzaGVkLicpXG4gICAgICAgICAgICAgICAgZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy8gdW5zdWJzY3JpYmU6ZnVuY3Rpb24oKXtcblxuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9O1xuLy8gY29uc3QgdGFza0ZhY3RvcnkgPSAoeCkgPT57XG4vLyAgICAgLy94IGlzIGZvcm1EYXRhXG4vLyAgICAgY29uc3QgdGl0bGUgPSB4LnRpdGxlO1xuLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0geC5kZXNjcmlwdGlvbjtcbi8vICAgICBjb25zdCBkdWVEYXRlID0geC5kdWVEYXRlO1xuLy8gICAgIGNvbnN0IHByaW9yaXR5ID0geC5wcmlvcml0eTtcbi8vICAgICBjb25zdCBsb2dQcmlvcml0eT0oKT0+e1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhwcmlvcml0eSk7XG4vLyAgICAgfTtcbi8vICAgICAvLyBmdW5jdGlvbnMgZm9yIGVkaXRpbmcgZWFjaCBwcm9wZXJ0eT8gaW5oZXJpdGFuY2UgaXNzdWUqXG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tDcmVhdGVkJyx7dGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxsb2dQcmlvcml0eX0pXG4vLyAgICAgcmV0dXJue3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9XG4vLyB9XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdmb3JtR3JhYicsdGFza0ZhY3RvcnkpXG5cbi8vIGNvbnN0IHRhc2tTdG9yYWdlID0gW107XG4vLyBjb25zdCBzdG9yZVRhc2sgPSBmdW5jdGlvbih4KXtcbi8vICAgICBjb25zb2xlLmxvZyh4KTtcbi8vICAgICB0YXNrU3RvcmFnZS5wdXNoKHgpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlKTtcbi8vIH07XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrQ3JlYXRlZCcsc3RvcmVUYXNrKTtcblxuLy8gY29uc3QgdGVzdCA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgdGFza0xpc3QuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS5sb2dQcmlvcml0eSgpO1xuLy8gICAgIH0pO1xuLy8gfTsiLCJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3Qgc3ViVGFza09iak1vZHVsZSA9ICgoKT0+e1xuICAgIGNvbnN0IHN1YlRhc2tNYWtlcj0oeCk9PntcbiAgICAgICAgY29uc3QgY3JlYXRlU3ViVGFzaz0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9ufTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3U3ViVGFza0NyZWF0ZWQnLGNyZWF0ZVN1YlRhc2soKSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjcmVhdGVOZXdTdWJUYXNrJyxzdWJUYXNrTWFrZXIpO1xufSkoKTtcbmV4cG9ydCB7c3ViVGFza09iak1vZHVsZX07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgLy9zaG91bGQgaSBqdXN0IGNoYW5nZSB0aGlzIHRvIGN1cnJlbnQgdGFzayBvYmplY3Q/XG4gICAgbGV0IGN1cnJlbnRUYXNrQ2FyZElEID0gJyc7XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAvLyBnZW5lcmF0ZSBJRCBoZXJlPyBhbmQgcGFzcyBpdCB0byBET01GdW5jP1xuICAgICAgICBjb25zdCB0YXNrTWFrZXIgPSgpPT57XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICdVbnRpdGxlZCc7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9ICdURVNUIERVRSBEQVRFJztcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ1RFU1QgREVTQ1JJUFRJT04nO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0FycmF5ID0gW107XG5cbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBUYXNrSURBcnJheSA9IHRhc2tTdG9yYWdlQXJyYXkubWFwKHggPT4geC50YXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGlzIG9iamVjdHMgbmV3IElEIGlzICR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0lEID0gZ2VuZXJhdGVUYXNrSUQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9uLHN1YlRhc2tBcnJheSx0YXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlVGFzayh0YXNrTWFrZXIoKSk7XG4gICAgICAgICAgICAvL3B1Ymxpc2hlcyBuZXcgdGFza09ialxuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3VGFzaycsY3JlYXRlVGFza09iaik7XG5cbiAgICBjb25zdCBzdG9yZVRhc2s9KHgpPT57XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXkucHVzaCh4KTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpTdG9yZWQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH07XG5cbiAgICBjb25zdCBzdG9yZVN1YlRhc2s9KHgpPT57XG4gICAgICAgIGxldCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheS5wdXNoKHgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdTdWJUYXNrQ3JlYXRlZCcsc3RvcmVTdWJUYXNrKVxuXG4gICAgY29uc3Qgc2V0Q3VycmVudFRhc2tDYXJkPSh4KT0+e1xuICAgICAgICBjdXJyZW50VGFza0NhcmRJRCA9IHg7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50VGFza0NhcmQgaXMgJHtjdXJyZW50VGFza0NhcmRJRH1gKTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2NhcmRHZW5lcmF0ZWQnLHNldEN1cnJlbnRUYXNrQ2FyZCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1RleHQ9KHRleHRFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICAvL3JldHVybnMgaW5kZXggb2Ygb2JqZWN0IHRoYXQgbWF0Y2hlcyB0aGUgY3VycmVudFRhc2tDYXJkSURcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF1bYCR7dGV4dEVsZW1lbnQuaWR9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgICAgLy9VcGRhdGVzIHNpZGViYXIgdGFic1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGV4dEVkaXQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRUYXNrVGV4dCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1ByaW9yaXR5PSh4KT0+e1xuICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBpZih4LmNoZWNrZWQpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF0ucHJpb3JpdHkgPSB4LnZhbHVlO1xuICAgICAgICAgICAgLy9VcGRhdGVzIHNpZGViYXIgdGFic1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5RWRpdCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUNoYW5nZScsZWRpdFRhc2tQcmlvcml0eSlcblxuICAgIGNvbnN0IGRlbGV0ZVRhc2s9KHgpPT57XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5maW5kSW5kZXgoeCA9PiB4LnRhc2tJRCA9PSBjdXJyZW50VGFza0NhcmRJRCk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIC8vbGVuZ3RoIGhhcyBjaGFuZ2VkIFxuICAgICAgICAgICAgaWYoaW5kZXg9PXRhc2tTdG9yYWdlQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4IC0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakRlbGV0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrU3RvcmFnZUFkanVzdGVkJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tEZWxldGVkJyxkZWxldGVUYXNrKTtcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCJcbmltcG9ydCB7IHN1YlRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==