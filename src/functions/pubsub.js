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