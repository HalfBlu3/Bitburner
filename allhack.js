/** @param {NS} ns */
export async function main(ns) {
	ns.run("fullscan.js", 1);
	while (ns.isRunning("fullscan.js", ns.getHostname())) await ns.sleep(10);
	let list = ns.read("serv.txt").split(",");
	let whitelist = ns.read("whitelist.txt").split(",");
	for (var i=0; i<list.length; i++){
		if (ns.hasRootAccess(list[i]) && !whitelist.includes(list[i])){
			ns.killall(list[i]);
			ns.exec("autohack.js", list[i], 1);
			ns.tprint("Started "+list[i]);
		}
	}
}