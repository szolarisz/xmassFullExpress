document.getElementById('diszlista').onclick = diszekListaja;

async function diszekListaja() {
    const response = await fetch("/xmassdata");
    const diszlista = await response.json();

    var diszHTML = "<h1>Az eddigi díszek listája:</h1>";
    diszHTML += `<table id="disztabla"><tr><th>Átmérő (mm)</th><th>Szín</th><th>Alakzat</th></tr>`;
    for (const egyDisz of diszlista) {
        var sorClass = "arany";
        const terfogat = Math.round(4 * Math.PI * Math.pow(egyDisz.atmero / 2, 3) / 3 * 100) / 100;
        if (egyDisz.piros === "igaz")
            sorClass = "piros";
        diszHTML += `<tr class=${sorClass}><td>${egyDisz.atmero} ( V=${terfogat}  mm<sup>3</sup>)</td>
    <td class=>${sorClass}</td>
    <td>${egyDisz.alakzat}</td>
    </tr>
    `;


    }
    diszHTML += `</table>`;

    document.getElementById("diszeredmeny").innerHTML = diszHTML;
}

document.getElementById("xmassform").onsubmit = async function (event) {
    console.log("Elkapva");
    event.preventDefault();
    const atmero = event.target.elements.meret.value;
    const pirosErtek = event.target.elements.piros.checked;
    const alakzat = event.target.elements.alakzat.value;

    var piros = "igaz"
    if( pirosErtek == true)
    piros = "hamis";

    const res = await fetch("/xmassdata", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            atmero,
            piros,
            alakzat
        }),
    });

    if (res.ok) {
        diszekListaja();
    } else {
        alert("Server error");
    }
};