import { pubsub } from "./pubsub";

const subTaskObjModule = (()=>{
    const subTaskMaker=(x)=>{
        const createSubTask=()=>{
            const title = '';
            const priority = '';
            const dueDate = '';
            const description = '';
            return {title,priority,dueDate,description};
        };
        if(x){
            pubsub.publish('newSubTaskCreated',createSubTask());
        };
    };
    pubsub.subscribe('createNewSubTask',subTaskMaker);
})();
export {subTaskObjModule};