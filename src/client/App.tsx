import React from "react";
import {Routes, Route} from "react-router-dom";

// ================== AUTH ==================
const LoginPage = React.lazy(() => import("./features/authentication/login/login"));
const SignupPage = React.lazy(() => import("./features/authentication/sign-up/Signup"));


// ================== ONBOARDING ==================
const RoleSelection = React.lazy(() => import("./features/onboarding/RoleSelection"));


function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/*  AUTH */}
        <Route path="/login" element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />


      {/*    ONBOARDING    */}
          <Route path={'/onboarding/role-selection'} element={<RoleSelection />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;