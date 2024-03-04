import { Line } from "react-chartjs-2";
import { useGetSevenDayTokenPrice } from "../providers/TokenPriceProvider";
import { usePriceChart } from "../hooks/usePriceChart";
import { TokenPriceResponse } from "../api/token-price";

export default function WrappedPriceChart() {
	const {
		state: { tokenPrice, isLoading },
	} = useGetSevenDayTokenPrice();

	if (isLoading) {
		return <strong>Loading...</strong>;
	}
	return <PriceChart tokenPrice={tokenPrice} />;
}

function PriceChart({ tokenPrice }: { tokenPrice: TokenPriceResponse }) {
	const {
		tokenPrices,
		atomAveragePrice,
		atomMaxPrice,
		atomMinPrice,
		untrnMinPrice,
		unturnAveragePrice,
		unturnMaxPrice,
	} = usePriceChart(tokenPrice);

	return (
		<div className='price-chart-container'>
			<h2>7 Days Price Chart</h2>
			<div className='price-chart'>
				<div className='price-chart-info'>
					<div className='atom-price-chart-info'>
						<strong>$ATOM</strong>
						<div>Average Price: {atomAveragePrice} </div>
						<div>Max Price: {atomMaxPrice} </div>
						<div>Min Price: {atomMinPrice} </div>
					</div>

					<div className='uturn-price-chart-info'>
						<strong>$NTRN</strong>
						<div>Average Price: {unturnAveragePrice} </div>
						<div>Max Price: {unturnMaxPrice} </div>
						<div>Min Price: {untrnMinPrice}</div>
					</div>
				</div>
				<div className='price-chart-view'>
					<Line
						data={tokenPrices}
						width={700}
						height={650}
						options={{
							maintainAspectRatio: false,
						}}
					/>
				</div>
			</div>
		</div>
	);
}
