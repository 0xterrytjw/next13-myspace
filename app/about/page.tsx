import React from "react";
import { Metadata } from "next";

export const dynamic = "force-static"; // not necessary, just for demonstration

export const metadata: Metadata = {
  title: "About Us",
  description: "About NextSpace",
};

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-3xl">About us</h1>
      <p>We are a social media company that wants to bring people together!</p>
    </div>
  );
};

export default AboutPage;
