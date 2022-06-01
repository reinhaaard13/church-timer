import React, { useReducer, useState } from "react";

import Card from "../UI/Card";
import TimerItem from "./TimerItem";

import classes from "./TimerForm.module.css";
import { useEffect } from "react";

const timerReducer = (state, action) => {
	if (action.type === "ADD_TIMER") {
		return [...state, action.timer];
	}

  else if (action.type === "INPUT_CHANGE") {
    const newState = state.find((timer) => timer.id === action.id);
    newState[action.field] = action.value;

    return [
      ...state.filter((timer) => timer.id !== action.id),
      newState,
    ].sort((a, b) => a.id.localeCompare(b.id));
  }

  else if (action.type === "DELETE_TIMER") {
    return state.filter((timer) => timer.id !== action.id);
  }

	return state;
};

const TimerForm = (props) => {
  const [canShow, setCanShow] = useState(false)

	const timers = [
		{
			id: "t1",
			minutes: 0,
			seconds: 0,
			description: "",
		},
	];

	const [timerState, dispatch] = useReducer(timerReducer, timers);

	const addTimerHandler = () => {
    try {
      dispatch({
        type: "ADD_TIMER",
        timer: {
          id: `t${+timerState[timerState.length-1].id.split("t")[1] + 1}`,
          minutes: 0,
          seconds: 0,
          description: "",
        },
      });
    } catch (e) {
      dispatch({
        type: "ADD_TIMER",
        timer: {
          id: `t1`,
          minutes: 0,
          seconds: 0,
          description: "",
        },
      });
    }
		
	};

	const inputChangeHandler = (event, id) => {
		dispatch({
			type: "INPUT_CHANGE",
			id: id,
			field: event.target.name,
			value: event.target.value,
		});
	};

  const deleteHandler = (id) => {
    dispatch({
      type: "DELETE_TIMER",
      id: id,
    });
  }

  useEffect(() => {
    if (timerState.find((timer) => timer.minutes && timer.seconds && timer.description )) {
      setCanShow(true)
    } else {
      setCanShow(false)
    }
  }, [timerState])

	return (
		<Card className="mt-10 w-[98%] md:w-[700px]">
			<h1 className="font-semibold text-xl">Rundown</h1>
			<div className="mt-4 flex flex-col">
				<div className="grid grid-cols-[1fr_1fr_6fr] gap-2 p-1">
					{/* Title */}
					<div className={classes.column_title}>Minute(s)</div>
					<div className={classes.column_title}>Second(s)</div>
					<div className={classes.column_title}>Description</div>
				</div>

				{/* Form */}
				{timerState.map((timer) => (
					<TimerItem key={timer.id} onChange={inputChangeHandler} id={timer.id} onDelete={deleteHandler} />
				))}

				{/* Add item */}
				<button
					onClick={addTimerHandler}
					className="bg-slate-200 text-sm px-2 py-1 font-medium rounded mt-2 w-fit"
				>
					+ Add new item
				</button>

        {/* Go to show */}
        <button
					className="bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-cyan-200 px-3 py-1 font-medium rounded mt-2 w-fit self-center"
          disabled={!canShow}
				>
					Go to show
				</button>
			</div>
		</Card>
	);
};

export default TimerForm;
