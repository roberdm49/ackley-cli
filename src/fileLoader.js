const { validations } = require('./Validations');

function fileLoader() {

    const fs = require('fs');

    const fileParameter = process.argv.slice(3)[0];

    const allFileContents = fs.readFileSync(fileParameter, 'utf-8');

    let params = {
        runs: 1,
        dimensions: 1,
        populationSize: 10,
        selection: 'e',
        tournamentVictories: 1,
        elitismPercentage: 1,
        iterationsPerRun: 1,
    };

    allFileContents.split(/\r?\n/).forEach(line =>  {
        const parameterKeyValue = line.split(":");
        switch (parameterKeyValue[0]) {
            case "Runs":
                if(!validations.runs(parseInt(parameterKeyValue[1].trim()))) {
                    console.log('El valor establecido para la cantidad de ejecuciones es invalido...');
                    console.log('Se admiten valores positivos enteros entre 1 y 5, por defecto se usara 1...');
                } else {
                    params.runs = parseInt(parameterKeyValue[1].trim());
                }
                break;
            case "Dimensions":
                if(!validations.dimensions(parseInt(parameterKeyValue[1].trim()))) {
                    console.log('El valor establecido para la cantidad de dimensiones es invalido...');
                    console.log('Se admiten valores positivos enteros entre 1 y 5, por defecto se usara 1...');
                } else {
                    params.dimensions = parseInt(parameterKeyValue[1].trim());
                }
                break;
            case "Population":
                if(!validations.populationSize(parseInt(parameterKeyValue[1].trim()))) {
                    console.log('El valor establecido para la cantidad de poblacion es invalido...');
                    console.log('Se admiten valores positivos enteros entre 10 y 100000, por defecto se usara 10...');
                } else {
                    params.populationSize = parseInt(parameterKeyValue[1].trim());
                }
                break;
            case "SurvivalSelection":
                if(!validations.selection(parameterKeyValue[1].trim())) {
                    console.log('El valor establecido para el metodo de seleccion es invalido...');
                    console.log('Se admiten los valores t|T o e|E, por defecto se usara elitismo...');
                } else {
                    params.selection = parameterKeyValue[1].trim();
                }
                break;
            case "SurvivalSelectionBias":
                if(params.selection === ('t' || 'T')) {
                    if(!validations.tournamentVictories(parseInt(parameterKeyValue[1].trim()))) {
                        console.log('El valor establecido para la cantidad de victorias es invalido...');
                        console.log('Se admiten valores positivos enteros entre 1 y 10, por defecto se usara 1...');
                    } else {
                        params.tournamentVictories = parseInt(parameterKeyValue[1].trim());
                    }
                } else if (params.selection === ('e' || 'E')){
                    if(!validations.elitismPercentage(parseInt(parameterKeyValue[1].trim()))) {
                        console.log('El valor establecido para el porcentaje de elitismo es invalido...');
                        console.log('Se admiten valores positivos enteros entre 1 y 100, por defecto se usara 1...');
                    } else {
                        params.elitismPercentage = parseInt(parameterKeyValue[1].trim());
                    }
                } 
                break;
            case "Iterations":
                if(!validations.iterationsPerRun(parseInt(parameterKeyValue[1].trim()))) {
                    console.log('El valor establecido para la cantidad de iteraciones es invalido...');
                    console.log('Se admiten valores positivos enteros entre 1 y 100000, por defecto se usara 1...');
                } else {
                    params.iterationsPerRun = parseInt(parameterKeyValue[1].trim());
                }
                break;
            default:
                break;
        }
    });

    return params;

}


module.exports = { fileLoader };