var rline = /\r?\n/g
var regexp = require('./regexp')

function parseText(str) {
    var tokens = [],
            value, start = 0,
            stop
    do {
        stop = str.indexOf(avalon.config.openTag, start)
        if (stop === -1) {
            break
        }
        value = str.slice(start, stop)
        if (start === 0) {
            value = value.replace(regexp.leftSp, '')
        }
        if (value) { // {{ 左边的文本
            tokens.push({
                expr: value
            })
        }
        start = stop + avalon.config.openTag.length
        stop = str.indexOf(avalon.config.closeTag, start)
        if (stop === -1) {
            break
        }
        value = str.slice(start, stop)
        if (value) { //处理{{ }}插值表达式
            tokens.push({
                expr: value.replace(rline, ''),
                type: '{{}}'
            })
        }
        start = stop + avalon.config.closeTag.length
    } while (1)
    value = str.slice(start)

    var lastText = value.replace(regexp.rightSp, '')
    if (lastText) { //}} 右边的文本
        tokens.push({
            expr: lastText
        })
    }
    return tokens
}

module.exports = parseText
