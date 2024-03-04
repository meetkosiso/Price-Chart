import moment from "moment";
import { TokenPriceResponse } from "../api/token-price";
import { Chart as ChartJS, registerables } from "chart.js";

import { TokenSeries } from "../api/token-price";

type Dataset = {
	data: number[];
	label: string;
	backgroundColor: string;
	borderColor: string;
	borderWidth: number;
};

type Chart = {
	labels: string[];
	datasets: Dataset[];
};

function normaliseTokenPriceToChart(
	atomTokenPrice: TokenSeries[],
	ntrnTokenPrice: TokenSeries[]
): Chart {
	return {
		labels: atomTokenPrice.map((label) =>
			moment(label.time * 1000).format("YYYY-MM-DD HH:mm")
		),
		datasets: [
			{
				label: "$ATOM",
				backgroundColor: "red",
				borderColor: "red",
				borderWidth: 1,
				data: atomTokenPrice.map((data) => data.value),
			},

			{
				label: "$NTRN",
				backgroundColor: "blue",
				borderColor: "blue",
				borderWidth: 1,
				data: ntrnTokenPrice.map((data) => data.value),
			},
		],
	};
}

export function usePriceChart(tokenPrice: TokenPriceResponse) {
	ChartJS.register(...registerables);

	const atomTokenPrice =
		tokenPrice[
			"ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
		];
	const untrnTokenPrice = tokenPrice.untrn;

	const atomTokenPriceChart = atomTokenPrice.series;
	const utrnTokenPriceChart = untrnTokenPrice.series;

	const tokenPrices = normaliseTokenPriceToChart(
		atomTokenPriceChart,
		utrnTokenPriceChart
	);

	return {
		tokenPrices,
		atomMinPrice: atomTokenPrice.minValue,
		atomMaxPrice: atomTokenPrice.maxValue,
		atomAveragePrice: (atomTokenPrice.maxValue + atomTokenPrice.minValue) / 2,
		untrnMinPrice: untrnTokenPrice.minValue,
		unturnMaxPrice: untrnTokenPrice.maxValue,
		unturnAveragePrice:
			(untrnTokenPrice.minValue + untrnTokenPrice.maxValue) / 2,
	};
}
