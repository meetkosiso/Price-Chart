import { useQuery } from "@tanstack/react-query";
import { TokenPriceState, INITIAL_TOKEN_PRICE } from "./TokenPriceState";
import { TokenPriceQuery, getTokenPrice } from "../api/token-price";
import { QueriesID } from "../api/queries";

type TokenPriceProviderState = {
	state: TokenPriceState;
};

export function useGetSevenDayTokenPrice(): TokenPriceProviderState {
	const tokenPriceParam: TokenPriceQuery = {
		json: {
			tokens: [
				"ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
				"untrn",
			],
			chainId: "neutron-1",
			dateRange: "D7",
		},
	};

	const tokenPriceQuery = useQuery({
		queryKey: [QueriesID.get.tokenPrice],
		queryFn: () => getTokenPrice(tokenPriceParam),
		refetchOnWindowFocus: true,
	});

	const tokenPrice = tokenPriceQuery.data
		? { ...tokenPriceQuery.data }
		: INITIAL_TOKEN_PRICE;

	return {
		state: {
			tokenPrice,
			isLoading: tokenPriceQuery.isLoading,
		},
	};
}
