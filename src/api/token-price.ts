import axios from "axios";

export type TokenPriceQuery = {
	json: {
		tokens: string[];
		chainId: string;
		dateRange: string;
	};
};

export type TokenSeries = {
	time: number;
	value: number;
};

type Untrn = {
	series: TokenSeries[];
	priceChangePercentage: number;
	minValue: number;
	maxValue: number;
};

type Ibc = {
	series: TokenSeries[];
	priceChangePercentage: number;
	minValue: number;
	maxValue: number;
};

export type TokenPriceResponse = {
	untrn: Untrn;
	"ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": Ibc;
};

const percentEncodeJSON = (tokenPrice: TokenPriceQuery): string => {
	return encodeURIComponent(JSON.stringify(tokenPrice));
};

export async function getTokenPrice(
	tokenPriceQuery: TokenPriceQuery
): Promise<TokenPriceResponse> {
	try {
		const encodedTokenPriceQuery = percentEncodeJSON(tokenPriceQuery);
		const {
			result: { data: tokenPrice },
		} = await axios
			.get(
				`https://app.astroport.fi/api/trpc/charts.prices?input=${encodedTokenPriceQuery}`
			)
			.then((response) => response.data);

		return tokenPrice.json;
	} catch (error) {
		throw new Error(`Error occurred: ${error}`);
	}
}
