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


const DOMMod=(()=>{
    const taskTabs = document.getElementById('taskTabs');
    const newTaskButton = document.querySelector('.newTaskButton');
    const main = document.getElementById('main');

    const editFuncMod=(()=>{
        const taskEdit=(event)=>{
            let editType = '';
            const displayElement = event.target;
            const input = document.createElement('input');
            console.log(displayElement.classList);
            if(displayElement.classList == 'title'||'description'){
                editType = 'text';
            };
            if(displayElement.classList == 'dueDate'){
                editType = 'date';
            };
            //min date should be current day
            //when clicking off calender the element disappears
            //also if a text input is empty the display element disappears
            displayElement.style.display = 'none';
            input.classList.add(`${editType}Edit`);
            input.value = displayElement.innerHTML;
            input.type = `${editType}`;
            displayElement.parentNode.insertBefore(input,displayElement);
            input.focus();
            //for enter key
            input.onkeydown=(keyboardEvent)=>{
                if(keyboardEvent.key == 'Enter'){
                    finishEdit()
                }
                return;
            }
            //for clicking off input
            input.onblur=()=>{
                finishEdit();
            };
            const finishEdit = function(){
                let displayValue = input.value;
                if(input.value == ''){
                    displayValue = `${displayElement.classList}`;
                };
                displayElement.innerHTML = displayValue;
                input.parentNode.removeChild(input);
                displayElement.style.display = '';
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newEdit',displayElement)
            };
        };
        return {taskEdit};
    })();

    const cardCreation=(()=>{
        //x is the taskObj
        const generateCard=(x)=>{
            let ID = '';
            let taskType = '';
            const card = document.createElement('div');
            const deleteButtonCont = document.createElement('div');
            const cardCont1 = document.createElement('div');
            const cardCont2 = document.createElement('div');
            const cardCont3 = document.createElement('div');
            if(x.isTask){
                ID = x.taskID;
                taskType = 'task';
            };
            if(!x.isTask){
                ID = x.subTaskID;
                taskType = 'subtask';
            };
            //can maybe add an "are you sure?" message later
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.setAttribute(`data-${taskType}-ID`,`${ID}`);
            deleteButton.onclick = function(){
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('deleteTask',deleteButton);
            };

            const title = document.createElement('h2');
            // title.classList.add('editable');
            title.textContent = `${x.title}`;
            title.setAttribute(`data-${taskType}-ID`,`${ID}`);
            title.addEventListener('click',editFuncMod.taskEdit);

            const priorityCont = document.createElement('div');
            const priorityText = document.createElement('h5');
            priorityText.textContent = 'SET TASK PRIORITY';
            const generatePriorityText=()=>{
                priorityText.textContent = `${x.priority.toUpperCase()}`;
                priorityCont.style.gap = '10px';
            };
            if(x.priority!==''){
                generatePriorityText();
            };

            const priorityForm = document.createElement('form');
            priorityForm.setAttribute(`data-${taskType}-ID`,`${ID}`);

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

            const dueDate = document.createElement('p');
            // dueDate.classList.add('editable');
            dueDate.textContent = `${x.dueDate}`;
            dueDate.setAttribute(`data-${taskType}-ID`,`${ID}`);
            dueDate.addEventListener('click',editFuncMod.taskEdit);
        
            const description = document.createElement('p');
            // description.classList.add('editable');
            description.textContent = `${x.description}`;
            description.setAttribute(`data-${taskType}-ID`,`${ID}`);
            description.addEventListener('click',editFuncMod.taskEdit);

            // seperate all creation into one module then return an object with all created elements and run in through the class adding function?
            const elementObj = {
                card,
                deleteButtonCont,
                deleteButton,
                cardCont1,
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
                cardCont2,
                cardCont3,
                title,
                dueDate,
                description,
            };
            const elementNameArray = Object.keys(elementObj);
        
            //Adds a class to every array element equal to their variable name
            for(let i=elementNameArray.length-1;i>=0;--i){
                elementObj[elementNameArray[i]].classList.add(`${elementNameArray[i]}`);
            };

            main.append(card);
            card.append(deleteButtonCont,cardCont1,cardCont2,cardCont3);
            deleteButtonCont.append(deleteButton);
            cardCont1.append(title,priorityCont);
            priorityCont.append(priorityText,priorityForm);
            priorityForm.append(criticalLabel,criticalInput,importantLabel,importantInput,normalLabel,normalInput,finishedLabel,finishedInput);
            cardCont2.append(dueDate);
            cardCont3.append(description);

            //if x is a main task create the newsubtask button
            if(x.isTask){
                const newSubTaskButton = document.createElement('button');
                newSubTaskButton.textContent = 'ADD NEW SUBTASK';
                newSubTaskButton.classList.add('newSubTaskButton');
                newSubTaskButton.onclick = function(){
                    console.log('create new subtask');
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('createNewSubTask',true);
                };
                main.appendChild(newSubTaskButton);
            };
        };
        return{generateCard};
    })();

    const renderTaskMod=(()=>{
        //renders the current task and its subtasks
        const renderTask=(currentTask)=>{
            const getRenderArray=(x)=>{
                const renderArray = [x];
                x.subTaskArray.forEach(e => renderArray.push(e));
                return renderArray;
            };
            if(currentTask === undefined){
                main.replaceChildren();
                return;
            };
            main.replaceChildren();
            const renderArray = getRenderArray(currentTask);
            console.log(renderArray);
            renderArray.forEach(e=>cardCreation.generateCard(e));
        };
        //subscribe to taskChange? maybe combine some events
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newCurrentTask',renderTask);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newSubTask',renderTask);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('subTaskDeleted',renderTask)
        return{renderTask};
    })();
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        const generateTaskTabs = function(taskArray){
            taskTabs.replaceChildren();
            taskArray.forEach((e)=>{
                //e is a task object
                const tab = document.createElement('div')
                tab.classList.add('tab')
                tab.setAttribute('data-tab-ID',`${e.taskID}`);
                tab.addEventListener('click',()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('tabSelected',e);
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
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('tabElementChange',generateTaskTabs);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskStorageChange',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newTask',true);
        };
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
    //events holds an array for each event
    events:{},
    subscribe:function(event,fn){
        //checks for event and if its an array
        if(!(this.events[event])){
            this.events[event] = [];
        }
        //pushes subscriber function into event array
        this.events[event].push(fn);
    },
    publish:function(event,data){
        //check for event array
        if(this.events[event]){
            this.events[event].forEach((e)=>{
                e(data);
            });
        };
    },
    // unsubscribe:function(){
    // },
};


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

//possible functions: findTaskIndex,findSubTaskIndex,generateTaskID,...
const taskObjModule = (()=>{
    const taskStorageArray = [];
    let currentTask = '';
    const createTaskObj =(x)=>{
        const taskMaker =()=>{
            const title = 'Untitled';
            const priority = '';
            const dueDate = 'dueDate';
            const description = 'TEST DESCRIPTION';
            const subTaskArray = [];
            const isTask = true;

            //check for duplicate id's in task storage array
            const generateTaskID =()=>{
                let ID = Math.floor(Math.random()*10000);
                const taskIDArray = taskStorageArray.map(x => x.taskID);
                if(taskIDArray.find(x => x == ID)){
                    console.log('WARNING duplicate ID found');
                    do{
                        ID = Math.floor(Math.random()*10000);
                        console.log(`this objects new ID is ${ID}`);
                    }
                    while(taskIDArray.find(x => x == ID));
                }
                else{
                    console.log('no duplicate ID found');
                };
                return ID;
            }
            const taskID = generateTaskID();

            return {title,priority,dueDate,description,subTaskArray,isTask,taskID};
        };
        if(x){
            storeTask(taskMaker());
			setCurrentTask(taskStorageArray[taskStorageArray.length-1]);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newTask',createTaskObj);

    const setCurrentTask=(x)=>{
        currentTask = x;
		_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newCurrentTask',x);
    };
	_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('tabSelected',setCurrentTask);

    const storeTask=(x)=>{
        taskStorageArray.push(x);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskStorageChange',taskStorageArray);
    };

    const deleteTask=(deleteButton)=>{
        let taskIndex = taskStorageArray.indexOf(currentTask);
        if(deleteButton.getAttribute('data-task-ID')){
            taskStorageArray.splice(taskIndex,1);
            //length has changed 
            if(taskIndex==taskStorageArray.length){
                taskIndex = taskIndex - 1;
            };
            //this signals to render the new 'current task'
            setCurrentTask(taskStorageArray[taskIndex]);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskStorageChange',taskStorageArray);
        };
        if(deleteButton.getAttribute('data-subtask-ID')){
            const elementID = deleteButton.getAttribute('data-subtask-ID');
            const subTask = currentTask.subTaskArray.find(e => e.subTaskID == elementID);
            const subTaskIndex = currentTask.subTaskArray.indexOf(subTask);
            taskStorageArray[taskIndex].subTaskArray.splice(subTaskIndex,1);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subTaskDeleted',currentTask);
        };

    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('deleteTask',deleteTask);

    const editTaskText=(displayElement)=>{
        const taskIndex = taskStorageArray.indexOf(currentTask);
        if(displayElement.getAttribute('data-task-ID')){
            console.log('MAIN TASK EDIT.');
            taskStorageArray[taskIndex][`${displayElement.getAttribute('class')}`] = displayElement.innerHTML;
        };
        if(displayElement.getAttribute('data-subtask-ID')){
            console.log('SUBTASK EDIT.');
            const elementID = displayElement.getAttribute('data-subtask-ID');
            const subTask = currentTask.subTaskArray.find(e => e.subTaskID == elementID);
            const subTaskIndex = currentTask.subTaskArray.indexOf(subTask);
            taskStorageArray[taskIndex].subTaskArray[subTaskIndex][`${displayElement.getAttribute('class')}`] = displayElement.innerHTML;
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskEdit',currentTask);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('tabElementChange',taskStorageArray);
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editTaskText);

    const editTaskPriority=(priorityElement)=>{
        const taskIndex = taskStorageArray.indexOf(currentTask);
        if(priorityElement.parentNode.getAttribute('data-task-ID')){
            taskStorageArray[taskIndex].priority = priorityElement.value;
        };
        if(priorityElement.parentNode.getAttribute('data-subtask-ID')){
            const elementID = priorityElement.parentNode.getAttribute('data-subtask-ID');
            const subTask = currentTask.subTaskArray.find(e => e.subTaskID == elementID);
            const subTaskIndex = currentTask.subTaskArray.indexOf(subTask);
            taskStorageArray[taskIndex].subTaskArray[subTaskIndex].priority = priorityElement.value;
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('tabElementChange',taskStorageArray);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('priorityChange',editTaskPriority)

    const subTaskMaker=(x)=>{
        const createSubTask=()=>{
            const title = 'Untitled';
            const priority = '';
            const dueDate = 'TEST DUEDATE';
            const description = 'TEST DESCRIPTION';
            const isTask = false;
            const generateTaskID =()=>{
                let ID = Math.floor(Math.random()*10000);
                const taskIDArray = currentTask.subTaskArray.map(x => x.subTaskID);
                if(taskIDArray.find(x => x == ID)){
                    console.log('WARNING duplicate ID found');
                    do{
                        ID = Math.floor(Math.random()*10000);
                        console.log(`this objects new ID is ${ID}`);
                    }
                    while(taskIDArray.find(x => x == ID));
                }
                else{
                    console.log('no duplicate ID found');
                };
                return ID;
            }
            const subTaskID = generateTaskID();

            return {title,priority,dueDate,description,isTask,subTaskID};
        };
        if(x){
            storeSubTask(createSubTask());
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newSubTask',currentTask);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('createNewSubTask',subTaskMaker);

    const storeSubTask=(subtask)=>{
		currentTask.subTaskArray.push(subtask);
    };
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

// import date-fns
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kPSgoKT0+e1xuICAgIGNvbnN0IHRhc2tUYWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tUYWJzJyk7XG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdUYXNrQnV0dG9uJyk7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbiAgICBjb25zdCBlZGl0RnVuY01vZD0oKCk9PntcbiAgICAgICAgY29uc3QgdGFza0VkaXQ9KGV2ZW50KT0+e1xuICAgICAgICAgICAgbGV0IGVkaXRUeXBlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpc3BsYXlFbGVtZW50LmNsYXNzTGlzdCk7XG4gICAgICAgICAgICBpZihkaXNwbGF5RWxlbWVudC5jbGFzc0xpc3QgPT0gJ3RpdGxlJ3x8J2Rlc2NyaXB0aW9uJyl7XG4gICAgICAgICAgICAgICAgZWRpdFR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoZGlzcGxheUVsZW1lbnQuY2xhc3NMaXN0ID09ICdkdWVEYXRlJyl7XG4gICAgICAgICAgICAgICAgZWRpdFR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9taW4gZGF0ZSBzaG91bGQgYmUgY3VycmVudCBkYXlcbiAgICAgICAgICAgIC8vd2hlbiBjbGlja2luZyBvZmYgY2FsZW5kZXIgdGhlIGVsZW1lbnQgZGlzYXBwZWFyc1xuICAgICAgICAgICAgLy9hbHNvIGlmIGEgdGV4dCBpbnB1dCBpcyBlbXB0eSB0aGUgZGlzcGxheSBlbGVtZW50IGRpc2FwcGVhcnNcbiAgICAgICAgICAgIGRpc3BsYXlFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKGAke2VkaXRUeXBlfUVkaXRgKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gZGlzcGxheUVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9IGAke2VkaXRUeXBlfWA7XG4gICAgICAgICAgICBkaXNwbGF5RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCxkaXNwbGF5RWxlbWVudCk7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd249KGtleWJvYXJkRXZlbnQpPT57XG4gICAgICAgICAgICAgICAgaWYoa2V5Ym9hcmRFdmVudC5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2ZvciBjbGlja2luZyBvZmYgaW5wdXRcbiAgICAgICAgICAgIGlucHV0Lm9uYmx1cj0oKT0+e1xuICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsZXQgZGlzcGxheVZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoaW5wdXQudmFsdWUgPT0gJycpe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWUgPSBgJHtkaXNwbGF5RWxlbWVudC5jbGFzc0xpc3R9YDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRpc3BsYXlFbGVtZW50LmlubmVySFRNTCA9IGRpc3BsYXlWYWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLGRpc3BsYXlFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHt0YXNrRWRpdH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGNhcmRDcmVhdGlvbj0oKCk9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlQ2FyZD0oeCk9PntcbiAgICAgICAgICAgIGxldCBJRCA9ICcnO1xuICAgICAgICAgICAgbGV0IHRhc2tUeXBlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZENvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpZih4LmlzVGFzayl7XG4gICAgICAgICAgICAgICAgSUQgPSB4LnRhc2tJRDtcbiAgICAgICAgICAgICAgICB0YXNrVHlwZSA9ICd0YXNrJztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZigheC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIElEID0geC5zdWJUYXNrSUQ7XG4gICAgICAgICAgICAgICAgdGFza1R5cGUgPSAnc3VidGFzayc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9jYW4gbWF5YmUgYWRkIGFuIFwiYXJlIHlvdSBzdXJlP1wiIG1lc3NhZ2UgbGF0ZXJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZVRhc2snLGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICAvLyB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jTW9kLnRhc2tFZGl0KTtcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gJ1NFVCBUQVNLIFBSSU9SSVRZJztcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUHJpb3JpdHlUZXh0PSgpPT57XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7eC5wcmlvcml0eS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5IT09Jycpe1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uc2V0QXR0cmlidXRlKGBkYXRhLSR7dGFza1R5cGV9LUlEYCxgJHtJRH1gKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjcml0aWNhbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnY3JpdGljYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdpbXBvcnRhbnRJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbm9ybWFsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBmaW5pc2hlZExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnZmluaXNoZWRJbnB1dCcpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdDUklUSUNBTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnY3JpdGljYWwnKXtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxjcml0aWNhbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0lNUE9SVEFOVCcpXG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdpbXBvcnRhbnQnKXtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGltcG9ydGFudElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnbm9ybWFsJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ05PUk1BTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnbm9ybWFsJyl7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbm9ybWFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxub3JtYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdGSU5JU0hFRCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAvLyBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuY01vZC50YXNrRWRpdCk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt4LmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jTW9kLnRhc2tFZGl0KTtcblxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgYWxsIGNyZWF0aW9uIGludG8gb25lIG1vZHVsZSB0aGVuIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgY3JlYXRlZCBlbGVtZW50cyBhbmQgcnVuIGluIHRocm91Z2ggdGhlIGNsYXNzIGFkZGluZyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICAgICAgY2FyZCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b25Db250LFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbixcbiAgICAgICAgICAgICAgICBjYXJkQ29udDEsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0sXG4gICAgICAgICAgICAgICAgY3JpdGljYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LFxuICAgICAgICAgICAgICAgIGltcG9ydGFudExhYmVsLFxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LFxuICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLFxuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dCxcbiAgICAgICAgICAgICAgICBjYXJkQ29udDIsXG4gICAgICAgICAgICAgICAgY2FyZENvbnQzLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vQWRkcyBhIGNsYXNzIHRvIGV2ZXJ5IGFycmF5IGVsZW1lbnQgZXF1YWwgdG8gdGhlaXIgdmFyaWFibGUgbmFtZVxuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChkZWxldGVCdXR0b25Db250LGNhcmRDb250MSxjYXJkQ29udDIsY2FyZENvbnQzKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICBjYXJkQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkQ29udDMuYXBwZW5kKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgLy9pZiB4IGlzIGEgbWFpbiB0YXNrIGNyZWF0ZSB0aGUgbmV3c3VidGFzayBidXR0b25cbiAgICAgICAgICAgIGlmKHguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBREQgTkVXIFNVQlRBU0snO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3U3ViVGFza0J1dHRvbicpO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgbmV3IHN1YnRhc2snKTtcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NyZWF0ZU5ld1N1YlRhc2snLHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChuZXdTdWJUYXNrQnV0dG9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybntnZW5lcmF0ZUNhcmR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCByZW5kZXJUYXNrTW9kPSgoKT0+e1xuICAgICAgICAvL3JlbmRlcnMgdGhlIGN1cnJlbnQgdGFzayBhbmQgaXRzIHN1YnRhc2tzXG4gICAgICAgIGNvbnN0IHJlbmRlclRhc2s9KGN1cnJlbnRUYXNrKT0+e1xuICAgICAgICAgICAgY29uc3QgZ2V0UmVuZGVyQXJyYXk9KHgpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBbeF07XG4gICAgICAgICAgICAgICAgeC5zdWJUYXNrQXJyYXkuZm9yRWFjaChlID0+IHJlbmRlckFycmF5LnB1c2goZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJBcnJheTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihjdXJyZW50VGFzayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBnZXRSZW5kZXJBcnJheShjdXJyZW50VGFzayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZW5kZXJBcnJheSk7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5mb3JFYWNoKGU9PmNhcmRDcmVhdGlvbi5nZW5lcmF0ZUNhcmQoZSkpO1xuICAgICAgICB9O1xuICAgICAgICAvL3N1YnNjcmliZSB0byB0YXNrQ2hhbmdlPyBtYXliZSBjb21iaW5lIHNvbWUgZXZlbnRzXG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0N1cnJlbnRUYXNrJyxyZW5kZXJUYXNrKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFzaycscmVuZGVyVGFzayk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3N1YlRhc2tEZWxldGVkJyxyZW5kZXJUYXNrKVxuICAgICAgICByZXR1cm57cmVuZGVyVGFza307XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2Z1bmN0aW9uIHRvIGdlbmVyYXRlIHNpZGViYXIgdGFicyB3aGVuZXZlciBhIG5ldyB0YXNrT2JqIGlzIHN0b3JlZC4ob3IgY2hhbmdlZCkuXG4gICAgY29uc3QgdGFza1RhYkNyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tUYWJzID0gZnVuY3Rpb24odGFza0FycmF5KXtcbiAgICAgICAgICAgIHRhc2tUYWJzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgLy9lIGlzIGEgdGFzayBvYmplY3RcbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJTZWxlY3RlZCcsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFiRWxlbWVudENoYW5nZScsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdG9yYWdlQ2hhbmdlJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICAvL2V2ZW50cyBob2xkcyBhbiBhcnJheSBmb3IgZWFjaCBldmVudFxuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuLy9wb3NzaWJsZSBmdW5jdGlvbnM6IGZpbmRUYXNrSW5kZXgsZmluZFN1YlRhc2tJbmRleCxnZW5lcmF0ZVRhc2tJRCwuLi5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgbGV0IGN1cnJlbnRUYXNrID0gJyc7XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ2R1ZURhdGUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGlzVGFzayA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSURBcnJheSA9IHRhc2tTdG9yYWdlQXJyYXkubWFwKHggPT4geC50YXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKHRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGlzIG9iamVjdHMgbmV3IElEIGlzICR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUodGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0lEID0gZ2VuZXJhdGVUYXNrSUQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9uLHN1YlRhc2tBcnJheSxpc1Rhc2ssdGFza0lEfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBzdG9yZVRhc2sodGFza01ha2VyKCkpO1xuXHRcdFx0c2V0Q3VycmVudFRhc2sodGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrPSh4KT0+e1xuICAgICAgICBjdXJyZW50VGFzayA9IHg7XG5cdFx0cHVic3ViLnB1Ymxpc2goJ25ld0N1cnJlbnRUYXNrJyx4KTtcbiAgICB9O1xuXHRwdWJzdWIuc3Vic2NyaWJlKCd0YWJTZWxlY3RlZCcsc2V0Q3VycmVudFRhc2spO1xuXG4gICAgY29uc3Qgc3RvcmVUYXNrPSh4KT0+e1xuICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnB1c2goeCk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrU3RvcmFnZUNoYW5nZScsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVRhc2s9KGRlbGV0ZUJ1dHRvbik9PntcbiAgICAgICAgbGV0IHRhc2tJbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuaW5kZXhPZihjdXJyZW50VGFzayk7XG4gICAgICAgIGlmKGRlbGV0ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXkuc3BsaWNlKHRhc2tJbmRleCwxKTtcbiAgICAgICAgICAgIC8vbGVuZ3RoIGhhcyBjaGFuZ2VkIFxuICAgICAgICAgICAgaWYodGFza0luZGV4PT10YXNrU3RvcmFnZUFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGFza0luZGV4ID0gdGFza0luZGV4IC0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL3RoaXMgc2lnbmFscyB0byByZW5kZXIgdGhlIG5ldyAnY3VycmVudCB0YXNrJ1xuICAgICAgICAgICAgc2V0Q3VycmVudFRhc2sodGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrU3RvcmFnZUNoYW5nZScsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmKGRlbGV0ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJRCA9IGRlbGV0ZUJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5maW5kKGUgPT4gZS5zdWJUYXNrSUQgPT0gZWxlbWVudElEKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5pbmRleE9mKHN1YlRhc2spO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheS5zcGxpY2Uoc3ViVGFza0luZGV4LDEpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3N1YlRhc2tEZWxldGVkJyxjdXJyZW50VGFzayk7XG4gICAgICAgIH07XG5cbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2RlbGV0ZVRhc2snLGRlbGV0ZVRhc2spO1xuXG4gICAgY29uc3QgZWRpdFRhc2tUZXh0PShkaXNwbGF5RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5pbmRleE9mKGN1cnJlbnRUYXNrKTtcbiAgICAgICAgaWYoZGlzcGxheUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTUFJTiBUQVNLIEVESVQuJyk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF1bYCR7ZGlzcGxheUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0gZGlzcGxheUVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9O1xuICAgICAgICBpZihkaXNwbGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTVUJUQVNLIEVESVQuJyk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SUQgPSBkaXNwbGF5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5maW5kKGUgPT4gZS5zdWJUYXNrSUQgPT0gZWxlbWVudElEKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5pbmRleE9mKHN1YlRhc2spO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdW2Ake2Rpc3BsYXlFbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKX1gXSA9IGRpc3BsYXlFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tFZGl0JyxjdXJyZW50VGFzayk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJFbGVtZW50Q2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3RWRpdCcsZWRpdFRhc2tUZXh0KTtcblxuICAgIGNvbnN0IGVkaXRUYXNrUHJpb3JpdHk9KHByaW9yaXR5RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5pbmRleE9mKGN1cnJlbnRUYXNrKTtcbiAgICAgICAgaWYocHJpb3JpdHlFbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2stSUQnKSl7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eUVsZW1lbnQudmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIGlmKHByaW9yaXR5RWxlbWVudC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudElEID0gcHJpb3JpdHlFbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2sgPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuZmluZChlID0+IGUuc3ViVGFza0lEID09IGVsZW1lbnRJRCk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrSW5kZXggPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuaW5kZXhPZihzdWJUYXNrKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXlbc3ViVGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5RWxlbWVudC52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RhYkVsZW1lbnRDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlDaGFuZ2UnLGVkaXRUYXNrUHJpb3JpdHkpXG5cbiAgICBjb25zdCBzdWJUYXNrTWFrZXI9KHgpPT57XG4gICAgICAgIGNvbnN0IGNyZWF0ZVN1YlRhc2s9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFREFURSc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIGNvbnN0IGlzVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSURBcnJheSA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5tYXAoeCA9PiB4LnN1YlRhc2tJRCk7XG4gICAgICAgICAgICAgICAgaWYodGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkcgZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSh0YXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrSUQgPSBnZW5lcmF0ZVRhc2tJRCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24saXNUYXNrLHN1YlRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVTdWJUYXNrKGNyZWF0ZVN1YlRhc2soKSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3U3ViVGFzaycsY3VycmVudFRhc2spO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnY3JlYXRlTmV3U3ViVGFzaycsc3ViVGFza01ha2VyKTtcblxuICAgIGNvbnN0IHN0b3JlU3ViVGFzaz0oc3VidGFzayk9Pntcblx0XHRjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkucHVzaChzdWJ0YXNrKTtcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0e3Rhc2tPYmpNb2R1bGV9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcbmltcG9ydCB7IERPTU1vZCB9IGZyb20gXCIuL2Z1bmN0aW9ucy9ET01GdW5jXCJcbmltcG9ydCB7IHRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvdGFza0NyZWF0b3JcIlxuLy8gaW1wb3J0IGRhdGUtZm5zIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9