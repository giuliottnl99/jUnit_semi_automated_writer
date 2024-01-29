import java.util.List;

public class ClassToTest {

	int var1;
	int var2;
	String var3;
	String var4;
	String var5;
	boolean var6;
	Boolean var7;
	List<String> myList;
	
	boolean varTest1 = false;
	boolean varTest2 = false;
	boolean varTest3 = false;
	boolean varTest4 = false;
	boolean varTest5 = false;
	boolean varTest6 = false;
	boolean varTest7 = false;
	
	
	//base case:
	public int baseCaseToTest(int toChange) {
		if (toChange==1) {
			varTest1 = true;
		} else if (toChange==2) {
			varTest2 = true;
		}
		
		//followingNode:
		if(var1==1 || var5=="S") {
			varTest3 = true;
			if(var4.equals("change")) {
				varTest4 = true;
				if(var2==5){
					return -1;
				}
				else {
					return 0;
				}
			}
		}
		else {
			return 1;
		}
		return 2;

	}


	public int getVar1() {
		return var1;
	}


	public void setVar1(int var1) {
		this.var1 = var1;
	}


	public int getVar2() {
		return var2;
	}


	public void setVar2(int var2) {
		this.var2 = var2;
	}


	public String getVar3() {
		return var3;
	}


	public void setVar3(String var3) {
		this.var3 = var3;
	}


	public String getVar4() {
		return var4;
	}


	public void setVar4(String var4) {
		this.var4 = var4;
	}


	public String getVar5() {
		return var5;
	}


	public void setVar5(String var5) {
		this.var5 = var5;
	}


	public boolean isVar6() {
		return var6;
	}


	public void setVar6(boolean var6) {
		this.var6 = var6;
	}


	public Boolean getVar7() {
		return var7;
	}


	public void setVar7(Boolean var7) {
		this.var7 = var7;
	}


	public List<String> getMyList() {
		return myList;
	}


	public void setMyList(List<String> myList) {
		this.myList = myList;
	}


	public boolean isVarTest1() {
		return varTest1;
	}


	public void setVarTest1(boolean varTest1) {
		this.varTest1 = varTest1;
	}


	public boolean isVarTest2() {
		return varTest2;
	}


	public void setVarTest2(boolean varTest2) {
		this.varTest2 = varTest2;
	}


	public boolean isVarTest3() {
		return varTest3;
	}


	public void setVarTest3(boolean varTest3) {
		this.varTest3 = varTest3;
	}


	public boolean isVarTest4() {
		return varTest4;
	}


	public void setVarTest4(boolean varTest4) {
		this.varTest4 = varTest4;
	}


	public boolean isVarTest5() {
		return varTest5;
	}


	public void setVarTest5(boolean varTest5) {
		this.varTest5 = varTest5;
	}


	public boolean isVarTest6() {
		return varTest6;
	}


	public void setVarTest6(boolean varTest6) {
		this.varTest6 = varTest6;
	}


	public boolean isVarTest7() {
		return varTest7;
	}


	public void setVarTest7(boolean varTest7) {
		this.varTest7 = varTest7;
	}
	
	//nodi alternativi che sembrano diversi:
	
	
	//condizioni extra 
	
	
	
	
}
