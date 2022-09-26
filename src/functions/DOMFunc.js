import { pubsub } from "./pubsub";

export const DOMMod = (()=>{
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
            
                pubsub.publish('newEdit',textElement)
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
                pubsub.publish('deleteTask',deleteButton);
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
                pubsub.publish('priorityChange',criticalInput);
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
                pubsub.publish('priorityChange',importantInput);
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
                pubsub.publish('priorityChange',normalInput);
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
                pubsub.publish('priorityChange',finishedInput);
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
                    pubsub.publish('createNewSubTask',true);
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
        pubsub.subscribe('newCurrentTask',renderTask);
        pubsub.subscribe('newSubTask',renderTask);
        pubsub.subscribe('subTaskDeleted',renderTask)
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
                    pubsub.publish('tabSelected',e);
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
        pubsub.subscribe('tabElementChange',generateTaskTabs);
        pubsub.subscribe('taskStorageChange',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            pubsub.publish('newTask',true);
        };
    })();
})();