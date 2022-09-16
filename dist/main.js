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

            //need to add something here that triggers the tasks subtask generation.
            subTaskCardCreation.generateSubTasks(x.subTaskArray);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('cardGenerated',x.taskID);
        };
        const clearTask = () =>{
            main.replaceChildren();
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjDeleted',generateTaskCard);
        return{generateTaskCard};
    })();
    
    const subTaskCardCreation = (()=>{
        //x is the current task objects subtask array
        const subTasks = document.createElement('div');
        subTasks.setAttribute('id','subTasks');
        
        const generateSubTasks=(x)=>{
            //x is the subtask array
            //e is a subtask array object
            subTasks.replaceChildren();
            let index = 0;
            x.forEach((e)=>{
                const subTask = document.createElement('div');
                subTask.classList.add('subTask');
                subTask.setAttribute('data-index',`${index}`);
                const subTaskCont1 = document.createElement('div');
                const subTaskCont2 = document.createElement('div');
                const subTaskCont3 = document.createElement('div');
                const subTaskCont4 = document.createElement('div');
                const subTaskDeleteButton = document.createElement('button');
                subTaskDeleteButton.textContent = 'X';
                const title = document.createElement('h5');
                title.textContent = `${e.title}`;
                title.addEventListener('click',editFunc.editText);
                title.classList.add('title');
                const priorityCont = document.createElement('div');
                const priorityForm = document.createElement('form');
                const criticalInput = document.createElement('input')
                criticalInput.setAttribute('type','radio');
                const importantInput = document.createElement('input');
                importantInput.setAttribute('type','radio');
                const normalInput = document.createElement('input');
                normalInput.setAttribute('type','radio');
                const finishedInput = document.createElement('input');
                finishedInput.setAttribute('type','radio');
                const dueDate = document.createElement('p');
                dueDate.textContent = `${e.dueDate}`;
                dueDate.addEventListener('click',editFunc.editText);
                dueDate.classList.add('dueDate');
                const description = document.createElement('p');
                description.textContent = `${e.description}`;
                description.addEventListener('click',editFunc.editText);
                description.classList.add('description');

                index = index + 1;
                main.append(subTasks);
                subTasks.append(subTask);
                subTask.append(subTaskCont1,subTaskCont2,subTaskCont3,subTaskCont4);
                subTaskCont1.append(subTaskDeleteButton);
                subTaskCont2.append(title,priorityCont);
                priorityCont.append(priorityForm);
                priorityForm.append(criticalInput,importantInput,normalInput,finishedInput);
                subTaskCont3.append(dueDate);
                subTaskCont4.append(description);
                // console.log(title.parentNode.parentNode);
            });
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newSubTaskStored',generateSubTasks);
        return{generateSubTasks};
    })();
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        //x is the task storage array
        const generateTaskTabs = function(x){
            taskTabs.replaceChildren();
            x.forEach((e)=>{
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
            const title = 'Untitled';
            const priority = '';
            const dueDate = 'TEST DUEDATE';
            const description = 'TEST DESCRIPTION';
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
    //yes, it seems like this would be a good change ^^^
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

    //x is the newly created subtask object
    const storeSubTask=(x)=>{
        let index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        console.log(taskStorageArray[index]);
        taskStorageArray[index].subTaskArray.push(x);
        console.log(taskStorageArray[index]);
        console.log(taskStorageArray[index].subTaskArray);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('newSubTaskStored',taskStorageArray[index].subTaskArray);
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newSubTaskCreated',storeSubTask)

    //x is the text element that we've edited 
    const editSubtask=(x)=>{
        const subTaskIndex = x.parentNode.parentNode.getAttribute('data-index');
        const taskIndex = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        taskStorageArray[taskIndex].subTaskArray[subTaskIndex][`${x.getAttribute('class')}`] = x.innerHTML;
        // console.log(taskStorageArray[taskIndex].subTaskArray[subTaskIndex][`${x.getAttribute('class')}`]);
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editSubtask);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDOzs7Ozs7OztVQ2pIRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOWTtBQUNaLENBQTRDO0FBQ1ciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9zdWJUYXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvdGFza0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuZXhwb3J0IGNvbnN0IERPTU1vZCA9ICgoKT0+e1xuICAgIC8vIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZWJhcicpO1xuICAgIGNvbnN0IHRhc2tUYWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tUYWJzJyk7XG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdUYXNrQnV0dG9uJyk7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG5cbiAgICBjb25zdCBlZGl0RnVuYyA9ICgoKT0+e1xuICAgICAgICBjb25zdCBlZGl0VGV4dCA9KGV2ZW50KT0+eyAgICBcbiAgICAgICAgICAgIGNvbnN0IHRleHRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ3RleHRFZGl0Jyk7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRleHRFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnB1dCx0ZXh0RWxlbWVudCk7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuXG4gICAgICAgICAgICAvL2ZvciBlbnRlciBrZXlcbiAgICAgICAgICAgIGlucHV0Lm9ua2V5ZG93biA9IChldikgPT57XG4gICAgICAgICAgICAgICAgaWYoZXYua2V5ID09ICdFbnRlcicpe1xuICAgICAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9mb3IgY2xpY2tpbmcgb2ZmIGlucHV0XG4gICAgICAgICAgICBpbnB1dC5vbmJsdXIgPSAoKSA9PntcbiAgICAgICAgICAgICAgICBmaW5pc2hFZGl0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZmluaXNoRWRpdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dCk7XG4gICAgICAgICAgICAgICAgdGV4dEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdFZGl0Jyx0ZXh0RWxlbWVudClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7ZWRpdFRleHR9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB0YXNrQ2FyZENyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICAvL3ggaXMgdGhlIHRhc2tPYmpcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrQ2FyZCA9ICh4KSA9PntcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBpZih4ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaGUgZ2VuZXJhdGVkIGNhcmQgaXMgdXNpbmcgdGhpcyBJRCAke3gudGFza0lEfWApO1xuXG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIC8vY2FuIG1heWJlIGFkZCBhbiBcImFyZSB5b3Ugc3VyZT9cIiBtZXNzYWdlIGxhdGVyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza0RlbGV0ZWQnLHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY3JlYXRlTmV3U3ViVGFzaycsdHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy9uZXcgc3VidGFzayAnY3JlYXRlTmV3U3ViVGFzaydcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL2dvaW5nIHRvIHRyeSBhbmQgbWFrZSB0aGlzIGEgZmFuY3kgY2hlY2sgYm94IHRoaW5nIHdpdGggNCBsZXZlbHNcbiAgICAgICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgICAgIC8vZGl2IGZvcm0gbGFiZWwraW5wdXQqNFxuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUHJpb3JpdHlUZXh0PSgpPT57XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7eC5wcmlvcml0eS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5IT09Jycpe1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gYWxsY2Fwcz9cbiAgICAgICAgICAgIC8vIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGFjdGl2ZSByYWRpbyBidXR0b25cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjcml0aWNhbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnY3JpdGljYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdpbXBvcnRhbnRJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbm9ybWFsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBmaW5pc2hlZExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnZmluaXNoZWRJbnB1dCcpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdDUklUSUNBTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnY3JpdGljYWwnKXtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxjcml0aWNhbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0lNUE9SVEFOVCcpXG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdpbXBvcnRhbnQnKXtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGltcG9ydGFudElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnbm9ybWFsJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ05PUk1BTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnbm9ybWFsJyl7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbm9ybWFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxub3JtYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ZpbmlzaGVkJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdGSU5JU0hFRCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnZmluaXNoZWQnKXtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vd2UncmUgZ29ubmEgdHJ5IHNvbWV0aGluZyB3aXRoIGFuIG91dHNpZGUgbGlicmFyeSBoZXJlIGxhdGVyLlxuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHt4LmR1ZURhdGV9YDtcbiAgICAgICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3NldHRpbmcgJ2NvbnRlbnRlZGl0YWJsZScgYXR0cmlidXRlIHRvIHRydWUgc2VlbXMgdG8geWVpbGQgYmV0dGVyIHJlc3VsdHMgZm9yIGRlc2NyaXB0aW9uP1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsJ3RydWUnKVxuICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt4LmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNlcGVyYXRlIGFsbCBjcmVhdGlvbiBpbnRvIG9uZSBtb2R1bGUgdGhlbiByZXR1cm4gYW4gb2JqZWN0IHdpdGggYWxsIGNyZWF0ZWQgZWxlbWVudHMgYW5kIHJ1biBpbiB0aHJvdWdoIHRoZSBjbGFzcyBhZGRpbmcgZnVuY3Rpb24/XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50T2JqID0ge1xuICAgICAgICAgICAgICAgIGNhcmQsXG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0J1dHRvbixcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyLFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Rm9ybSxcbiAgICAgICAgICAgICAgICBjcml0aWNhbExhYmVsLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQsXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwsXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQsXG4gICAgICAgICAgICAgICAgbm9ybWFsTGFiZWwsXG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRMYWJlbCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MixcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyQ29udDMsXG4gICAgICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50TmFtZUFycmF5ID0gT2JqZWN0LmtleXMoZWxlbWVudE9iaik7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgLy8gICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uY2xhc3NMaXN0LmFkZChgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLnNldEF0dHJpYnV0ZSgnaWQnLGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQoY2FyZCk7XG4gICAgICAgICAgICBjYXJkLmFwcGVuZChjYXJkSGVhZGVyLG5ld1N1YlRhc2tCdXR0b24pO1xuICAgICAgICAgICAgLy8gY2FyZEhlYWRlci5hcHBlbmQodGl0bGUscHJpb3JpdHksZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyLmFwcGVuZChkZWxldGVCdXR0b25Db250LGNhcmRIZWFkZXJDb250MSxjYXJkSGVhZGVyQ29udDIsY2FyZEhlYWRlckNvbnQzKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDMuYXBwZW5kKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgLy9uZWVkIHRvIGFkZCBzb21ldGhpbmcgaGVyZSB0aGF0IHRyaWdnZXJzIHRoZSB0YXNrcyBzdWJ0YXNrIGdlbmVyYXRpb24uXG4gICAgICAgICAgICBzdWJUYXNrQ2FyZENyZWF0aW9uLmdlbmVyYXRlU3ViVGFza3MoeC5zdWJUYXNrQXJyYXkpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NhcmRHZW5lcmF0ZWQnLHgudGFza0lEKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYXJUYXNrID0gKCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqRGVsZXRlZCcsZ2VuZXJhdGVUYXNrQ2FyZCk7XG4gICAgICAgIHJldHVybntnZW5lcmF0ZVRhc2tDYXJkfTtcbiAgICB9KSgpO1xuICAgIFxuICAgIGNvbnN0IHN1YlRhc2tDYXJkQ3JlYXRpb24gPSAoKCk9PntcbiAgICAgICAgLy94IGlzIHRoZSBjdXJyZW50IHRhc2sgb2JqZWN0cyBzdWJ0YXNrIGFycmF5XG4gICAgICAgIGNvbnN0IHN1YlRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN1YlRhc2tzLnNldEF0dHJpYnV0ZSgnaWQnLCdzdWJUYXNrcycpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVTdWJUYXNrcz0oeCk9PntcbiAgICAgICAgICAgIC8veCBpcyB0aGUgc3VidGFzayBhcnJheVxuICAgICAgICAgICAgLy9lIGlzIGEgc3VidGFzayBhcnJheSBvYmplY3RcbiAgICAgICAgICAgIHN1YlRhc2tzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIHguZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgc3ViVGFzay5jbGFzc0xpc3QuYWRkKCdzdWJUYXNrJyk7XG4gICAgICAgICAgICAgICAgc3ViVGFzay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLGAke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tDb250MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tDb250NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tEZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrRGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGAke2UudGl0bGV9YDtcbiAgICAgICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RpdGxlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcbiAgICAgICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgICAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkdWVEYXRlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtlLmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQoc3ViVGFza3MpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tzLmFwcGVuZChzdWJUYXNrKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrLmFwcGVuZChzdWJUYXNrQ29udDEsc3ViVGFza0NvbnQyLHN1YlRhc2tDb250MyxzdWJUYXNrQ29udDQpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tDb250MS5hcHBlbmQoc3ViVGFza0RlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgc3ViVGFza0NvbnQyLmFwcGVuZCh0aXRsZSxwcmlvcml0eUNvbnQpO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlGb3JtKTtcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0uYXBwZW5kKGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50SW5wdXQsbm9ybWFsSW5wdXQsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgc3ViVGFza0NvbnQzLmFwcGVuZChkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrQ29udDQuYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aXRsZS5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1N1YlRhc2tTdG9yZWQnLGdlbmVyYXRlU3ViVGFza3MpO1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVTdWJUYXNrc307XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2Z1bmN0aW9uIHRvIGdlbmVyYXRlIHNpZGViYXIgdGFicyB3aGVuZXZlciBhIG5ldyB0YXNrT2JqIGlzIHN0b3JlZC4ob3IgY2hhbmdlZCkuXG4gICAgY29uc3QgdGFza1RhYkNyZWF0aW9uID0gKCgpID0+e1xuICAgICAgICAvL3ggaXMgdGhlIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tUYWJzID0gZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB0YXNrVGFicy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHguZm9yRWFjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCd0YWInKVxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFiLUlEJyxgJHtlLnRhc2tJRH1gKTtcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRhc2tDYXJkQ3JlYXRpb24uZ2VuZXJhdGVUYXNrQ2FyZChlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuY2xhc3NMaXN0LmFkZCgndGFiQ29udDEnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcuY2xhc3NMaXN0LmFkZCgndGFiSGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRhYkhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtlLnRpdGxlfWA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgndGFiUHJpb3JpdHknKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2goZS5wcmlvcml0eSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyaXRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ltcG9ydGFudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlcmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdub3JtYWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmluaXNoZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvd2dyZWVuJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyMDEsMjAxLDIwMSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkNvbnQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgdGFiQ29udDIuY2xhc3NMaXN0LmFkZCgndGFiQ29udDInKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYkR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YWJEdWVEYXRlJyk7XG4gICAgICAgICAgICAgICAgdGFiRHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke2UuZHVlRGF0ZX1gO1xuXG4gICAgICAgICAgICAgICAgdGFza1RhYnMuYXBwZW5kKHRhYik7XG4gICAgICAgICAgICAgICAgdGFiLmFwcGVuZCh0YWJDb250MSx0YWJDb250Mik7XG4gICAgICAgICAgICAgICAgdGFiQ29udDEuYXBwZW5kKHRhYkhlYWRpbmcsdGFiUHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmFwcGVuZCh0YWJEdWVEYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqU3RvcmVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGV4dEVkaXQnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUVkaXQnLGdlbmVyYXRlVGFza1RhYnMpXG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tTdG9yYWdlQWRqdXN0ZWQnLGdlbmVyYXRlVGFza1RhYnMpO1xuICAgICAgICByZXR1cm4ge2dlbmVyYXRlVGFza1RhYnN9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBuZXdUYXNrTW9kID0oKCk9PntcbiAgICAgICAgbmV3VGFza0J1dHRvbi5vbmNsaWNrID0oKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1Rhc2snLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpDcmVhdGVkJyx0YXNrQ2FyZENyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKTtcbn0pKCk7IiwiLy8gY29uc3QgZ3JhYkZvcm0gPSBmdW5jdGlvbigpe1xuLy8gICAgIGNvbnN0IGZvcm1HcmFiID0ge1xuLy8gICAgICAgICB0aXRsZTp0aXRsZS52YWx1ZSxcbi8vICAgICAgICAgZGVzY3JpcHRpb246ZGVzY3JpcHRpb24udmFsdWUsXG4vLyAgICAgICAgIGR1ZURhdGU6ZHVlRGF0ZS52YWx1ZSxcbi8vICAgICAgICAgcHJpb3JpdHk6cHJpb3JpdHkudmFsdWUsXG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKGZvcm1HcmFiKTtcbi8vICAgICBwdWJzdWIucHVibGlzaCgnZm9ybUdyYWInLGZvcm1HcmFiKTtcbi8vICAgICAvL2NsZWFycyBvbGQgaW5wdXRcbi8vICAgICBjb25zdCBkb21BcnJheSA9IFt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5XTtcbi8vICAgICBkb21BcnJheS5mb3JFYWNoKChlKT0+e1xuLy8gICAgICAgICBlLnZhbHVlID0gJyc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBwdWJzdWIgPSB7XG4gICAgZXZlbnRzOnt9LFxuICAgIHN1YnNjcmliZTpmdW5jdGlvbihldmVudCxmbil7XG4gICAgICAgIC8vY2hlY2tzIGZvciBldmVudCBhbmQgaWYgaXRzIGFuIGFycmF5XG4gICAgICAgIC8vbm90IHN1cmUgaWYgdGhpcyBpcyB3b3JraW5nIGNvcnJlY3RseSBvM28gKlxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZXZlbnR9IGFycmF5IGRvZXNudCBleGlzdCB3aXRoaW4gZXZlbnRzIG9iamVjdC5gKVxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Z1bmN0aW9uIHB1c2hlZC4nKVxuICAgIH0sXG4gICAgcHVibGlzaDpmdW5jdGlvbihldmVudCxkYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IG9mIHB1Ymxpc2ggZnVuY3Rpb24nKVxuICAgICAgICAvL2NoZWNrIGZvciBldmVudCBhcnJheVxuICAgICAgICBpZih0aGlzLmV2ZW50c1tldmVudF0pe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgaGFzIGJlZW4gcHVibGlzaGVkLicpXG4gICAgICAgICAgICAgICAgZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy8gdW5zdWJzY3JpYmU6ZnVuY3Rpb24oKXtcblxuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9O1xuLy8gY29uc3QgdGFza0ZhY3RvcnkgPSAoeCkgPT57XG4vLyAgICAgLy94IGlzIGZvcm1EYXRhXG4vLyAgICAgY29uc3QgdGl0bGUgPSB4LnRpdGxlO1xuLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0geC5kZXNjcmlwdGlvbjtcbi8vICAgICBjb25zdCBkdWVEYXRlID0geC5kdWVEYXRlO1xuLy8gICAgIGNvbnN0IHByaW9yaXR5ID0geC5wcmlvcml0eTtcbi8vICAgICBjb25zdCBsb2dQcmlvcml0eT0oKT0+e1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhwcmlvcml0eSk7XG4vLyAgICAgfTtcbi8vICAgICAvLyBmdW5jdGlvbnMgZm9yIGVkaXRpbmcgZWFjaCBwcm9wZXJ0eT8gaW5oZXJpdGFuY2UgaXNzdWUqXG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tDcmVhdGVkJyx7dGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxsb2dQcmlvcml0eX0pXG4vLyAgICAgcmV0dXJue3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9XG4vLyB9XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdmb3JtR3JhYicsdGFza0ZhY3RvcnkpXG5cbi8vIGNvbnN0IHRhc2tTdG9yYWdlID0gW107XG4vLyBjb25zdCBzdG9yZVRhc2sgPSBmdW5jdGlvbih4KXtcbi8vICAgICBjb25zb2xlLmxvZyh4KTtcbi8vICAgICB0YXNrU3RvcmFnZS5wdXNoKHgpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlKTtcbi8vIH07XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrQ3JlYXRlZCcsc3RvcmVUYXNrKTtcblxuLy8gY29uc3QgdGVzdCA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgdGFza0xpc3QuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS5sb2dQcmlvcml0eSgpO1xuLy8gICAgIH0pO1xuLy8gfTsiLCJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3Qgc3ViVGFza09iak1vZHVsZSA9ICgoKT0+e1xuICAgIGNvbnN0IHN1YlRhc2tNYWtlcj0oeCk9PntcbiAgICAgICAgY29uc3QgY3JlYXRlU3ViVGFzaz0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAnVEVTVCBEVUVEQVRFJztcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJ1RFU1QgREVTQ1JJUFRJT04nO1xuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9ufTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3U3ViVGFza0NyZWF0ZWQnLGNyZWF0ZVN1YlRhc2soKSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjcmVhdGVOZXdTdWJUYXNrJyxzdWJUYXNrTWFrZXIpO1xufSkoKTtcbmV4cG9ydCB7c3ViVGFza09iak1vZHVsZX07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCB0YXNrU3RvcmFnZUFycmF5ID0gW107XG4gICAgLy9zaG91bGQgaSBqdXN0IGNoYW5nZSB0aGlzIHRvIGN1cnJlbnQgdGFzayBvYmplY3Q/XG4gICAgLy95ZXMsIGl0IHNlZW1zIGxpa2UgdGhpcyB3b3VsZCBiZSBhIGdvb2QgY2hhbmdlIF5eXlxuICAgIGxldCBjdXJyZW50VGFza0NhcmRJRCA9ICcnO1xuICAgIGNvbnN0IGNyZWF0ZVRhc2tPYmogPSh4KT0+e1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh4KTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgSUQgaGVyZT8gYW5kIHBhc3MgaXQgdG8gRE9NRnVuYz9cbiAgICAgICAgY29uc3QgdGFza01ha2VyID0oKT0+e1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSAnVW50aXRsZWQnO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSAnJztcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSAnVEVTVCBEVUUgREFURSc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIGNvbnN0IHN1YlRhc2tBcnJheSA9IFtdO1xuXG4gICAgICAgICAgICAvL2NoZWNrIGZvciBkdXBsaWNhdGUgaWQncyBpbiB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0lEID0oKT0+e1xuICAgICAgICAgICAgICAgIGxldCBJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgVGFza0lEQXJyYXkgPSB0YXNrU3RvcmFnZUFycmF5Lm1hcCh4ID0+IHgudGFza0lEKTtcbiAgICAgICAgICAgICAgICBpZihUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV0FSTklORyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZG97XG4gICAgICAgICAgICAgICAgICAgICAgICBJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgdGhpcyBvYmplY3RzIG5ldyBJRCBpcyAke0lEfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBkdXBsaWNhdGUgSUQgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tJRCA9IGdlbmVyYXRlVGFza0lEKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbixzdWJUYXNrQXJyYXksdGFza0lEfTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYoeCl7XG4gICAgICAgICAgICBzdG9yZVRhc2sodGFza01ha2VyKCkpO1xuICAgICAgICAgICAgLy9wdWJsaXNoZXMgbmV3IHRhc2tPYmpcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrT2JqQ3JlYXRlZCcsdGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W3Rhc2tTdG9yYWdlQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld1Rhc2snLGNyZWF0ZVRhc2tPYmopO1xuXG4gICAgY29uc3Qgc3RvcmVUYXNrPSh4KT0+e1xuICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnB1c2goeCk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrT2JqU3RvcmVkJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0Q3VycmVudFRhc2tDYXJkPSh4KT0+e1xuICAgICAgICBjdXJyZW50VGFza0NhcmRJRCA9IHg7XG4gICAgICAgIGNvbnNvbGUubG9nKGBjdXJyZW50VGFza0NhcmQgaXMgJHtjdXJyZW50VGFza0NhcmRJRH1gKTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ2NhcmRHZW5lcmF0ZWQnLHNldEN1cnJlbnRUYXNrQ2FyZCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1RleHQ9KHRleHRFbGVtZW50KT0+e1xuICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICAvL3JldHVybnMgaW5kZXggb2Ygb2JqZWN0IHRoYXQgbWF0Y2hlcyB0aGUgY3VycmVudFRhc2tDYXJkSURcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF1bYCR7dGV4dEVsZW1lbnQuaWR9YF0gPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgICAgLy9VcGRhdGVzIHNpZGViYXIgdGFic1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGV4dEVkaXQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRUYXNrVGV4dCk7XG5cbiAgICBjb25zdCBlZGl0VGFza1ByaW9yaXR5PSh4KT0+e1xuICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBpZih4LmNoZWNrZWQpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF0ucHJpb3JpdHkgPSB4LnZhbHVlO1xuICAgICAgICAgICAgLy9VcGRhdGVzIHNpZGViYXIgdGFic1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5RWRpdCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcmlvcml0eUNoYW5nZScsZWRpdFRhc2tQcmlvcml0eSlcblxuICAgIGNvbnN0IGRlbGV0ZVRhc2s9KHgpPT57XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5maW5kSW5kZXgoeCA9PiB4LnRhc2tJRCA9PSBjdXJyZW50VGFza0NhcmRJRCk7XG4gICAgICAgICAgICB0YXNrU3RvcmFnZUFycmF5LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIC8vbGVuZ3RoIGhhcyBjaGFuZ2VkIFxuICAgICAgICAgICAgaWYoaW5kZXg9PXRhc2tTdG9yYWdlQXJyYXkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4IC0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakRlbGV0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdKTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrU3RvcmFnZUFkanVzdGVkJyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tEZWxldGVkJyxkZWxldGVUYXNrKTtcblxuICAgIC8veCBpcyB0aGUgbmV3bHkgY3JlYXRlZCBzdWJ0YXNrIG9iamVjdFxuICAgIGNvbnN0IHN0b3JlU3ViVGFzaz0oeCk9PntcbiAgICAgICAgbGV0IGluZGV4ID0gdGFza1N0b3JhZ2VBcnJheS5maW5kSW5kZXgoZSA9PiBlLnRhc2tJRCA9PSBjdXJyZW50VGFza0NhcmRJRCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdKTtcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVtpbmRleF0uc3ViVGFza0FycmF5LnB1c2goeCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdKTtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0uc3ViVGFza0FycmF5KTtcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1N1YlRhc2tTdG9yZWQnLHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheSk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdTdWJUYXNrQ3JlYXRlZCcsc3RvcmVTdWJUYXNrKVxuXG4gICAgLy94IGlzIHRoZSB0ZXh0IGVsZW1lbnQgdGhhdCB3ZSd2ZSBlZGl0ZWQgXG4gICAgY29uc3QgZWRpdFN1YnRhc2s9KHgpPT57XG4gICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IHgucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdW2Ake3guZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0geC5pbm5lckhUTUw7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXlbc3ViVGFza0luZGV4XVtgJHt4LmdldEF0dHJpYnV0ZSgnY2xhc3MnKX1gXSk7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRTdWJ0YXNrKTtcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCJcbmltcG9ydCB7IHN1YlRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==