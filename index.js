import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var todo = [{ date: '11-9-2023', todos: 'frontend development' },{ date: '12-9-2023', todos: 'bankend development' },{ date: '13-9-2023', todos: 'hosting' },{ date: '14-9-2023', todos: 'testing' }];

function getFormattedDate() {

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

function checkAndPush(newTodo){
  if (newTodo != "") {
    const formattedDate = getFormattedDate();
    let obj={date:formattedDate, todos:newTodo}
    todo.push(obj);
  }
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: todo,
  });
});

app.get("/work", (req, res) => {
  res.render("index.ejs",{
    data: todo,
  });
});

app.post("/todo", (req, res) => {
  var newTodo = req.body.todoItem;
  checkAndPush(newTodo);
  res.redirect("/work");
});

app.get("/today",(req,res)=>{
  var todayArray=[];
  const todayDate = getFormattedDate();
  for(var i=0; i<todo.length; i++){
    var check=todo[i].date;
    if (todayDate==check){
      todayArray.push(todo[i]);
    }
  }
  res.render("indextoday.ejs",{
    data:todayArray,
  })
  todayArray=[];
})

app.post("/todotoday", (req, res) => {
  var newTodo = req.body.todoItem;
  checkAndPush(newTodo);
  res.redirect("/today");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
