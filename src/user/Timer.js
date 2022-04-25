import { useState } from "react";

export default function Timer(prop) {
  const [timer, setTimer] = useState(prop.duration);

  return <p>{timer}</p>;
}
