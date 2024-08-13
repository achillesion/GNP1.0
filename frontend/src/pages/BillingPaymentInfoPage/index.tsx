import sass from "./BillingPaymentInfoPage.module.scss";
import { FC, useEffect } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppState } from "../../hooks";
import {
	closeModal,
	deletePaymentInfo,
	fetchPaymentInfo,
	openModal,
	setPaymentMethod,
} from "../../redux/store";
import { GNPRoutes } from "../../router";
import { getPoint } from "../../utils";
import { Delete, Edit, Email, Location, Phone, Plus } from "../../icons";
import { AccentButton, DeleteModal, Divider, Loader } from "../../components";
import { BillingCard } from "./components";
import PaypalLogoPng from "../../images/payment/paypal.png";
import PaypalLogoWebp from "../../images/payment/paypal.webp";

export const BillingPaymentInfoPage: FC = () => {
	const { payment, entityController } = useAppState();
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const point = getPoint(pathname);

	useEffect(() => {
		dispatch(fetchPaymentInfo());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			payment: payment.payment,
		},
		onSubmit: () => {},
	});

	const handleChangePayment = (event: RadioChangeEvent) => {
		dispatch(setPaymentMethod(event.target.value));
		formik.handleChange(event);
	};

	const handleDelete = async () => {
		const deleteResponse = await dispatch(
			deletePaymentInfo(payment.paymentInfo?.id!)
		);

		if (deleteResponse.type === "deletePaymentInfo/fulfilled") {
			dispatch(closeModal());
		}
	};

	return (
		<>
			<div className={sass.wrapper}>
				{point === GNPRoutes.billingPaymentInfo ? (
					<>
						<div className={sass.top}>
							<h2 className={sass.title}>Billing & Payment Info</h2>
							<div className={sass.divider}>
								<Divider />
							</div>
						</div>
						<div className={sass.billingBody}>
							<div className={sass.billingCard}>
								<BillingCard
									title="Billing Info"
									action={
										<>
											{payment.paymentInfo ? (
												<>
													{!payment.isLoading && (
														<div className={sass.actionsWrapper}>
															<Link
																className={sass.edit}
																to={`${GNPRoutes.account}/${GNPRoutes.billingPaymentInfo}/${GNPRoutes.edit}`}
															>
																<Edit />
																<span className={sass.underline} />
															</Link>
															<button onClick={() => dispatch(openModal())}>
																<Delete />
															</button>
														</div>
													)}
												</>
											) : (
												<>
													{!payment.isLoading && (
														<Link
															className={sass.edit}
															to={`${GNPRoutes.account}/${GNPRoutes.billingPaymentInfo}/${GNPRoutes.create}`}
														>
															<Plus />
														</Link>
													)}
												</>
											)}
										</>
									}
								>
									<>
										{payment.isLoading ? (
											<Loader />
										) : payment.paymentInfo ? (
											<div>
												<p className={sass.userName}>
													{`${payment.paymentInfo?.firstName} ${payment.paymentInfo?.lastName}`}
												</p>
												<ul className={sass.infoList}>
													<li className={sass.infoItem}>
														<Email />
														<p>{payment.paymentInfo?.email}</p>
													</li>
													<li className={sass.infoItem}>
														<Location />
														<p>{payment.paymentInfo?.city}</p>
													</li>
													<li className={sass.infoItem}>
														<Phone />
														<p>{payment.paymentInfo?.phone}</p>
													</li>
												</ul>
											</div>
										) : (
											<p>You can create payment info</p>
										)}
									</>
								</BillingCard>
							</div>
							<div className={sass.billingCard}>
								<BillingCard title={"Payment Info"}>
									<div>
										<div className={sass.formBody}>
											<label className={sass.label} htmlFor="paypal">
												<Radio
													onChange={handleChangePayment}
													checked={formik.values.payment === "paypal"}
													id="paypal"
													name="payment"
													value="paypal"
												/>
												<picture>
													<source
														width={32}
														height={32}
														srcSet={PaypalLogoWebp}
														type="image/webp"
													/>
													<source
														width={32}
														height={32}
														srcSet={PaypalLogoPng}
														type="image/png"
													/>
													<img
														width={32}
														height={32}
														src={PaypalLogoPng}
														alt="PayPal Logo"
														loading="lazy"
													/>
												</picture>
												PayPal
												<span className={sass.default}>Default</span>
											</label>
											<label className={sass.label} htmlFor="offline">
												<Radio
													onChange={handleChangePayment}
													checked={formik.values.payment === "offline"}
													id="offline"
													name="payment"
													value="offline"
												/>
												Offline
											</label>
										</div>
										<div className={sass.addNewCard}>
											<div>
												<AccentButton text={"Add New card"} variant="primary" />
											</div>
										</div>
									</div>
								</BillingCard>
							</div>
							<DeleteModal
								isOpen={entityController.isOpenDeleteModal}
								onDelete={handleDelete}
								isDeleting={payment.isDeletingLoading}
							/>
						</div>
					</>
				) : (
					<>
						<Outlet />
					</>
				)}
			</div>
		</>
	);
};
