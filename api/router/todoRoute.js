const express=require("express");
const { getTodos,creteTodo, deleteTodo, changeComplete } = require("../controller/todocontroller");
const router=express.Router();


router.route('/todus').get(getTodos);
router.route('/todus/new').post(creteTodo);
router.route('/todus/:id')
.put(changeComplete)
.delete(deleteTodo)

module.exports=router;