/** @param {NS} ns */
export async function main(ns) {
	ns.run("fullscan.js", 1);
	if (ns.args[0] == "all") {
	ns.run("autoserver.js", 1);
	}
	ns.run("autoweaken.js", 20);
	ns.run("autogrow.js", 20);
	ns.run("autohack.js", 1);
}