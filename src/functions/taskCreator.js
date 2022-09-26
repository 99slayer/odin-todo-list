import { pubsub } from "./pubsub";
//possible functions: findTaskIndex,findSubTaskIndex,generateTaskID,...
const taskObjModule = (()=>{
    const taskStorageArray = [];
    let currentTask = '';
    const createTaskObj =(x)=>{
        const taskMaker =()=>{
            const title = 'Untitled';
            const priority = '';
            const dueDate = '';
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

            return {title,priority,dueDate,description,subTaskArray,isTask,taskID};
        };
        if(x){
            storeTask(taskMaker());
			setCurrentTask(taskStorageArray[taskStorageArray.length-1]);
        };
    };
    pubsub.subscribe('newTask',createTaskObj);

    const setCurrentTask=(x)=>{
        currentTask = x;
		pubsub.publish('newCurrentTask',x);
    };
	pubsub.subscribe('tabSelected',setCurrentTask);

    const storeTask=(x)=>{
        taskStorageArray.push(x);
        pubsub.publish('taskStorageChange',taskStorageArray);
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
            pubsub.publish('taskStorageChange',taskStorageArray);
        };
        if(deleteButton.getAttribute('data-subtask-ID')){
            const elementID = deleteButton.getAttribute('data-subtask-ID');
            const subTask = currentTask.subTaskArray.find(e => e.subTaskID == elementID);
            const subTaskIndex = currentTask.subTaskArray.indexOf(subTask);
            taskStorageArray[taskIndex].subTaskArray.splice(subTaskIndex,1);
            pubsub.publish('subTaskDeleted',currentTask);
        };

    };
    pubsub.subscribe('deleteTask',deleteTask);

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
        pubsub.publish('taskEdit',currentTask);
        pubsub.publish('tabElementChange',taskStorageArray);
    }
    pubsub.subscribe('newEdit',editTaskText);

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
        pubsub.publish('tabElementChange',taskStorageArray);
    };
    pubsub.subscribe('priorityChange',editTaskPriority)

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
            pubsub.publish('newSubTask',currentTask);
        };
    };
    pubsub.subscribe('createNewSubTask',subTaskMaker);

    const storeSubTask=(subtask)=>{
		currentTask.subTaskArray.push(subtask);
    };
})();

export{taskObjModule};