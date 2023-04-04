/** @param {NS} ns */
import {getServList, servMap, getSym} from "storage.js";
export async function main(ns) {
	ns.disableLog;
	//sets the buy increments
	if (ns.args[0] == null || !ns.args[0] > 0) {
		ns.tprint("no amount given");
		ns.scriptKill("betterStock.js", getCurrentServer());
	} else var amount = ns.args[0];

	//sets the target profit margin
	if (ns.args[1] == null || !ns.args[1] > 0){
		ns.tprint("no profit target given");
		ns.scriptKill("betterStock.js", getCurrentServer());
	} else var profit = ns.args[1];

	//assigns the stock type, defaulting to long
	var type = ns.args[2] == "short" ? "short" : "long";

	var stocks = servMap();

	while (true){
		if (getServerMoneyAvailable("home") > 1000000){
		for (var i=0;i<stocks.length;i++){
			ns.tprint("bought "+amount+" shares of "+stocks[i][1]+" for "+ns.stock.getPrice(stocks[i][0], amount));
			ns.stock.buyStock(stocks[i][1], amount, type);
			aStock = new Stock(stocks[i][1], stocks[i][0], ns.stock.getPrice(stocks[i][0], amount), type, profit, amount);
			portfolio.push(aStock);

			}
		}
		for (var i=0; i<portfolio.length;i++){
			var o = portfolio[i];
			if (o.readyToSell()){
				ns.tprint("sold "+o.amount+" shares of "+o.name+" for "+o.getPrice());
				o.sell();
				portfolio.splice(i, 1);
				i--;
			}
		}
		await ns.sleep(100);
	}
}

//resources


class Stock{
	name = ""; sym=""; buyPrice=0; sellPrice=0; type=""; profitTarget=0; amount=0; isActive = true;

	constructor(name, sym, buyPrice, type, profitTarget, amount){
		this.name = name;
		this.sym = sym;
		this.buyPrice = buyPrice;
		this.type = type;
		this.profitTarget = profitTarget;
		this.amount=amount;
	}
	//sets the tarrget price based on the target profit percentage
	calculateSell(){sellPrice = buyPrice+((type == short ? -1 : 1)*(buyPrice*(profitTarget/100)));}
	
	price(){return ns.stock.getPrice(sym, amount, type);}
	
	readyToSell(){return (type == "long" && price()>sellPrice ? true : type == "short" && price()<sellPrice ? true : false);}
	
	sell(amount){ns.stock.sellStock(sym, amount); isActive = false;}
}