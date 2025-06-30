let currentRulerData = null

function drawRuler() {
    const length = Number.parseFloat(document.getElementById("length").value)
    const minDivision = Number.parseFloat(document.getElementById("minDivision").value)
    const markingType = document.getElementById("markingType").value

    hideError()

    if (isNaN(length) || length <= 0) {
        showError("Vui lòng nhập chiều dài hợp lệ (số dương)")
        return
    }

    if (length > 100) {
        showError("Chiều dài tối đa là 100cm để đảm bảo hiển thị tốt")
        return
    }

    if (isNaN(minDivision) || minDivision <= 0) {
        showError("Vui lòng chọn độ chia nhỏ nhất hợp lệ")
        return
    }

    currentRulerData = { length, minDivision, markingType }

    const marks = generateMarks(length, minDivision, markingType)

    renderRulerSVG(marks, length, markingType)

    document.getElementById("rulerSection").classList.add("active")
    document.getElementById("resetBtn").style.display = "block"
}

function resetRuler() {
    currentRulerData = null
    document.getElementById("rulerSection").classList.remove("active")
    document.getElementById("resetBtn").style.display = "none"
    hideError()
}

function showError(message) {
    const errorDiv = document.getElementById("error")
    errorDiv.textContent = message
    errorDiv.style.display = "block"
}

function hideError() {
    document.getElementById("error").style.display = "none"
}

function generateMarks(length, minDivision, markingType) {
    switch (markingType) {
        case "standard":
            return generateStandardMarks(length, minDivision)
        case "recursive":
            return generateRecursiveMarks(length, minDivision)
        case "binary":
            return generateBinaryMarks(length, minDivision)
        default:
            return generateStandardMarks(length, minDivision)
    }
}

function generateStandardMarks(length, minDivision) {
    const marks = []
    const totalMarks = Math.floor(length / minDivision)

    for (let i = 0; i <= totalMarks; i++) {
        const position = i * minDivision
        if (position > length) break

        let level = 0
        let height = 15
        let label = null

        if (position % 1 === 0) {
            level = 3
            height = 35
            label = position.toString()
        } else if (position % 0.5 === 0) {
            level = 2
            height = 25
        } else if (position % 0.25 === 0) {
            level = 1
            height = 20
        } else {
            level = 0
            height = 15
        }

        marks.push({ position, height, label, level })
    }

    return marks
}

function generateRecursiveMarks(length, minDivision) {
    const marks = []

    marks.push({ position: 0, height: 35, label: "0", level: 3 })
    marks.push({ position: length, height: 35, label: length.toString(), level: 3 })

    function addRecursiveMarks(start, end, level) {
        if (end - start <= minDivision || level > 6) return

        const mid = (start + end) / 2
        const height = Math.max(15, 35 - level * 4)
        const markLevel = Math.max(0, 3 - level)

        let label = null
        if (mid % 1 === 0) {
            label = mid.toString()
        }

        marks.push({ position: mid, height, label, level: markLevel })

        addRecursiveMarks(start, mid, level + 1)
        addRecursiveMarks(mid, end, level + 1)
    }

    addRecursiveMarks(0, length, 1)

    return marks.sort((a, b) => a.position - b.position)
}

function generateBinaryMarks(length, minDivision) {
    const marks = []

    for (let i = 0; i <= length; i++) {
        marks.push({ position: i, height: 35, label: i.toString(), level: 3 })
    }

    function addBinaryDivisions(start, end, level) {
        const division = Math.pow(2, level)
        const step = 1 / division

        if (step < minDivision) return

        for (let i = Math.ceil(start / step); i < end / step; i++) {
            const position = i * step
            if (position % 1 !== 0) {
                const height = Math.max(15, 30 - level * 3)
                marks.push({ position, height, level: Math.max(0, 3 - level) })
            }
        }

        if (step > minDivision) {
            addBinaryDivisions(start, end, level + 1)
        }
    }

    addBinaryDivisions(0, length, 1)

    return marks.sort((a, b) => a.position - b.position)
}

function renderRulerSVG(marks, length, markingType) {
    const svg = document.getElementById("rulerSVG")
    const padding = 60
    const rulerHeight = 80
    const scale = Math.min(800 / length, 50) // Max 800px width, max 50px per cm
    const svgWidth = length * scale + padding * 2
    const svgHeight = rulerHeight + padding * 2

    svg.setAttribute("width", svgWidth)
    svg.setAttribute("height", svgHeight)
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

    svg.innerHTML = ""

    const rulerBase = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rulerBase.setAttribute("x", padding)
    rulerBase.setAttribute("y", padding + 20)
    rulerBase.setAttribute("width", length * scale)
    rulerBase.setAttribute("height", 40)
    rulerBase.setAttribute("fill", "#f8f9fa")
    rulerBase.setAttribute("stroke", "#dee2e6")
    rulerBase.setAttribute("stroke-width", "1")
    svg.appendChild(rulerBase)

    marks.forEach((mark) => {
        const x = padding + mark.position * scale
        const markHeight = mark.height
        const y = padding + 20 + 40 - markHeight

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", x)
        line.setAttribute("y1", y)
        line.setAttribute("x2", x)
        line.setAttribute("y2", padding + 20 + 40)
        line.setAttribute("stroke", getMarkColor(mark.level))
        line.setAttribute("stroke-width", getMarkWidth(mark.level))
        svg.appendChild(line)

        if (mark.label) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
            text.setAttribute("x", x)
            text.setAttribute("y", padding + 15)
            text.setAttribute("text-anchor", "middle")
            text.setAttribute("font-size", "12")
            text.setAttribute("fill", "#495057")
            text.setAttribute("font-family", "monospace")
            text.textContent = mark.label
            svg.appendChild(text)
        }
    })

    const startLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
    startLabel.setAttribute("x", padding)
    startLabel.setAttribute("y", padding + 75)
    startLabel.setAttribute("text-anchor", "middle")
    startLabel.setAttribute("font-size", "10")
    startLabel.setAttribute("fill", "#6c757d")
    startLabel.textContent = "0"
    svg.appendChild(startLabel)

    const endLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
    endLabel.setAttribute("x", padding + length * scale)
    endLabel.setAttribute("y", padding + 75)
    endLabel.setAttribute("text-anchor", "middle")
    endLabel.setAttribute("font-size", "10")
    endLabel.setAttribute("fill", "#6c757d")
    endLabel.textContent = length + "cm"
    svg.appendChild(endLabel)

    updateRulerInfo(length, document.getElementById("minDivision").value, markingType)
}

function getMarkColor(level) {
    switch (level) {
        case 3:
            return "#212529" // Major marks (cm)
        case 2:
            return "#495057" // Half cm
        case 1:
            return "#6c757d" // Quarter cm
        default:
            return "#adb5bd" // Minor marks
    }
}

function getMarkWidth(level) {
    switch (level) {
        case 3:
            return 2 // Major marks
        case 2:
            return 1.5 // Half cm
        case 1:
            return 1 // Quarter cm
        default:
            return 0.5 // Minor marks
    }
}

function updateRulerInfo(length, minDivision, markingType) {
    const title = document.getElementById("rulerTitle")
    const description = document.getElementById("rulerDescription")

    title.textContent = `Thước đo ${length}cm - Chia nhỏ nhất ${minDivision}cm`

    let algorithmName = ""
    switch (markingType) {
        case "standard":
            algorithmName = "Thước chuẩn"
            break
        case "recursive":
            algorithmName = "Đệ quy (Divide & Conquer)"
            break
        case "binary":
            algorithmName = "Chia nhị phân"
            break
    }

    description.textContent = `Kiểu đánh dấu: ${algorithmName}`
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("length").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            drawRuler()
        }
    })
})
