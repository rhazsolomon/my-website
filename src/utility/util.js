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

function range(n) {
    let i = 0
    let ret = []
    while (i < n) {
        ret.push(i)
        i++
    }
    return ret
}