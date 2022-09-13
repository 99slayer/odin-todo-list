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

    const taskCreation = (() =>{
        //x is the taskObj
        const generateTaskCard = (x) =>{
            if(x === undefined){
                return;
            };
            console.log(`The generated card is using this ID ${x.taskID}`);
            // console.log(`THIS CARD WAS GENERATED USING THIS INFO ${x.}`);
            main.replaceChildren();
            const card = document.createElement('div');
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
            card.append(cardHeader);
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
    
    const generateSubTaskCards = (()=>{

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
                    taskCreation.generateTaskCard(e);
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
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('taskObjCreated',taskCreation.generateTaskCard)
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
            const dueDate = 'TEST DUE DATE';
            const description = 'TEST DESCRIPTION';

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
            //find object with current task id and pop out of storage array.
            //find index
            const index = taskStorageArray.findIndex(x => x.taskID == currentTaskCardID);
            taskStorageArray.splice(index,1);
            // console.log(`this is the modified task storage array ${taskStorageArray}`);
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('taskObjDeleted',taskStorageArray[index-1]);
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

;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0EsUUFBUSxtREFBYztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBLElBQUkscURBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZUFBZTs7QUFFbEQ7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxREFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxpQkFBaUI7QUFDdkYsWUFBWSxtREFBYztBQUMxQixZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjtBQUNwQixDQUFDOzs7Ozs7OztVQ3pGRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05ZO0FBQ1osQ0FBNEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvRE9NRnVuYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9mdW5jdGlvbnMvcHVic3ViLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2Z1bmN0aW9ucy90YXNrQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5leHBvcnQgY29uc3QgRE9NTW9kID0gKCgpPT57XG4gICAgLy8gY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgY29uc3QgdGFza1RhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza1RhYnMnKTtcbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld1Rhc2tCdXR0b24nKTtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcblxuICAgIGNvbnN0IGVkaXRGdW5jID0gKCgpPT57XG4gICAgICAgIGNvbnN0IGVkaXRUZXh0ID0oZXZlbnQpPT57ICAgIFxuICAgICAgICAgICAgY29uc3QgdGV4dEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgndGV4dEVkaXQnKTtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIHRleHRFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlucHV0LHRleHRFbGVtZW50KTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vZm9yIGVudGVyIGtleVxuICAgICAgICAgICAgaW5wdXQub25rZXlkb3duID0gKGV2KSA9PntcbiAgICAgICAgICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2ZvciBjbGlja2luZyBvZmYgaW5wdXRcbiAgICAgICAgICAgIGlucHV0Lm9uYmx1ciA9ICgpID0+e1xuICAgICAgICAgICAgICAgIGZpbmlzaEVkaXQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hFZGl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5pbm5lckhUTUwgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgICAgICAgICAgICAgICB0ZXh0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ld0VkaXQnLHRleHRFbGVtZW50KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtlZGl0VGV4dH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHRhc2tDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgLy94IGlzIHRoZSB0YXNrT2JqXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlVGFza0NhcmQgPSAoeCkgPT57XG4gICAgICAgICAgICBpZih4ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVGhlIGdlbmVyYXRlZCBjYXJkIGlzIHVzaW5nIHRoaXMgSUQgJHt4LnRhc2tJRH1gKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUSElTIENBUkQgV0FTIEdFTkVSQVRFRCBVU0lORyBUSElTIElORk8gJHt4Ln1gKTtcbiAgICAgICAgICAgIG1haW4ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25Db250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBjYXJkSGVhZGVyQ29udDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRIZWFkZXJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgY2FyZEhlYWRlckNvbnQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIC8vY2FuIG1heWJlIGFkZCBhbiBcImFyZSB5b3Ugc3VyZT9cIiBtZXNzYWdlIGxhdGVyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza0RlbGV0ZWQnLHRydWUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBgJHt4LnRpdGxlfWA7XG4gICAgICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL2dvaW5nIHRvIHRyeSBhbmQgbWFrZSB0aGlzIGEgZmFuY3kgY2hlY2sgYm94IHRoaW5nIHdpdGggNCBsZXZlbHNcbiAgICAgICAgICAgIC8vcHJpb3JpdHkgd2lsbCBoYXZlIDQgbGV2ZWxzOiBjcml0aWNhbCwgaW1wb3J0YW50LCBub3JtYWwsIGFuZCBmaW5pc2hlZC5cbiAgICAgICAgICAgIC8vZGl2IGZvcm0gbGFiZWwraW5wdXQqNFxuXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eUNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKTtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUHJpb3JpdHlUZXh0PSgpPT57XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlUZXh0LnRleHRDb250ZW50ID0gYCR7eC5wcmlvcml0eS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDb250LnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5IT09Jycpe1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gYWxsY2Fwcz9cbiAgICAgICAgICAgIC8vIHByaW9yaXR5VGV4dC50ZXh0Q29udGVudCA9IGFjdGl2ZSByYWRpbyBidXR0b25cbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICAgICAgICAgICAgY29uc3QgY3JpdGljYWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBjcml0aWNhbExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnY3JpdGljYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0YW50TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50TGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdpbXBvcnRhbnRJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbm9ybWFsTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCdub3JtYWxJbnB1dCcpO1xuICAgICAgICAgICAgY29uc3QgZmluaXNoZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBmaW5pc2hlZExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywnZmluaXNoZWRJbnB1dCcpO1xuXG4gICAgICAgICAgICBjb25zdCBjcml0aWNhbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywncmFkaW8nKTtcbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2NyaXRpY2FsJyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsJ3ByaW9yaXR5Jyk7XG4gICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdDUklUSUNBTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnY3JpdGljYWwnKXtcbiAgICAgICAgICAgICAgICBjcml0aWNhbElucHV0LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsJ3RydWUnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxjcml0aWNhbElucHV0KTtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZVByaW9yaXR5VGV4dCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNyaXRpY2FsSW5wdXQub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3JpdGljYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnRJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub3JtYWxJbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaW5pc2hlZElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbXBvcnRhbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGltcG9ydGFudElucHV0LnNldEF0dHJpYnV0ZSgndGl0bGUnLCdJTVBPUlRBTlQnKVxuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnaW1wb3J0YW50Jyl7XG4gICAgICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1wb3J0YW50SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxpbXBvcnRhbnRJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpbXBvcnRhbnRJbnB1dC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjcml0aWNhbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGFudElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vcm1hbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbmlzaGVkSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIG5vcm1hbElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsJ3JhZGlvJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnbm9ybWFsJyk7XG4gICAgICAgICAgICBub3JtYWxJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdwcmlvcml0eScpO1xuICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ05PUk1BTCcpO1xuICAgICAgICAgICAgaWYoeC5wcmlvcml0eSA9PSAnbm9ybWFsJyl7XG4gICAgICAgICAgICAgICAgbm9ybWFsSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbm9ybWFsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3ByaW9yaXR5Q2hhbmdlJyxub3JtYWxJbnB1dCk7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVQcmlvcml0eVRleHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBub3JtYWxJbnB1dC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjcml0aWNhbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGFudElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vcm1hbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbmlzaGVkSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGZpbmlzaGVkSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdyYWRpbycpO1xuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywncHJpb3JpdHknKTtcbiAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCd0aXRsZScsJ0ZJTklTSEVEJyk7XG4gICAgICAgICAgICBpZih4LnByaW9yaXR5ID09ICdmaW5pc2hlZCcpe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywndHJ1ZScpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJpb3JpdHlDaGFuZ2UnLGZpbmlzaGVkSW5wdXQpO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlUHJpb3JpdHlUZXh0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZmluaXNoZWRJbnB1dC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjcml0aWNhbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGltcG9ydGFudElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vcm1hbElucHV0LmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbmlzaGVkSW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgLy8gcHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt4LnByaW9yaXR5fWA7XG4gICAgICAgICAgICAvLyBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdlZGl0YWJsZScpO1xuICAgICAgICAgICAgLy8gcHJpb3JpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGVkaXRGdW5jLmVkaXRUZXh0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL3dlJ3JlIGdvbm5hIHRyeSBzb21ldGhpbmcgd2l0aCBhbiBvdXRzaWRlIGxpYnJhcnkgaGVyZSBsYXRlci5cbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gYCR7eC5kdWVEYXRlfWA7XG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2VkaXRhYmxlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxlZGl0RnVuYy5lZGl0VGV4dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9zZXR0aW5nICdjb250ZW50ZWRpdGFibGUnIGF0dHJpYnV0ZSB0byB0cnVlIHNlZW1zIHRvIHllaWxkIGJldHRlciByZXN1bHRzIGZvciBkZXNjcmlwdGlvbj9cbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCd0cnVlJylcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7eC5kZXNjcmlwdGlvbn1gO1xuICAgICAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZWRpdGFibGUnKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBzZXBlcmF0ZSBhbGwgY3JlYXRpb24gaW50byBvbmUgbW9kdWxlIHRoZW4gcmV0dXJuIGFuIG9iamVjdCB3aXRoIGFsbCBjcmVhdGVkIGVsZW1lbnRzIGFuZCBydW4gaW4gdGhyb3VnaCB0aGUgY2xhc3MgYWRkaW5nIGZ1bmN0aW9uP1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudE9iaiA9IHtcbiAgICAgICAgICAgICAgICBjYXJkLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXIsXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uQ29udCxcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24sXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQxLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q29udCxcbiAgICAgICAgICAgICAgICBwcmlvcml0eVRleHQsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlGb3JtLFxuICAgICAgICAgICAgICAgIGNyaXRpY2FsTGFiZWwsXG4gICAgICAgICAgICAgICAgY3JpdGljYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRMYWJlbCxcbiAgICAgICAgICAgICAgICBpbXBvcnRhbnRJbnB1dCxcbiAgICAgICAgICAgICAgICBub3JtYWxMYWJlbCxcbiAgICAgICAgICAgICAgICBub3JtYWxJbnB1dCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZExhYmVsLFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkSW5wdXQsXG4gICAgICAgICAgICAgICAgY2FyZEhlYWRlckNvbnQyLFxuICAgICAgICAgICAgICAgIGNhcmRIZWFkZXJDb250MyxcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROYW1lQXJyYXkgPSBPYmplY3Qua2V5cyhlbGVtZW50T2JqKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9ZWxlbWVudE5hbWVBcnJheS5sZW5ndGgtMTtpPj0wOy0taSl7XG4gICAgICAgICAgICAvLyAgICAgZWxlbWVudE9ialtlbGVtZW50TmFtZUFycmF5W2ldXS5jbGFzc0xpc3QuYWRkKGAke2VsZW1lbnROYW1lQXJyYXlbaV19YCk7XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgZm9yKGxldCBpPWVsZW1lbnROYW1lQXJyYXkubGVuZ3RoLTE7aT49MDstLWkpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnRPYmpbZWxlbWVudE5hbWVBcnJheVtpXV0uc2V0QXR0cmlidXRlKCdpZCcsYCR7ZWxlbWVudE5hbWVBcnJheVtpXX1gKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtYWluLmFwcGVuZChjYXJkKTtcbiAgICAgICAgICAgIGNhcmQuYXBwZW5kKGNhcmRIZWFkZXIpO1xuICAgICAgICAgICAgLy8gY2FyZEhlYWRlci5hcHBlbmQodGl0bGUscHJpb3JpdHksZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyLmFwcGVuZChkZWxldGVCdXR0b25Db250LGNhcmRIZWFkZXJDb250MSxjYXJkSGVhZGVyQ29udDIsY2FyZEhlYWRlckNvbnQzKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbkNvbnQuYXBwZW5kKGRlbGV0ZUJ1dHRvbik7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDEuYXBwZW5kKHRpdGxlLHByaW9yaXR5Q29udCk7XG4gICAgICAgICAgICBwcmlvcml0eUNvbnQuYXBwZW5kKHByaW9yaXR5VGV4dCxwcmlvcml0eUZvcm0pO1xuICAgICAgICAgICAgcHJpb3JpdHlGb3JtLmFwcGVuZChjcml0aWNhbExhYmVsLGNyaXRpY2FsSW5wdXQsaW1wb3J0YW50TGFiZWwsaW1wb3J0YW50SW5wdXQsbm9ybWFsTGFiZWwsbm9ybWFsSW5wdXQsZmluaXNoZWRMYWJlbCxmaW5pc2hlZElucHV0KTtcbiAgICAgICAgICAgIGNhcmRIZWFkZXJDb250Mi5hcHBlbmQoZHVlRGF0ZSk7XG4gICAgICAgICAgICBjYXJkSGVhZGVyQ29udDMuYXBwZW5kKGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHgpO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2NhcmRHZW5lcmF0ZWQnLHgudGFza0lEKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYXJUYXNrID0gKCkgPT57XG4gICAgICAgICAgICBtYWluLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICB9O1xuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqRGVsZXRlZCcsZ2VuZXJhdGVUYXNrQ2FyZCk7XG4gICAgICAgIHJldHVybntnZW5lcmF0ZVRhc2tDYXJkfTtcbiAgICB9KSgpO1xuICAgIFxuICAgIGNvbnN0IGdlbmVyYXRlU3ViVGFza0NhcmRzID0gKCgpPT57XG5cbiAgICB9KSgpXG4gICAgXG4gICAgLy9mdW5jdGlvbiB0byBnZW5lcmF0ZSBzaWRlYmFyIHRhYnMgd2hlbmV2ZXIgYSBuZXcgdGFza09iaiBpcyBzdG9yZWQuKG9yIGNoYW5nZWQpLlxuICAgIGNvbnN0IHRhc2tUYWJDcmVhdGlvbiA9ICgoKSA9PntcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrVGFicyA9IGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdGFza1RhYnMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgeCBpcyAke3hbMF0udGFza0lEfWApO1xuICAgICAgICAgICAgeC5mb3JFYWNoKChlKT0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHRhc2tJbmZvID0gZTtcbiAgICAgICAgICAgICAgICAvL2NhbiBhZGQgbW9yZSBlbGVtZW50cyB0byB0aGUgdGFicyBsYXRlciBvblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3RhYicpXG4gICAgICAgICAgICAgICAgdGFiLnNldEF0dHJpYnV0ZSgnZGF0YS10YWItSUQnLGAke2UudGFza0lEfWApO1xuICAgICAgICAgICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGFza0NyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQxJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3RhYkhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0YWJIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7ZS50aXRsZX1gO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYlByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3RhYlByaW9yaXR5Jyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGUucHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQcmlvcml0eS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbXBvcnRhbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUHJpb3JpdHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZXJlZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9ybWFsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3dncmVlbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlByaW9yaXR5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjAxLDIwMSwyMDEpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJDb250MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQyLmNsYXNzTGlzdC5hZGQoJ3RhYkNvbnQyJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YWJEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFiRHVlRGF0ZScpO1xuICAgICAgICAgICAgICAgIHRhYkR1ZURhdGUudGV4dENvbnRlbnQgPSBgJHtlLmR1ZURhdGV9YDtcblxuICAgICAgICAgICAgICAgIHRhc2tUYWJzLmFwcGVuZCh0YWIpO1xuICAgICAgICAgICAgICAgIHRhYi5hcHBlbmQodGFiQ29udDEsdGFiQ29udDIpO1xuICAgICAgICAgICAgICAgIHRhYkNvbnQxLmFwcGVuZCh0YWJIZWFkaW5nLHRhYlByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB0YWJDb250Mi5hcHBlbmQodGFiRHVlRGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgndGFza09ialN0b3JlZCcsZ2VuZXJhdGVUYXNrVGFicyk7XG4gICAgICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3RleHRFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlFZGl0JyxnZW5lcmF0ZVRhc2tUYWJzKVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrU3RvcmFnZUFkanVzdGVkJyxnZW5lcmF0ZVRhc2tUYWJzKTtcbiAgICAgICAgcmV0dXJuIHtnZW5lcmF0ZVRhc2tUYWJzfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgbmV3VGFza01vZCA9KCgpPT57XG4gICAgICAgIG5ld1Rhc2tCdXR0b24ub25jbGljayA9KCk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdUYXNrJyx0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrT2JqQ3JlYXRlZCcsdGFza0NyZWF0aW9uLmdlbmVyYXRlVGFza0NhcmQpXG4gICAgfSkoKTtcbn0pKCk7IiwiLy8gY29uc3QgZ3JhYkZvcm0gPSBmdW5jdGlvbigpe1xuLy8gICAgIGNvbnN0IGZvcm1HcmFiID0ge1xuLy8gICAgICAgICB0aXRsZTp0aXRsZS52YWx1ZSxcbi8vICAgICAgICAgZGVzY3JpcHRpb246ZGVzY3JpcHRpb24udmFsdWUsXG4vLyAgICAgICAgIGR1ZURhdGU6ZHVlRGF0ZS52YWx1ZSxcbi8vICAgICAgICAgcHJpb3JpdHk6cHJpb3JpdHkudmFsdWUsXG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUubG9nKGZvcm1HcmFiKTtcbi8vICAgICBwdWJzdWIucHVibGlzaCgnZm9ybUdyYWInLGZvcm1HcmFiKTtcbi8vICAgICAvL2NsZWFycyBvbGQgaW5wdXRcbi8vICAgICBjb25zdCBkb21BcnJheSA9IFt0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5XTtcbi8vICAgICBkb21BcnJheS5mb3JFYWNoKChlKT0+e1xuLy8gICAgICAgICBlLnZhbHVlID0gJyc7XG4vLyAgICAgfSk7XG4vLyB9O1xuXG5jb25zdCBwdWJzdWIgPSB7XG4gICAgZXZlbnRzOnt9LFxuICAgIHN1YnNjcmliZTpmdW5jdGlvbihldmVudCxmbil7XG4gICAgICAgIC8vY2hlY2tzIGZvciBldmVudCBhbmQgaWYgaXRzIGFuIGFycmF5XG4gICAgICAgIC8vbm90IHN1cmUgaWYgdGhpcyBpcyB3b3JraW5nIGNvcnJlY3RseSBvM28gKlxuICAgICAgICBpZighKHRoaXMuZXZlbnRzW2V2ZW50XSkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7ZXZlbnR9IGFycmF5IGRvZXNudCBleGlzdCB3aXRoaW4gZXZlbnRzIG9iamVjdC5gKVxuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9wdXNoZXMgc3Vic2NyaWJlciBmdW5jdGlvbiBpbnRvIGV2ZW50IGFycmF5XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Z1bmN0aW9uIHB1c2hlZC4nKVxuICAgIH0sXG4gICAgcHVibGlzaDpmdW5jdGlvbihldmVudCxkYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IG9mIHB1Ymxpc2ggZnVuY3Rpb24nKVxuICAgICAgICAvL2NoZWNrIGZvciBldmVudCBhcnJheVxuICAgICAgICBpZih0aGlzLmV2ZW50c1tldmVudF0pe1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKGUpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgaGFzIGJlZW4gcHVibGlzaGVkLicpXG4gICAgICAgICAgICAgICAgZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgLy8gdW5zdWJzY3JpYmU6ZnVuY3Rpb24oKXtcblxuICAgIC8vIH0sXG59O1xuZXhwb3J0IHtwdWJzdWJ9O1xuLy8gY29uc3QgdGFza0ZhY3RvcnkgPSAoeCkgPT57XG4vLyAgICAgLy94IGlzIGZvcm1EYXRhXG4vLyAgICAgY29uc3QgdGl0bGUgPSB4LnRpdGxlO1xuLy8gICAgIGNvbnN0IGRlc2NyaXB0aW9uID0geC5kZXNjcmlwdGlvbjtcbi8vICAgICBjb25zdCBkdWVEYXRlID0geC5kdWVEYXRlO1xuLy8gICAgIGNvbnN0IHByaW9yaXR5ID0geC5wcmlvcml0eTtcbi8vICAgICBjb25zdCBsb2dQcmlvcml0eT0oKT0+e1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhwcmlvcml0eSk7XG4vLyAgICAgfTtcbi8vICAgICAvLyBmdW5jdGlvbnMgZm9yIGVkaXRpbmcgZWFjaCBwcm9wZXJ0eT8gaW5oZXJpdGFuY2UgaXNzdWUqXG4vLyAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tDcmVhdGVkJyx7dGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxsb2dQcmlvcml0eX0pXG4vLyAgICAgcmV0dXJue3RpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHksbG9nUHJpb3JpdHl9XG4vLyB9XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdmb3JtR3JhYicsdGFza0ZhY3RvcnkpXG5cbi8vIGNvbnN0IHRhc2tTdG9yYWdlID0gW107XG4vLyBjb25zdCBzdG9yZVRhc2sgPSBmdW5jdGlvbih4KXtcbi8vICAgICBjb25zb2xlLmxvZyh4KTtcbi8vICAgICB0YXNrU3RvcmFnZS5wdXNoKHgpO1xuLy8gICAgIGNvbnNvbGUubG9nKHRhc2tTdG9yYWdlKTtcbi8vIH07XG4vLyBwdWJzdWIuc3Vic2NyaWJlKCd0YXNrQ3JlYXRlZCcsc3RvcmVUYXNrKTtcblxuLy8gY29uc3QgdGVzdCA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgdGFza0xpc3QuZm9yRWFjaCgoZSk9Pntcbi8vICAgICAgICAgZS5sb2dQcmlvcml0eSgpO1xuLy8gICAgIH0pO1xuLy8gfTsiLCJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgdGFza09iak1vZHVsZSA9ICgoKT0+e1xuICAgIGNvbnN0IHRhc2tTdG9yYWdlQXJyYXkgPSBbXTtcbiAgICBsZXQgY3VycmVudFRhc2tDYXJkSUQgPSAnJztcbiAgICBjb25zdCBjcmVhdGVUYXNrT2JqID0oeCk9PntcbiAgICAgICAgLy8gY29uc29sZS5sb2coeCk7XG4gICAgICAgIC8vIGdlbmVyYXRlIElEIGhlcmU/IGFuZCBwYXNzIGl0IHRvIERPTUZ1bmM/XG4gICAgICAgIGNvbnN0IHRhc2tNYWtlciA9KCk9PntcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gJ1VudGl0bGVkJztcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gJyc7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gJ1RFU1QgRFVFIERBVEUnO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSAnVEVTVCBERVNDUklQVElPTic7XG5cbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIGR1cGxpY2F0ZSBpZCdzIGluIHRhc2sgc3RvcmFnZSBhcnJheVxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVUYXNrSUQgPSgpPT57XG4gICAgICAgICAgICAgICAgbGV0IElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBUYXNrSURBcnJheSA9IHRhc2tTdG9yYWdlQXJyYXkubWFwKHggPT4geC50YXNrSUQpO1xuICAgICAgICAgICAgICAgIGlmKFRhc2tJREFycmF5LmZpbmQoeCA9PiB4ID09IElEKSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXQVJOSU5HIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkb3tcbiAgICAgICAgICAgICAgICAgICAgICAgIElEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGlzIG9iamVjdHMgbmV3IElEIGlzICR7SUR9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoVGFza0lEQXJyYXkuZmluZCh4ID0+IHggPT0gSUQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIGR1cGxpY2F0ZSBJRCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIElEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0lEID0gZ2VuZXJhdGVUYXNrSUQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHt0aXRsZSxwcmlvcml0eSxkdWVEYXRlLGRlc2NyaXB0aW9uLHRhc2tJRH07XG4gICAgICAgIH07XG4gICAgICAgIGlmKHgpe1xuICAgICAgICAgICAgc3RvcmVUYXNrKHRhc2tNYWtlcigpKTtcbiAgICAgICAgICAgIC8vcHVibGlzaGVzIG5ldyB0YXNrT2JqXG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakNyZWF0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbdGFza1N0b3JhZ2VBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVt0YXNrU3RvcmFnZUFycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdUYXNrJyxjcmVhdGVUYXNrT2JqKTtcblxuICAgIGNvbnN0IHN0b3JlVGFzaz0oeCk9PntcbiAgICAgICAgdGFza1N0b3JhZ2VBcnJheS5wdXNoKHgpO1xuICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09ialN0b3JlZCcsdGFza1N0b3JhZ2VBcnJheSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEN1cnJlbnRUYXNrQ2FyZD0oeCk9PntcbiAgICAgICAgY3VycmVudFRhc2tDYXJkSUQgPSB4O1xuICAgICAgICBjb25zb2xlLmxvZyhgY3VycmVudFRhc2tDYXJkIGlzICR7Y3VycmVudFRhc2tDYXJkSUR9YCk7XG4gICAgfTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdjYXJkR2VuZXJhdGVkJyxzZXRDdXJyZW50VGFza0NhcmQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tUZXh0PSh0ZXh0RWxlbWVudCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgLy9yZXR1cm5zIGluZGV4IG9mIG9iamVjdCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnRUYXNrQ2FyZElEXG4gICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdW2Ake3RleHRFbGVtZW50LmlkfWBdID0gdGV4dEVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3RleHRFZGl0Jyx0YXNrU3RvcmFnZUFycmF5KTtcbiAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgIH1cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXdFZGl0JyxlZGl0VGFza1RleHQpO1xuXG4gICAgY29uc3QgZWRpdFRhc2tQcmlvcml0eT0oeCk9PntcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleChlID0+IGUudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgaWYoeC5jaGVja2VkKXtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXlbaW5kZXhdLnByaW9yaXR5ID0geC52YWx1ZTtcbiAgICAgICAgICAgIC8vVXBkYXRlcyBzaWRlYmFyIHRhYnNcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcmlvcml0eUVkaXQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza1N0b3JhZ2VBcnJheVtpbmRleF0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJpb3JpdHlDaGFuZ2UnLGVkaXRUYXNrUHJpb3JpdHkpXG5cbiAgICBjb25zdCBkZWxldGVUYXNrPSh4KT0+e1xuICAgICAgICBpZih4KXtcbiAgICAgICAgICAgIC8vZmluZCBvYmplY3Qgd2l0aCBjdXJyZW50IHRhc2sgaWQgYW5kIHBvcCBvdXQgb2Ygc3RvcmFnZSBhcnJheS5cbiAgICAgICAgICAgIC8vZmluZCBpbmRleFxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrU3RvcmFnZUFycmF5LmZpbmRJbmRleCh4ID0+IHgudGFza0lEID09IGN1cnJlbnRUYXNrQ2FyZElEKTtcbiAgICAgICAgICAgIHRhc2tTdG9yYWdlQXJyYXkuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHRoaXMgaXMgdGhlIG1vZGlmaWVkIHRhc2sgc3RvcmFnZSBhcnJheSAke3Rhc2tTdG9yYWdlQXJyYXl9YCk7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFza09iakRlbGV0ZWQnLHRhc2tTdG9yYWdlQXJyYXlbaW5kZXgtMV0pO1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2tTdG9yYWdlQWRqdXN0ZWQnLHRhc2tTdG9yYWdlQXJyYXkpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgcHVic3ViLnN1YnNjcmliZSgndGFza0RlbGV0ZWQnLGRlbGV0ZVRhc2spO1xufSkoKTtcblxuZXhwb3J0e3Rhc2tPYmpNb2R1bGV9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcbmltcG9ydCB7IERPTU1vZCB9IGZyb20gXCIuL2Z1bmN0aW9ucy9ET01GdW5jXCJcbmltcG9ydCB7IHRhc2tPYmpNb2R1bGUgfSBmcm9tIFwiLi9mdW5jdGlvbnMvdGFza0NyZWF0b3JcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==