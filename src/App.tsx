import { ConProvider } from "./Context/AuthContext";

import { router } from "./Configs/Router";
import { RouterProvider } from "react-router-dom";
import ChatsContext from "./Context/ChatsContext";
import ThemeContext from "./Context/ThemeContext";
const App = () => {
  return (
    <>
      <ThemeContext>
        <ConProvider>
          <ChatsContext>
            <div className="app-cont">
              <RouterProvider router={router}></RouterProvider>
            </div>
          </ChatsContext>
        </ConProvider>
      </ThemeContext>
    </>
  );
};

export default App;
