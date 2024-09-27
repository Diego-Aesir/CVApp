import React from "react";
import { useRouter } from "next/router";
import CVPage from "./components/CV/CVPage";

const HomePage = () => {
  const router = useRouter();
  const { data } = router.query;
  const parsedData = data ? JSON.parse(data) : {};

  const Data = () => {
    return parsedData;
  }

  return (
    <div>
      <CVPage data={Data()}></CVPage>
    </div>
  );
};

export default HomePage;
