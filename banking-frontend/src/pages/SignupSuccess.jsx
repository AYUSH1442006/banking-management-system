import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Sign Up Successful!</h2>
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

export default SignupSuccess;