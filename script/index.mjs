import { useState } from "../hooks/useState.mjs";

const [count, setCount] = useState([1,2,3,4]);


console.log(count);

setCount((prev) => [...prev, 5,6,7]);

console.log(count);