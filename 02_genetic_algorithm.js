function random() {
    return Math.floor(Math.random() * 10000);
}

function genethicAlgorithm(n, iteration) {
    let gen = [];
    let gen2 = [];

    for (let i = 0; i < 4; i++) {
        gen.push(random());
    }
    console.log('gen', gen);
    
    let p1, p2, h1, h2, h3, h4;
    if (iteration) {
        for (let i = 1; i <= 15; i++) {
            p1 = Math.abs(n-gen[0]) <= Math.abs(n-gen[1]) ? 0 : 1;
            p2 = Math.abs(n-gen[2]) <= Math.abs(n-gen[3]) ? 2 : 3;
    
            h1 = Math.round((gen[p1] + gen[p2])/2);
            h2 = Math.abs(2*gen[p1] - gen[p2]);
            h3 = Math.abs(gen[p1] - gen[p2]);
            h4 = Math.round(gen[p1] * 1.2);
    
            h1 = Math.abs(n-h1) <= Math.abs(n-h2) ? h1 : h2;
            h2 = Math.abs(n-h3) <= Math.abs(n-h4) ? h3 : h4;
    
            gen[0] = gen[p1];
            gen[1] = gen[p2];
            gen[2] = h1;
            gen[3] = h2;
            gen.sort(() => Math.random() - 0.5);
            document.getElementById('logs').innerHTML += i < 10 ? `<p><b>Iteración 0${i}:</b> ${gen}</p>` : `<p><b>Iteración ${i}:</b> ${gen}</p>`;
            console.log(gen);
        }
        return;
    }
    
    let convergence = 0;
    while (convergence < 0.95) {
        p1 = Math.abs(n-gen[0]) <= Math.abs(n-gen[1]) ? 0 : 1;
        p2 = Math.abs(n-gen[2]) <= Math.abs(n-gen[3]) ? 2 : 3;

        h1 = Math.round((gen[p1] + gen[p2])/2);
        h2 = Math.abs(2*gen[p1] - gen[p2]);
        h3 = Math.abs(gen[p1] - gen[p2]);
        h4 = Math.round(gen[p1] * 1.2);

        h1 = Math.abs(n-h1) <= Math.abs(n-h2) ? h1 : h2;
        h2 = Math.abs(n-h3) <= Math.abs(n-h4) ? h3 : h4;

        gen2 = [...gen];

        gen[0] = gen[p1];
        gen[1] = gen[p2];
        gen[2] = h1;
        gen[3] = h2;
        gen.sort(() => Math.random() - 0.5);

        let fitness1 = 0;
        let fitness2 = 0;
        gen2.map(element => fitness1+=element);
        gen.map(element => fitness2+=element);
        convergence = parseFloat((Math.min(fitness1, fitness2)/Math.max(fitness1, fitness2)).toFixed(2));
        document.getElementById('logs').innerHTML += `<p><b>Convergencia: </b> ${parseFloat((convergence*100).toFixed(2))}%</p>`;
        document.getElementById('logs').innerHTML += `<p>${gen}</p>`;
        console.log(gen);
    }

}

let input = Number(prompt('0: convergencia 95%, 1: 15 iteraciones'));
genethicAlgorithm(1234, input ? 1 : 0);
