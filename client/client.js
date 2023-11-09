const socket = io()

const remc = document.getElementById('e')
const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

form.addEventListener('submit', e => {
    e.preventDefault()
    if (input.value) {
        socket.emit('msg', input.value)
        input.value = ''
    }
})

function f(e) {
    socket.emit('cur', { x: e.x, y: e.y })
    return false
}

socket.on('msg', msg => {
    const item = document.createElement('li')
    if (msg.includes('http://')) {
        const link = document.createElement('a')
        link.setAttribute('href', msg)
        link.textContent = "LINK"
        item.appendChild(link)
    }
    else {
        item.textContent = msg
    }
    messages.appendChild(item)

    window.scrollTo(0, document.body.scrollHeight)
})

socket.on('cur', msg => {
    remc.style.left = `${msg.x - 6}px`
    remc.style.top = `${msg.y - 6}px`
})