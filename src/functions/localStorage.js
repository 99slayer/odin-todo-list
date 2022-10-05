import { pubsub } from "./pubsub";

//check if user already has saved tasks in their local storage first.
export const localStorageModule=(()=>{
    const checkStorage=(taskStorageArray)=>{
        // localStorage.clear();
        const taskStorageArrayJSON = JSON.stringify(taskStorageArray);
        if(localStorage.length == 0){
            console.log('creating user storage.');
            populateStorage(taskStorageArrayJSON);
            console.log(taskStorageArrayJSON);
        }
        else{
            console.log('getting user storage.');
            getFromStorage();
        };
    };
    pubsub.subscribe('arraySent',checkStorage);

    //takes existing task data and saves it to storage.
    const populateStorage=(x)=>{
        localStorage.setItem("taskStorageArray",x);
    };
   
    //serves data from a users local storage save, and sets it as the taskStorageArray.
    const getFromStorage=()=>{
        const taskStorageArrayJSON = localStorage.getItem("taskStorageArray");
        const taskStorageArrayObject = JSON.parse(taskStorageArrayJSON);
        pubsub.publish('gettingUserStorage',taskStorageArrayObject);
    };

     //updates storage when there's a change to task data.
     const saveToStorage=(taskStorageArray)=>{
        localStorage.setItem("taskStorageArray",JSON.stringify(taskStorageArray));
        console.log('local storage has been updated');
    };
    pubsub.subscribe('taskStorageChange',saveToStorage);
    pubsub.subscribe('subTaskArrayChange',saveToStorage);
    pubsub.subscribe('tabElementChange',saveToStorage);
    //subscribe to task changing events.

    return{checkStorage};
})();