import { Navigate } from "react-router-dom";

import React, { FC } from "react";
import { UserAuth } from "../Context/AuthContext";

interface PrivateProps {
  children: React.ReactNode;
}

const Private: FC<PrivateProps> = ({ children }) => {
  const context = UserAuth();

  if (!context?.isLoading && !context?.user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Private;
