import { useEffect, useRef, useState } from "react";

export default function BlogPage() {
	const [count, setCount] = useState(0);
	const inpuRef = useRef(null);
	const renderCount = useRef(0);
	renderCount.current += 1;

	useEffect(() => {
		inpuRef.current.focus();
	}, []);
	return (
		<div className="mw">
			<h2>useRef</h2>
			<input type="text" ref={inpuRef} />

			<h2>count :{count} </h2>
			<h2>renderCount :{renderCount.current} </h2>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				클릭하삼
			</button>
		</div>
	);
}
