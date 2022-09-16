import { pubsub } from "./pubsub";

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
            pubsub.publish('newSubTaskCreated',createSubTask());
        };
    };
    pubsub.subscribe('createNewSubTask',subTaskMaker);
})();
export {subTaskObjModule};