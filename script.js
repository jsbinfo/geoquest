const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCtokjD5Uw6weMAjlp2iQhsXpfi9lpCTvvAp8yTRan35-SskKIrxGfh1So617-8FEq/exec";

const questoesBase = [
    { q: "Por que palafitas são altas?", o: ["Estilo", "Evitar enchentes", "Fugir do calor"], a: 1 },
    { q: "Onde fica a aldeia Ipavu?", o: ["No Rio", "No Xingu (MT)", "Amazonas"], a: 1 },
    { q: "Material das ocas?", o: ["Pedra", "Barro e Palha", "Metal"], a: 1 },
    { q: "O que é Quilombo?", o: ["Mercado", "Resistência", "Fábrica"], a: 1 },
    { q: "Transporte ribeirinho?", o: ["Carro", "Barco", "Trem"], a: 1 }
];

let bank = [], cur = 0, score = 0;

window.iniciar = function(n) {
    // Log de IP via Beacon (mais aceito pelo CSP)
    navigator.sendBeacon(SCRIPT_URL + "?ip=Acesso_Esthela");
    
    document.getElementById('start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    let temp = [];
    while(temp.length < 100) { questoesBase.forEach(x => temp.push({...x})); }
    bank = temp.sort(() => Math.random() - 0.5).slice(0, n);
    render();
};

function render() {
    const q = bank[cur];
    document.getElementById('pb').style.width = (cur/bank.length*100)+'%';
    document.getElementById('q-txt').innerText = `Questão ${cur+1}: ${q.q}`;
    const container = document.getElementById('opts');
    container.innerHTML = '';
    
    q.o.forEach((t, i) => {
        const b = document.createElement('button');
        b.className = 'btn btn-opt';
        b.innerText = t;
        b.onclick = () => {
            if(i === q.a) { b.style.background = "#dcfce7"; score++; }
            else { b.style.background = "#fee2e2"; }
            setTimeout(() => {
                cur++;
                if(cur < bank.length) render();
                else finalizar();
            }, 600);
        };
        container.appendChild(b);
    });
}

function finalizar() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('res-score').innerText = `Esthela, você acertou ${score} de ${bank.length}!`;
}
