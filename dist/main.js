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
                const subTaskIndex = index;
                const subTask = document.createElement('div');
                subTask.classList.add('subTask');
                subTask.setAttribute('data-index',`${index}`);
                const subTaskCont1 = document.createElement('div');
                const subTaskCont2 = document.createElement('div');
                const subTaskCont3 = document.createElement('div');
                const subTaskCont4 = document.createElement('div');
                
                const subTaskDeleteButton = document.createElement('button');
                subTaskDeleteButton.textContent = 'X';
                subTaskDeleteButton.onclick =()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('deleteSubTask',subTaskIndex);
                };

                const title = document.createElement('h5');
                title.textContent = `${e.title}`;
                title.addEventListener('click',editFunc.editText);
                title.classList.add('title');

                const priorityCont = document.createElement('div');
                const priorityText = document.createElement('h5');
                priorityText.textContent = `${e.priority}`;
                const priorityForm = document.createElement('form');

                const generateSubPriorityText=()=>{
                    priorityText.textContent = `${e.priority}`;
                };

                const criticalInput = document.createElement('input')
                criticalInput.setAttribute('type','radio');
                criticalInput.setAttribute('value','critical');
                criticalInput.setAttribute('name',`subPriority${index}`);
                criticalInput.setAttribute('title','CRITICAL');
                criticalInput.classList.add('criticalInput');
                if(e.priority=='critical'){
                    criticalInput.setAttribute('checked','true');
                };
                criticalInput.addEventListener('click',()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subPriorityChange',criticalInput);
                    generateSubPriorityText();
                });
                
                const importantInput = document.createElement('input');
                importantInput.setAttribute('type','radio');
                importantInput.setAttribute('value','important');
                importantInput.setAttribute('name',`subPriority${index}`);
                importantInput.setAttribute('title','IMPORTANT')
                importantInput.classList.add('importantInput');
                if(e.priority=='important'){
                    importantInput.setAttribute('checked','true');
                };
                importantInput.addEventListener('click',()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subPriorityChange',importantInput);
                    generateSubPriorityText();
                });

                const normalInput = document.createElement('input');
                normalInput.setAttribute('type','radio');
                normalInput.setAttribute('value','normal');
                normalInput.setAttribute('name',`subPriority${index}`);
                normalInput.setAttribute('title','NORMAL');
                normalInput.classList.add('normalInput');
                if(e.priority=='normal'){
                    normalInput.setAttribute('checked','true');
                };
                normalInput.addEventListener('click',()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subPriorityChange',normalInput);
                    generateSubPriorityText();
                });


                const finishedInput = document.createElement('input');
                finishedInput.setAttribute('type','radio');
                finishedInput.setAttribute('value','finished');
                finishedInput.setAttribute('name',`subPriority${index}`);
                finishedInput.setAttribute('title','FINISHED');
                finishedInput.classList.add('finishedInput');
                if(e.priority=='finished'){
                    finishedInput.setAttribute('checked','true');
                };
                finishedInput.addEventListener('click',()=>{
                    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subPriorityChange',finishedInput);
                    generateSubPriorityText();
                });


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
                priorityCont.append(priorityText,priorityForm);
                priorityForm.append(criticalInput,importantInput,normalInput,finishedInput);
                subTaskCont3.append(dueDate);
                subTaskCont4.append(description);
                // console.log(title.parentNode.parentNode);
            });
        };
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newSubTaskStored',generateSubTasks);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('subTaskDeleted',generateSubTasks);
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
    const editSubTaskText=(x)=>{
        //pretty sure this is a cursed way to do this but it works for now
        if(x.parentNode.parentNode.getAttribute('class')!=='subTask'){
            return;
        };
        const subTaskIndex = x.parentNode.parentNode.getAttribute('data-index');
        const taskIndex = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        taskStorageArray[taskIndex].subTaskArray[subTaskIndex][`${x.getAttribute('class')}`] = x.innerHTML;
    }
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('newEdit',editSubTaskText);

    //x is the input element
    const editSubTaskPriority=(x)=>{
        const subTaskIndex = x.parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
        const taskIndex = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        if(x.checked){
            taskStorageArray[taskIndex].subTaskArray[subTaskIndex].priority = x.value;
            console.log(taskStorageArray[taskIndex].subTaskArray[subTaskIndex].priority);
        };
    };
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('subPriorityChange',editSubTaskPriority)

    //x is the subtask index
    const deleteSubTask=(x)=>{
        //current
        const taskIndex = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        taskStorageArray[taskIndex].subTaskArray.splice(x,1);
        console.log(taskStorageArray[taskIndex].subTaskArray);
        console.log(x);
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('subTaskDeleted',taskStorageArray[taskIndex].subTaskArray)
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
/* harmony import */ var _functions_subTaskCreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/subTaskCreator */ "./src/functions/subTaskCreator.js");

;


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQWM7QUFDMUIsWUFBWSxtREFBYztBQUMxQjtBQUNBO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBYztBQUN0QjtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLHdCQUF3QjtBQUMxRjtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7QUFDcEIsQ0FBQzs7Ozs7Ozs7VUMxSUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTlk7QUFDWixDQUE0QztBQUNXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL0RPTUZ1bmMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmV4cG9ydCBjb25zdCBET01Nb2QgPSAoKCk9PntcbiAgICAvLyBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBjb25zdCB0YXNrVGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrVGFicycpO1xuICAgIGNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3VGFza0J1dHRvbicpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuXG4gICAgY29uc3QgZWRpdEZ1bmMgPSAoKCk9PntcbiAgICAgICAgY29uc3QgZWRpdFRleHQgPShldmVudCk9PnsgICAgXG4gICAgICAgICAgICBjb25zdCB0ZXh0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCd0ZXh0RWRpdCcpO1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0ZXh0RWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5wdXQsdGV4dEVsZW1lbnQpO1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy9mb3IgZW50ZXIga2V5XG4gICAgICAgICAgICBpbnB1dC5vbmtleWRvd24gPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIGlmKGV2LmtleSA9PSAnRW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZm9yIGNsaWNraW5nIG9mZiBpbnB1dFxuICAgICAgICAgICAgaW5wdXQub25ibHVyID0gKCkgPT57XG4gICAgICAgICAgICAgICAgZmluaXNoRWRpdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaEVkaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LmlubmVySFRNTCA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHRleHRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3RWRpdCcsdGV4dEVsZW1lbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge2VkaXRUZXh0fTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgdGFza0NhcmRDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0NhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgaWYoeCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlIGdlbmVyYXRlZCBjYXJkIGlzIHVzaW5nIHRoaXMgSUQgJHt4LnRhc2tJRH1gKTtcblxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uQ29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICAvL2NhbiBtYXliZSBhZGQgYW4gXCJhcmUgeW91IHN1cmU/XCIgbWVzc2FnZSBsYXRlclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tEZWxldGVkJyx0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NyZWF0ZU5ld1N1YlRhc2snLHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vbmV3IHN1YnRhc2sgJ2NyZWF0ZU5ld1N1YlRhc2snXG5cbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7eC50aXRsZX1gO1xuICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9nb2luZyB0byB0cnkgYW5kIG1ha2UgdGhpcyBhIGZhbmN5IGNoZWNrIGJveCB0aGluZyB3aXRoIDQgbGV2ZWxzXG4gICAgICAgICAgICAvL3ByaW9yaXR5IHdpbGwgaGF2ZSA0IGxldmVsczogY3JpdGljYWwsIGltcG9ydGFudCwgbm9ybWFsLCBhbmQgZmluaXNoZWQuXG4gICAgICAgICAgICAvL2RpdiBmb3JtIGxhYmVsK2lucHV0KjRcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVByaW9yaXR5VGV4dD0oKT0+e1xuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGAke3gucHJpb3JpdHkudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udC5zdHlsZS5nYXAgPSAnMTBweCc7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSE9PScnKXtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGFsbGNhcHM/XG4gICAgICAgICAgICAvLyBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBhY3RpdmUgcmFkaW8gYnV0dG9uXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2NyaXRpY2FsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGltcG9ydGFudExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnaW1wb3J0YW50SW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIG5vcm1hbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnbm9ybWFsSW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgZmluaXNoZWRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ZpbmlzaGVkSW5wdXQnKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdjcml0aWNhbCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnQ1JJVElDQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2NyaXRpY2FsJyl7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjcml0aWNhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsY3JpdGljYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdJTVBPUlRBTlQnKVxuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnaW1wb3J0YW50Jyl7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxpbXBvcnRhbnRJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ25vcm1hbCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdOT1JNQUwnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ25vcm1hbCcpe1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG5vcm1hbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsbm9ybWFsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnRklOSVNIRUQnKTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ZpbmlzaGVkJyl7XG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmaW5pc2hlZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9zZXR0aW5nICdjb250ZW50ZWRpdGFibGUnIGF0dHJpYnV0ZSB0byB0cnVlIHNlZW1zIHRvIHllaWxkIGJldHRlciByZXN1bHRzIGZvciBkZXNjcmlwdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24sXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlcixcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b25Db250LFxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbixcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyQ29udDEsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eUZvcm0sXG4gICAgICAgICAgICAgICAgY3JpdGljYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LFxuICAgICAgICAgICAgICAgIGltcG9ydGFudExhYmVsLFxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LFxuICAgICAgICAgICAgICAgIG5vcm1hbExhYmVsLFxuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwsXG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dCxcbiAgICAgICAgICAgICAgICBjYXJkSGVhZGVyQ29udDIsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQzLFxuICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE5hbWVBcnJheSA9IE9iamVjdC5rZXlzKGVsZW1lbnRPYmopO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIGZvcihsZXQgaT1lbGVtZW50TmFtZUFycmF5Lmxlbmd0aC0xO2k+PTA7LS1pKXtcbiAgICAgICAgICAgIC8vICAgICBlbGVtZW50T2JqW2VsZW1lbnROYW1lQXJyYXlbaV1dLmNsYXNzTGlzdC5hZGQoYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5zZXRBdHRyaWJ1dGUoJ2lkJyxgJHtlbGVtZW50TmFtZUFycmF5W2ldfWApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kKGNhcmQpO1xuICAgICAgICAgICAgY2FyZC5hcHBlbmQoY2FyZEhlYWRlcixuZXdTdWJUYXNrQnV0dG9uKTtcbiAgICAgICAgICAgIC8vIGNhcmRIZWFkZXIuYXBwZW5kKHRpdGxlLHByaW9yaXR5LGR1ZURhdGUpO1xuICAgICAgICAgICAgY2FyZEhlYWRlci5hcHBlbmQoZGVsZXRlQnV0dG9uQ29udCxjYXJkSGVhZGVyQ29udDEsY2FyZEhlYWRlckNvbnQyLGNhcmRIZWFkZXJDb250Myk7XG4gICAgICAgICAgICBkZWxldGVCdXR0b25Db250LmFwcGVuZChkZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLmFwcGVuZCh0aXRsZSxwcmlvcml0eUNvbnQpO1xuICAgICAgICAgICAgcHJpb3JpdHlDb250LmFwcGVuZChwcmlvcml0eVRleHQscHJpb3JpdHlGb3JtKTtcbiAgICAgICAgICAgIHByaW9yaXR5Rm9ybS5hcHBlbmQoY3JpdGljYWxMYWJlbCxjcml0aWNhbElucHV0LGltcG9ydGFudExhYmVsLGltcG9ydGFudElucHV0LG5vcm1hbExhYmVsLG5vcm1hbElucHV0LGZpbmlzaGVkTGFiZWwsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDIuYXBwZW5kKGR1ZURhdGUpO1xuICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQzLmFwcGVuZChkZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgIC8vbmVlZCB0byBhZGQgc29tZXRoaW5nIGhlcmUgdGhhdCB0cmlnZ2VycyB0aGUgdGFza3Mgc3VidGFzayBnZW5lcmF0aW9uLlxuICAgICAgICAgICAgc3ViVGFza0NhcmRDcmVhdGlvbi5nZW5lcmF0ZVN1YlRhc2tzKHguc3ViVGFza0FycmF5KTtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdjYXJkR2VuZXJhdGVkJyx4LnRhc2tJRCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsZWFyVGFzayA9ICgpID0+e1xuICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFza09iakRlbGV0ZWQnLGdlbmVyYXRlVGFza0NhcmQpO1xuICAgICAgICByZXR1cm57Z2VuZXJhdGVUYXNrQ2FyZH07XG4gICAgfSkoKTtcbiAgICBcbiAgICBjb25zdCBzdWJUYXNrQ2FyZENyZWF0aW9uID0gKCgpPT57XG4gICAgICAgIC8veCBpcyB0aGUgY3VycmVudCB0YXNrIG9iamVjdHMgc3VidGFzayBhcnJheVxuICAgICAgICBjb25zdCBzdWJUYXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdWJUYXNrcy5zZXRBdHRyaWJ1dGUoJ2lkJywnc3ViVGFza3MnKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlU3ViVGFza3M9KHgpPT57XG4gICAgICAgICAgICAvL3ggaXMgdGhlIHN1YnRhc2sgYXJyYXlcbiAgICAgICAgICAgIC8vZSBpcyBhIHN1YnRhc2sgYXJyYXkgb2JqZWN0XG4gICAgICAgICAgICBzdWJUYXNrcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB4LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2suY2xhc3NMaXN0LmFkZCgnc3ViVGFzaycpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2suc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyxgJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrQ29udDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrQ29udDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrQ29udDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgc3ViVGFza0RlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgICAgICBzdWJUYXNrRGVsZXRlQnV0dG9uLm9uY2xpY2sgPSgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdkZWxldGVTdWJUYXNrJyxzdWJUYXNrSW5kZXgpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHtlLnRpdGxlfWA7XG4gICAgICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0aXRsZScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlDb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBgJHtlLnByaW9yaXR5fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVTdWJQcmlvcml0eVRleHQ9KCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7ZS5wcmlvcml0eX1gO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdjcml0aWNhbCcpO1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJyxgc3ViUHJpb3JpdHkke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0NSSVRJQ0FMJyk7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdjcml0aWNhbElucHV0Jyk7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmlvcml0eT09J2NyaXRpY2FsJyl7XG4gICAgICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3N1YlByaW9yaXR5Q2hhbmdlJyxjcml0aWNhbElucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTdWJQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnaW1wb3J0YW50Jyk7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJyxgc3ViUHJpb3JpdHkke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdJTVBPUlRBTlQnKVxuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudElucHV0Jyk7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmlvcml0eT09J2ltcG9ydGFudCcpe1xuICAgICAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3N1YlByaW9yaXR5Q2hhbmdlJyxpbXBvcnRhbnRJbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlU3ViUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnbm9ybWFsJyk7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJyxgc3ViUHJpb3JpdHkke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdOT1JNQUwnKTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlmKGUucHJpb3JpdHk9PSdub3JtYWwnKXtcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdzdWJQcmlvcml0eUNoYW5nZScsbm9ybWFsSW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVN1YlByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaW5pc2hlZElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnZmluaXNoZWQnKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsYHN1YlByaW9yaXR5JHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdGSU5JU0hFRCcpO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuY2xhc3NMaXN0LmFkZCgnZmluaXNoZWRJbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlmKGUucHJpb3JpdHk9PSdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdzdWJQcmlvcml0eUNoYW5nZScsZmluaXNoZWRJbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlU3ViUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke2UuZHVlRGF0ZX1gO1xuICAgICAgICAgICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2R1ZURhdGUnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7ZS5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcblxuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHN1YlRhc2tzKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrcy5hcHBlbmQoc3ViVGFzayk7XG4gICAgICAgICAgICAgICAgc3ViVGFzay5hcHBlbmQoc3ViVGFza0NvbnQxLHN1YlRhc2tDb250MixzdWJUYXNrQ29udDMsc3ViVGFza0NvbnQ0KTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrQ29udDEuYXBwZW5kKHN1YlRhc2tEZWxldGVCdXR0b24pO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tDb250Mi5hcHBlbmQodGl0bGUscHJpb3JpdHlDb250KTtcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Rm9ybS5hcHBlbmQoY3JpdGljYWxJbnB1dCxpbXBvcnRhbnRJbnB1dCxub3JtYWxJbnB1dCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrQ29udDMuYXBwZW5kKGR1ZURhdGUpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tDb250NC5hcHBlbmQoZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlLnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFza1N0b3JlZCcsZ2VuZXJhdGVTdWJUYXNrcyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3N1YlRhc2tEZWxldGVkJyxnZW5lcmF0ZVN1YlRhc2tzKTtcbiAgICAgICAgcmV0dXJue2dlbmVyYXRlU3ViVGFza3N9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB4LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0YXNrQ2FyZENyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFza09ialN0b3JlZCcsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3RleHRFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrU3RvcmFnZUFkanVzdGVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NhcmRDcmVhdGlvbi5nZW5lcmF0ZVRhc2tDYXJkKVxuICAgIH0pKCk7XG59KSgpOyIsIi8vIGNvbnN0IGdyYWJGb3JtID0gZnVuY3Rpb24oKXtcbi8vICAgICBjb25zdCBmb3JtR3JhYiA9IHtcbi8vICAgICAgICAgdGl0bGU6dGl0bGUudmFsdWUsXG4vLyAgICAgICAgIGRlc2NyaXB0aW9uOmRlc2NyaXB0aW9uLnZhbHVlLFxuLy8gICAgICAgICBkdWVEYXRlOmR1ZURhdGUudmFsdWUsXG4vLyAgICAgICAgIHByaW9yaXR5OnByaW9yaXR5LnZhbHVlLFxuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhmb3JtR3JhYik7XG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ2Zvcm1HcmFiJyxmb3JtR3JhYik7XG4vLyAgICAgLy9jbGVhcnMgb2xkIGlucHV0XG4vLyAgICAgY29uc3QgZG9tQXJyYXkgPSBbdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eV07XG4vLyAgICAgZG9tQXJyYXkuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS52YWx1ZSA9ICcnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgcHVic3ViID0ge1xuICAgIC8vZXZlbnRzIGhvbGRzIGFuIGFycmF5IGZvciBlYWNoIGV2ZW50XG4gICAgZXZlbnRzOnt9LFxuICAgIHN1YnNjcmliZTpmdW5jdGlvbihldmVudCxmbil7XG4gICAgICAgIC8vY2hlY2tzIGZvciBldmVudCBhbmQgaWYgaXRzIGFuIGFycmF5XG4gICAgICAgIGlmKCEodGhpcy5ldmVudHNbZXZlbnRdKSl7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvL3B1c2hlcyBzdWJzY3JpYmVyIGZ1bmN0aW9uIGludG8gZXZlbnQgYXJyYXlcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgcHVibGlzaDpmdW5jdGlvbihldmVudCxkYXRhKXtcbiAgICAgICAgLy9jaGVjayBmb3IgZXZlbnQgYXJyYXlcbiAgICAgICAgaWYodGhpcy5ldmVudHNbZXZlbnRdKXtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vIHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7XG4gICAgLy8gfSxcbn07XG5leHBvcnQge3B1YnN1Yn07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHN1YlRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCBzdWJUYXNrTWFrZXI9KHgpPT57XG4gICAgICAgIGNvbnN0IGNyZWF0ZVN1YlRhc2s9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFREFURSc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbn07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1N1YlRhc2tDcmVhdGVkJyxjcmVhdGVTdWJUYXNrKCkpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnY3JlYXRlTmV3U3ViVGFzaycsc3ViVGFza01ha2VyKTtcbn0pKCk7XG5leHBvcnQge3N1YlRhc2tPYmpNb2R1bGV9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YXNrT2JqTW9kdWxlID0gKCgpPT57XG4gICAgY29uc3QgdGFza1N0b3JhZ2VBcnJheSA9IFtdO1xuICAgIC8vc2hvdWxkIGkganVzdCBjaGFuZ2UgdGhpcyB0byBjdXJyZW50IHRhc2sgb2JqZWN0P1xuICAgIC8veWVzLCBpdCBzZWVtcyBsaWtlIHRoaXMgd291bGQgYmUgYSBnb29kIGNoYW5nZSBeXl5cbiAgICBsZXQgY3VycmVudFRhc2tDYXJkSUQgPSAnJztcbiAgICBjb25zdCBjcmVhdGVUYXNrT2JqID0oeCk9PntcbiAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIElEIGhlcmU/IGFuZCBwYXNzIGl0IHRvIERPTUZ1bmM/XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFIERBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrQXJyYXkgPSBbXTtcblxuICAgICAgICAgICAgLy9jaGVjayBmb3IgZHVwbGljYXRlIGlkJ3MgaW4gdGFzayBzdG9yYWdlIGFycmF5XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gdGFza1N0b3JhZ2VBcnJheS5tYXAoeCA9PiB4LnRhc2tJRCk7XG4gICAgICAgICAgICAgICAgaWYoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkcgZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZShUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrSUQgPSBnZW5lcmF0ZVRhc2tJRCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24sc3ViVGFza0FycmF5LHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcbiAgICAgICAgICAgIC8vcHVibGlzaGVzIG5ldyB0YXNrT2JqXG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakNyZWF0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrQ2FyZD0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2tDYXJkSUQgPSB4O1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudFRhc2tDYXJkIGlzICR7Y3VycmVudFRhc2tDYXJkSUR9YCk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXJkR2VuZXJhdGVkJyxzZXRDdXJyZW50VGFza0NhcmQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tUZXh0PSh0ZXh0RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnRUYXNrQ2FyZElEXG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdW2Ake3RleHRFbGVtZW50LmlkfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RleHRFZGl0Jyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0oeCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgaWYoeC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnByaW9yaXR5ID0geC52YWx1ZTtcbiAgICAgICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUVkaXQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlDaGFuZ2UnLGVkaXRUYXNrUHJpb3JpdHkpXG5cbiAgICBjb25zdCBkZWxldGVUYXNrPSh4KT0+e1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KHggPT4geC50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICAvL2xlbmd0aCBoYXMgY2hhbmdlZCBcbiAgICAgICAgICAgIGlmKGluZGV4PT10YXNrU3RvcmFnZUFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCAtIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpEZWxldGVkJyx0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza1N0b3JhZ2VBZGp1c3RlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrRGVsZXRlZCcsZGVsZXRlVGFzayk7XG5cbiAgICAvL3ggaXMgdGhlIG5ld2x5IGNyZWF0ZWQgc3VidGFzayBvYmplY3RcbiAgICBjb25zdCBzdG9yZVN1YlRhc2s9KHgpPT57XG4gICAgICAgIGxldCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheS5wdXNoKHgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheSk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdTdWJUYXNrU3RvcmVkJyx0YXNrU3RvcmFnZUFycmF5W2luZGV4XS5zdWJUYXNrQXJyYXkpO1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFza0NyZWF0ZWQnLHN0b3JlU3ViVGFzaylcblxuICAgIC8veCBpcyB0aGUgdGV4dCBlbGVtZW50IHRoYXQgd2UndmUgZWRpdGVkIFxuICAgIGNvbnN0IGVkaXRTdWJUYXNrVGV4dD0oeCk9PntcbiAgICAgICAgLy9wcmV0dHkgc3VyZSB0aGlzIGlzIGEgY3Vyc2VkIHdheSB0byBkbyB0aGlzIGJ1dCBpdCB3b3JrcyBmb3Igbm93XG4gICAgICAgIGlmKHgucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSE9PSdzdWJUYXNrJyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IHgucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdW2Ake3guZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0geC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRTdWJUYXNrVGV4dCk7XG5cbiAgICAvL3ggaXMgdGhlIGlucHV0IGVsZW1lbnRcbiAgICBjb25zdCBlZGl0U3ViVGFza1ByaW9yaXR5PSh4KT0+e1xuICAgICAgICBjb25zdCBzdWJUYXNrSW5kZXggPSB4LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBpZih4LmNoZWNrZWQpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdLnByaW9yaXR5ID0geC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXlbc3ViVGFza0luZGV4XS5wcmlvcml0eSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdzdWJQcmlvcml0eUNoYW5nZScsZWRpdFN1YlRhc2tQcmlvcml0eSlcblxuICAgIC8veCBpcyB0aGUgc3VidGFzayBpbmRleFxuICAgIGNvbnN0IGRlbGV0ZVN1YlRhc2s9KHgpPT57XG4gICAgICAgIC8vY3VycmVudFxuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheS5zcGxpY2UoeCwxKTtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViVGFza0RlbGV0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXkpXG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdkZWxldGVTdWJUYXNrJyxkZWxldGVTdWJUYXNrKTtcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCJcbmltcG9ydCB7IHN1YlRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==