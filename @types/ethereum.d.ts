interface Ethereum {
  send: unknown
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
  _metamask?: {
    isUnlocked: () => Promise<boolean>
  }
}

declare interface Window {
  ethereum?: Ethereum
}
