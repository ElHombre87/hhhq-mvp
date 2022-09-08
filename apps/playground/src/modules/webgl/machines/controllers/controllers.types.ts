import { State, InterpreterFrom, ContextFrom, EventFrom } from "xstate";
import { model } from "./controllers.model";
import machine from "./controllers.machine";

export type ControllerContext = ContextFrom<typeof model>;
export type ControllerEvent = EventFrom<typeof model>;

export type ControllersService = InterpreterFrom<typeof machine>;
export type ControllersState = State<ControllerContext, ControllerEvent>
