/** @param {NS} ns */
export async function main(ns) {
	ns.run("autocrack.js", 1)
	while (ns.scriptRunning("autocrack.js", ns.getHostname())) {
		await ns.sleep(100);
	}
	ns.run("fullscan.js", 1)
	while (ns.scriptRunning("fullscan.js", ns.getHostname())) {
		await ns.sleep(100);
	}
	let list = ns.read("serv.txt").split(",");
	let whitelist = ns.read("whitelist.txt").split(",");
	while (true) {
		for (var i = 0; i < list.length; i++) {
			if (!whitelist.includes(list[i]) && ns.hasRootAccess(list[i]) && ns.getServerMaxMoney(list[i]) > ns.getServerMoneyAvailable(list[i])) {
				var orig = ns.getServerMoneyAvailable(list[i]);
				await ns.grow(list[i]);
				var newv = ns.getServerMoneyAvailable(list[i]);
				ns.print(list[i] + " grown successfully from $" + orig + " to $" + newv + "(+$" + (newv - orig) + ")" + ". Security:" + ns.getServerSecurityLevel(list[i]) + ".");
			} else {
				ns.print("Skipped " + list[i] + "(MAX: $" + ns.getServerMaxMoney(list[i]) + " CURRENT: $" + ns.getServerMoneyAvailable(list[i]) + ")");
			}
		}
	}
}