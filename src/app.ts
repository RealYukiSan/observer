import { RequestWatcher } from "./request-watcher";

export class App {
  requestWatcher;

  constructor() {
    this.requestWatcher = new RequestWatcher(this.onRequest);
  }

  onRequest(msg: chrome.webRequest.WebResponseHeadersDetails) {
    console.log(msg);
  }

  run() {
    this.requestWatcher.register();
  }
}
