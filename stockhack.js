/** @param {NS} ns */
export async function main(ns) {
	//mode, target, symbol, stop @

	if (!ns.hasRootAccess(ns.args[1])){
		ns.run("crack.js", 1, ns.args[1] );
	}
	if (ns.hasRootAccess(ns.args[1])){
		while (ns.stock.getPrice(ns.args[2], 1,"Long") > ns.args[3]) {
			await ns.hack(ns.args[1]);
		}
	}
}