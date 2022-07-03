document.querySelector('#msg-box').value = ''
document.querySelector('#name-box').value = ''

const backend = "/ayang.php"
const click = document.getElementById("sendmsg")
const placement = document.getElementById("messages")
click.addEventListener('click', async () => {
    const name = document.getElementById("name-box").value
    const msg = document.getElementById("msg-box").value
    if (!name || !msg ) {
        click.innerText = 'Harus diisi semuaa'
        setTimeout(() => {
            click.innerText = 'Kirim'
        }, 1000);
        return
    } else {
        if (/^[A-Za-z0-9_., ?]+$/.test(msg) && /^[A-Za-z0-9_., ?]+$/.test(name)) {
           await post(name, msg, backend)
        } else {
           click.innerText = 'Karakter tidak diijinkan'
           setTimeout(() => {
              click.innerText = 'Kirim'
           }, 1000)
        }
    }

}, false)
//refreshData(backend)
get(backend)
async function get(url) {
    await fetch(url).then((res) => {
        res.text().then((rd) => {
            const dt = JSON.parse(rd)

            applyData(dt)

        })
    }).catch((err) => {
        console.log(err)
    })

}

async function post(name, msg, url) {
    await fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: btoa(name),
            msg: btoa(msg)
        })
    }).then((res) => {
        res.text().then((dt) => {
            //TODO: verification
            //console.log(dt)
            click.innerText = "Terkirim"
            setTimeout(() => {
                click.innerText = 'Memuat. . .'
                location.reload()
            }, 1000);
            
        })
    }).catch((err) => console.log(err))
}

async function refreshData(url) {
    //TODO: get data from backend
    await get(url).then((res) => {

        const dat = JSON.parse(res)
        console.log(dat)
        applyData(dat)
    }).catch((err) => {
        console.log(err)
    })
}

function applyData(dataContent) {
    for (let h = 0; h < dataContent.length; h++) {

        placement.innerHTML += `<div class="msg-item"><div class="msg-val"><p class="msg-content">${atob(dataContent[h].msg)}</p></div><div class="msg-meta"><p class="msg-meta-content">${atob(dataContent[h].name)} - ${atob(dataContent[h].time)}</p></div></div>`
    }
}
