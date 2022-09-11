import { pubsub } from "./pubsub";

export const DOMMod = (()=>{
    const sidebar = document.getElementById('sidebar');
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

    const taskCreation = (() =>{
        //x is the taskObj
        const generateTaskCard = (x) =>{
            console.log(`The generated card is using this ID ${x.taskID}`);
            // console.log(`THIS CARD WAS GENERATED USING THIS INFO ${x.}`);
            main.replaceChildren();
            const card = document.createElement('div');
            const cardHeader = document.createElement('div');
            const cardHeaderCont1 = document.createElement('div');
            const cardHeaderCont2 = document.createElement('div');
            const cardMain = document.createElement('div');
        
            const title = document.createElement('h2');
            title.textContent = `${x.title}`;
            title.classList.add('editable');
            title.addEventListener('click',editFunc.editText);
        
            //going to try and make this a fancy check box thing with 4 levels
            //priority will have 4 levels: critical, important, normal, and finished.
            //div form label+input*4

            const priorityCont = document.createElement('div');
            
            const priorityText = document.createElement('h5');
            priorityText.textContent = 'test text';
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

            criticalInput.addEventListener('click',()=>{
                pubsub.publish('priorityChange',criticalInput);
            })

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

            importantInput.addEventListener('click',()=>{
                pubsub.publish('priorityChange',importantInput);
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

            normalInput.addEventListener('click',()=>{
                pubsub.publish('priorityChange',normalInput);
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

            finishedInput.addEventListener('click',()=>{
                pubsub.publish('priorityChange',finishedInput);
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
                cardMain,
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
            card.append(cardHeader,cardMain);
            // cardHeader.append(title,priority,dueDate);
            cardHeader.append(cardHeaderCont1,cardHeaderCont2);
            cardHeaderCont1.append(title,priorityCont);
            priorityCont.append(priorityText,priorityForm);
            priorityForm.append(criticalLabel,criticalInput,importantLabel,importantInput,normalLabel,normalInput,finishedLabel,finishedInput);
            cardHeaderCont2.append(dueDate);
            cardMain.append(description);
            console.log(x);
            pubsub.publish('cardGenerated',x.taskID);
        };
        const clearTask = () =>{
            main.replaceChildren();
        };
        return{generateTaskCard,clearTask};
    })();
    
    //function to generate sidebar tabs whenever a new taskObj is stored.(or changed).
    const taskTabCreation = (() =>{
        const generateTaskTabs = function(x){
            taskTabs.replaceChildren();
            // console.log(`x is ${x[0].taskID}`);
            x.forEach((e)=>{
                // const taskInfo = e;
                //can add more elements to the tabs later on
                const tab = document.createElement('div')
                const tabHeading = document.createElement('h3');
                tabHeading.textContent = `${e.title}`;
                tab.classList.add('tab')
                tab.setAttribute('data-tab-ID',`${e.taskID}`);
                tab.addEventListener('click',()=>{
                    taskCreation.generateTaskCard(e);
                });
                //taskInfo should be tab id?
                taskTabs.append(tab);
                tab.append(tabHeading);
            });
        };
        pubsub.subscribe('taskObjStored',generateTaskTabs);
        return {generateTaskTabs};
    })();

    const newTaskMod =(()=>{
        newTaskButton.onclick =()=>{
            pubsub.publish('newTask',true);
        }
        pubsub.subscribe('taskObjCreated',taskCreation.generateTaskCard)
    })()
})();