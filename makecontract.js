/** @param {NS} ns */
export async function main(ns) {
	var cc = ns.codingcontract;
	var arr = cc.getContractTypes();
	/*
	for (var i=0; i<arr.length;i++){
		cc.createDummyContract(arr[i]);
		ns.tprint("created a dummy "+arr[i]+" contract");
	}
	*/
	cc.createDummyContract("Compression II: LZ Decompression");
	
}