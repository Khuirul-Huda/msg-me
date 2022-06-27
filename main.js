const backend = "/ayang.php"
const click = document.getElementById("sendmsg")
click.addEventListener('click',async () => {
    const name = document.getElementById("name-box").value 
    const msg = document.getElementById("msg-box").value
    await post(name, msg, backend)
}, false )


async function get(url) {
    await fetch(url).then((res) => {
        res.text().then((rd) => {
            console.log(rd)
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
            console.log(dt)
        })
    }).catch((err) => console.log(err))
} 

async function getData() {
    //TODO: get data from backend
}
