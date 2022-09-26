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
            const dueDate = document.createElement('p');
            // dueDate.classList.add('editable');
            dueDate.textContent = `${x.dueDate}`;
            dueDate.setAttribute(`data-${taskType}-ID`,`${ID}`);
            dueDate.addEventListener('click',editFunc.editText);
        
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGtDQUFrQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usa0NBQWtDO0FBQ3hHO0FBQ0EsUUFBUSxtREFBYztBQUN0QixRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsR0FBRztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQWM7QUFDMUI7QUFDQTtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztVQ2xKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBNEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kID0gKCgpPT57XG4gICAgY29uc3QgdGFza1RhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1RhYnMnKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Rhc2tCdXR0b24nKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcblxuICAgIGNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgICAgIGNvbnN0IGVkaXRUZXh0ID0oZXZlbnQpPT57ICAgIFxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dEVkaXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlucHV0LHRleHRFbGVtZW50KTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAvL2ZvciBlbnRlciBrZXlcbiAgICAgICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICAgICAgaWYoZXYua2V5ID09ICdFbnRlcicpe1xuICAgICAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgICAgICBpbnB1dC5vbmJsdXIgPSAoKSA9PntcbiAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZmluaXNoRWRpdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLHRleHRFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtlZGl0VGV4dH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IGNhcmRDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlQ2FyZCA9ICh4KSA9PntcbiAgICAgICAgICAgIGxldCBJRCA9ICcnO1xuICAgICAgICAgICAgbGV0IHRhc2tUeXBlID0gJyc7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZENvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpZih4LmlzVGFzayl7XG4gICAgICAgICAgICAgICAgSUQgPSB4LnRhc2tJRDtcbiAgICAgICAgICAgICAgICB0YXNrVHlwZSA9ICd0YXNrJztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZigheC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIElEID0geC5zdWJUYXNrSUQ7XG4gICAgICAgICAgICAgICAgdGFza1R5cGUgPSAnc3VidGFzayc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9jYW4gbWF5YmUgYWRkIGFuIFwiYXJlIHlvdSBzdXJlP1wiIG1lc3NhZ2UgbGF0ZXJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2RlbGV0ZVRhc2snLGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICAvLyB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gJ1NFVCBUQVNLIFBSSU9SSVRZJztcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUHJpb3JpdHlUZXh0PSgpPT57XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7eC5wcmlvcml0eS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5IT09Jycpe1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uc2V0QXR0cmlidXRlKGBkYXRhLSR7dGFza1R5cGV9LUlEYCxgJHtJRH1gKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjcml0aWNhbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnY3JpdGljYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdpbXBvcnRhbnRJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbm9ybWFsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBmaW5pc2hlZExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnZmluaXNoZWRJbnB1dCcpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdDUklUSUNBTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnY3JpdGljYWwnKXtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxjcml0aWNhbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0lNUE9SVEFOVCcpXG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdpbXBvcnRhbnQnKXtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGltcG9ydGFudElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnbm9ybWFsJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ05PUk1BTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnbm9ybWFsJyl7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbm9ybWFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxub3JtYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdGSU5JU0hFRCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vd2UncmUgZ29ubmEgdHJ5IHNvbWV0aGluZyB3aXRoIGFuIG91dHNpZGUgbGlicmFyeSBoZXJlIGxhdGVyLlxuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIC8vIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHt4LmR1ZURhdGV9YDtcbiAgICAgICAgICAgIGR1ZURhdGUuc2V0QXR0cmlidXRlKGBkYXRhLSR7dGFza1R5cGV9LUlEYCxgJHtJRH1gKTtcbiAgICAgICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIC8vIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3guZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZShgZGF0YS0ke3Rhc2tUeXBlfS1JRGAsYCR7SUR9YCk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLFxuICAgICAgICAgICAgICAgIGNhcmRDb250MSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Rm9ybSxcbiAgICAgICAgICAgICAgICBjcml0aWNhbExhYmVsLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQsXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwsXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQsXG4gICAgICAgICAgICAgICAgbm9ybWFsTGFiZWwsXG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRMYWJlbCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LFxuICAgICAgICAgICAgICAgIGNhcmRDb250MixcbiAgICAgICAgICAgICAgICBjYXJkQ29udDMsXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9BZGRzIGEgY2xhc3MgdG8gZXZlcnkgYXJyYXkgZWxlbWVudCBlcXVhbCB0byB0aGVpciB2YXJpYWJsZSBuYW1lXG4gICAgICAgICAgICBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5jbGFzc0xpc3QuYWRkKGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKGRlbGV0ZUJ1dHRvbkNvbnQsY2FyZENvbnQxLGNhcmRDb250MixjYXJkQ29udDMpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udC5hcHBlbmQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgIGNhcmRDb250MS5hcHBlbmQodGl0bGUscHJpb3JpdHlDb250KTtcbiAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlUZXh0LHByaW9yaXR5Rm9ybSk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uYXBwZW5kKGNyaXRpY2FsTGFiZWwsY3JpdGljYWxJbnB1dCxpbXBvcnRhbnRMYWJlbCxpbXBvcnRhbnRJbnB1dCxub3JtYWxMYWJlbCxub3JtYWxJbnB1dCxmaW5pc2hlZExhYmVsLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgY2FyZENvbnQyLmFwcGVuZChkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRDb250My5hcHBlbmQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICAvL2lmIHggaXMgYSBtYWluIHRhc2sgY3JlYXRlIHRoZSBuZXdzdWJ0YXNrIGJ1dHRvblxuICAgICAgICAgICAgaWYoeC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ0FERCBORVcgU1VCVEFTSyc7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCduZXdTdWJUYXNrQnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBuZXcgc3VidGFzaycpO1xuICAgICAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY3JlYXRlTmV3U3ViVGFzaycsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tCdXR0b24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJue2dlbmVyYXRlQ2FyZH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHJlbmRlclRhc2tNb2Q9KCgpPT57XG4gICAgICAgIC8vcmVuZGVycyB0aGUgY3VycmVudCB0YXNrIGFuZCBpdHMgc3VidGFza3NcbiAgICAgICAgY29uc3QgcmVuZGVyVGFzaz0oY3VycmVudFRhc2spPT57XG4gICAgICAgICAgICBjb25zdCBnZXRSZW5kZXJBcnJheT0oeCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJBcnJheSA9IFt4XTtcbiAgICAgICAgICAgICAgICB4LnN1YlRhc2tBcnJheS5mb3JFYWNoKGUgPT4gcmVuZGVyQXJyYXkucHVzaChlKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckFycmF5O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRUYXNrID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJBcnJheSA9IGdldFJlbmRlckFycmF5KGN1cnJlbnRUYXNrKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlbmRlckFycmF5KTtcbiAgICAgICAgICAgIHJlbmRlckFycmF5LmZvckVhY2goZT0+Y2FyZENyZWF0aW9uLmdlbmVyYXRlQ2FyZChlKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vc3Vic2NyaWJlIHRvIHRhc2tDaGFuZ2U/IG1heWJlIGNvbWJpbmUgc29tZSBldmVudHNcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnbmV3Q3VycmVudFRhc2snLHJlbmRlclRhc2spO1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdTdWJUYXNrJyxyZW5kZXJUYXNrKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnc3ViVGFza0RlbGV0ZWQnLHJlbmRlclRhc2spXG4gICAgICAgIHJldHVybntyZW5kZXJUYXNrfTtcbiAgICB9KSgpO1xuICAgIFxuICAgIC8vZnVuY3Rpb24gdG8gZ2VuZXJhdGUgc2lkZWJhciB0YWJzIHdoZW5ldmVyIGEgbmV3IHRhc2tPYmogaXMgc3RvcmVkLihvciBjaGFuZ2VkKS5cbiAgICBjb25zdCB0YXNrVGFiQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza1RhYnMgPSBmdW5jdGlvbih0YXNrQXJyYXkpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB0YXNrQXJyYXkuZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICAvL2UgaXMgYSB0YXNrIG9iamVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3RhYicpXG4gICAgICAgICAgICAgICAgdGFiLnNldEF0dHJpYnV0ZSgnZGF0YS10YWItSUQnLGAke2UudGFza0lEfWApO1xuICAgICAgICAgICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RhYlNlbGVjdGVkJyxlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuY2xhc3NMaXN0LmFkZCgndGFiQ29udDEnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcuY2xhc3NMaXN0LmFkZCgndGFiSGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtlLnRpdGxlfWA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFiUHJpb3JpdHknKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5wcmlvcml0eSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyaXRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ltcG9ydGFudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlcmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmluaXNoZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvd2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyMDEsMjAxLDIwMSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDIuY2xhc3NMaXN0LmFkZCgndGFiQ29udDInKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YWJEdWVEYXRlJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke2UuZHVlRGF0ZX1gO1xuXG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJDb250MSx0YWJDb250Mik7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuYXBwZW5kKHRhYkhlYWRpbmcsdGFiUHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmFwcGVuZCh0YWJEdWVEYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YWJFbGVtZW50Q2hhbmdlJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFza1N0b3JhZ2VDaGFuZ2UnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlVGFza1RhYnN9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBuZXdUYXNrTW9kID0oKCk9PntcbiAgICAgICAgbmV3VGFza0J1dHRvbi5vbmNsaWNrID0oKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1Rhc2snLHRydWUpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG59KSgpOyIsIi8vIGNvbnN0IGdyYWJGb3JtID0gZnVuY3Rpb24oKXtcbi8vICAgICBjb25zdCBmb3JtR3JhYiA9IHtcbi8vICAgICAgICAgdGl0bGU6dGl0bGUudmFsdWUsXG4vLyAgICAgICAgIGRlc2NyaXB0aW9uOmRlc2NyaXB0aW9uLnZhbHVlLFxuLy8gICAgICAgICBkdWVEYXRlOmR1ZURhdGUudmFsdWUsXG4vLyAgICAgICAgIHByaW9yaXR5OnByaW9yaXR5LnZhbHVlLFxuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhmb3JtR3JhYik7XG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ2Zvcm1HcmFiJyxmb3JtR3JhYik7XG4vLyAgICAgLy9jbGVhcnMgb2xkIGlucHV0XG4vLyAgICAgY29uc3QgZG9tQXJyYXkgPSBbdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eV07XG4vLyAgICAgZG9tQXJyYXkuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS52YWx1ZSA9ICcnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgcHVic3ViID0ge1xuICAgIC8vZXZlbnRzIGhvbGRzIGFuIGFycmF5IGZvciBlYWNoIGV2ZW50XG4gICAgZXZlbnRzOnt9LFxuICAgIHN1YnNjcmliZTpmdW5jdGlvbihldmVudCxmbil7XG4gICAgICAgIC8vY2hlY2tzIGZvciBldmVudCBhbmQgaWYgaXRzIGFuIGFycmF5XG4gICAgICAgIGlmKCEodGhpcy5ldmVudHNbZXZlbnRdKSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvL3B1c2hlcyBzdWJzY3JpYmVyIGZ1bmN0aW9uIGludG8gZXZlbnQgYXJyYXlcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgcHVibGlzaDpmdW5jdGlvbihldmVudCxkYXRhKXtcbiAgICAgICAgLy9jaGVjayBmb3IgZXZlbnQgYXJyYXlcbiAgICAgICAgaWYodGhpcy5ldmVudHNbZXZlbnRdKXtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vIHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7XG4gICAgLy8gfSxcbn07XG5leHBvcnQge3B1YnN1Yn07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG4vL3Bvc3NpYmxlIGZ1bmN0aW9uczogZmluZFRhc2tJbmRleCxmaW5kU3ViVGFza0luZGV4LGdlbmVyYXRlVGFza0lELC4uLlxuY29uc3QgdGFza09iak1vZHVsZSA9ICgoKT0+e1xuICAgIGNvbnN0IHRhc2tTdG9yYWdlQXJyYXkgPSBbXTtcbiAgICBsZXQgY3VycmVudFRhc2sgPSAnJztcbiAgICBjb25zdCBjcmVhdGVUYXNrT2JqID0oeCk9PntcbiAgICAgICAgY29uc3QgdGFza01ha2VyID0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAnVEVTVCBEVUUgREFURSc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tBcnJheSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgaXNUYXNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy9jaGVjayBmb3IgZHVwbGljYXRlIGlkJ3MgaW4gdGFzayBzdG9yYWdlIGFycmF5XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gdGFza1N0b3JhZ2VBcnJheS5tYXAoeCA9PiB4LnRhc2tJRCk7XG4gICAgICAgICAgICAgICAgaWYoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkcgZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZShUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrSUQgPSBnZW5lcmF0ZVRhc2tJRCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24sc3ViVGFza0FycmF5LGlzVGFzayx0YXNrSUR9O1xuICAgICAgICB9O1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIHN0b3JlVGFzayh0YXNrTWFrZXIoKSk7XG5cdFx0XHRzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2snLGNyZWF0ZVRhc2tPYmopO1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFRhc2s9KHgpPT57XG4gICAgICAgIGN1cnJlbnRUYXNrID0geDtcblx0XHRwdWJzdWIucHVibGlzaCgnbmV3Q3VycmVudFRhc2snLHgpO1xuICAgIH07XG5cdHB1YnN1Yi5zdWJzY3JpYmUoJ3RhYlNlbGVjdGVkJyxzZXRDdXJyZW50VGFzayk7XG5cbiAgICBjb25zdCBzdG9yZVRhc2s9KHgpPT57XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXkucHVzaCh4KTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQ2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlVGFzaz0oZGVsZXRlQnV0dG9uKT0+e1xuICAgICAgICBsZXQgdGFza0luZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5pbmRleE9mKGN1cnJlbnRUYXNrKTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLUlEJykpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5zcGxpY2UodGFza0luZGV4LDEpO1xuICAgICAgICAgICAgLy9sZW5ndGggaGFzIGNoYW5nZWQgXG4gICAgICAgICAgICBpZih0YXNrSW5kZXg9PXRhc2tTdG9yYWdlQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0YXNrSW5kZXggPSB0YXNrSW5kZXggLSAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vdGhpcyBzaWduYWxzIHRvIHJlbmRlciB0aGUgbmV3ICdjdXJyZW50IHRhc2snXG4gICAgICAgICAgICBzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0pO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQ2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudElEID0gZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5LnNwbGljZShzdWJUYXNrSW5kZXgsMSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViVGFza0RlbGV0ZWQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgfTtcblxuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnZGVsZXRlVGFzaycsZGVsZXRlVGFzayk7XG5cbiAgICBjb25zdCBlZGl0VGFza1RleHQ9KHRleHRFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZih0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNQUlOIFRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XVtgJHt0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH07XG4gICAgICAgIGlmKHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NVQlRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJRCA9IHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5W3N1YlRhc2tJbmRleF1bYCR7dGV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza0VkaXQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RhYkVsZW1lbnRDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0ocHJpb3JpdHlFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZihwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5RWxlbWVudC52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYocHJpb3JpdHlFbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SUQgPSBwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5maW5kKGUgPT4gZS5zdWJUYXNrSUQgPT0gZWxlbWVudElEKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5pbmRleE9mKHN1YlRhc2spO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHlFbGVtZW50LnZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFiRWxlbWVudENoYW5nZScsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUNoYW5nZScsZWRpdFRhc2tQcmlvcml0eSlcblxuICAgIGNvbnN0IHN1YlRhc2tNYWtlcj0oeCk9PntcbiAgICAgICAgY29uc3QgY3JlYXRlU3ViVGFzaz0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAnVEVTVCBEVUVEQVRFJztcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ1RFU1QgREVTQ1JJUFRJT04nO1xuICAgICAgICAgICAgY29uc3QgaXNUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5Lm1hcCh4ID0+IHguc3ViVGFza0lEKTtcbiAgICAgICAgICAgICAgICBpZihUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV0FSTklORyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG97XG4gICAgICAgICAgICAgICAgICAgICAgICBJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcyBvYmplY3RzIG5ldyBJRCBpcyAke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJRCA9IGdlbmVyYXRlVGFza0lEKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixpc1Rhc2ssc3ViVGFza0lEfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBzdG9yZVN1YlRhc2soY3JlYXRlU3ViVGFzaygpKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdTdWJUYXNrJyxjdXJyZW50VGFzayk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjcmVhdGVOZXdTdWJUYXNrJyxzdWJUYXNrTWFrZXIpO1xuXG4gICAgY29uc3Qgc3RvcmVTdWJUYXNrPShzdWJ0YXNrKT0+e1xuXHRcdGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5wdXNoKHN1YnRhc2spO1xuICAgIH07XG59KSgpO1xuXG5leHBvcnR7dGFza09iak1vZHVsZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NTW9kIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuaW1wb3J0IHsgdGFza09iak1vZHVsZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy90YXNrQ3JlYXRvclwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9