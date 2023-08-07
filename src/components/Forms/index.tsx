import { FormButton } from './FormButton'
import { FormDropdown } from './FormDropdown'
import { FormDropzone } from './FormDropzone'
import { FormRoot } from './FormRoot'
import { FormInputCPF } from './Input/FormInputCPF'
import { FormInputCard } from './Input/FormInputCard'
import { FormInputCheckbox } from './Input/FormInputCheckbox'
import { FormInputCurrency } from './Input/FormInputCurrency'
import { FormInputDate } from './Input/FormInputDate'
import { FormInputEmail } from './Input/FormInputEmail'
import { FormInputMonthYear } from './Input/FormInputMonthYear'
import { FormInputNumber } from './Input/FormInputNumber'
import { FormInputPhone } from './Input/FormInputPhone'
import { FormInputPostalCode } from './Input/FormInputPostalCode'
import { FormInputText } from './Input/FormInputText'
import { FormInputRadioBlock } from './Input/Radio/FormInputRadioBlock'
import { FormInputRadioChoice } from './Input/Radio/FormInputRadioChoice'
import { FormInputRadioInline } from './Input/Radio/FormInputRadioInline'

const Form = {
  Root: FormRoot,
  Button: FormButton,
  Dropdown: FormDropdown,
  Dropzone: FormDropzone,
  Input: {
    Card: FormInputCard,
    Checkbox: FormInputCheckbox,
    CPF: FormInputCPF,
    Currency: FormInputCurrency,
    Date: FormInputDate,
    Email: FormInputEmail,
    MonthYear: FormInputMonthYear,
    Number: FormInputNumber,
    Phone: FormInputPhone,
    PostalCode: FormInputPostalCode,
    Radio: {
      Block: FormInputRadioBlock,
      Inline: FormInputRadioInline,
      Choice: FormInputRadioChoice,
    },
    Text: FormInputText,
  },
}

export default Form
