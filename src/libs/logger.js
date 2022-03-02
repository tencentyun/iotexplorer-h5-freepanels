/* eslint-disable prefer-rest-params */
// TODO 采用单列模式验证 -- 目前依赖全局进行的单例处理

// 采用return null 便于用于react异常时 直接返回null值

/**
 *  支持日志类
 */
const loggerLevel = {
  trace: 10, // 跟踪 堆栈
  debug: 20, // 调试
  info: 30, // 信息
  success: 31, // 成功--便于开发高亮标识
  time: 40, // 时间--带时间戳
  warn: 60, // 告警
  error: 70, // 错误
  off: 1000 // 关闭
}

const LEVEL = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  TIME: 'TIME',
  WARN: 'WARN',
  ERROR: 'ERROR'
}

// 多彩的配置
const colorful = {
  maxCharLength: 9, // 显示级别的最大字符长度 9 即success+两个空格
  textAlgin: 'left', // 支持left和center
  // 缩进- 由于chrome浏览器对不同级别的日志打印有的带堆栈和三角 故对不带堆栈的进行缩进 保持对齐
  index: 'background: transparent;margin-left:4px;',
  // 空间隔  多个标签之间得到间隔
  space: 'background: transparent;',
  // 每种log的标签样式  便于开发中快速copy样式代码
  trace:
    'background: linear-gradient(90deg, #b7b2b2,#8080804d, #b7b2b2);  color:white; font-weight:bold; border-radius: 1px; ',
  debug:
    'background:linear-gradient(70deg, #b7b2b2, #8080804d, #b7b2b2); color:white;  font-weight:bold; border-radius: 1px;',
  info: 'background: linear-gradient(70deg, #00800085, #57d4c1,#57d4c1, #00800085); color:white; font-weight:bold;border-radius: 1px;',
  success:
    'background: linear-gradient(70deg, #172bdca1, #0000ff36, #172bdca1); color:white; font-weight:bold;border-radius: 1px;',
  time: 'background: linear-gradient(70deg, #00bfffcf,#00bfff4f,#00bfffcf); color:white; font-weight:bold;border-radius: 1px;',
  warn: 'background: linear-gradient(90deg, #eab60e, #eab60e6e, #eab60e);  color:yellow; font-weight:bold; border-radius: 1px;',
  error:
    'background: linear-gradient(90deg, #ff00006b, #ff000033,#ff000033, #ff00006b);  color:red; font-weight:bold; border-radius: 1px;',
  // 日期标签
  dateTime: 'background: none; border: 1px #ad10da4d solid;  color:#ad10dacf; font-weight:bold; border-radius: 1px;',
  // 模块标签
  module:
    'background: linear-gradient(70deg, #0a0afb, #44448a); color:white; font-weight:bold; border-radius: 1px;padding:0 5px'
}

const defaultOption = {
  level: 0,
  moduleName: '', // 模块名称 -- 主要用于框架和业务模块日志 基于isColorful开启状态
  moduleOff: false, // 是否关闭模块日志
  isColorful: true, // 是否多彩的显示 - 即显示不同界别的日志
  colorful, // 不同界别的多彩显示配置-主要是moduleFlag和level 以及time显示
  loggerLevel, // 自定义级别  按照数字的大小值进行大于显示日志
  timeFormatter: (date) => {
    return date
  }, // 日期格式自定义显示
  onLogger: null // 日志记录回调 用于日志的管理[后端存储或者页面显示]
}

const PLACE_HOLDER = '%c'
const MODULE_PLACE_HOLDER = '%s'
export class Logger {
  constructor(option) {
    this.option = { ...defaultOption, ...option }
    this._simplify()
  }
  setOption(option) {
    this.option = { ...this.option, ...option }
  }
  getOption() {
    return this.option
  }
  // 简写支持
  _simplify() {
    this.t = this.trace
    this.d = this.debug
    this.i = this.info
    this.s = this.success
    this.T = this.time
    this.w = this.warn
    this.e = this.error
    this.mt = this.mTrace
    this.md = this.mDebug
    this.mi = this.mInfo
    this.ms = this.mSuccess
    this.mT = this.mTime
    this.mw = this.mWarn
    this.me = this.mError
  }
  // 是否缩进
  _isIndex(level) {
    return ![LEVEL.TRACE, LEVEL.WARN, LEVEL.ERROR].includes(level)
  }

  // 获取空格间隔
  _getSpace(num) {
    let space = ''
    for (let i = 0; i < num; i++) {
      space += ' '
    }
    return space
  }
  // 获取对齐的字段
  _getAlgin(level, algin, maxCharLength) {
    const length = maxCharLength - level.length
    let pre = 0
    let suf = 1
    if (algin === 'center') {
      // 除不尽时 前者取消值 后面间隔取大值
      pre = Math.floor(length / 2) // 向下取整
      suf = Math.ceil(length / 2) // 向上取整
    } else {
      // 靠右对齐
      pre = length - 1
    }
    return PLACE_HOLDER + this._getSpace(pre) + level.toLowerCase() + this._getSpace(suf)
  }

  // 获取多色的参数显示
  _getColorfulArguments(level) {
    const { isColorful, colorful, moduleOff, moduleName, timeFormatter } = this.option
    const { textAlgin, maxCharLength, index, space, module, dateTime } = colorful
    if (!isColorful) return []
    let template = ''
    let arg = []
    // 是否缩进
    if (this._isIndex(level)) {
      template += PLACE_HOLDER + ' '
      arg.push(index)
    }
    // 不同级别不同间隔和不同的样式
    template += this._getAlgin(level, textAlgin, maxCharLength)
    arg.push(colorful[level.toLowerCase()])
    // 添加模块标识
    if (moduleName) {
      template += PLACE_HOLDER + ' ' + PLACE_HOLDER + MODULE_PLACE_HOLDER
      arg = arg.concat([space, module, moduleName])
    }
    // 添加time 时间戳标识
    if (level === LEVEL.TIME) {
      template += PLACE_HOLDER + ' ' + PLACE_HOLDER + MODULE_PLACE_HOLDER
      arg = arg.concat([space, dateTime, timeFormatter(new Date())])
    }
    return [template].concat(arg)
  }

  // 根据配置和不同环境 不同的输出 TODO 扩展其他情况
  _output(type, innerArg, outerArg) {
    const { onLogger, level } = this.option
    // 配置的打印级别小于当前打印的级别
    if (level > loggerLevel[type]) return
    // 外部输出
    onLogger && onLogger(type, outerArg)
    // 内部打印
    if (console) {
      // TODO 扩展其他情况 浏览器等
      let fn = console.log
      if (type === LEVEL.TRACE || type === LEVEL.WARN || type === LEVEL.ERROR) {
        fn = console[type.toLowerCase()]
      }
      // TODO 后续连接控制堆栈信息的显示

      /*
       *****************************************************************
       * 如果是定位错误到这里  请在堆栈里向上找四层即可
       *******************************************************************/
      fn.apply(window, innerArg.concat(outerArg))
    }
  }

  _execute(level, userArg) {
    const arg = this._getColorfulArguments(level)
    this._output(level, arg, userArg)
  }

  // ****************** 常用开发日志打印**********
  trace() {
    this._execute(LEVEL.TRACE, [...arguments])
    return null
  }
  debug() {
    this._execute(LEVEL.DEBUG, [...arguments])
    return null
  }
  info() {
    this._execute(LEVEL.INFO, [...arguments])
    return null
  }
  success() {
    this._execute(LEVEL.SUCCESS, [...arguments])
    return null
  }
  time() {
    this._execute(LEVEL.TIME, [...arguments])
    return null
  }
  warn() {
    this._execute(LEVEL.WARN, [...arguments])
    return null
  }
  error() {
    this._execute(LEVEL.ERROR, [...arguments])
    return null
  }
  // ******************* 指定模块打印***************

  _mExecute(level, userArg) {
    this.option.moduleName = userArg[0]
    this[level.toLowerCase()] && this[level.toLowerCase()].apply(this, userArg.slice(1, userArg.length))
    this.option.moduleName = ''
  }

  mTrace() {
    this._mExecute(LEVEL.TRACE, [...arguments])
    return null
  }
  mDebug() {
    this._mExecute(LEVEL.DEBUG, [...arguments])
    return null
  }
  mInfo() {
    this._mExecute(LEVEL.INFO, [...arguments])
    return null
  }
  mSuccess() {
    this._mExecute(LEVEL.SUCCESS, [...arguments])
    return null
  }
  mTime() {
    this._mExecute(LEVEL.TIME, [...arguments])
    return null
  }
  mWarn() {
    this._mExecute(LEVEL.WARN, [...arguments])
    return null
  }
  mError() {
    this._mExecute(LEVEL.ERROR, [...arguments])
    return null
  }
  // ******************* 简写打印 ***************
}

// 单列支持 未通过

// ---基于windows的对象进行全局唯一的实例创建处理
export const create = (option) => {
  if (!window.___appLoggerInstance) {
    window.___appLoggerInstance = new Logger(option)
    window.___appLoggerInstance.ms('Logger', '实例化日志！')
  }
  return window.___appLoggerInstance
}

// TODO 后续深入结合webpack的打包机制  是否和打包有关系导致的上面单例失效

// 默认导出一个系统自带的实例
export default create()
