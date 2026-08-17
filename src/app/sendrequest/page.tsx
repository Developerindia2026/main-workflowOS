"use client";

import axios from "axios";

export default function Sendrequest() {
  const SendData = async () => {
    const response = await axios.post(`api/addUsers`);
    console.log(response.data);
  };

  return (
    <button className="bg-blue-300 border-1 rounded-10" onClick={SendData}>
      ADD THE USERS DATA IN THE WORKFLOW OS
    </button>
  );
}
