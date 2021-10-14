import { useContext, useState } from "react";
//@ts-ignore
import useMobileDetect from "use-mobile-detect-hook";
import { Header, Table } from "../../components";
import Footer from "../../components/Footer";
import { Burrow, IBurrow } from "../../index";
import { BigButton, PageTitle, TotalSupply } from "../../shared";

const BorrowTopButtons = () => {
	return (
		<div style={{
			display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyItems: "center", paddingLeft: "20em", paddingRight: "20em"
		}}>
			<BigButton />
			<BigButton />
			<BigButton />
		</div>
	)
}

const Borrow = () => {
	const burrow = useContext<IBurrow | null>(Burrow);

	const mock = [
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
		{ name: "Token Name", borrowAPY: 10 },
	];

	const [assets, setAssets] = useState<any[]>(mock);

	// useEffect(() => {
	// 	(async () => {
	// 		const accounts = await burrow?.view(
	// 			burrow?.logicContract,
	// 			ViewMethodsLogic[ViewMethodsLogic.get_accounts_paged],
	// 		);
	// 		console.log("accounts", accounts);

	// 		for (const account of accounts) {
	// 			const acc = await burrow?.view(
	// 				burrow?.logicContract,
	// 				ViewMethodsLogic[ViewMethodsLogic.get_account],
	// 				{
	// 					account_id: account.account_id,
	// 				},
	// 			);
	// 			console.log("account", acc);
	// 		}

	// 		const a = (await getAssets()).map((asset: any) => {
	// 			return {
	// 				...asset,
	// 				borrowAPY: 10,
	// 			};
	// 		});

	// 		setAssets([...mock, ...a]);
	// 	})();
	// }, []);

	const columns = [
		{
			width: 300,
			label: "Name",
			dataKey: "name",
		},
		{
			width: 300,
			label: "Borrow APY",
			dataKey: "borrowAPY",
		},
	];
	const detectMobile = useMobileDetect();

	const isMobile = detectMobile.isMobile()
	return (
		<>
			<Header>
				<BorrowTopButtons />
			</Header>
			<PageTitle paddingTop={"0"} first={"Borrow"} second={"Assets"} />
			<Table rows={assets} columns={columns} />
			<TotalSupply />
			<Footer />
		</>
	);
};

export default Borrow;
