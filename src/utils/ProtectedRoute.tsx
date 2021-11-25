import { Route, Navigate } from "react-router-dom";

export function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const auth = localStorage.getItem("appToken");
  return auth ? children : <Navigate to={{ pathname: "/login" }} />;
}
