let Tododb = require('../model/model');

const renderTodo = async (req, res) => {
  const Item_per_page = 5;
  const sorted = +req.query.sorted || -1;
  const page = +req.query.page || 1;
  let totalTodos;

  const todoCount = await Tododb.find().countDocuments();
  console.log(todoCount);
  dataToShow = Item_per_page * page;
  totalTodos = todoCount;

  const todos = await Tododb.find()
    .skip((page - 1) * Item_per_page)
    .limit(Item_per_page)
    .sort({ date: sorted })
    .exec();

  res.render('index.ejs', {
    todos,
    totalTodos,
    sorted,
    page,
    dataToShow,
    Item_per_page,
    hasNextPage: totalTodos > Item_per_page * page,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    currentPage: page,
    lastPage: Math.ceil(totalTodos / Item_per_page),
  });
};

const createTodo = async (req, res) => {
  const todoTask = new Tododb({
    task: req.body.task,
  });
  try {
    await todoTask.save();
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const Item_per_page = 5;
  const sorted = +req.query.sorted || -1;
  const page = +req.query.page || 1;

  let totalTodos;
  // Get all todos
  const todoCount = await Tododb.find().countDocuments();

  dataToShow = Item_per_page * page;
  totalTodos = todoCount;

  // Get all todo info
  const todos = await Tododb.find()
    .skip((page - 1) * Item_per_page)
    .limit(Item_per_page)
    .sort({ date: sorted });

  res.render('edit.ejs', {
    todos,
    totalTodos,
    sorted,
    dataToShow,
    Item_per_page,
    hasNextPage: totalTodos > Item_per_page * page,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    currentPage: page,
    lastPage: Math.ceil(totalTodos / Item_per_page),
    idTask: id,
  });
};

const findIdUpdate = (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;

  Tododb.findByIdAndUpdate(id, { task: req.body.task }, (err) => {
    if (err) return res.send(500, err);

    // res.redirect('/');
    res.redirect(`/?page=${page}&sorted=${sort}`);
  });
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sorted || -1;
  Tododb.findByIdAndDelete(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect(`/?page=${page}&sorted=${sort}`);
  });
};

// *** export ***
module.exports = {
  renderTodo,
  createTodo,
  findIdUpdate,
  updateTodo,
  deleteTodo,
};
