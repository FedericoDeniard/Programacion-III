import peopleList from "./constants";
import { Controlller } from "./models/MVC/Control";
import { Model } from "./models/MVC/Model";
import { View } from "./models/MVC/View";
import { getHeadersFromArray } from "./utils/tables";

const MyModel = new Model();
const MyView = new View();
const MyController = new Controlller(MyView, MyModel, peopleList);

MyView.fillTable(getHeadersFromArray(MyModel.People), MyModel.People, [], true);
