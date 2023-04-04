/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("sleep");
	var target = ns.args[0];
	var sym = ns.args[1];
	while (target != "" && ns.hasRootAccess(target) && ns.stock.getPosition(sym)[0] > 0){
		await ns.grow(target, {threads:1, stock:true});
		await ns.sleep(100);
	}
}