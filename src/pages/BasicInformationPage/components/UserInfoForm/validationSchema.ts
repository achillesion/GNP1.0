import * as Yup from "yup";
import { validationInfo } from "../../../../constants";
import { ValidationMessagesService } from "../../../../utils";

export const validationSchema = Yup.object().shape({
	name: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.max(
			ValidationMessagesService.maxCharacters(),
			ValidationMessagesService.getMaximumCharactersMessage()
		)
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
	password: Yup.string()
		.min(ValidationMessagesService.getMinPasswordLength())
		.required(ValidationMessagesService.getRequiredMessage()),
	newPassword: Yup.string().min(
		ValidationMessagesService.getMinPasswordLength(),
		ValidationMessagesService.getValidatePasswordLengthMessage()
	),
	confirmPassword: Yup.string()
		.when("newPassword", ([newPassword]) => {
			return newPassword
				? Yup.string()
						.oneOf(
							[Yup.ref("newPassword")],
							ValidationMessagesService.getPasswordsMustmatch()
						)
						.required()
				: Yup.string();
		})
		.min(ValidationMessagesService.getMinPasswordLength()),
	image: Yup.mixed()
		.notRequired()
		.test(
			"FILE_SIZE",
			ValidationMessagesService.getMaxFileSizeMessage(),
			(value: any) =>
				!(value?.size > ValidationMessagesService.getMaxFileSize())
		),
});
