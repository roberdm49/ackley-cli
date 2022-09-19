function fileLoader() {

    const fs = require('fs');

    const fileParameter = process.argv.slice(2)[0];

    const allFileContents = fs.readFileSync(fileParameter, 'utf-8');

    let params = {
        dimensions: 0,
        iterationsPerRun: 0,
        populationSize: 0,
        runs: 0,
        selection: '',
        tournamentVictories: 0,
        elitismPercentage: 0,
    };

    allFileContents.split(/\r?\n/).forEach(line =>  {
        const parameterKeyValue = line.split(":");
        switch (parameterKeyValue[0]) {
            case "Runs":
                    params.runs = parseInt(parameterKeyValue[1].trim());
                break;
            case "Dimensions":
                    params.dimensions = parseInt(parameterKeyValue[1].trim());
                break;
            case "Population":
                    params.populationSize = parseInt(parameterKeyValue[1].trim());
                break;
            case "SurvivalSelection":
                    params.selection = parameterKeyValue[1].trim();
                break;
            case "SurvivalSelectionBias":
                    if(params.survivalSelection === ('t' || 'T')) {
                        params.tournamentVictories = parseInt(parameterKeyValue[1].trim());
                    } else {
                        params.elitismPercentage = parseInt(parameterKeyValue[1].trim());
                    }
                break;
            case "Iterations":
                    params.iterationsPerRun = parseInt(parameterKeyValue[1].trim());
                break;
            default:
                break;
        }
    });

    return params;

}


module.exports = { fileLoader };