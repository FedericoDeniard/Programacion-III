import databaseController from "./controllers/database.js/index.js";
import { Controlller } from "./models/MVC/Control.js";
import { Model } from "./models/MVC/Model.js";
import { View } from "./models/MVC/View.js";

const initialData = async () => {
  const initialData = await databaseController.getPeople();

  const MyModel = new Model();
  const MyView = new View();
  const MyController = new Controlller(MyView, MyModel, initialData);

  MyController.updateTable();
};

initialData();
