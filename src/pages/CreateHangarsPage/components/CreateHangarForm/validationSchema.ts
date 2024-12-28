import * as Yup from "yup";
import { validationInfo } from "../../../../constants";
import { ValidationMessagesService } from "../../../../utils";

export const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.max(
			ValidationMessagesService.maxCharacters(),
			ValidationMessagesService.getMaximumCharactersMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),

	airportIdentifier: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),

	price: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.required(ValidationMessagesService.getRequiredMessage()),

	width: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.test('isValidNumber', 'The width must be greater than 10 and less than 250.', value => {
			if(!value) return true
				const number = parseInt(value, 10);
				return number >= 10 && number <= 250;
		}),
	length: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		).test('isValidNumber', 'The length must be greater than 10 and less than 250.', value => {
			if(!value) return true
				const number = parseInt(value, 10);
				return number >= 10 && number <= 250;
		}),
	
	doorWidth: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.test('isValidNumber', 'The width must be greater than 10 and less than 250.', value => {
		if(!value) return true
			const number = parseInt(value, 10);
			return number >= 10 && number <= 250;
		}),

	doorHeight: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.test('isValidNumber', 'The height must be greater than 10 and less than 50.', value => {
			if(!value) return true
				const number = parseInt(value, 10);
				return number >= 10 && number <= 50;
		}),

	vacancyStartDate: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),
	vacancyEndDate: Yup.string().required(
		ValidationMessagesService.getRequiredMessage()
	),

	photo: Yup.mixed()
		.required(ValidationMessagesService.getRequiredMessage())
		.test(
		"FILE_SIZE",
		ValidationMessagesService.getMaxFileSizeMessage(),
		(value: Yup.AnyObject) =>
			!(value.size > ValidationMessagesService.getMaxFileSize())
		)
		.test(
			"FILE_FORMAT",
			ValidationMessagesService.getAvailableFileFormatsMessage(),
			(value: Yup.AnyObject) =>
				value.type === "image/jpeg" || value.type === "image/jpg"
		),
});
