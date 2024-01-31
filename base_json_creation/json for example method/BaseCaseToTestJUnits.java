package it.gft.gw.ibatis.sqlmaps;

import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class BaseCaseToTestJUnits {

	ClassToTest myClass;

	@Before
	public void init() {
		myClass = new ClassToTest();
	}

	@Test
	public void baseCaseToTest_Test_SequenceTrue1() throws Exception {
		int toChange = 4;
		toChange = 1;

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(myClass.isVarTest1());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFalse1() throws Exception {
		int toChange = 4;
		// toChange!=1 toChange=3;

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertFalse(myClass.isVarTest1());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFalse1True1() throws Exception {
		int toChange = 4;
		// toChange!=1 toChange=3;
		toChange = 2;

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(myClass.isVarTest2());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFalse1False1() throws Exception {
		int toChange = 4;
		// toChange!=1 toChange=3;
		// toChange!=2 ->
		toChange = 3;

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertFalse(myClass.isVarTest2());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True1() throws Exception {
		int toChange = 4;
		myClass.setVar1(1);
		myClass.setVar4("element");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(myClass.isVarTest3());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1False1() throws Exception {
		int toChange = 4;
		myClass.setVar1(2);
		myClass.setVar5("N");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(result == 1);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True1True1() throws Exception {
		int toChange = 4;
		myClass.setVar1(1);
		myClass.setVar4("change");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(myClass.isVarTest4());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True2True1() throws Exception {
		int toChange = 4;
		myClass.setVar1(0);
		myClass.setVar5("S");
		myClass.setVar4("change");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(myClass.isVarTest4());
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True1False1() throws Exception {
		int toChange = 4;
		myClass.setVar1(1);
		myClass.setVar4("noChange");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertFalse(myClass.isVarTest4());
		Assert.assertTrue(result == 2);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True2False1() throws Exception {
		int toChange = 4;
		myClass.setVar1(0);
		myClass.setVar5("S");
		myClass.setVar4("noChange");

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertFalse(myClass.isVarTest4());
		Assert.assertTrue(result == 2);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True1True1True1() throws Exception {
		int toChange = 4;
		myClass.setVar1(1);
		myClass.setVar4("change");
		myClass.setVar2(5);

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(result == -1);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True2True1True1() throws Exception {
		int toChange = 4;
		myClass.setVar1(0);
		myClass.setVar5("S");
		myClass.setVar4("change");
		myClass.setVar2(5);

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(result == -1);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True1True1False1() throws Exception {
		int toChange = 4;
		myClass.setVar1(1);
		myClass.setVar4("change");
		// var2!=5
		myClass.setVar2(7);

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(result == 0);
	}

	@Test
	public void baseCaseToTest_Test_SequenceFollowing1True2True1False1() throws Exception {
		int toChange = 4;
		myClass.setVar1(0);
		myClass.setVar5("S");
		myClass.setVar4("change");
		// var2!=5
		myClass.setVar2(7);

		int result = myClass.baseCaseToTest(toChange);
		Assert.assertTrue(result == 0);
	}

}
