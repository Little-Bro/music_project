const menuSketch = (p) => {
    let partoche;
    let button;

  p.setup = () => {
    p.createCanvas(400, 800);
    p.background(250);

    // partoche object
    partoche = {
      nom: "",
      auteur: "",
      gamme: "",
      chiffrage:"",
      tempo:"",
      lignes:""
    }

    // button
    button = p.createButton('Sauvegarder la partoche');
    button.position(200, 10);
    button.mousePressed(savePartoche);

    // NOM
    let nom = p.createInput('');
    nom.position(780, 100);
    nom.size(100);
    nom.input(nomEvent);

    p.text("Nom : ", 45, 85);

    // AUTEUR
    let auteur = p.createInput('');
    auteur.position(780, 200);
    auteur.size(100);
    auteur.input(auteurEvent);
    p.text("Auteur : ", 45, 185);

    // GAMME
    let gamme = p.createInput('');
    gamme.position(780, 300);
    gamme.size(100);
    gamme.input(gammeEvent);
    p.text("Gamme : ", 45, 285);

    // GAMME
    let chiffrage = p.createInput('');
    chiffrage.position(780, 400);
    chiffrage.size(100);
    chiffrage.input(chiffrageEvent);
    p.text("Chiffrage : ", 45, 385);


    // TEMPO
    let tempo = p.createInput('');
    tempo.position(780, 500);
    tempo.size(100);
    tempo.input(tempoEvent);
    p.text("Tempo : ", 45, 485);

    // LIGNES
    let lignes = p.createInput('');
    lignes.position(780, 600);
    lignes.size(100);
    lignes.input(lignesEvent);
    p.text("Nombre de lignes : ", 45, 585);
  }

  nomEvent = () => {
    partoche.nom = this.value();
  }
  auteurEvent = () => {
    partoche.auteur = this.value();
  }
  gammeEvent = () => {
    partoche.gamme = this.value();
  }
  chiffrageEvent = () => {
    partoche.chiffrage = this.value();
  }
  tempoEvent = () => {
    partoche.tempo = this.value();
  }
  lignesEvent = () => {
    partoche.lignes = parseInt(this.value());
  }

  savePartoche = () => {
    saveJSON(partoche, 'partoche.json');
  }
}

let s = new p5(menuSketch, 'menu');
