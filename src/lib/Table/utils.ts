interface MonObjet {
  propriete: string | number;
}

function trierTableau(tableau: MonObjet[], propriete: string): MonObjet[] {
  return tableau.sort((a, b) => {
    if (a[propriete] < b[propriete]) {
      return -1;
    }
    if (a[propriete] > b[propriete]) {
      return 1;
    }
    return 0;
  });
}
