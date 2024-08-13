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
  nNumber: Yup.string().required(
    ValidationMessagesService.getRequiredMessage()
  ),
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
  year: Yup.string().matches(
    validationInfo.numberRegex,
    ValidationMessagesService.getValidateYear()
  ),
});
