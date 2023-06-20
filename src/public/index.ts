console.log(5)

import { MDCRipple } from '@material/ripple';

new MDCRipple(<Element>$('.armHome')[0])
new MDCRipple(<Element>$('.armAway')[0])
new MDCRipple(<Element>$('.disarm')[0])

$('.armHome').on('click', () => {
    get('armHome')
})
$('.armAway').on('click', () => {
    // $('.buttons').addClass('loading')
    // $('.armAway .icon').slideUp()
    // $('.armAway .countdown').slideDown()

    // let a = $('.armAway .countdown')


    // let i = 60;
    // let interval
    // interval = setInterval(() => {
    //     i--;
    //     console.log(i, a)
    //     a.fadeOut(200, undefined, () => {
    //         a.text(i)
    //         a.slideDown()

    //     })

    //     if (i == 0) {
    //         clearInterval(interval)
    //     }

    // }, 1000)

    get('armAway')
})
$('.disarm').on('click', () => {
    get('disarm')
})


function parseAuth() {
    return window.location.hash.split('#auth=')[1]
}

function get(path: string) {
    $('.buttons').addClass('loading')
    fetch(`${path}?auth=${parseAuth()}`).then((req) => {
        // if (!req.ok) return alert(`An unexpected Error Occurred. Are you logged in?`)
        // fetch state
        setTimeout(() => {
            console.log(555)
            location.reload();
        }, 2500)
        console.log(2342342)
    }).catch((err) => {
        alert(`An unexpected Error Occurred. Here is some info: ${err}`)
    })
}


fetch(`status?auth=${parseAuth()}`).then(async (res) => {
    let status = await res.text()
    const text = "Alarm Status: "
    const $el = $('h1')
    if (status == "all") {
        $el.text(text + "Armed")
    } else if (status == "some") {
        $el.text(text + "Partially Armed")

    } else if (status == "none") {
        $el.text(text + "Not Armed")
    }

}).catch((err) => {
    alert(`An unexpected Error Occurred. Here is some info: ${err}`)
})