import Miracle from 'incu-webview';

export default () => {
  return new Promise((resolve,reject) => {
    if(Miracle.isApp()) {
      Miracle.onAppReady(() => {
        resolve(Miracle.getData());
      })
    }
    else {
      reject(new Error('非APP环境'));
    }
  })
}