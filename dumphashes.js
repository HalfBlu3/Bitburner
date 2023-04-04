/** @param {NS} ns */
export async function main(ns) {
	while (ns.hacknet.numHashes() > 0){
		ns.hacknet.spendHashes("Sell for Money");
		await ns.sleep(10);
	}
}