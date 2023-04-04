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
			if (!whitelist.includes(list[i]) && ns.hasRootAccess(list[i]) && ns.getServerSecurityLevel(list[i]) > ns.getServerMinSecurityLevel(list[i])) {
				await ns.weaken(list[i]);
			}
		}
	}
}