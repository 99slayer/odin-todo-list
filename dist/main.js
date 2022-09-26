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

    const cardCreation = (() =>{
        //x is the taskObj
        const generateCard = (x) =>{
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
            title.addEventListener('click',editFunc.editText);

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

            //we're gonna try something with an outside library here later.
            const dueDate = document.createElement('input');
            // dueDate.classList.add('editable');
            // dueDate.textContent = `${x.dueDate}`;
            dueDate.setAttribute('type','date');
            dueDate.setAttribute(`data-${taskType}-ID`,`${ID}`);
            // dueDate.addEventListener('click',editFunc.editText);
        
            const description = document.createElement('p');
            // description.classList.add('editable');
            description.textContent = `${x.description}`;
            description.setAttribute(`data-${taskType}-ID`,`${ID}`);
            description.addEventListener('click',editFunc.editText);

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
            const dueDate = '';
            const description = 'TEST DESCRIPTION';
            const subTaskArray = [];
            const isTask = true;

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

    const editTaskText=(textElement)=>{
        const taskIndex = taskStorageArray.indexOf(currentTask);
        if(textElement.getAttribute('data-task-ID')){
            console.log('MAIN TASK EDIT.');
            taskStorageArray[taskIndex][`${textElement.getAttribute('class')}`] = textElement.innerHTML;
        };
        if(textElement.getAttribute('data-subtask-ID')){
            console.log('SUBTASK EDIT.');
            const elementID = textElement.getAttribute('data-subtask-ID');
            const subTask = currentTask.subTaskArray.find(e => e.subTaskID == elementID);
            const subTaskIndex = currentTask.subTaskArray.indexOf(subTask);
            taskStorageArray[taskIndex].subTaskArray[subTaskIndex][`${textElement.getAttribute('class')}`] = textElement.innerHTML;
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
                const TaskIDArray = currentTask.subTaskArray.map(x => x.subTaskID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsa0NBQWtDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxrQ0FBa0M7QUFDeEc7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCLFFBQVEsbURBQWM7QUFDdEI7QUFDQSxJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWM7QUFDdEI7QUFDQSxJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxHQUFHO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBYztBQUMxQjtBQUNBO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O1VDbEpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTlk7QUFDWixDQUE0QztBQUNXO0FBQ3ZELGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdGFza0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGNvbnN0IERPTU1vZCA9ICgoKT0+e1xuICAgIGNvbnN0IHRhc2tUYWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tUYWJzJyk7XG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdUYXNrQnV0dG9uJyk7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbiAgICBjb25zdCBlZGl0RnVuYyA9ICgoKT0+e1xuICAgICAgICBjb25zdCBlZGl0VGV4dCA9KGV2ZW50KT0+eyAgICBcbiAgICAgICAgICAgIGNvbnN0IHRleHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHRFZGl0Jyk7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCx0ZXh0RWxlbWVudCk7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdFZGl0Jyx0ZXh0RWxlbWVudClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7ZWRpdFRleHR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjYXJkQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIC8veCBpcyB0aGUgdGFza09ialxuICAgICAgICBjb25zdCBnZW5lcmF0ZUNhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICBsZXQgSUQgPSAnJztcbiAgICAgICAgICAgIGxldCB0YXNrVHlwZSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZENvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDb250MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYoeC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIElEID0geC50YXNrSUQ7XG4gICAgICAgICAgICAgICAgdGFza1R5cGUgPSAndGFzayc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoIXguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBJRCA9IHguc3ViVGFza0lEO1xuICAgICAgICAgICAgICAgIHRhc2tUeXBlID0gJ3N1YnRhc2snO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vY2FuIG1heWJlIGFkZCBhbiBcImFyZSB5b3Ugc3VyZT9cIiBtZXNzYWdlIGxhdGVyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVUYXNrJyxkZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgLy8gdGl0bGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7eC50aXRsZX1gO1xuICAgICAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKGBkYXRhLSR7dGFza1R5cGV9LUlEYCxgJHtJRH1gKTtcbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Q29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9ICdTRVQgVEFTSyBQUklPUklUWSc7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVByaW9yaXR5VGV4dD0oKT0+e1xuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGAke3gucHJpb3JpdHkudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udC5zdHlsZS5nYXAgPSAnMTBweCc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSE9PScnKXtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2NyaXRpY2FsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGltcG9ydGFudExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnaW1wb3J0YW50SW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIG5vcm1hbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnbm9ybWFsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgZmluaXNoZWRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ZpbmlzaGVkSW5wdXQnKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdjcml0aWNhbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnQ1JJVElDQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2NyaXRpY2FsJyl7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjcml0aWNhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsY3JpdGljYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdJTVBPUlRBTlQnKVxuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnaW1wb3J0YW50Jyl7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxpbXBvcnRhbnRJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ25vcm1hbCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdOT1JNQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ25vcm1hbCcpe1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG5vcm1hbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsbm9ybWFsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnRklOSVNIRUQnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ZpbmlzaGVkJyl7XG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgLy8gZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgLy8gZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3guZHVlRGF0ZX1gO1xuICAgICAgICAgICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdkYXRlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICAvLyBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAvLyBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt4LmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcblxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgYWxsIGNyZWF0aW9uIGludG8gb25lIG1vZHVsZSB0aGVuIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgY3JlYXRlZCBlbGVtZW50cyBhbmQgcnVuIGluIHRocm91Z2ggdGhlIGNsYXNzIGFkZGluZyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICAgICAgY2FyZCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b25Db250LFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbixcbiAgICAgICAgICAgICAgICBjYXJkQ29udDEsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0sXG4gICAgICAgICAgICAgICAgY3JpdGljYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LFxuICAgICAgICAgICAgICAgIGltcG9ydGFudExhYmVsLFxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LFxuICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLFxuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dCxcbiAgICAgICAgICAgICAgICBjYXJkQ29udDIsXG4gICAgICAgICAgICAgICAgY2FyZENvbnQzLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vQWRkcyBhIGNsYXNzIHRvIGV2ZXJ5IGFycmF5IGVsZW1lbnQgZXF1YWwgdG8gdGhlaXIgdmFyaWFibGUgbmFtZVxuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChkZWxldGVCdXR0b25Db250LGNhcmRDb250MSxjYXJkQ29udDIsY2FyZENvbnQzKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICBjYXJkQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkQ29udDMuYXBwZW5kKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgLy9pZiB4IGlzIGEgbWFpbiB0YXNrIGNyZWF0ZSB0aGUgbmV3c3VidGFzayBidXR0b25cbiAgICAgICAgICAgIGlmKHguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBREQgTkVXIFNVQlRBU0snO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3U3ViVGFza0J1dHRvbicpO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgbmV3IHN1YnRhc2snKTtcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NyZWF0ZU5ld1N1YlRhc2snLHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChuZXdTdWJUYXNrQnV0dG9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybntnZW5lcmF0ZUNhcmR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCByZW5kZXJUYXNrTW9kPSgoKT0+e1xuICAgICAgICAvL3JlbmRlcnMgdGhlIGN1cnJlbnQgdGFzayBhbmQgaXRzIHN1YnRhc2tzXG4gICAgICAgIGNvbnN0IHJlbmRlclRhc2s9KGN1cnJlbnRUYXNrKT0+e1xuICAgICAgICAgICAgY29uc3QgZ2V0UmVuZGVyQXJyYXk9KHgpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBbeF07XG4gICAgICAgICAgICAgICAgeC5zdWJUYXNrQXJyYXkuZm9yRWFjaChlID0+IHJlbmRlckFycmF5LnB1c2goZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJBcnJheTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihjdXJyZW50VGFzayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBnZXRSZW5kZXJBcnJheShjdXJyZW50VGFzayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZW5kZXJBcnJheSk7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5mb3JFYWNoKGU9PmNhcmRDcmVhdGlvbi5nZW5lcmF0ZUNhcmQoZSkpO1xuICAgICAgICB9O1xuICAgICAgICAvL3N1YnNjcmliZSB0byB0YXNrQ2hhbmdlPyBtYXliZSBjb21iaW5lIHNvbWUgZXZlbnRzXG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0N1cnJlbnRUYXNrJyxyZW5kZXJUYXNrKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFzaycscmVuZGVyVGFzayk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3N1YlRhc2tEZWxldGVkJyxyZW5kZXJUYXNrKVxuICAgICAgICByZXR1cm57cmVuZGVyVGFza307XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2Z1bmN0aW9uIHRvIGdlbmVyYXRlIHNpZGViYXIgdGFicyB3aGVuZXZlciBhIG5ldyB0YXNrT2JqIGlzIHN0b3JlZC4ob3IgY2hhbmdlZCkuXG4gICAgY29uc3QgdGFza1RhYkNyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tUYWJzID0gZnVuY3Rpb24odGFza0FycmF5KXtcbiAgICAgICAgICAgIHRhc2tUYWJzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgLy9lIGlzIGEgdGFzayBvYmplY3RcbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJTZWxlY3RlZCcsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFiRWxlbWVudENoYW5nZScsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdG9yYWdlQ2hhbmdlJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICAvL2V2ZW50cyBob2xkcyBhbiBhcnJheSBmb3IgZWFjaCBldmVudFxuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuLy9wb3NzaWJsZSBmdW5jdGlvbnM6IGZpbmRUYXNrSW5kZXgsZmluZFN1YlRhc2tJbmRleCxnZW5lcmF0ZVRhc2tJRCwuLi5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgbGV0IGN1cnJlbnRUYXNrID0gJyc7XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tBcnJheSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgaXNUYXNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy9jaGVjayBmb3IgZHVwbGljYXRlIGlkJ3MgaW4gdGFzayBzdG9yYWdlIGFycmF5XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gdGFza1N0b3JhZ2VBcnJheS5tYXAoeCA9PiB4LnRhc2tJRCk7XG4gICAgICAgICAgICAgICAgaWYoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkcgZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZShUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrSUQgPSBnZW5lcmF0ZVRhc2tJRCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24sc3ViVGFza0FycmF5LGlzVGFzayx0YXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlVGFzayh0YXNrTWFrZXIoKSk7XG5cdFx0XHRzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2snLGNyZWF0ZVRhc2tPYmopO1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFRhc2s9KHgpPT57XG4gICAgICAgIGN1cnJlbnRUYXNrID0geDtcblx0XHRwdWJzdWIucHVibGlzaCgnbmV3Q3VycmVudFRhc2snLHgpO1xuICAgIH07XG5cdHB1YnN1Yi5zdWJzY3JpYmUoJ3RhYlNlbGVjdGVkJyxzZXRDdXJyZW50VGFzayk7XG5cbiAgICBjb25zdCBzdG9yZVRhc2s9KHgpPT57XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXkucHVzaCh4KTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQ2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlVGFzaz0oZGVsZXRlQnV0dG9uKT0+e1xuICAgICAgICBsZXQgdGFza0luZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5pbmRleE9mKGN1cnJlbnRUYXNrKTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLUlEJykpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5zcGxpY2UodGFza0luZGV4LDEpO1xuICAgICAgICAgICAgLy9sZW5ndGggaGFzIGNoYW5nZWQgXG4gICAgICAgICAgICBpZih0YXNrSW5kZXg9PXRhc2tTdG9yYWdlQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0YXNrSW5kZXggPSB0YXNrSW5kZXggLSAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vdGhpcyBzaWduYWxzIHRvIHJlbmRlciB0aGUgbmV3ICdjdXJyZW50IHRhc2snXG4gICAgICAgICAgICBzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0pO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQ2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudElEID0gZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5LnNwbGljZShzdWJUYXNrSW5kZXgsMSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViVGFza0RlbGV0ZWQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgfTtcblxuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnZGVsZXRlVGFzaycsZGVsZXRlVGFzayk7XG5cbiAgICBjb25zdCBlZGl0VGFza1RleHQ9KHRleHRFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZih0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNQUlOIFRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XVtgJHt0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH07XG4gICAgICAgIGlmKHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NVQlRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJRCA9IHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5W3N1YlRhc2tJbmRleF1bYCR7dGV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza0VkaXQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RhYkVsZW1lbnRDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0ocHJpb3JpdHlFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZihwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5RWxlbWVudC52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYocHJpb3JpdHlFbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SUQgPSBwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5maW5kKGUgPT4gZS5zdWJUYXNrSUQgPT0gZWxlbWVudElEKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5pbmRleE9mKHN1YlRhc2spO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHlFbGVtZW50LnZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFiRWxlbWVudENoYW5nZScsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUNoYW5nZScsZWRpdFRhc2tQcmlvcml0eSlcblxuICAgIGNvbnN0IHN1YlRhc2tNYWtlcj0oeCk9PntcbiAgICAgICAgY29uc3QgY3JlYXRlU3ViVGFzaz0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAnVEVTVCBEVUVEQVRFJztcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ1RFU1QgREVTQ1JJUFRJT04nO1xuICAgICAgICAgICAgY29uc3QgaXNUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5Lm1hcCh4ID0+IHguc3ViVGFza0lEKTtcbiAgICAgICAgICAgICAgICBpZihUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV0FSTklORyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG97XG4gICAgICAgICAgICAgICAgICAgICAgICBJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcyBvYmplY3RzIG5ldyBJRCBpcyAke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJRCA9IGdlbmVyYXRlVGFza0lEKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixpc1Rhc2ssc3ViVGFza0lEfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBzdG9yZVN1YlRhc2soY3JlYXRlU3ViVGFzaygpKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdTdWJUYXNrJyxjdXJyZW50VGFzayk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjcmVhdGVOZXdTdWJUYXNrJyxzdWJUYXNrTWFrZXIpO1xuXG4gICAgY29uc3Qgc3RvcmVTdWJUYXNrPShzdWJ0YXNrKT0+e1xuXHRcdGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5wdXNoKHN1YnRhc2spO1xuICAgIH07XG59KSgpO1xuXG5leHBvcnR7dGFza09iak1vZHVsZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NTW9kIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuaW1wb3J0IHsgdGFza09iak1vZHVsZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy90YXNrQ3JlYXRvclwiXG4vLyBpbXBvcnQgZGF0ZS1mbnMiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=