import * as THREE from 'three'
import { Vector3 } from 'three';

type ConnectionHandler<T = string> = (data: T) => void;

// Modified from: https://gist.github.com/videlais/8110000
// Modified by Xander Luciano
export class GamePadController {
  public supported: boolean;
  public ticking: boolean;
  public pan: THREE.Vector3;
  public roll: THREE.Vector3;
  public RIGHT_AXIS_THRESHOLD: number;
  public LEFT_AXIS_THRESHOLD: number;
  public TRIGGER_AXIS_THRESHOLD: number;
  public SPACEMOUSE_THRESHOLD: number;
  public gamepads: Gamepad[];
  public prevRawGamepadTypes: any[];
  public prevTimestamps: any[];
  public activeGamepad: string = 'Xbox 360 Controller (XInput STANDARD GAMEPAD)';
  private connectHandlers: Array<ConnectionHandler>
  private disconnectHandlers: Array<ConnectionHandler>
  private gamepadListChangedHandlers: Array<ConnectionHandler<Gamepad[]>>
  private activePadChangeHandlers: Array<ConnectionHandler>
  constructor() {
    this.supported = !!this.getGamepadsFromWindow();

    this.ticking = false;

    this.pan = new THREE.Vector3(0,0,0);
    this.roll = new THREE.Vector3(0,0,0);
    this.activeGamepad = '';

    // Recommended deadzones for Xbox One controller
    this.RIGHT_AXIS_THRESHOLD   = 7849 / 32767.0;
    this.LEFT_AXIS_THRESHOLD    = 8689 / 32767.0;
    this.TRIGGER_AXIS_THRESHOLD = 30   / 32767.0;
    
    this.SPACEMOUSE_THRESHOLD = 5 / 32767.0;

    this.gamepads = [];
    this.prevRawGamepadTypes = [];
    this.prevTimestamps = [];
    this.connectHandlers = [];
    this.disconnectHandlers = [];
    this.gamepadListChangedHandlers = [];
    this.activePadChangeHandlers = [];

    this.init();
  }

  public init() {
    if (this.supported) {
      // @ts-ignore -- Older Firefox 
      window.addEventListener('MozGamepadConnected', (e) => this.handleGamepadConnect(e), false);
      // @ts-ignore -- 
      window.addEventListener('MozGamepadDisconnected', (e) => this.handleGamepadDisconnect(e), false);

      //W3C Specification
      window.addEventListener('gamepadconnected', (e) => this.handleGamepadConnect(e), false);
      window.addEventListener('gamepaddisconnected', (e) => this.handleGamepadDisconnect(e), false);
      // @ts-ignore -- Chrome
      if (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) {
        this.startPolling();
      }

      //@ts-ignore -- CocoonJS
      if(navigator.getGamepads && navigator.getGamepads()) {
        this.startPolling();
      }
    } else {
      console.log('Gamepad API not supported or not detected!');
    }
  }
  
  private startPolling() {
    // console.log('Controller Connected!');
    if (!this.ticking) {
      this.ticking = true;
      this.update();
    }
  }
  
  private stopPolling() {
    console.log('Controller Disconnected!');
    this.ticking = false;
  }
  
  // Called externally
  update() {
    this.pollStatus();
    if (this.ticking) {
      this.pollJoysticks();
      //requestAnimationFrame(() => this.tick());
    }
    // console.info(this.pan, this.roll);
  }
  
  private pollStatus() {
    this.pollGamepads();
    for (let i in this.gamepads) {
      let gamepad = this.gamepads[i];
      if (gamepad.timestamp && (gamepad.timestamp === this.prevTimestamps[i])) {
        continue;
      }
      this.prevTimestamps[i] = gamepad.timestamp;
    }
  }
  
  private pollGamepads() {
    let rawGamepads = this.getGamepadsFromWindow();

    if (rawGamepads) {
      this.gamepads = [];
      for (let i = 0, max = rawGamepads.length; i < max; i++) {
        if (typeof rawGamepads[i] !== this.prevRawGamepadTypes[i]) {
          this.prevRawGamepadTypes[i] = typeof rawGamepads[i];
        }
        if (rawGamepads[i]) {
          this.gamepads.push(rawGamepads[i]);
        }
      }
    }
  }
  
  private pollJoysticks() {

    this.pan.set(0,0,0);
    this.roll.set(0,0,0);

    const gamepad = this.findGamepad(this.activeGamepad);
;    if (!gamepad) return //console.info(`gamepad ${this.activeGamepad} not found`);
    const [p,r] = this.pollJoystick(gamepad);
    this.pan.add(p).normalize();
    this.roll.add(r).normalize();

    // loop ALL active gamepads and sum up the values, then normalize.
    // this allows to not force the user to select the right gamepad/joystick
    // if there are more than one connected.

    // this.gamepads.forEach(gamepad => {
    //   const [p,r] = this.pollJoystick(gamepad);
    //   this.pan.add(p).normalize();;
    //   this.roll.add(r).normalize();;
    // })
  }
  

  private pollJoystick(gamepad: Gamepad): [pan: Vector3, roll: Vector3] {
    
    // Reset all input to 0
    const pan = new THREE.Vector3(0,0,0);
    const roll = new THREE.Vector3(0,0,0);
  

    let panX  = gamepad.axes[0]; // Pan  X || Left X
    let panY  = gamepad.axes[1]; // Pan  Y || Left Y
    let panZ  = gamepad.axes[2]; // Pan  Z || Right X
    
    let rollX = gamepad.axes[3]; // Roll X || Right Y
    let rollY = gamepad.axes[4]; // Roll Y || Trigger Left
    let rollZ = gamepad.axes[5]; // Roll Z || Trigger Right
    
    if (Math.abs(panX) > this.SPACEMOUSE_THRESHOLD) {
      pan.x = panX;
    }
    
    if (Math.abs(panY) > this.SPACEMOUSE_THRESHOLD) {
      pan.y = panY;
    }

    if (Math.abs(panZ) > this.SPACEMOUSE_THRESHOLD) {
      pan.z = panZ;
    }

    if (Math.abs(rollX) > this.SPACEMOUSE_THRESHOLD) {
      roll.x = rollX;
    }

    if (Math.abs(rollY) > this.SPACEMOUSE_THRESHOLD) {
      roll.y = rollY;
    }

    if (Math.abs(rollZ) > this.SPACEMOUSE_THRESHOLD) {
      roll.z = rollZ;
    }
    return [pan, roll]
  }
  
  public setActiveGamepad(gamepad?:Gamepad) {
    console.info('🎮 setting active gamepad to', gamepad?.id ?? 'none')
    this.activeGamepad = gamepad?.id ?? '';
    this.dispatchGamepadChanged();
  }
  
  private handleGamepadConnect(event: GamepadEvent) {
    // console.log('handleGamepadConnect', event);
    let gamepad = event.gamepad;
    this.gamepads.push(gamepad);

    this.dispatchGamepadConnected(event.gamepad);
    this.dispatchGamepadListChanged();
    this.setActiveGamepad(event.gamepad);
    this.startPolling();

  }
  
  private handleGamepadDisconnect(event: GamepadEvent) {
    console.log('handleGamepadDisconnect', event);
    this.gamepads.slice(this.gamepadIndex(event.gamepad.id),1)
    // this.gamepads[Number(event.gamepad.id)] = null;
    this.dispatchGamepadDisconnected(event.gamepad);
    this.dispatchGamepadListChanged();
    if (this.gamepads.length === 0) {
      this.stopPolling();
      this.setActiveGamepad(this.gamepads[0]);
    }
  }

  private getGamepadsFromWindow() {
    if (typeof window === 'undefined') return null;
    return (
      // @ts-ignore
      (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) ||
      // @ts-ignore
      navigator.webkitGamepads || navigator.mozGamepads ||
      // @ts-ignore
      navigator.msGamepads || navigator.gamepads || (navigator.getGamepads && navigator.getGamepads())
    )
  }

  private findGamepad(id: string) {
    return this.gamepads.find(gamepad => gamepad.id === id);
  }
  private gamepadIndex(id: string) {
    const pad = this.findGamepad(id);
    if (!pad) return -1;
    return this.gamepads.indexOf(pad);
  }

  // external events //////////////////////////////////////////////////////////

  public onGamepadConnected(cb: ConnectionHandler) {
    this.connectHandlers.push(cb);
  }
  public onGamepadDisconnected(cb: ConnectionHandler) {
    this.disconnectHandlers.push(cb);
  }
  public onGamepadListChanged(cb: ConnectionHandler<Gamepad[]>) {
    this.gamepadListChangedHandlers.push(cb);
  }
  public onGamepadChanged(cb: ConnectionHandler) {
    this.activePadChangeHandlers.push(cb);
  }

  private dispatchGamepadListChanged() {
    this.gamepadListChangedHandlers.forEach(cb => cb(this.gamepads));
  }
  private dispatchGamepadConnected(gamepad: Gamepad) {
    this.connectHandlers.forEach(cb => cb(gamepad.id));
  }
  private dispatchGamepadDisconnected(gamepad: Gamepad) {
    this.disconnectHandlers.forEach(cb => cb(gamepad.id));
  }
  private dispatchGamepadChanged() {
    this.activePadChangeHandlers.forEach(cb => cb(this.activeGamepad));
  }
}
