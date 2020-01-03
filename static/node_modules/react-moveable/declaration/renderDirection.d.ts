import MoveableManager from "./MoveableManager";
import { ResizableProps, ScalableProps, WarpableProps, Renderer } from "./types";
export declare function renderControls(moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>, defaultDirections: string[], React: Renderer): any[];
export declare function renderAllDirections(moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>, React: Renderer): any[];
export declare function renderDiagonalDirections(moveable: MoveableManager<Partial<ResizableProps & ScalableProps & WarpableProps>>, React: Renderer): any[];
