import { pubsub } from "./pubsub";

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
            pubsub.publish('taskObjCreated',taskStorageArray[taskStorageArray.length-1]);
            console.log(taskStorageArray[taskStorageArray.length-1]);
        };
    };
    pubsub.subscribe('newTask',createTaskObj);

    const storeTask=(x)=>{
        taskStorageArray.push(x);
        pubsub.publish('taskObjStored',taskStorageArray);
    };

    const setCurrentTaskCard=(x)=>{
        currentTaskCardID = x;
        console.log(`currentTaskCard is ${currentTaskCardID}`);
    };
    pubsub.subscribe('cardGenerated',setCurrentTaskCard);

    const editTaskText=(textElement)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        //returns index of object that matches the currentTaskCardID
        taskStorageArray[index][`${textElement.id}`] = textElement.innerHTML;

        //Updates sidebar tabs
        pubsub.publish('textEdit',taskStorageArray);
        console.log(taskStorageArray[index]);
    }
    pubsub.subscribe('newEdit',editTaskText);

    const editTaskPriority=(x)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        if(x.checked){
            taskStorageArray[index].priority = x.value;
            //Updates sidebar tabs
            pubsub.publish('priorityEdit',taskStorageArray);
            console.log(taskStorageArray[index]);
        };
    };
    pubsub.subscribe('priorityChange',editTaskPriority)

    const deleteTask=(x)=>{
        if(x){
            let index = taskStorageArray.findIndex(x => x.taskID == currentTaskCardID);
            taskStorageArray.splice(index,1);
            //length has changed 
            if(index==taskStorageArray.length){
                index = index - 1;
            };
            pubsub.publish('taskObjDeleted',taskStorageArray[index]);
            pubsub.publish('taskStorageAdjusted',taskStorageArray);
        };
    };
    pubsub.subscribe('taskDeleted',deleteTask);

    //x is the newly created subtask object
    const storeSubTask=(x)=>{
        let index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        console.log(taskStorageArray[index]);
        taskStorageArray[index].subTaskArray.push(x);
        console.log(taskStorageArray[index]);
        console.log(taskStorageArray[index].subTaskArray);
        pubsub.publish('newSubTaskStored',taskStorageArray[index].subTaskArray);
    };
    pubsub.subscribe('newSubTaskCreated',storeSubTask)

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
    pubsub.subscribe('newEdit',editSubTaskText);

    //x is the input element
    const editSubTaskPriority=(x)=>{
        const subTaskIndex = x.parentNode.parentNode.parentNode.parentNode.getAttribute('data-index');
        const taskIndex = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        if(x.checked){
            taskStorageArray[taskIndex].subTaskArray[subTaskIndex].priority = x.value;
            console.log(taskStorageArray[taskIndex].subTaskArray[subTaskIndex].priority);
        };
    };
    pubsub.subscribe('subPriorityChange',editSubTaskPriority)
})();

export{taskObjModule};