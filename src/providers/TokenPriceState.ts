import { TokenPriceResponse } from "../api/token-price";

export type TokenPriceState = {
	tokenPrice: TokenPriceResponse;
	isLoading: boolean;
};

export const INITIAL_TOKEN_PRICE: TokenPriceResponse = {
	"ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": {
		series: [
			{
				time: 0,
				value: 0,
			},
		],
		priceChangePercentage: 0,
		minValue: 0,
		maxValue: 0,
	},
	untrn: {
		series: [
			{
				time: 0,
				value: 0,
			},
		],
		priceChangePercentage: 0,
		minValue: 0,
		maxValue: 0,
	},
};
