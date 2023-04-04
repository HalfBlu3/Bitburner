/** @param {NS} ns */
export async function main(ns) {
	class t{
		num=0;
		constructor(num){
			this.num=num;
		}
		add(num){
			ns.tprint(num+1);
		}
	}

	var tt = new t(1);
	ns.tprint(tt.add);
	var m = tt.add;
	m(8);
}