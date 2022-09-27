let dept = {
    origin: 0,
    time: 0,
    rate: 0,
    date: 0,
    rest: 0,
    interest: 0
}

function app() {
    dept.origin = document.querySelector('input[name="origin"]').value
    dept.time = document.querySelector('input[name="time"]').value
    dept.rate = document.querySelector('input[name="rate"]').value
    dept.date = new Date(document.querySelector('input[name="date"]').value)
    dept.rest = dept.origin / dept.time

    if (checkData()) {
        alert('Hãy nhập dữ liệu trước khi tính toán!!!')
        return
    }

    let htmls = `
        <tr>
            <th colspan="2">Kỳ trả nợ</th>
            <th>Số gốc còn lại</th>
            <th>Trả gốc</th>
            <th>Trả lãi</th>
            <th>Tổng gốc + Lãi</th>
        </tr>
        <tr>
            <td>${dept.date.toShortDay()}</td>
            <td>0</td>
            <td>${formatNumber(dept.origin)}</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`

    let sumRest = 0, sumInterest = 0, sumRestInterest = 0;
    for (i = 1; i <= dept.time; i++) {
        dept.date = dept.date.plusMonth(1)
        dept.interest = dept.origin * dept.rate / 1200
        dept.origin -= dept.rest

        htmls += `
        <tr>
            <td>${dept.date.toShortDay()}</td>
            <td>${i}</td>
            <td>${formatNumber(dept.origin)}</td>
            <td class="ele-rest">${formatNumber(dept.rest)}</td>
            <td class="ele-interesrt">${formatNumber(dept.interest)}</td>
            <td class="ele-rest-interesrt">${formatNumber(dept.rest + dept.interest)}</td>
        </tr>`

        sumRest += dept.rest
        sumInterest += dept.interest
        sumRestInterest += dept.rest + dept.interest
    }

    htmls += `<tr>
        <td><b>Tổng<b></td>
        <td></td>
        <td></td>
        <td><b>${formatNumber(sumRest)}</b></td>
        <td><b>${formatNumber(sumInterest)}</b></td>
        <td><b>${formatNumber(sumRestInterest)}</b></td>
    </tr>`

    let tableOutput = document.querySelector('.table-output')
    tableOutput.innerHTML = htmls
}

function checkData() {
    if (dept.origin == 0 || dept.time == 0 || dept.rate == 0 || dept.date == '') return true
    return false
}

function sumResult(arr) {
    let sum = 0;
    arr.forEach((item) => {
        sum += +item.innerHTML
    })
    return sum
}

function formatNumber(number) {
    return Math.round(number).toLocaleString('en-US')
}

Date.prototype.plusMonth = function (month) {
    setDate = this.setMonth(this.getMonth() + month)
    newDate = new Date(setDate)
    return newDate
}

Date.prototype.toShortDay = function () {
    date = new Date(this)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}
