import { pubsub } from "./pubsub";

const taskObjModule = (()=>{
    const taskStorageArray = [];
    let currentTaskCardID = '';
    const createTaskObj =(x)=>{
        // console.log(x);
        // generate ID here? and pass it to DOMFunc?
        const taskMaker =()=>{
            const title = 'Untitled';
            const priority = 'test';
            const dueDate = 'test';
            const description = 'test';
            //check for duplicate id's in task storage array
            const taskID = Math.floor(Math.random()*10000);
            return {title,priority,dueDate,description,taskID};
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
        console.log('task has been stored and storage array has been published.');
    };
    const setCurrentTaskCard=(x)=>{
        currentTaskCardID = x;
        console.log(`currentTaskCard is ${currentTaskCardID}`);
    };
    pubsub.subscribe('cardGenerated',setCurrentTaskCard);
    const editTaskObj=(textElement)=>{
        const index = taskStorageArray.findIndex(e => e.taskID == currentTaskCardID);
        //returns index of object that matches the currentTaskCardID
        taskStorageArray[index][`${textElement.id}`] = textElement.innerHTML;
        console.log(taskStorageArray[index]);
    }
    pubsub.subscribe('newEdit',editTaskObj);
})();

export{taskObjModule};