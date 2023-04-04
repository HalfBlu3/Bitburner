/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");

	while (true){
		if (ns.getServerMoneyAvailable("home") > ns.hacknet.getPurchaseNodeCost()){
			ns.hacknet.purchaseNode();
			await ns.sleep(10);
		} else{
			if (ns.hacknet.numNodes() > 0){
				var n = findWeakestNode();
				while (ns.getServerMoneyAvailable("home") > ns.hacknet.getLevelUpgradeCost(n) || ns.getServerMoneyAvailable("home") > ns.hacknet.getRamUpgradeCost(n) || ns.getServerMoneyAvailable("home") > ns.hacknet.getCoreUpgradeCost(n)){
					while (ns.getServerMoneyAvailable("home") > ns.hacknet.getCoreUpgradeCost(n)){
						ns.hacknet.upgradeCore(n);
						await ns.sleep(10);
					}
					while (ns.getServerMoneyAvailable("home") > ns.hacknet.getRamUpgradeCost(n)){
						ns.hacknet.upgradeRam(n);
						await ns.sleep(10);
					}
					while (ns.getServerMoneyAvailable("home") > ns.hacknet.getLevelUpgradeCost(n)){
						ns.hacknet.upgradeLevel(n);
						await ns.sleep(10);
					}
					await ns.sleep(10);
				}
			}
			await ns.sleep(10);
		}
		await ns.sleep(10);
	}

	function findWeakestNode(){
	var level = ns.hacknet.getNodeStats(ns.hacknet.numNodes()-1).level;
	var lowest = ns.hacknet.numNodes()-1;
	for (var i=0; i<ns.hacknet.numNodes(); i++){
		if (ns.hacknet.getNodeStats(i).level < level){
			level = ns.hacknet.getNodeStats(i).level;
			lowest=i;
		} 
	}
	return lowest;
	}
}