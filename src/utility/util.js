function shuffle(list) {
    return list.sort(() => Math.random() - Math.random())
}

export function random(list) {
    return shuffle(list)[0]
}

export function sample(list, n) {
    return shuffle(list).slice(0, n)
}

export function generateList(f, n) {
    return range(n).map(_ => f())
}

export function subset(smallList, bigList) {
    for (let a of smallList) {
        if (!bigList.includes(a)) {
            return false
        }
    }
    return true
}

export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function range(n) {
    let i = 0
    let ret = []
    while (i < n) {
        ret.push(i)
        i++
    }
    return ret
}

export function parseCSV(text) {
    const lines = text.split('\r\n')
    const headers = lines[0].split(',')
    const payments = lines.splice(1)
    const ret = []
    for (const payment of payments) {
        const obj = {}
        const values = payment.split(',')
        for (let i = 0; i < values.length; i++) {
            obj[headers[i]] = values[i]
        }
        ret.push(obj)
    }
    return ret
}