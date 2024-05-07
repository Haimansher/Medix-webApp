import React from "react";
import Header from "../components/Header"; // Assuming Header component is in the correct relative path

export default function LoginPage() {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
    </>
  );
}