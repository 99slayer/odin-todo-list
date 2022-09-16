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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGVBQWU7O0FBRWxEO0FBQ0EsUUFBUSxtREFBYztBQUN0QjtBQUNBO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBYztBQUMxQixZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0Usd0JBQXdCO0FBQzFGO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWdCO0FBQ3BCLENBQUM7Ozs7Ozs7O1VDL0hEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBNEM7QUFDVyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9ET01GdW5jLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZnVuY3Rpb25zL3N1YlRhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kID0gKCgpPT57XG4gICAgLy8gY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgY29uc3QgdGFza1RhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1RhYnMnKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Rhc2tCdXR0b24nKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcblxuICAgIGNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgICAgIGNvbnN0IGVkaXRUZXh0ID0oZXZlbnQpPT57ICAgIFxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dEVkaXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlucHV0LHRleHRFbGVtZW50KTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vZm9yIGVudGVyIGtleVxuICAgICAgICAgICAgaW5wdXQub25rZXlkb3duID0gKGV2KSA9PntcbiAgICAgICAgICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2ZvciBjbGlja2luZyBvZmYgaW5wdXRcbiAgICAgICAgICAgIGlucHV0Lm9uYmx1ciA9ICgpID0+e1xuICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5pbm5lckhUTUwgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLHRleHRFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtlZGl0VGV4dH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tDYXJkQ3JlYXRpb24gPSAoKCkgPT57XG4gICAgICAgIC8veCBpcyB0aGUgdGFza09ialxuICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tDYXJkID0gKHgpID0+e1xuICAgICAgICAgICAgbWFpbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGlmKHggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYFRoZSBnZW5lcmF0ZWQgY2FyZCBpcyB1c2luZyB0aGlzIElEICR7eC50YXNrSUR9YCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbkNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAgICAgLy9jYW4gbWF5YmUgYWRkIGFuIFwiYXJlIHlvdSBzdXJlP1wiIG1lc3NhZ2UgbGF0ZXJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrRGVsZXRlZCcsdHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdjcmVhdGVOZXdTdWJUYXNrJyx0cnVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL25ldyBzdWJ0YXNrICdjcmVhdGVOZXdTdWJUYXNrJ1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGAke3gudGl0bGV9YDtcbiAgICAgICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vZ29pbmcgdG8gdHJ5IGFuZCBtYWtlIHRoaXMgYSBmYW5jeSBjaGVjayBib3ggdGhpbmcgd2l0aCA0IGxldmVsc1xuICAgICAgICAgICAgLy9wcmlvcml0eSB3aWxsIGhhdmUgNCBsZXZlbHM6IGNyaXRpY2FsLCBpbXBvcnRhbnQsIG5vcm1hbCwgYW5kIGZpbmlzaGVkLlxuICAgICAgICAgICAgLy9kaXYgZm9ybSBsYWJlbCtpbnB1dCo0XG5cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Q29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVQcmlvcml0eVRleHQ9KCk9PntcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5LnRvVXBwZXJDYXNlKCl9YDtcbiAgICAgICAgICAgICAgICBwcmlvcml0eUNvbnQuc3R5bGUuZ2FwID0gJzEwcHgnO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkhPT0nJyl7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBhbGxjYXBzP1xuICAgICAgICAgICAgLy8gcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYWN0aXZlIHJhZGlvIGJ1dHRvblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdjcml0aWNhbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ2ltcG9ydGFudElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBub3JtYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBub3JtYWxMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsJ25vcm1hbElucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdmaW5pc2hlZElucHV0Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnY3JpdGljYWwnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0NSSVRJQ0FMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdjcml0aWNhbCcpe1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGNyaXRpY2FsSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnSU1QT1JUQU5UJylcbiAgICAgICAgICAgIGlmKHgucHJpb3JpdHkgPT0gJ2ltcG9ydGFudCcpe1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUNoYW5nZScsaW1wb3J0YW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdub3JtYWwnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnTk9STUFMJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdub3JtYWwnKXtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBub3JtYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLG5vcm1hbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0ZJTklTSEVEJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy93ZSdyZSBnb25uYSB0cnkgc29tZXRoaW5nIHdpdGggYW4gb3V0c2lkZSBsaWJyYXJ5IGhlcmUgbGF0ZXIuXG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IGAke3guZHVlRGF0ZX1gO1xuICAgICAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vc2V0dGluZyAnY29udGVudGVkaXRhYmxlJyBhdHRyaWJ1dGUgdG8gdHJ1ZSBzZWVtcyB0byB5ZWlsZCBiZXR0ZXIgcmVzdWx0cyBmb3IgZGVzY3JpcHRpb24/XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJywndHJ1ZScpXG4gICAgICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3guZGVzY3JpcHRpb259YDtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2VwZXJhdGUgYWxsIGNyZWF0aW9uIGludG8gb25lIG1vZHVsZSB0aGVuIHJldHVybiBhbiBvYmplY3Qgd2l0aCBhbGwgY3JlYXRlZCBlbGVtZW50cyBhbmQgcnVuIGluIHRocm91Z2ggdGhlIGNsYXNzIGFkZGluZyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRPYmogPSB7XG4gICAgICAgICAgICAgICAgY2FyZCxcbiAgICAgICAgICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24sXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwsXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRMYWJlbCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dCxcbiAgICAgICAgICAgICAgICBub3JtYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZExhYmVsLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MyxcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROYW1lQXJyYXkgPSBPYmplY3Qua2V5cyhlbGVtZW50T2JqKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAvLyAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5jbGFzc0xpc3QuYWRkKGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uc2V0QXR0cmlidXRlKCdpZCcsYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKGNhcmRIZWFkZXIsbmV3U3ViVGFza0J1dHRvbik7XG4gICAgICAgICAgICAvLyBjYXJkSGVhZGVyLmFwcGVuZCh0aXRsZSxwcmlvcml0eSxkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXIuYXBwZW5kKGRlbGV0ZUJ1dHRvbkNvbnQsY2FyZEhlYWRlckNvbnQxLGNhcmRIZWFkZXJDb250MixjYXJkSGVhZGVyQ29udDMpO1xuICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udC5hcHBlbmQoZGVsZXRlQnV0dG9uKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MS5hcHBlbmQodGl0bGUscHJpb3JpdHlDb250KTtcbiAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlUZXh0LHByaW9yaXR5Rm9ybSk7XG4gICAgICAgICAgICBwcmlvcml0eUZvcm0uYXBwZW5kKGNyaXRpY2FsTGFiZWwsY3JpdGljYWxJbnB1dCxpbXBvcnRhbnRMYWJlbCxpbXBvcnRhbnRJbnB1dCxub3JtYWxMYWJlbCxub3JtYWxJbnB1dCxmaW5pc2hlZExhYmVsLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLmFwcGVuZChkdWVEYXRlKTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250My5hcHBlbmQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICAvL25lZWQgdG8gYWRkIHNvbWV0aGluZyBoZXJlIHRoYXQgdHJpZ2dlcnMgdGhlIHRhc2tzIHN1YnRhc2sgZ2VuZXJhdGlvbi5cbiAgICAgICAgICAgIHN1YlRhc2tDYXJkQ3JlYXRpb24uZ2VuZXJhdGVTdWJUYXNrcyh4LnN1YlRhc2tBcnJheSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnY2FyZEdlbmVyYXRlZCcseC50YXNrSUQpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhclRhc2sgPSAoKSA9PntcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2tPYmpEZWxldGVkJyxnZW5lcmF0ZVRhc2tDYXJkKTtcbiAgICAgICAgcmV0dXJue2dlbmVyYXRlVGFza0NhcmR9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgY29uc3Qgc3ViVGFza0NhcmRDcmVhdGlvbiA9ICgoKT0+e1xuICAgICAgICAvL3ggaXMgdGhlIGN1cnJlbnQgdGFzayBvYmplY3RzIHN1YnRhc2sgYXJyYXlcbiAgICAgICAgY29uc3Qgc3ViVGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3ViVGFza3Muc2V0QXR0cmlidXRlKCdpZCcsJ3N1YlRhc2tzJyk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBnZW5lcmF0ZVN1YlRhc2tzPSh4KT0+e1xuICAgICAgICAgICAgLy94IGlzIHRoZSBzdWJ0YXNrIGFycmF5XG4gICAgICAgICAgICAvL2UgaXMgYSBzdWJ0YXNrIGFycmF5IG9iamVjdFxuICAgICAgICAgICAgc3ViVGFza3MucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgeC5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrLmNsYXNzTGlzdC5hZGQoJ3N1YlRhc2snKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsYCR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0NvbnQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0NvbnQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0NvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0NvbnQ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFza0RlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tEZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnWCc7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpO1xuICAgICAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgICAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGl0bGUnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Q29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g1Jyk7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7ZS5wcmlvcml0eX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlU3ViUHJpb3JpdHlUZXh0PSgpPT57XG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGAke2UucHJpb3JpdHl9YDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNyaXRpY2FsSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLGBzdWJQcmlvcml0eSR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywnQ1JJVElDQUwnKTtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LmNsYXNzTGlzdC5hZGQoJ2NyaXRpY2FsSW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpZihlLnByaW9yaXR5PT0nY3JpdGljYWwnKXtcbiAgICAgICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViUHJpb3JpdHlDaGFuZ2UnLGNyaXRpY2FsSW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVN1YlByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGltcG9ydGFudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdpbXBvcnRhbnQnKTtcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLGBzdWJQcmlvcml0eSR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0lNUE9SVEFOVCcpXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50SW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpZihlLnByaW9yaXR5PT0naW1wb3J0YW50Jyl7XG4gICAgICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGltcG9ydGFudElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnc3ViUHJpb3JpdHlDaGFuZ2UnLGltcG9ydGFudElucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTdWJQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdub3JtYWwnKTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLGBzdWJQcmlvcml0eSR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ05PUk1BTCcpO1xuICAgICAgICAgICAgICAgIG5vcm1hbElucHV0LmNsYXNzTGlzdC5hZGQoJ25vcm1hbElucHV0Jyk7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmlvcml0eT09J25vcm1hbCcpe1xuICAgICAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3N1YlByaW9yaXR5Q2hhbmdlJyxub3JtYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlU3ViUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZElucHV0LnNldEF0dHJpYnV0ZSgndmFsdWUnLCdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJyxgc3ViUHJpb3JpdHkke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0ZJTklTSEVEJyk7XG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5jbGFzc0xpc3QuYWRkKCdmaW5pc2hlZElucHV0Jyk7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmlvcml0eT09J2ZpbmlzaGVkJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3N1YlByaW9yaXR5Q2hhbmdlJyxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTdWJQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7ZS5kdWVEYXRlfWA7XG4gICAgICAgICAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZWRpdEZ1bmMuZWRpdFRleHQpO1xuICAgICAgICAgICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZCgnZHVlRGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtlLmRlc2NyaXB0aW9ufWA7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQoc3ViVGFza3MpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tzLmFwcGVuZChzdWJUYXNrKTtcbiAgICAgICAgICAgICAgICBzdWJUYXNrLmFwcGVuZChzdWJUYXNrQ29udDEsc3ViVGFza0NvbnQyLHN1YlRhc2tDb250MyxzdWJUYXNrQ29udDQpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tDb250MS5hcHBlbmQoc3ViVGFza0RlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICAgICAgc3ViVGFza0NvbnQyLmFwcGVuZCh0aXRsZSxwcmlvcml0eUNvbnQpO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udC5hcHBlbmQocHJpb3JpdHlUZXh0LHByaW9yaXR5Rm9ybSk7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbElucHV0LGltcG9ydGFudElucHV0LG5vcm1hbElucHV0LGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgICAgIHN1YlRhc2tDb250My5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICAgICAgc3ViVGFza0NvbnQ0LmFwcGVuZChkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGl0bGUucGFyZW50Tm9kZS5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdTdWJUYXNrU3RvcmVkJyxnZW5lcmF0ZVN1YlRhc2tzKTtcbiAgICAgICAgcmV0dXJue2dlbmVyYXRlU3ViVGFza3N9O1xuICAgIH0pKCk7XG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrIHN0b3JhZ2UgYXJyYXlcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB4LmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgndGFiJylcbiAgICAgICAgICAgICAgICB0YWIuc2V0QXR0cmlidXRlKCdkYXRhLXRhYi1JRCcsYCR7ZS50YXNrSUR9YCk7XG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0YXNrQ2FyZENyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFza09ialN0b3JlZCcsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3RleHRFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrU3RvcmFnZUFkanVzdGVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NhcmRDcmVhdGlvbi5nZW5lcmF0ZVRhc2tDYXJkKVxuICAgIH0pKCk7XG59KSgpOyIsIi8vIGNvbnN0IGdyYWJGb3JtID0gZnVuY3Rpb24oKXtcbi8vICAgICBjb25zdCBmb3JtR3JhYiA9IHtcbi8vICAgICAgICAgdGl0bGU6dGl0bGUudmFsdWUsXG4vLyAgICAgICAgIGRlc2NyaXB0aW9uOmRlc2NyaXB0aW9uLnZhbHVlLFxuLy8gICAgICAgICBkdWVEYXRlOmR1ZURhdGUudmFsdWUsXG4vLyAgICAgICAgIHByaW9yaXR5OnByaW9yaXR5LnZhbHVlLFxuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmxvZyhmb3JtR3JhYik7XG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ2Zvcm1HcmFiJyxmb3JtR3JhYik7XG4vLyAgICAgLy9jbGVhcnMgb2xkIGlucHV0XG4vLyAgICAgY29uc3QgZG9tQXJyYXkgPSBbdGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eV07XG4vLyAgICAgZG9tQXJyYXkuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS52YWx1ZSA9ICcnO1xuLy8gICAgIH0pO1xuLy8gfTtcblxuY29uc3QgcHVic3ViID0ge1xuICAgIGV2ZW50czp7fSxcbiAgICBzdWJzY3JpYmU6ZnVuY3Rpb24oZXZlbnQsZm4pe1xuICAgICAgICAvL2NoZWNrcyBmb3IgZXZlbnQgYW5kIGlmIGl0cyBhbiBhcnJheVxuICAgICAgICAvL25vdCBzdXJlIGlmIHRoaXMgaXMgd29ya2luZyBjb3JyZWN0bHkgbzNvICpcbiAgICAgICAgaWYoISh0aGlzLmV2ZW50c1tldmVudF0pKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2V2ZW50fSBhcnJheSBkb2VzbnQgZXhpc3Qgd2l0aGluIGV2ZW50cyBvYmplY3QuYClcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vcHVzaGVzIHN1YnNjcmliZXIgZnVuY3Rpb24gaW50byBldmVudCBhcnJheVxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChmbik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBwdXNoZWQuJylcbiAgICB9LFxuICAgIHB1Ymxpc2g6ZnVuY3Rpb24oZXZlbnQsZGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCBvZiBwdWJsaXNoIGZ1bmN0aW9uJylcbiAgICAgICAgLy9jaGVjayBmb3IgZXZlbnQgYXJyYXlcbiAgICAgICAgaWYodGhpcy5ldmVudHNbZXZlbnRdKXtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGhhcyBiZWVuIHB1Ymxpc2hlZC4nKVxuICAgICAgICAgICAgICAgIGUoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8vIHVuc3Vic2NyaWJlOmZ1bmN0aW9uKCl7XG5cbiAgICAvLyB9LFxufTtcbmV4cG9ydCB7cHVic3VifTtcbi8vIGNvbnN0IHRhc2tGYWN0b3J5ID0gKHgpID0+e1xuLy8gICAgIC8veCBpcyBmb3JtRGF0YVxuLy8gICAgIGNvbnN0IHRpdGxlID0geC50aXRsZTtcbi8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHguZGVzY3JpcHRpb247XG4vLyAgICAgY29uc3QgZHVlRGF0ZSA9IHguZHVlRGF0ZTtcbi8vICAgICBjb25zdCBwcmlvcml0eSA9IHgucHJpb3JpdHk7XG4vLyAgICAgY29uc3QgbG9nUHJpb3JpdHk9KCk9Pntcbi8vICAgICAgICAgY29uc29sZS5sb2cocHJpb3JpdHkpO1xuLy8gICAgIH07XG4vLyAgICAgLy8gZnVuY3Rpb25zIGZvciBlZGl0aW5nIGVhY2ggcHJvcGVydHk/IGluaGVyaXRhbmNlIGlzc3VlKlxuLy8gICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrQ3JlYXRlZCcse3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9KVxuLy8gICAgIHJldHVybnt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5LGxvZ1ByaW9yaXR5fVxuLy8gfVxuLy8gcHVic3ViLnN1YnNjcmliZSgnZm9ybUdyYWInLHRhc2tGYWN0b3J5KVxuXG4vLyBjb25zdCB0YXNrU3RvcmFnZSA9IFtdO1xuLy8gY29uc3Qgc3RvcmVUYXNrID0gZnVuY3Rpb24oeCl7XG4vLyAgICAgY29uc29sZS5sb2coeCk7XG4vLyAgICAgdGFza1N0b3JhZ2UucHVzaCh4KTtcbi8vICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZSk7XG4vLyB9O1xuLy8gcHVic3ViLnN1YnNjcmliZSgndGFza0NyZWF0ZWQnLHN0b3JlVGFzayk7XG5cbi8vIGNvbnN0IHRlc3QgPSBmdW5jdGlvbigpe1xuLy8gICAgIHRhc2tMaXN0LmZvckVhY2goKGUpPT57XG4vLyAgICAgICAgIGUubG9nUHJpb3JpdHkoKTtcbi8vICAgICB9KTtcbi8vIH07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbmNvbnN0IHN1YlRhc2tPYmpNb2R1bGUgPSAoKCk9PntcbiAgICBjb25zdCBzdWJUYXNrTWFrZXI9KHgpPT57XG4gICAgICAgIGNvbnN0IGNyZWF0ZVN1YlRhc2s9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFREFURSc7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdURVNUIERFU0NSSVBUSU9OJztcbiAgICAgICAgICAgIHJldHVybiB7dGl0bGUscHJpb3JpdHksZHVlRGF0ZSxkZXNjcmlwdGlvbn07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld1N1YlRhc2tDcmVhdGVkJyxjcmVhdGVTdWJUYXNrKCkpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnY3JlYXRlTmV3U3ViVGFzaycsc3ViVGFza01ha2VyKTtcbn0pKCk7XG5leHBvcnQge3N1YlRhc2tPYmpNb2R1bGV9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YXNrT2JqTW9kdWxlID0gKCgpPT57XG4gICAgY29uc3QgdGFza1N0b3JhZ2VBcnJheSA9IFtdO1xuICAgIC8vc2hvdWxkIGkganVzdCBjaGFuZ2UgdGhpcyB0byBjdXJyZW50IHRhc2sgb2JqZWN0P1xuICAgIC8veWVzLCBpdCBzZWVtcyBsaWtlIHRoaXMgd291bGQgYmUgYSBnb29kIGNoYW5nZSBeXl5cbiAgICBsZXQgY3VycmVudFRhc2tDYXJkSUQgPSAnJztcbiAgICBjb25zdCBjcmVhdGVUYXNrT2JqID0oeCk9PntcbiAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIElEIGhlcmU/IGFuZCBwYXNzIGl0IHRvIERPTUZ1bmM/XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFIERBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG4gICAgICAgICAgICBjb25zdCBzdWJUYXNrQXJyYXkgPSBbXTtcblxuICAgICAgICAgICAgLy9jaGVjayBmb3IgZHVwbGljYXRlIGlkJ3MgaW4gdGFzayBzdG9yYWdlIGFycmF5XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVRhc2tJRCA9KCk9PntcbiAgICAgICAgICAgICAgICBsZXQgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFRhc2tJREFycmF5ID0gdGFza1N0b3JhZ2VBcnJheS5tYXAoeCA9PiB4LnRhc2tJRCk7XG4gICAgICAgICAgICAgICAgaWYoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dBUk5JTkcgZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHRoaXMgb2JqZWN0cyBuZXcgSUQgaXMgJHtJRH1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZShUYXNrSURBcnJheS5maW5kKHggPT4geCA9PSBJRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm8gZHVwbGljYXRlIElEIGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrSUQgPSBnZW5lcmF0ZVRhc2tJRCgpO1xuXG4gICAgICAgICAgICByZXR1cm4ge3RpdGxlLHByaW9yaXR5LGR1ZURhdGUsZGVzY3JpcHRpb24sc3ViVGFza0FycmF5LHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcbiAgICAgICAgICAgIC8vcHVibGlzaGVzIG5ldyB0YXNrT2JqXG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakNyZWF0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrQ2FyZD0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2tDYXJkSUQgPSB4O1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudFRhc2tDYXJkIGlzICR7Y3VycmVudFRhc2tDYXJkSUR9YCk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXJkR2VuZXJhdGVkJyxzZXRDdXJyZW50VGFza0NhcmQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tUZXh0PSh0ZXh0RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnRUYXNrQ2FyZElEXG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdW2Ake3RleHRFbGVtZW50LmlkfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RleHRFZGl0Jyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0oeCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgaWYoeC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnByaW9yaXR5ID0geC52YWx1ZTtcbiAgICAgICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUVkaXQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlDaGFuZ2UnLGVkaXRUYXNrUHJpb3JpdHkpXG5cbiAgICBjb25zdCBkZWxldGVUYXNrPSh4KT0+e1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KHggPT4geC50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICAvL2xlbmd0aCBoYXMgY2hhbmdlZCBcbiAgICAgICAgICAgIGlmKGluZGV4PT10YXNrU3RvcmFnZUFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCAtIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tPYmpEZWxldGVkJyx0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza1N0b3JhZ2VBZGp1c3RlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrRGVsZXRlZCcsZGVsZXRlVGFzayk7XG5cbiAgICAvL3ggaXMgdGhlIG5ld2x5IGNyZWF0ZWQgc3VidGFzayBvYmplY3RcbiAgICBjb25zdCBzdG9yZVN1YlRhc2s9KHgpPT57XG4gICAgICAgIGxldCBpbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheS5wdXNoKHgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrU3RvcmFnZUFycmF5W2luZGV4XSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnN1YlRhc2tBcnJheSk7XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdTdWJUYXNrU3RvcmVkJyx0YXNrU3RvcmFnZUFycmF5W2luZGV4XS5zdWJUYXNrQXJyYXkpO1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3U3ViVGFza0NyZWF0ZWQnLHN0b3JlU3ViVGFzaylcblxuICAgIC8veCBpcyB0aGUgdGV4dCBlbGVtZW50IHRoYXQgd2UndmUgZWRpdGVkIFxuICAgIGNvbnN0IGVkaXRTdWJUYXNrVGV4dD0oeCk9PntcbiAgICAgICAgLy9wcmV0dHkgc3VyZSB0aGlzIGlzIGEgY3Vyc2VkIHdheSB0byBkbyB0aGlzIGJ1dCBpdCB3b3JrcyBmb3Igbm93XG4gICAgICAgIGlmKHgucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSE9PSdzdWJUYXNrJyl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN1YlRhc2tJbmRleCA9IHgucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdW2Ake3guZ2V0QXR0cmlidXRlKCdjbGFzcycpfWBdID0geC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ld0VkaXQnLGVkaXRTdWJUYXNrVGV4dCk7XG5cbiAgICAvL3ggaXMgdGhlIGlucHV0IGVsZW1lbnRcbiAgICBjb25zdCBlZGl0U3ViVGFza1ByaW9yaXR5PSh4KT0+e1xuICAgICAgICBjb25zdCBzdWJUYXNrSW5kZXggPSB4LnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tTdG9yYWdlQXJyYXkuZmluZEluZGV4KGUgPT4gZS50YXNrSUQgPT0gY3VycmVudFRhc2tDYXJkSUQpO1xuICAgICAgICBpZih4LmNoZWNrZWQpe1xuICAgICAgICAgICAgdGFza1N0b3JhZ2VBcnJheVt0YXNrSW5kZXhdLnN1YlRhc2tBcnJheVtzdWJUYXNrSW5kZXhdLnByaW9yaXR5ID0geC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlQXJyYXlbdGFza0luZGV4XS5zdWJUYXNrQXJyYXlbc3ViVGFza0luZGV4XS5wcmlvcml0eSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdzdWJQcmlvcml0eUNoYW5nZScsZWRpdFN1YlRhc2tQcmlvcml0eSlcbn0pKCk7XG5cbmV4cG9ydHt0YXNrT2JqTW9kdWxlfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET01Nb2QgfSBmcm9tIFwiLi9mdW5jdGlvbnMvRE9NRnVuY1wiXG5pbXBvcnQgeyB0YXNrT2JqTW9kdWxlIH0gZnJvbSBcIi4vZnVuY3Rpb25zL3Rhc2tDcmVhdG9yXCJcbmltcG9ydCB7IHN1YlRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvc3ViVGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==