/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("getHostname"); ns.disableLog("sleep"); ns.disableLog("hasRootAccess"); ns.disableLog("getServerUsedRam"); ns.disableLog("getServerMaxRam"); ns.disableLog("getHackingLevel"); ns.disableLog("getServerRequiredHackingLevel"); ns.disableLog("scriptRunning");
	var i = 0;
	var ii = 0;
	if (ns.getHostname() != "home"){
		ns.run("update.js",1);
		while(ns.isRunning("update.js", ns.getHostname())) await ns.sleep(10);
	}
	ns.run("autocrack.js", 1);
	while (ns.isRunning("autocrack.js", ns.getHostname())) await ns.sleep(10);
	ns.run("fullscan.js", 1);
	while (ns.isRunning("fullscan.js", ns.getHostname())) await ns.sleep(10);
	let list = ns.read("serv.txt").split(",");
	let whitelist = ns.read("whitelist.txt").split(",");
	var targets = [];
	for (var i=0; i<list.length; i++){
		if (ns.hasRootAccess(list[i]) && !(list[i].includes("hacknet-server") || whitelist.includes(list[i])) && ns.getServerRequiredHackingLevel(list[i]) <= ns.getHackingLevel()){
			targets.push(list[i]);
		}
	}
	var threads = Math.floor(((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) / ns.getScriptRam("vh.js")) / targets.length);
	while (threads < 1) {
		threads = Math.floor(((ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())) / ns.getScriptRam("vh.js")) / targets.length);
		await ns.sleep(10);
	}
	var ii = 0;
	while (ns.getServerUsedRam(ns.getHostname()) + (ii * ns.getScriptRam("vh.js")) < ns.getServerMaxRam(ns.getHostname())) {
		for (i = 0; i < targets.length && ns.getServerUsedRam(ns.getHostname()) + (ii * ns.getScriptRam("vh.js")) < ns.getServerMaxRam(ns.getHostname()); i++) {
			if (!ns.isRunning("vh.js", ns.getHostname(), targets[i], ii)) {
				ns.run("vh.js", threads, targets[i], ii);
			await ns.sleep(10);
			}
		}
		await ns.sleep(10);
		ii++;
	}
}