/** @param {NS} ns */
export async function main(ns) {
	var ram = 32768;
	var name = "ccfinder";
	if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram) && ns.getPurchasedServers().length > ns.getPurchasedServerLimit()){
		ns.tprint("attemping...");
		ns.purchaseServer(name, ram);
		ns.write("whitelist.txt", "," + name);
		ns.scp(["whitelist.txt", "fullscan.js", "serv.txt", "badPractice.js", "ccfinder.js"], name);
		if (!ns.getPurchasedServers().includes(name)) ns.tprint("ERROR: failed to purchase sever");
	} else if (ns.getPurchasedServers().length > ns.getPurchasedServerLimit()) ns.tprint("Could not afford a "+ram+"gb server. ("+ns.getServerMoneyAvailable("home")+"/"+ns.getPurchasedServerCost(ram)+")");
	else ns.tprint("Maximum server limit reached ("+ns.getPurchasedServers().length+"/"+ns.getPurchasedServerLimit()+")")
}