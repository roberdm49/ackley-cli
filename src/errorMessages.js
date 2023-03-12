const errorMessages = {
  fileOption: 'Opcion no valida. Pruebe con M/m o A/a',
  runs: 'El valor debe ser un numero entero, entre 1 y 5 ',
  dimensions: 'El valor debe ser un numero entero, entre 1 y 50 ',
  populationSize: 'El valor debe ser un numero entero, entre 10 y 100000 ',
  minValue: 'El valor debe ser un numero entre 1 y 32768 (para valor minimo)',
  maxValue: 'El valor debe ser un numero entre 1 y 32768 (para valor maximo)',
  selection: 'El valor debe corresponder a [T]orneo o [E]litismo, T/E ',
  tournamentVictories: 'El valor debe ser un numero entero entre 1 y 10 ',
  elitismPercentage: 'El valor debe ser un numero entero entre 1 y 100 ',
  iterationsPerRun: 'El valor debe ser un numero entero entre 1 y 1000000 ',
};

module.exports = { errorMessages }
