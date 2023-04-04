/** @param {NS} ns */
import {getServList} from "storage.js";
export async function main(ns) {
	//hacking a server can lower stock value
	//growing a server can raise stock value
	//working for a company can raise stock value
	//ns.stock.

	ns.disableLog("all");

	while (true) {
		for (var i=0; i<ns.stock.getSymbols().length; i++){
			if (ns.stock.getPosition(ns.stock.getSymbols()[i])[0] < ns.args[1] && ns.getServerMoneyAvailable("home") > getCost(getStockName(i), ns.args[0])){
				var name = getStockName(i);
				await weakenServer(name);
				var listFor = (getSell(name));
				var max = ns.args[1] - (ns.args[1]-(ns.args[1]-ns.stock.getPosition(ns.stock.getSymbols()[i])[0]));
				if (ns.args[0] <= max && ns.getServerMoneyAvailable("home") >= getCost(name, ns.args[0], "long")){
    				ns.stock.buyStock(name, ns.args[0]);
					ns.stock.placeOrder(name, ns.args[0], listFor, "limit sell order", "Long");
					ns.tprint("Purchased " + ns.args[0] + " " + name + " for " + getCost(name, 1) + " and listed for " + listFor);
					while (ns.getScriptRam("stockgrow.js") > ram("home")){
						await ns.sleep(100);
					}
					ns.run("stockgrow.js", 1, getServerName(name), name);
  				} else if (ns.getServerMoneyAvailable("home") >= getCost(name, max, "long")){
    				ns.stock.buyStock(name, max);
					ns.stock.placeOrder(name, max, listFor, "limit sell order", "Long");
					ns.tprint("Purchased " + max + " " + name + " for " + getCost(name, 1) + " and listed for " + listFor);
					while (ns.getScriptRam("stockgrow.js") > ram("home")){
						await ns.sleep(100);
					}
					ns.run("stockgrow.js", 1, getServerName(name), name);
					//stockgrow.js is a script that uses ns.grow on a given stock so we dont have to stop this program in its tracks
  				}
				await ns.sleep(100);
			}
			await ns.sleep(100);
		}
		await ns.sleep(100);
	}
	
	//these are functions so I can change how price is determined without having to change it every time its referenced
	function getCost(sym, amt, type){
		return (ns.stock.getPrice(sym, amt, type));
	}

	function getSell(sym) {
		return (getCost(sym, 1, "Long") + 1000);
	}

	function getShortSell(sym) {
		return (getCost(sym, 1, "Short") - 1000);
	}


	function getStockName(i) {
		return(ns.stock.getSymbols()[i]);
	}

	function ram (server){
		return(ns.getServerMaxRam(server)-ns.getServerUsedRam(server));
	}

	async function weakenServer(sym) {
		if (getServerName(sym) != ""){
			var target = getServerName(sym);
			var goal = (getCost(sym, 1, "Long") - (getCost(sym, 1, "Long")/0.10));
			if (!ns.hasRootAccess(target)){
				ns.run("crack.js", 1, target); 
			}
			if (ns.hasRootAccess(target) && ns.getHackingLevel() > ns.getServerRequiredHackingLevel(target)){
				while (getCost(sym, 1, "Long") > goal){
					await ns.hack(getServerName(sym), {threads:1, stock:true});
					await ns.sleep(100);
				}
			}
		}
	}

	function getServerName(sym){
		for (var i=0; i < getServList().length ; i++) {
			if (getServList()[i][0] == sym) {
				return (getServList()[i][2]);
			}
		}
		return ("");
	}

	function getSym(name){
		for (var i=0; i < getServList().length ; i++) {
			if (getServList()[i][2] == name) {
				return (getServList()[i][0]);
			}
		}
		return ("");
	}
}