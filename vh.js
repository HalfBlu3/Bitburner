/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var a = ns.getServerMoneyAvailable(ns.args[0]);
		var b = ns.getServerSecurityLevel(ns.args[0]);
		for (var i = 0; i < 5 && ns.getServerMoneyAvailable(ns.args[0]) > 0; i++) {
			await ns.hack(ns.args[0]);
		}
		if (ns.getServerMoneyAvailable(ns.args[0]) <= a + 1 || a == 0) {
			while (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0]) && ns.getServerMoneyAvailable(ns.args[0]) <= a + 1 || a == 0) {
				await ns.grow(ns.args[0]);
			}
		}
		if (ns.getServerSecurityLevel(ns.args[0]) >= b - 1) {
			while (ns.getServerSecurityLevel(ns.args[0]) >= b) {
				await ns.weaken(ns.args[0]);
			}
		}
		await ns.sleep(100);
	}
}