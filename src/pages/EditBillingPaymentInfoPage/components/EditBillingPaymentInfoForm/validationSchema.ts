import * as Yup from "yup";
import { validationInfo } from "../../../../constants";
import { ValidationMessagesService } from "../../../../utils";

export const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, ValidationMessagesService.getMinimumCharactersMessage())
		.max(60, ValidationMessagesService.getMaximumCharactersMessage())
		.required(ValidationMessagesService.getRequiredMessage()),
	lastName: Yup.string()
		.min(2, ValidationMessagesService.getMinimumCharactersMessage())
		.max(60, ValidationMessagesService.getMaximumCharactersMessage())
		.required(ValidationMessagesService.getRequiredMessage()),
	email: Yup.string()
		.matches(
			validationInfo.emailRegExp,
			ValidationMessagesService.getValidateEmailMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	phone: Yup.string()
		.matches(
			validationInfo.phoneRegex,
			ValidationMessagesService.getValidatePhoneMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	country: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	state: Yup.string(),
	city: Yup.string(),
	zipCode: Yup.string()
		.min(5)
		.max(5)
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	address: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	businessName: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
});
