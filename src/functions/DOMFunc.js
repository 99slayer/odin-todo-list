import { pubsub } from "./pubsub";

export const DOMMod = (()=>{
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
                pubsub.publish('newEdit',textElement)
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
                pubsub.publish('taskDeleted',true);
            };
            
            newSubTaskButton.onclick = function(){
                pubsub.publish('createNewSubTask',true);
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
            pubsub.publish('cardGenerated',x.taskID);
        };
        const clearTask = () =>{
            main.replaceChildren();
        };
        pubsub.subscribe('taskObjDeleted',generateTaskCard);
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
                    pubsub.publish('deleteSubTask',subTaskIndex);
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
                    pubsub.publish('subPriorityChange',criticalInput);
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
                    pubsub.publish('subPriorityChange',importantInput);
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
                    pubsub.publish('subPriorityChange',normalInput);
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
                    pubsub.publish('subPriorityChange',finishedInput);
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
        pubsub.subscribe('newSubTaskStored',generateSubTasks);
        pubsub.subscribe('subTaskDeleted',generateSubTasks);
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
        pubsub.subscribe('taskObjStored',generateTaskTabs);
        pubsub.subscribe('textEdit',generateTaskTabs);
        pubsub.subscribe('priorityEdit',generateTaskTabs)
        pubsub.subscribe('taskStorageAdjusted',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            pubsub.publish('newTask',true);
        }
        pubsub.subscribe('taskObjCreated',taskCardCreation.generateTaskCard)
    })();
})();