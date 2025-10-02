// === Verificador de Idade ===

const idadeInput = document.getElementById('idade')
const verifyButton = document.getElementById('verifyButton')
const result = document.getElementById('result')

function verifyAge() {
    result.classList.remove('visible')
    const idade = parseInt(idadeInput.value)
    let msg = ''

    if (isNaN(idade) || idade < 0) {
        msg = "Por favor, insira uma idade válida"
    } else if (idade < 18) {
        msg = 'Você é menor de idade'
    } else if (idade < 60) {
        msg = 'Você é adulto'
    } else {
        msg = 'Você é idoso'
    }

    setTimeout(() => {
        result.innerText = msg
        result.classList.add('visivel') // Obs: certifique-se que o CSS use 'visivel', não 'visible'
    }, 100)
}

verifyButton.addEventListener('click', verifyAge)

idadeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') verifyAge()
})


// === Partículas no Background ===

const canvas = document.getElementById('background-canvas')
const ctx = canvas.getContext('2d')

// Ajusta o tamanho do canvas para preencher a janela
function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

resizeCanvas()

// Mouse tracking
let mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('mouseout', () => {
    mouse.x = undefined
    mouse.y = undefined
})

window.addEventListener('resize', () => {
    resizeCanvas()
    init()
})

// Partículas
let particlesArray = []
const np = 200

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    atualizar() {
        // Inverter direção nas bordas
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX
        }

        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY
        }

        this.x += this.directionX
        this.y += this.directionY

        this.draw()
    }
}

function init() {
    particlesArray = []

    for (let i = 0; i < np; i++) {
        let psize = Math.random() * 2 + 1
        let px = Math.random() * (innerWidth - psize * 2) + psize
        let py = Math.random() * (innerHeight - psize * 2) + psize
        let pDirectionX = (Math.random() * 0.4) - 0.2
        let pDirectionY = (Math.random() * 0.4) - 0.2
        let color = '#a32742'

        particlesArray.push(new Particle(px, py, pDirectionX, pDirectionY, psize, color))
    }
}

// Conectar partículas com linhas
function connect() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x
            let dy = particlesArray[i].y - particlesArray[j].y
            let distance = dx * dx + dy * dy

            const maxDistance = (canvas.width / 7) * (canvas.height / 7)

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(163, 39, 66, ${1 - distance / 20000})`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
            }
        }
    }
}

// Animação
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].atualizar()
    }

    connect()
}

// Inicializa tudo
init()
animate()
