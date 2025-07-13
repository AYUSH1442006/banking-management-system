import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Login Successful!</h2>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "150px",
    textAlign: "center",
    fontFamily: "sans-serif"
  }
};

export default LoginSuccess;