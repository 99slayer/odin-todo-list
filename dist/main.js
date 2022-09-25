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
            // if(x === undefined){
            //     return;
            // };
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
        
            //setting 'contenteditable' attribute to true seems to yeild better results for description?
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
        
            // for(let i=elementNameArray.length-1;i>=0;--i){
            //     elementObj[elementNameArray[i]].setAttribute('id',`${elementNameArray[i]}`);
            // };
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
            if(x.isTask){
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('cardGenerated',x);
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
        //x is the task storage array
        const generateTaskTabs = function(x){
            //x is the task storage array
            taskTabs.replaceChildren();
            x.forEach((e)=>{
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
        // pubsub.subscribe('taskObjCreated',cardCreation.generateCard);
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
            //publishes new taskObj
			setCurrentTask(taskStorageArray[taskStorageArray.length-1]);
            // pubsub.publish('taskObjCreated',taskStorageArray[taskStorageArray.length-1]);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newTask',createTaskObj);

    const setCurrentTask=(x)=>{
        currentTask = x;
		_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newCurrentTask',x);
    };
    // pubsub.subscribe('cardGenerated',setCurrentTask);
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
        // if(priorityElement.checked){
        //     taskStorageArray[taskIndex].priority = priorityElement.value;
        // };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('tabElementChange',taskStorageArray);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('priorityChange',editTaskPriority)




	const subTaskObjModule = (()=>{
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
	})();
    //x is the newly created subtask object
    const storeSubTask=(x)=>{
		currentTask.subTaskArray.push(x);
    };

    //x is the subtask index
    const deleteSubTask=(x)=>{
        //current
        const taskIndex = taskStorageArray.indexOf(currentTask);
        taskStorageArray[taskIndex].subTaskArray.splice(x,1);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subTaskDeleted',taskStorageArray[taskIndex].subTaskArray);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('deleteSubTask',deleteSubTask);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTlk7QUFDWixDQUE0QyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9ET01GdW5jLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBjb25zdCBET01Nb2QgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrVGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrVGFicycpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4gICAgY29uc3QgZWRpdEZ1bmMgPSAoKCk9PntcbiAgICAgICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdFZGl0Jyx0ZXh0RWxlbWVudClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7ZWRpdFRleHR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBjYXJkQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIC8veCBpcyB0aGUgdGFza09ialxuICAgICAgICBjb25zdCBnZW5lcmF0ZUNhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICAvLyBpZih4ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICBsZXQgSUQgPSAnJztcbiAgICAgICAgICAgIGxldCB0YXNrVHlwZSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZENvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRDb250MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYoeC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIElEID0geC50YXNrSUQ7XG4gICAgICAgICAgICAgICAgdGFza1R5cGUgPSAndGFzayc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoIXguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBJRCA9IHguc3ViVGFza0lEO1xuICAgICAgICAgICAgICAgIHRhc2tUeXBlID0gJ3N1YnRhc2snO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vY2FuIG1heWJlIGFkZCBhbiBcImFyZSB5b3Ugc3VyZT9cIiBtZXNzYWdlIGxhdGVyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVUYXNrJyxkZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVQcmlvcml0eVRleHQ9KCk9PntcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5LnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQuc3R5bGUuZ2FwID0gJzEwcHgnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkhPT0nJyl7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgICAgIHByaW9yaXR5Rm9ybS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdjcml0aWNhbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ltcG9ydGFudElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBub3JtYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ25vcm1hbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdmaW5pc2hlZElucHV0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnY3JpdGljYWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0NSSVRJQ0FMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdjcml0aWNhbCcpe1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGNyaXRpY2FsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnSU1QT1JUQU5UJylcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ltcG9ydGFudCcpe1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsaW1wb3J0YW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdub3JtYWwnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnTk9STUFMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdub3JtYWwnKXtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBub3JtYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLG5vcm1hbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0ZJTklTSEVEJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3guZHVlRGF0ZX1gO1xuICAgICAgICAgICAgZHVlRGF0ZS5zZXRBdHRyaWJ1dGUoYGRhdGEtJHt0YXNrVHlwZX0tSURgLGAke0lEfWApO1xuICAgICAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vc2V0dGluZyAnY29udGVudGVkaXRhYmxlJyBhdHRyaWJ1dGUgdG8gdHJ1ZSBzZWVtcyB0byB5ZWlsZCBiZXR0ZXIgcmVzdWx0cyBmb3IgZGVzY3JpcHRpb24/XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKGBkYXRhLSR7dGFza1R5cGV9LUlEYCxgJHtJRH1gKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG5cbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50T2JqID0ge1xuICAgICAgICAgICAgICAgIGNhcmQsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24sXG4gICAgICAgICAgICAgICAgY2FyZENvbnQxLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwsXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRMYWJlbCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dCxcbiAgICAgICAgICAgICAgICBub3JtYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZExhYmVsLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQsXG4gICAgICAgICAgICAgICAgY2FyZENvbnQyLFxuICAgICAgICAgICAgICAgIGNhcmRDb250MyxcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROYW1lQXJyYXkgPSBPYmplY3Qua2V5cyhlbGVtZW50T2JqKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAvLyAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5zZXRBdHRyaWJ1dGUoJ2lkJyxgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKGRlbGV0ZUJ1dHRvbkNvbnQsY2FyZENvbnQxLGNhcmRDb250MixjYXJkQ29udDMpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udC5hcHBlbmQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgIGNhcmRDb250MS5hcHBlbmQodGl0bGUscHJpb3JpdHlDb250KTtcbiAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlUZXh0LHByaW9yaXR5Rm9ybSk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uYXBwZW5kKGNyaXRpY2FsTGFiZWwsY3JpdGljYWxJbnB1dCxpbXBvcnRhbnRMYWJlbCxpbXBvcnRhbnRJbnB1dCxub3JtYWxMYWJlbCxub3JtYWxJbnB1dCxmaW5pc2hlZExhYmVsLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgY2FyZENvbnQyLmFwcGVuZChkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRDb250My5hcHBlbmQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICAvL2lmIHggaXMgYSBtYWluIHRhc2sgY3JlYXRlIHRoZSBuZXdzdWJ0YXNrIGJ1dHRvblxuICAgICAgICAgICAgaWYoeC5pc1Rhc2spe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ0FERCBORVcgU1VCVEFTSyc7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCduZXdTdWJUYXNrQnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBuZXcgc3VidGFzaycpO1xuICAgICAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY3JlYXRlTmV3U3ViVGFzaycsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tCdXR0b24pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKHguaXNUYXNrKXtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY2FyZEdlbmVyYXRlZCcseCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVDYXJkfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgcmVuZGVyVGFza01vZD0oKCk9PntcbiAgICAgICAgLy9yZW5kZXJzIHRoZSBjdXJyZW50IHRhc2sgYW5kIGl0cyBzdWJ0YXNrc1xuICAgICAgICBjb25zdCByZW5kZXJUYXNrPShjdXJyZW50VGFzayk9PntcbiAgICAgICAgICAgIGNvbnN0IGdldFJlbmRlckFycmF5PSh4KT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlckFycmF5ID0gW3hdO1xuICAgICAgICAgICAgICAgIHguc3ViVGFza0FycmF5LmZvckVhY2goZSA9PiByZW5kZXJBcnJheS5wdXNoKGUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyQXJyYXk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoY3VycmVudFRhc2sgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlckFycmF5ID0gZ2V0UmVuZGVyQXJyYXkoY3VycmVudFRhc2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVuZGVyQXJyYXkpO1xuICAgICAgICAgICAgcmVuZGVyQXJyYXkuZm9yRWFjaChlPT5jYXJkQ3JlYXRpb24uZ2VuZXJhdGVDYXJkKGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy9zdWJzY3JpYmUgdG8gdGFza0NoYW5nZT8gbWF5YmUgY29tYmluZSBzb21lIGV2ZW50c1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdDdXJyZW50VGFzaycscmVuZGVyVGFzayk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1N1YlRhc2snLHJlbmRlclRhc2spO1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCdzdWJUYXNrRGVsZXRlZCcscmVuZGVyVGFzaylcbiAgICAgICAgcmV0dXJue3JlbmRlclRhc2t9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgLy94IGlzIHRoZSB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgICAgIHRhc2tUYWJzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgeC5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIC8vZSBpcyBhIHRhc2sgb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFiU2VsZWN0ZWQnLGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICB0YWJDb250MS5jbGFzc0xpc3QuYWRkKCd0YWJDb250MScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgdGFiSGVhZGluZy5jbGFzc0xpc3QuYWRkKCd0YWJIZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdGFiSGVhZGluZy50ZXh0Q29udGVudCA9IGAke2UudGl0bGV9YDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCd0YWJQcmlvcml0eScpO1xuICAgICAgICAgICAgICAgIHN3aXRjaChlLnByaW9yaXR5KXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JpdGljYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW1wb3J0YW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2VyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vcm1hbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmaW5pc2hlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93Z3JlZW4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDIwMSwyMDEsMjAxKSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5jbGFzc0xpc3QuYWRkKCd0YWJDb250MicpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICB0YWJEdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3RhYkR1ZURhdGUnKTtcbiAgICAgICAgICAgICAgICB0YWJEdWVEYXRlLnRleHRDb250ZW50ID0gYCR7ZS5kdWVEYXRlfWA7XG5cbiAgICAgICAgICAgICAgICB0YXNrVGFicy5hcHBlbmQodGFiKTtcbiAgICAgICAgICAgICAgICB0YWIuYXBwZW5kKHRhYkNvbnQxLHRhYkNvbnQyKTtcbiAgICAgICAgICAgICAgICB0YWJDb250MS5hcHBlbmQodGFiSGVhZGluZyx0YWJQcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDIuYXBwZW5kKHRhYkR1ZURhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3RhYkVsZW1lbnRDaGFuZ2UnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrU3RvcmFnZUNoYW5nZScsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHJldHVybiB7Z2VuZXJhdGVUYXNrVGFic307XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IG5ld1Rhc2tNb2QgPSgoKT0+e1xuICAgICAgICBuZXdUYXNrQnV0dG9uLm9uY2xpY2sgPSgpPT57XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3VGFzaycsdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpDcmVhdGVkJyxjYXJkQ3JlYXRpb24uZ2VuZXJhdGVDYXJkKTtcbiAgICB9KSgpO1xufSkoKTsiLCIvLyBjb25zdCBncmFiRm9ybSA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgY29uc3QgZm9ybUdyYWIgPSB7XG4vLyAgICAgICAgIHRpdGxlOnRpdGxlLnZhbHVlLFxuLy8gICAgICAgICBkZXNjcmlwdGlvbjpkZXNjcmlwdGlvbi52YWx1ZSxcbi8vICAgICAgICAgZHVlRGF0ZTpkdWVEYXRlLnZhbHVlLFxuLy8gICAgICAgICBwcmlvcml0eTpwcmlvcml0eS52YWx1ZSxcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5sb2coZm9ybUdyYWIpO1xuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCdmb3JtR3JhYicsZm9ybUdyYWIpO1xuLy8gICAgIC8vY2xlYXJzIG9sZCBpbnB1dFxuLy8gICAgIGNvbnN0IGRvbUFycmF5ID0gW3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHldO1xuLy8gICAgIGRvbUFycmF5LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUudmFsdWUgPSAnJztcbi8vICAgICB9KTtcbi8vIH07XG5cbmNvbnN0IHB1YnN1YiA9IHtcbiAgICAvL2V2ZW50cyBob2xkcyBhbiBhcnJheSBmb3IgZWFjaCBldmVudFxuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIC8vY2hlY2sgZm9yIGV2ZW50IGFycmF5XG4gICAgICAgIGlmKHRoaXMuZXZlbnRzW2V2ZW50XSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBlKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvLyB1bnN1YnNjcmliZTpmdW5jdGlvbigpe1xuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YXNrT2JqTW9kdWxlID0gKCgpPT57XG4gICAgY29uc3QgdGFza1N0b3JhZ2VBcnJheSA9IFtdO1xuICAgIGxldCBjdXJyZW50VGFzayA9ICcnO1xuXG4gICAgY29uc3QgY3JlYXRlVGFza09iaiA9KHgpPT57XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFIERBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGlzVGFzayA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBUYXNrSURBcnJheSA9IHRhc2tTdG9yYWdlQXJyYXkubWFwKHggPT4geC50YXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gMSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcyBvYmplY3RzIG5ldyBJRCBpcyAke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tJRCA9IGdlbmVyYXRlVGFza0lEKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixzdWJUYXNrQXJyYXksaXNUYXNrLHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcbiAgICAgICAgICAgIC8vcHVibGlzaGVzIG5ldyB0YXNrT2JqXG5cdFx0XHRzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIC8vIHB1YnN1Yi5wdWJsaXNoKCd0YXNrT2JqQ3JlYXRlZCcsdGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrPSh4KT0+e1xuICAgICAgICBjdXJyZW50VGFzayA9IHg7XG5cdFx0cHVic3ViLnB1Ymxpc2goJ25ld0N1cnJlbnRUYXNrJyx4KTtcbiAgICB9O1xuICAgIC8vIHB1YnN1Yi5zdWJzY3JpYmUoJ2NhcmRHZW5lcmF0ZWQnLHNldEN1cnJlbnRUYXNrKTtcblx0cHVic3ViLnN1YnNjcmliZSgndGFiU2VsZWN0ZWQnLHNldEN1cnJlbnRUYXNrKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza1N0b3JhZ2VDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH07XG4gICAgY29uc3QgZGVsZXRlVGFzaz0oZGVsZXRlQnV0dG9uKT0+e1xuICAgICAgICBsZXQgdGFza0luZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5pbmRleE9mKGN1cnJlbnRUYXNrKTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLUlEJykpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5zcGxpY2UodGFza0luZGV4LDEpO1xuICAgICAgICAgICAgLy9sZW5ndGggaGFzIGNoYW5nZWQgXG4gICAgICAgICAgICBpZih0YXNrSW5kZXg9PXRhc2tTdG9yYWdlQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0YXNrSW5kZXggPSB0YXNrSW5kZXggLSAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vdGhpcyBzaWduYWxzIHRvIHJlbmRlciB0aGUgbmV3ICdjdXJyZW50IHRhc2snXG4gICAgICAgICAgICBzZXRDdXJyZW50VGFzayh0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0pO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQ2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudElEID0gZGVsZXRlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5LnNwbGljZShzdWJUYXNrSW5kZXgsMSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViVGFza0RlbGV0ZWQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgfTtcblxuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnZGVsZXRlVGFzaycsZGVsZXRlVGFzayk7XG5cbiAgICBjb25zdCBlZGl0VGFza1RleHQ9KHRleHRFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZih0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNQUlOIFRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XVtgJHt0ZXh0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH07XG4gICAgICAgIGlmKHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJykpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NVQlRBU0sgRURJVC4nKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJRCA9IHRleHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1zdWJ0YXNrLUlEJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmZpbmQoZSA9PiBlLnN1YlRhc2tJRCA9PSBlbGVtZW50SUQpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gY3VycmVudFRhc2suc3ViVGFza0FycmF5LmluZGV4T2Yoc3ViVGFzayk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5W3N1YlRhc2tJbmRleF1bYCR7dGV4dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza0VkaXQnLGN1cnJlbnRUYXNrKTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RhYkVsZW1lbnRDaGFuZ2UnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0ocHJpb3JpdHlFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICBpZihwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1JRCcpKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5RWxlbWVudC52YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYocHJpb3JpdHlFbGVtZW50LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN1YnRhc2stSUQnKSl7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SUQgPSBwcmlvcml0eUVsZW1lbnQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3VidGFzay1JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5maW5kKGUgPT4gZS5zdWJUYXNrSUQgPT0gZWxlbWVudElEKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5pbmRleE9mKHN1YlRhc2spO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHlFbGVtZW50LnZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICAvLyBpZihwcmlvcml0eUVsZW1lbnQuY2hlY2tlZCl7XG4gICAgICAgIC8vICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eUVsZW1lbnQudmFsdWU7XG4gICAgICAgIC8vIH07XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YWJFbGVtZW50Q2hhbmdlJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3ByaW9yaXR5Q2hhbmdlJyxlZGl0VGFza1ByaW9yaXR5KVxuXG5cblxuXG5cdGNvbnN0IHN1YlRhc2tPYmpNb2R1bGUgPSAoKCk9Pntcblx0XHRjb25zdCBzdWJUYXNrTWFrZXI9KHgpPT57XG5cdFx0XHRjb25zdCBjcmVhdGVTdWJUYXNrPSgpPT57XG5cdFx0XHRcdGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcblx0XHRcdFx0Y29uc3QgcHJpb3JpdHkgPSAnJztcblx0XHRcdFx0Y29uc3QgZHVlRGF0ZSA9ICdURVNUIERVRURBVEUnO1xuXHRcdFx0XHRjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgICAgICBjb25zdCBpc1Rhc2sgPSBmYWxzZTtcblx0XHRcdFx0Y29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG5cdFx0XHRcdFx0bGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcblx0XHRcdFx0XHRjb25zdCBUYXNrSURBcnJheSA9IGN1cnJlbnRUYXNrLnN1YlRhc2tBcnJheS5tYXAoeCA9PiB4LnN1YlRhc2tJRCk7XG5cdFx0XHRcdFx0aWYoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuXHRcdFx0XHRcdFx0ZG97XG5cdFx0XHRcdFx0XHRcdElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRyZXR1cm4gSUQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3Qgc3ViVGFza0lEID0gZ2VuZXJhdGVUYXNrSUQoKTtcblx0XG5cdFx0XHRcdHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixpc1Rhc2ssc3ViVGFza0lEfTtcblx0XHRcdH07XG5cdFx0XHRpZih4KXtcblx0XHRcdFx0c3RvcmVTdWJUYXNrKGNyZWF0ZVN1YlRhc2soKSk7XG5cdFx0XHRcdHB1YnN1Yi5wdWJsaXNoKCduZXdTdWJUYXNrJyxjdXJyZW50VGFzayk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdFx0cHVic3ViLnN1YnNjcmliZSgnY3JlYXRlTmV3U3ViVGFzaycsc3ViVGFza01ha2VyKTtcblx0fSkoKTtcbiAgICAvL3ggaXMgdGhlIG5ld2x5IGNyZWF0ZWQgc3VidGFzayBvYmplY3RcbiAgICBjb25zdCBzdG9yZVN1YlRhc2s9KHgpPT57XG5cdFx0Y3VycmVudFRhc2suc3ViVGFza0FycmF5LnB1c2goeCk7XG4gICAgfTtcblxuICAgIC8veCBpcyB0aGUgc3VidGFzayBpbmRleFxuICAgIGNvbnN0IGRlbGV0ZVN1YlRhc2s9KHgpPT57XG4gICAgICAgIC8vY3VycmVudFxuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmluZGV4T2YoY3VycmVudFRhc2spO1xuICAgICAgICB0YXNrU3RvcmFnZUFycmF5W3Rhc2tJbmRleF0uc3ViVGFza0FycmF5LnNwbGljZSh4LDEpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViVGFza0RlbGV0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXkpO1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnZGVsZXRlU3ViVGFzaycsZGVsZXRlU3ViVGFzayk7XG59KSgpO1xuXG5leHBvcnR7dGFza09iak1vZHVsZX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NTW9kIH0gZnJvbSBcIi4vZnVuY3Rpb25zL0RPTUZ1bmNcIlxuaW1wb3J0IHsgdGFza09iak1vZHVsZSB9IGZyb20gXCIuL2Z1bmN0aW9ucy90YXNrQ3JlYXRvclwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9