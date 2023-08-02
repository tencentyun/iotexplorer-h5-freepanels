const codeReg = /\((\d+)\).+/;

export function getErrorMsg(err: any, {
  defaultMsg = '',
  errMsgKey = 'msg',
} = {}) {
  if (!err) return '';
  let message = '';

  if (typeof err === 'string') return err;

  if (err) {
    message = err[errMsgKey] || err.Message || err.msg || err.message || err.errMsg || '连接服务器失败，请稍后再试';

    if (err.reqId) {
      message += `(${err.reqId})`;
    } else if (err.code && !codeReg.test(message)) {
      message += `(${err.code})`;
    }
  }

  if (!message) {
    message = defaultMsg || '连接服务器失败，请稍后再试';
  }

  return message;
}
