import { Navigate } from "react-router-dom";

import React, { FC } from "react";
import { UserAuth } from "../Context/AuthContext";

interface PrivateProps {
  children: React.ReactNode;
}

const Unprivate: FC<PrivateProps> = ({ children }) => {
  const context = UserAuth();

  if (!context?.isLoading && context?.user) {
    return <Navigate to="/api" />;
  }
  return children;
};

export default Unprivate;
