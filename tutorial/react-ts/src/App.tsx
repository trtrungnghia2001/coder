import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import ZustandPage from "./features/zustand/ZustandPage";
import ReduxToolkitPage from "./features/redux-toolkit/ReduxToolkitPage";
import store from "./features/redux-toolkit/store";
import { Toaster } from "sonner";
import MySqlPage from "./features/api/MySqlPage";
import MongoDbPage from "./features/api/MongoDbPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="api/mysql" element={<MySqlPage />} />
        <Route path="api/mongodb" element={<MongoDbPage />} />
        <Route path="zustand" element={<ZustandPage />} />
        <Route
          path="redux-toolkit"
          element={
            <Provider store={store}>
              <ReduxToolkitPage />
            </Provider>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
