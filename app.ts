import chalk from "chalk";
import inquirer from "inquirer";


let apiLink = "https://v6.exchangerate-api.com/v6/15b2b717b1fd2ba4405f8a76/latest/PKR";
let fetchData = async (data:any)=>{
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;

};
let data = await fetchData(apiLink);
let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({
    type: "list",
    name:"name",
    message: "converting from",
    choices: countries,
    
});


let userMoney = await inquirer.prompt({
    type: "number",
    name:"rupee",
    message: `please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,

});

let secondCountry = await inquirer.prompt({
    type: "list",
    name:"name",
    message: "converting to",
    choices: countries,
    
});

let cnv = `https://v6.exchangerate-api.com/v6/15b2b717b1fd2ba4405f8a76/pair/${firstCountry.name}/${secondCountry.name}`;

let cnvData = async (data:any)=>{
    let cnvData= await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;

};

let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${chalk.bold.bgBlue(firstCountry.name)} ${chalk.bold.bgCyan(userMoney.rupee)}
in ${chalk.bold.bgGray(secondCountry.name)} is ${chalk.bold.bgYellow(convertedRate)}`);