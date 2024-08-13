import sass from "./SearchHangars.module.scss";
import { FC } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../../hooks";
import { setSearchInfo } from "../../../../../../redux/store";
import { GNPRoutes } from "../../../../../../router";
import { Search } from "../../../../../../icons";
import { DateRange, IconButton, SearchInput } from "../../../../../../components";
import { SearchHangarsValues } from "../../../../../../d";
import { validationSchema } from "./validationSchema";

const initialValues: SearchHangarsValues = {
	from: "",
	to: "",
	identifier: "",
};

export const SearchHangars: FC = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();

	const onSubmit = async (values: SearchHangarsValues) => {
		console.log(values, 'xxxxx')
		dispatch(
			setSearchInfo({
				info: "searchFrom",
				value: values.from,
			})
		);
		dispatch(
			setSearchInfo({
				info: "searchTo",
				value: values.to,
			})
		);
		dispatch(
			setSearchInfo({
				info: "identifier",
				value: values.identifier,
			})
		);
		navigation(GNPRoutes.searchHangars);
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<div className={sass.searchWrapper}>
			<form onSubmit={formik.handleSubmit} className={sass.form}>
				<p className={sass.formTitle}>Search By Hangars</p>
				<div className={sass.formBlock}>
					<div className={sass.inputs}>
						<DateRange
							style={{ flexBasis: "70%" }}
							formik={formik}
							startName={"from"}
							endName={"to"}
						/>
						<SearchInput
							className={sass.searchInput}
							placeholder='Airport ident'
							name="identifier"
							formik={formik}
							icon={<Search />}
						/>
					</div>
				</div>
					<IconButton
						style={{ maxHeight: 48, flexBasis: "30%" }}
						type="submit"
						text={"Search"}
						icon={<Search />}
					/>

			</form>
		</div>
	);
};
