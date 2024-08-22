import * as Yup from "yup";
import { ValidationMessagesService } from "../../utils";

export const validationSchema = Yup.object().shape({
	startTime: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	endTime: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	aircraftId: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	payment: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
});
