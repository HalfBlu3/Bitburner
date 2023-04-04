/** @param {NS} ns */
export async function main(ns) {
	class contract{
		name="";
		type="";
		location="";
		attempts=0;
		constructor(name, type, location){
			this.name = name;
			this.type = type;
			this.location = location;
			this.attempts = ns.codingcontract.getNumTriesRemaining(this.name, this.location);
		}
	}
	ns.run("fullscan.js", 1);
	while (ns.isRunning("fullscan.js", ns.getHostname())) await ns.sleep(10);
	let list = ns.read("serv.txt").split(",");
	list.push("home");
	var contracts = [];
	if (ns.args[0] != "home"){
		for (var s=0; s<list.length; s++){
			for (var i=0; i<ns.ls(list[s]).length;i++){
				if (ns.ls(list[s])[i].includes(".cct")){
					contracts.push(new contract(ns.ls(list[s])[i], ns.codingcontract.getContractType(ns.ls(list[s])[i], list[s]), list[s]))
				}
			}
		}
	} else {
		for (var i=0; i<ns.ls("home").length;i++){
			if (ns.ls("home")[i].includes(".cct")){
				contracts.push(new contract(ns.ls("home")[i], ns.codingcontract.getContractType(ns.ls("home")[i], "home"), "home"))
			}
		}
	}
	ns.tprint("found "+contracts.length+" contracts");
	for (contract in contracts){
		solve(contracts[contract]);
	}

	function solve(contract){
		var input = ns.codingcontract.getData(contract.name, contract.location);
		var desc = ns.codingcontract.getDescription(contract.name, contract.location);
		switch (contract.type){
			case "Compression I: RLE Compression":{
				var build ="";
				var chars = input.split("");
				var last="";
				var count=0;
				for (var i=0; i<chars.length;i++){
					if (last == chars[i]) count++;
					else {
						if (last != ""){
							if (count <=9){
								build+=count;
								build+=last;
							} else {
								var n=Math.floor(count/9);
								for (var t=0; t<n;t++){
									build+=9;
									build+=last;
								}
								build+= (count-(n*9));
								build+= last;
							}
						}
						count=1;
						last=chars[i];
					}
				}
				build+=count;
				build+=last;
				ns.tprint(build);
				ns.tprint(ns.codingcontract.attempt(build, contract.name, contract.location));
				break;
			}
			case "Compression II: LZ Decompression":{
				var build = "";
				var chars = input.split("");
				var mode=1;
				for (var i=0; i<chars.length;){
					if (chars[i] == "0") i++;
					else{
						if (mode == 1){
							var len=parseInt(chars[i]);
							for (var ii=1; ii<len+1; ii++){
								build += chars[i+ii];
							}
							i += len+1;
						} else {
							var num = parseInt(chars[i]);
							var offset = parseInt(chars[i+1]);
							for (var ii=0; ii<num; ii++){
								build += build.split("")[build.split("").length-offset];
							}
							i += 2;
						}
						mode = Math.abs(mode-3);
					}
				}
				ns.tprint(ns.codingcontract.attempt(build, contract.name, contract.location));
			}
		}
	}
}