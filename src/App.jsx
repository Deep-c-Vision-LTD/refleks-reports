import { Link } from "react-router-dom";
import Signin from "./features/auth/Signin";
import { useNavigate } from "react-router-dom";

import { UserAuth } from "./features/auth/context/AuthContext";

function App() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <Signin />
    </>
  );
}

export default App;
