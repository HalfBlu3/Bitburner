/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("getHostname"); ns.disableLog("sleep"); ns.disableLog("hasRootAccess"); ns.disableLog("scriptRunning");
	var i = 0;
	ns.run("fullscan.js", 1, "full")
	while (ns.scriptRunning("fullscan.js", ns.getHostname())) {
		await ns.sleep(100);
	}
	let list = ns.read("serv.txt").split(",");
	let whitelist = ns.read("whitelist.txt");
	for (i = 0; i < list.length; i++) {
		if (!whitelist.includes(list[i]) && !ns.hasRootAccess(list[i])) {
			ns.run("crack.js", 1, list[i]);
		}
	}
}