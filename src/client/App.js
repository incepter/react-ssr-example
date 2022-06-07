import React from "react";

const isInServer = typeof window === "undefined";

export default function App({name}) {
  console.log('RENDERING!!!!!', {isInServer})
  const [state, setState] = React.useState(() => 15)

  React.useEffect(() => {
    alert('haha')
  }, []);

  return (
    <div>
      <span>name: {name}</span>
      <br />
      <span>state: {state}</span>
    </div>
  );
}
