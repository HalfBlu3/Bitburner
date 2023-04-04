/** @param {NS} ns */
export async function main(ns) {
	if (ns.fileExists(ns.args[0])) {
		for (var i = 0, ii = 0; ii < ns.args[1]; i++) {
			if (!ns.isRunning(ns.args[0], ns.getHostname(), i)) {
				ns.run(ns.args[0], 1, i);
				ii++;
			}
		}
	}
}