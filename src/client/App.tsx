import React from "react";
import {Routes, Route} from "react-router-dom";

const LoginPage = React.lazy(() => import("./features/authentication/login/login"));
const SignupPage = React.lazy(() => import("./features/authentication/sign-up/Signup"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;