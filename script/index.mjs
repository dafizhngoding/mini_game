import { useState } from "../hooks/useState.mjs";

const [setCount] = useState(0);

const update = setCount(1);
console.log(update);


