const questions = {
  fileOption: 'La configuracion sera cargada [M]anualmente o por [A]rchivo? \n',
  runs: '(1/8) Cuantas runs seran ejecutadas? \n',
  dimensions: '(2/8) Cuantas dimensiones tendra cada habitante? \n',
  populationSize: '(3/8) Cual sera el tamanio de poblacion? \n',
  minValue: '(4/8) Cual sera el valor minimo de variable? Tomaremos el valor negativo del ingresado',
  maxValue: '(5/8) Cual sera el valor maximo de variable?',
  selection: '(6/8) Seleccion por [T]orneo o [E]litismo? \n',
  tournamentVictories: '(6/8) Cuantas enfrentamientos habra en el torneo? \n',
  elitismPercentage: '(7/8) Que porcentaje de elitismo se busca? \n',
  iterationsPerRun: '(8/8) Cuantas iteraciones seran ejecutadas por run? \n',
};

module.exports = { questions }
