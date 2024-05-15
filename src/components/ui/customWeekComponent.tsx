import { endOfWeek, isWithinInterval, startOfWeek } from "date-fns";

import { DayPicker, Row, RowProps } from "react-day-picker";
// Basically this only returns a single Row with the days of the current week
export default function CurrentWeekRow(props: RowProps) {
	const isDateInCurrentWeek = (dateToCheck: Date) => {
		const today = new Date();
		const start = startOfWeek(today);
		const end = endOfWeek(today);
		return isWithinInterval(dateToCheck, { start, end });
	};
	const isNotCurrentWeek = props.dates.every(
		(date) => !isDateInCurrentWeek(date)
	);
	if (isNotCurrentWeek) return <></>;
	return <Row {...props} />;
}

// const Dashboard = () => {
// 	return (
// 		<>
// 			<div>
// 				<div>
// 					<DayPicker
// 						components={{ Row: CurrentWeekRow }}
// 						showOutsideDays
// 						mode="single"
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	);
// };
