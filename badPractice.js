/** @param {NS} ns */
export async function main(ns) {
	while (ture){
		ns.run("ccfinder.js", 1);
		while (ns.isRunning("ccfinder.js", ns.getHostname())) await ns.sleep(10);
	}
}