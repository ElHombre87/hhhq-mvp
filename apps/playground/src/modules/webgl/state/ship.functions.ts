import { TShipContext } from "./ship.model";

export const isMoving = (ctx: TShipContext) => ctx.speed !== 0;
export const isIdle = (ctx: TShipContext) => !isMoving(ctx);
// export const isIdle = (ctx: TShipContext) => ctx.speed <= 0.05;
export const isMaxSpeed = (ctx: TShipContext) => ctx.speed >= ctx.maxSpeed;
