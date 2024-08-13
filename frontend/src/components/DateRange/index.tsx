/* eslint-disable @typescript-eslint/no-unused-vars */
import sass from "./DateRange.module.scss";
import { CSSProperties, FC, FocusEvent, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { FormikValues } from "formik";
import dayjs from "dayjs";
import { useResize } from "../../hooks";
import { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;

type DateRangeProps = {
	formik: FormikValues;
	startName: string;
	endName: string;
	style?: CSSProperties;
	blockOffStartDate?: string;
	blockOffEndDate?: string;
};

export const DateRange: FC<DateRangeProps> = ({
	formik,
	startName,
	endName,
	style,
	blockOffStartDate,
	blockOffEndDate,
}) => {
	const [touchedStart, setTouchedStart] = useState(false);
	const [touchedEnd, setTouchedEnd] = useState(false);

	const windowWidth = useResize();
	const isMobileDatePicker = windowWidth < 630;

	const handleBlurStart = (event: FocusEvent<HTMLElement, Element>) => {
		setTouchedStart(true);
		formik.handleBlur(event);
	};

	const handleBlurEnd = (event: FocusEvent<HTMLElement, Element>) => {
		setTouchedEnd(true);
		formik.handleBlur(event);
	};

	const isErrorStart =  formik.errors[startName];
	const isErrorEnd =  formik.errors[endName];


	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return (
			current &&
			current >= dayjs(blockOffStartDate) &&
			current <= dayjs(blockOffEndDate)
		);
	};

	const handleChangeDatePicker = (
		date: dayjs.Dayjs,
		{ startName, endName }: { startName?: string; endName?: string }
	) => {
		const newDate = new Date(`${date}`).toString();

		if (startName !== undefined) {
			formik.setValues({
				...formik.values,
				[startName]: newDate,
			});
		} else if (endName !== undefined) {
			formik.setValues({
				...formik.values,
				[endName]: newDate,
			});
		}
	};

	useEffect(() => {
		if (formik.values[startName]) {
			formik.setValues({
				...formik.values,
				[startName]: formik.values[startName],
			});
		} else if (formik.values[endName]) {
			formik.setValues({
				...formik.values,
				[endName]: formik.values[startName],
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values[startName], formik.values[endName]]);

	return (
		<div className={sass.wrapper}>
			{isMobileDatePicker ? (
				<div className={sass.mobileWrapper}>
					<DatePicker
						onBlur={handleBlurStart}
						disabledDate={disabledDate}
						placeholder="Start date"
						minDate={dayjs()}
						onChange={(date) => handleChangeDatePicker(date, { startName })}
						style={{ width: "100%", minHeight: 48, ...style }}
						status={isErrorStart && "error"}
						value={
							formik.values[startName] !== ""
								? dayjs(formik.values[startName])
								: null
						}
					/>
					<DatePicker
						placeholder="End date"
						minDate={dayjs()}
						disabledDate={disabledDate}
						onBlur={handleBlurEnd}
						onChange={(date) => handleChangeDatePicker(date, { endName })}
						style={{ width: "100%", minHeight: 48, ...style }}
						status={isErrorEnd && "error"}
						value={
							formik.values[endName] !== ""
								? dayjs(formik.values[endName])
								: null
						}
					/>
				</div>
			) : (
				<>
					<RangePicker
						status={(isErrorStart || isErrorEnd) && "error"}
						minDate={dayjs()}
						disabledDate={disabledDate}
						value={[
							formik.values[startName] !== ""
								? dayjs(formik.values[startName])
								: null,
							formik.values[endName] !== ""
								? dayjs(formik.values[endName])
								: null,
						]}
						onBlur={()=> {
							setTouchedStart(true);
							setTouchedEnd(true);
						}}
						onChange={(dates) => {
							const fromTo = dates?.map((date) =>
								new Date(`${date}`).toString()
							);

							if (fromTo !== undefined) {
								formik.setValues({
									...formik.values,
									[startName]: fromTo[0],
									[endName]: fromTo[1],
								});
							} else {
								formik.setValues({
									...formik.values,
									[startName]: "",
									[endName]: "",
								});
							}
						}}
						style={{ width: "100%", minHeight: 48, ...style }}
					/>
					{(isErrorStart  || isErrorEnd) && (
						<p className={sass.errorTextFrom}>{formik.errors[startName]}</p>
					)}
				</>
			)}
		</div>
	);
};
