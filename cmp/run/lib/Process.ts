export type ProcessMessage = {type: string, data: any}
export type IListener = (msg: any) => void

export default class Process {
  constructor() {
  }
  public exit: number = 0
  private listeners:Array<IListener> = []

  async wait(exit: Promise<void>) {
    try {
      await exit
    } catch(e) {
      this.handleUncaughtError(e)
      this.exit = 1
    }
  }
  handleUncaughtError(e) {
    console.error(e)
  }
}