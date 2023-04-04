/** @param {NS} ns */
export async function main(ns) {
	if (!ns.scp(ns.args[0], ns.args[1])) {
		ns.tprint("Failed to move " + ns.args[0] + " to " + ns.args[1]);
	}
}