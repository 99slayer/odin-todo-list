"use strict"
import { DOMModule } from "./functions/DOMFunc";
import { taskObjModule } from "./functions/taskCreator";
import { format } from "date-fns";
import { localStorageModule } from "./functions/localStorage";
import { pubsub } from "./functions/pubsub";

window.addEventListener('DOMContentLoaded',(e)=>{
    console.log('Dom loaded.');
    pubsub.publish('DOMLoaded',true);
});