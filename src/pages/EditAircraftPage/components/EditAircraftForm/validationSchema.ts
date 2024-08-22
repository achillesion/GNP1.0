import * as Yup from "yup";
import { ValidationMessagesService } from "../../../../utils";
import { validationInfo } from "../../../../constants";

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
	homeAirport: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.max(
			ValidationMessagesService.maxCharacters(),
			ValidationMessagesService.getMaximumCharactersMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	model: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.max(
			ValidationMessagesService.maxCharacters(),
			ValidationMessagesService.getMaximumCharactersMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	nNumber: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateNumber()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	make: Yup.string()
		.min(
			ValidationMessagesService.minCharacters(),
			ValidationMessagesService.getMinimumCharactersMessage()
		)
		.max(
			ValidationMessagesService.maxCharacters(),
			ValidationMessagesService.getMaximumCharactersMessage()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
	year: Yup.string()
		.matches(
			validationInfo.numberRegex,
			ValidationMessagesService.getValidateYear()
		)
		.required(ValidationMessagesService.getRequiredMessage()),
});
