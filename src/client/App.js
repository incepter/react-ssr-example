import React from "react";

const isInServer = typeof window === "undefined";

export default function App({name = "world!!"}) {
  return (
    <div>
      <span>Hello, {name}</span>
    </div>
  );
}
