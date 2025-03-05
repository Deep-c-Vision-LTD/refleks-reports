import { Link } from "react-router-dom";
import Signin from "./features/auth/Signin";

import { UserAuth } from "./features/auth/context/AuthContext";

function App() {
  const { user } = UserAuth();

  console.log(user);

  return (
    <>
      <Signin />
    </>
  );
}

export default App;
