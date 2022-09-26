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
            const dueDate = document.createElement('p');
            dueDate.textContent = `${x.dueDate}`;
            dueDate.setAttribute(`data-${taskType}-ID`,`${ID}`);
            dueDate.addEventListener('click',editFunc.editText);
        
            const description = document.createElement('p');
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
            const dueDate = 'TEST DUE DATE';
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
                        ID = 1 + Math.floor(Math.random()*10000);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsMkNBQTJDLGtDQUFrQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usa0NBQWtDO0FBQ3hHO0FBQ0EsUUFBUSxtREFBYztBQUN0QixRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsR0FBRztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQWM7QUFDMUI7QUFDQTtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztVQ2xKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBNEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kID0gKCgpPT57XG4gICAgY29uc3QgdGFza1RhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1RhYnMnKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Rhc2tCdXR0b24nKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcblxuICAgIGNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgICAgIGNvbnN0IGVkaXRUZXh0ID0oZXZlbnQpPT57ICAgIFxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dEVkaXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlucHV0LHRleHRFbGVtZW50KTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAvL2ZvciBlbnRlciBrZXlcbiAgICAgICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICAgICAgaWYoZXYua2V5ID09ICdFbnRlcicpe1xuICAgICAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgICAgICBpbnB1dC5vbmJsdXIgPSAoKSA9PntcbiAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZmluaXNoRWRpdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLHRleHRFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtlZGl0VGV4dH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGNhcmRDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlQ2FyZCA9ICh4KSA9PntcbiAgICAgICAgICAgIGxldCBJRCA9ICcnO1xuICAgICAgICAgICAgbGV0IHRhc2tUeXBlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZENvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpZih4LmlzVGFzayl7XG4gICAgICAgICAgICAgICAgSUQgPSB4LnRhc2tJRDtcbiAgICAgICAgICAgICAgICB0YXNrVHlwZSA9ICd0YXNrJztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZigheC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIElEID0geC5zdWJUYXNrSUQ7XG4gICAgICAgICAgICAgICAgdGFza1R5cGUgPSAnc3VidGFzayc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9jYW4gbWF5YmUgYWRkIGFuIFwiYXJlIHlvdSBzdXJlP1wiIG1lc3NhZ2UgbGF0ZXJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZVRhc2snLGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGAke3gudGl0bGV9YDtcbiAgICAgICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgICAgICAgICBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSAnU0VUIFRBU0sgUFJJT1JJVFknO1xuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVQcmlvcml0eVRleHQ9KCk9PntcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5LnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQuc3R5bGUuZ2FwID0gJzEwcHgnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkhPT0nJyl7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIHByaW9yaXR5Rm9ybS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdjcml0aWNhbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ltcG9ydGFudElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBub3JtYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ25vcm1hbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdmaW5pc2hlZElucHV0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnY3JpdGljYWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0NSSVRJQ0FMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdjcml0aWNhbCcpe1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGNyaXRpY2FsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnSU1QT1JUQU5UJylcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ltcG9ydGFudCcpe1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsaW1wb3J0YW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdub3JtYWwnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnTk9STUFMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdub3JtYWwnKXtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBub3JtYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLG5vcm1hbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0ZJTklTSEVEJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3guZHVlRGF0ZX1gO1xuICAgICAgICAgICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt4LmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcblxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgYWxsIGNyZWF0aW9uIGludG8gb25lIG1vZHVsZSB0aGVuIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgY3JlYXRlZCBlbGVtZW50cyBhbmQgcnVuIGluIHRocm91Z2ggdGhlIGNsYXNzIGFkZGluZyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICAgICAgY2FyZCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b25Db250LFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbixcbiAgICAgICAgICAgICAgICBjYXJkQ29udDEsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0sXG4gICAgICAgICAgICAgICAgY3JpdGljYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LFxuICAgICAgICAgICAgICAgIGltcG9ydGFudExhYmVsLFxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LFxuICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLFxuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dCxcbiAgICAgICAgICAgICAgICBjYXJkQ29udDIsXG4gICAgICAgICAgICAgICAgY2FyZENvbnQzLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vQWRkcyBhIGNsYXNzIHRvIGV2ZXJ5IGFycmF5IGVsZW1lbnQgZXF1YWwgdG8gdGhlaXIgdmFyaWFibGUgbmFtZVxuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChkZWxldGVCdXR0b25Db250LGNhcmRDb250MSxjYXJkQ29udDIsY2FyZENvbnQzKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICBjYXJkQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkQ29udDMuYXBwZW5kKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgLy9pZiB4IGlzIGEgbWFpbiB0YXNrIGNyZWF0ZSB0aGUgbmV3c3VidGFzayBidXR0b25cbiAgICAgICAgICAgIGlmKHguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBREQgTkVXIFNVQlRBU0snO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZCgnbmV3U3ViVGFza0J1dHRvbicpO1xuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgbmV3IHN1YnRhc2snKTtcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NyZWF0ZU5ld1N1YlRhc2snLHRydWUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChuZXdTdWJUYXNrQnV0dG9uKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybntnZW5lcmF0ZUNhcmR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCByZW5kZXJUYXNrTW9kPSgoKT0+e1xuICAgICAgICAvL3JlbmRlcnMgdGhlIGN1cnJlbnQgdGFzayBhbmQgaXRzIHN1YnRhc2tzXG4gICAgICAgIGNvbnN0IHJlbmRlclRhc2s9KGN1cnJlbnRUYXNrKT0+e1xuICAgICAgICAgICAgY29uc3QgZ2V0UmVuZGVyQXJyYXk9KHgpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBbeF07XG4gICAgICAgICAgICAgICAgeC5zdWJUYXNrQXJyYXkuZm9yRWFjaChlID0+IHJlbmRlckFycmF5LnB1c2goZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJBcnJheTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihjdXJyZW50VGFzayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyQXJyYXkgPSBnZXRSZW5kZXJBcnJheShjdXJyZW50VGFzayk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZW5kZXJBcnJheSk7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5mb3JFYWNoKGU9PmNhcmRDcmVhdGlvbi5nZW5lcmF0ZUNhcmQoZSkpO1xuICAgICAgICB9O1xuICAgICAgICAvL3N1YnNjcmliZSB0byB0YXNrQ2hhbmdlPyBtYXliZSBjb21iaW5lIHNvbWUgZXZlbnRzXG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0N1cnJlbnRUYXNrJyxyZW5kZXJUYXNrKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFzaycscmVuZGVyVGFzayk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3N1YlRhc2tEZWxldGVkJyxyZW5kZXJUYXNrKVxuICAgICAgICByZXR1cm57cmVuZGVyVGFza307XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2Z1bmN0aW9uIHRvIGdlbmVyYXRlIHNpZGViYXIgdGFicyB3aGVuZXZlciBhIG5ldyB0YXNrT2JqIGlzIHN0b3JlZC4ob3IgY2hhbmdlZCkuXG4gICAgY29uc3QgdGFza1RhYkNyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tUYWJzID0gZnVuY3Rpb24odGFza0FycmF5KXtcbiAgICAgICAgICAgIHRhc2tUYWJzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGFza0FycmF5LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgLy9lIGlzIGEgdGFzayBvYmplY3RcbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJTZWxlY3RlZCcsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFiRWxlbWVudENoYW5nZScsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdG9yYWdlQ2hhbmdlJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICAvL2V2ZW50cyBob2xkcyBhbiBhcnJheSBmb3IgZWFjaCBldmVudFxuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuLy9wb3NzaWJsZSBmdW5jdGlvbnM6IGZpbmRUYXNrSW5kZXgsZmluZFN1YlRhc2tJbmRleCxnZW5lcmF0ZVRhc2tJRCwuLi5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgbGV0IGN1cnJlbnRUYXNrID0gJyc7XG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFIERBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGlzVGFzayA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBUYXNrSURBcnJheSA9IHRhc2tTdG9yYWdlQXJyYXkubWFwKHggPT4geC50YXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gMSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcyBvYmplY3RzIG5ldyBJRCBpcyAke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tJRCA9IGdlbmVyYXRlVGFza0lEKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixzdWJUYXNrQXJyYXksaXNUYXNrLHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcblx0XHRcdHNldEN1cnJlbnRUYXNrKHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3VGFzaycsY3JlYXRlVGFza09iaik7XG5cbiAgICBjb25zdCBzZXRDdXJyZW50VGFzaz0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2sgPSB4O1xuXHRcdHB1YnN1Yi5wdWJsaXNoKCduZXdDdXJyZW50VGFzaycseCk7XG4gICAgfTtcblx0cHVic3ViLnN1YnNjcmliZSgndGFiU2VsZWN0ZWQnLHNldEN1cnJlbnRUYXNrKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza1N0b3JhZ2VDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVUYXNrPShkZWxldGVCdXR0b24pPT57XG4gICAgICAgIGxldCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZihkZWxldGVCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2stSUQnKSl7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnNwbGljZSh0YXNrSW5kZXgsMSk7XG4gICAgICAgICAgICAvL2xlbmd0aCBoYXMgY2hhbmdlZCBcbiAgICAgICAgICAgIGlmKHRhc2tJbmRleD09dGFza1N0b3JhZ2VBcnJheS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRhc2tJbmRleCA9IHRhc2tJbmRleCAtIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy90aGlzIHNpZ25hbHMgdG8gcmVuZGVyIHRoZSBuZXcgJ2N1cnJlbnQgdGFzaydcbiAgICAgICAgICAgIHNldEN1cnJlbnRUYXNrKHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza1N0b3JhZ2VDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICB9O1xuICAgICAgICBpZihkZWxldGVCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SUQgPSBkZWxldGVCdXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2sgPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuZmluZChlID0+IGUuc3ViVGFza0lEID09IGVsZW1lbnRJRCk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrSW5kZXggPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuaW5kZXhPZihzdWJUYXNrKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXkuc3BsaWNlKHN1YlRhc2tJbmRleCwxKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdzdWJUYXNrRGVsZXRlZCcsY3VycmVudFRhc2spO1xuICAgICAgICB9O1xuXG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdkZWxldGVUYXNrJyxkZWxldGVUYXNrKTtcblxuICAgIGNvbnN0IGVkaXRUYXNrVGV4dD0odGV4dEVsZW1lbnQpPT57XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuaW5kZXhPZihjdXJyZW50VGFzayk7XG4gICAgICAgIGlmKHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ01BSU4gVEFTSyBFRElULicpO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdW2Ake3RleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKX1gXSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgfTtcbiAgICAgICAgaWYodGV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU1VCVEFTSyBFRElULicpO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudElEID0gdGV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2sgPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuZmluZChlID0+IGUuc3ViVGFza0lEID09IGVsZW1lbnRJRCk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrSW5kZXggPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkuaW5kZXhPZihzdWJUYXNrKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXlbc3ViVGFza0luZGV4XVtgJHt0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrRWRpdCcsY3VycmVudFRhc2spO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFiRWxlbWVudENoYW5nZScsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRUYXNrVGV4dCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1ByaW9yaXR5PShwcmlvcml0eUVsZW1lbnQpPT57XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuaW5kZXhPZihjdXJyZW50VGFzayk7XG4gICAgICAgIGlmKHByaW9yaXR5RWxlbWVudC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLUlEJykpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHlFbGVtZW50LnZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBpZihwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJRCA9IHByaW9yaXR5RWxlbWVudC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5W3N1YlRhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eUVsZW1lbnQudmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJFbGVtZW50Q2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3ByaW9yaXR5Q2hhbmdlJyxlZGl0VGFza1ByaW9yaXR5KVxuXG4gICAgY29uc3Qgc3ViVGFza01ha2VyPSh4KT0+e1xuICAgICAgICBjb25zdCBjcmVhdGVTdWJUYXNrPSgpPT57XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9ICdVbnRpdGxlZCc7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9ICdURVNUIERVRURBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBpc1Rhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0lEID0oKT0+e1xuICAgICAgICAgICAgICAgIGxldCBJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgVGFza0lEQXJyYXkgPSBjdXJyZW50VGFzay5zdWJUYXNrQXJyYXkubWFwKHggPT4geC5zdWJUYXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGlzIG9iamVjdHMgbmV3IElEIGlzICR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0lEID0gZ2VuZXJhdGVUYXNrSUQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9uLGlzVGFzayxzdWJUYXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlU3ViVGFzayhjcmVhdGVTdWJUYXNrKCkpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1N1YlRhc2snLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2NyZWF0ZU5ld1N1YlRhc2snLHN1YlRhc2tNYWtlcik7XG5cbiAgICBjb25zdCBzdG9yZVN1YlRhc2s9KHN1YnRhc2spPT57XG5cdFx0Y3VycmVudFRhc2suc3ViVGFza0FycmF5LnB1c2goc3VidGFzayk7XG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=