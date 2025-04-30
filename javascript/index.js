import peopleList from "./constants/index.js";
import { Controlller } from "./models/MVC/Control.js";
import { Model } from "./models/MVC/Model.js";
import { View } from "./models/MVC/View.js";

const MyModel = new Model();
const MyView = new View();
const MyController = new Controlller(MyView, MyModel, peopleList);

MyController.updateTable();
