type TCallback = (msg: chrome.webRequest.WebResponseHeadersDetails) => void;

export class RequestWatcher {
  callback: TCallback;
  requestMap: Map<string, chrome.webRequest.WebRequestHeadersDetails>;

  constructor(callback: TCallback) {
    this.callback = callback;
    this.requestMap = new Map();
  }

  onSendHeadersEvent(req: chrome.webRequest.WebRequestHeadersDetails) {
    this.requestMap.set(req.requestId, req);
  }

  onHeadersReceivedEvent(res: chrome.webRequest.WebResponseHeadersDetails) {
    const req = this.requestMap.get(res.requestId);
    if (req) this.callback(res), this.requestMap.delete(req.requestId);
  }

  onErrorOccurredEvent(info: chrome.webRequest.WebResponseErrorDetails) {
    this.requestMap.delete(info.requestId);
  }

  register() {
    chrome.webRequest.onSendHeaders.addListener(this.onSendHeadersEvent.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["extraHeaders", "requestHeaders"]);
    chrome.webRequest.onHeadersReceived.addListener(this.onHeadersReceivedEvent.bind(this), { urls: ["http://*/*", "https://*/*"] }, ["extraHeaders", "responseHeaders"]);
    chrome.webRequest.onErrorOccurred.addListener(this.onErrorOccurredEvent.bind(this), { urls: ["http://*/*", "https://*/*"] });
  }
}
