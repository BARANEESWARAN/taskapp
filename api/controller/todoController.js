const Todo = require("../model/Todo");

//create new todo data
exports.creteTodo = async (req, res, next) => {
    try{
        const Todos = await Todo.create(req.body);
  


        await Todos.save();
      
  
          res.status(201).json(Todos);

 
      
    }
    catch(err){
console.log(err)
res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
    }


};

//get all valuse
exports.getTodos = async (req, res, next) => {
  try {
    const Todos = await Todo.find();
    if (!Todos) {
      return res.status(404).json({
        success: false,
        message: "no data",
      });
    }
    res.status(201).json({
      success: true,
      count:Todos.length,
      Todos,
    });
  } catch (err) {
    console.log(err);
  }
};

//delete todo

exports.deleteTodo = async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

	res.status(200).json({  success: true,
        deleted: result,});


};

//change comleted

exports.changeComplete = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }
  
      todo.completed = !todo.completed || false;
      await todo.save();
      
      res.json({
        success: true,
        todo,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
