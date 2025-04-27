import peopleList from "./constants";
import { Controlller } from "./models/MVC/Control";
import { Model } from "./models/MVC/Model";
import { View } from "./models/MVC/View";

const MyModel = new Model();
const MyView = new View();
const MyController = new Controlller(MyView, MyModel, peopleList);

MyController.updateTable();
