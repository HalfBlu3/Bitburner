/** @param {NS} ns */
export async function main(ns) {
	let list = ns.read("whitelist.txt").split(",");
	var i = 0;
	for (i = 0; i < list.length; i++) {
		if (!(list[i] == "darkweb" || list[i].includes("hacknet-server"))) {
			if (!ns.scp(ns.args[0], list[i])) {
				ns.tprint("Failed to move " + ns.args[0] + " to " + list[i]);
			}
		}
	}
}