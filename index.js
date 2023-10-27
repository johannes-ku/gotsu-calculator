import { input } from '@inquirer/prompts';
import config from 'config';
import chalk from "chalk";

let chickenPrice = config.get("prices.chicken");
let bibimbapPrice = config.get("prices.bibimbap");
let comboPrice = config.get("prices.combo");

let totalChickenAmount = parseInt(await input({message: "Total chickens in order:"}));
let totalBibimbapAmount = parseInt(await input({message: "Total bibimbaps in order:"}))

let comboAmount = totalChickenAmount < totalBibimbapAmount ? totalChickenAmount : totalBibimbapAmount;
let separateChickenAmount = totalChickenAmount - comboAmount;
let separateBibimbapAmount = totalBibimbapAmount - comboAmount;

console.log(chalk.bold.underline("           Order summary:           "));
console.log("Combos (chicken and bibimbap): " + chalk.bold(comboAmount));
console.log("          Chickens (separate): " + chalk.bold(separateChickenAmount));
console.log("         Bibimbaps (separate): " + chalk.bold(separateBibimbapAmount));
console.log("\n");

let totalDiscountedPrice = comboAmount * comboPrice + separateBibimbapAmount * bibimbapPrice + separateChickenAmount * chickenPrice;
let totalFullPrice = totalBibimbapAmount * bibimbapPrice + totalChickenAmount * chickenPrice;
let totalDiscount = totalFullPrice - totalDiscountedPrice;
let totalDiscountOnChicken = totalDiscount / (bibimbapPrice + chickenPrice) * chickenPrice;
let totalDiscountOnBibimbap = totalDiscount / (bibimbapPrice + chickenPrice) * bibimbapPrice;
let perChickenDiscount = totalDiscountOnChicken / totalChickenAmount;
let perBibimbapDiscount = totalDiscountOnBibimbap / totalBibimbapAmount;
let discountedChickenPrice = chickenPrice - perChickenDiscount;
let discountedBibimbapPrice = bibimbapPrice - perBibimbapDiscount;

console.log(chalk.bold.underline("         Discounted prices:         "));
console.log("                      Chicken: " + chalk.bold(discountedChickenPrice.toFixed(2)));
console.log("                     Bibimbap: " + chalk.bold(discountedBibimbapPrice.toFixed(2)));



