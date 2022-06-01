import React from "react";

import { FiDelete } from "react-icons/fi";

const TimerItem = (props) => {
  const inputChangeHandler = (e) => {
    props.onChange(e, props.id)
  }

  const deleteHandler = () => {
    props.onDelete(props.id)
  }

	return (
		<div className="grid grid-cols-[1fr_1fr_5fr_0.3fr] gap-2 p-1">
			<input type="number" className="border w-full p-1" min={0} name="minutes" onChange={inputChangeHandler} />
			<input type="number" className="border w-full p-1" min={0} name="seconds" onChange={inputChangeHandler} />
			<input type="text" className="border w-full p-1" name="description" onChange={inputChangeHandler} />
      <div className="text-center">
        <button onClick={deleteHandler} className="text-red-500 h-full text-lg hover:text-red-600"><FiDelete /></button>
      </div>
		</div>
	);
};

export default TimerItem;
