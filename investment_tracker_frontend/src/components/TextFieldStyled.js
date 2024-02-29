import { FormControl, TextField } from '@mui/material';
import { styled } from '@mui/system';

const TextFieldStyled = styled(TextField)`
  && {
    margin-bottom: 16px;

    /* Customize label color */
    label {
      color: #5a287d;
    }

    /* Customize label color when focused */
    .Mui-focused {
      & label {
        color: #5a287d;
      }
    }

    /* Customize underline color when focused */
    .MuiInput-underline:after {
      border-bottom-color: #5a287d;
    }

    /* Customize input text color */
    .MuiInputBase-input {
      color: black;
    }

    .MuiOutlinedInput-root.Mui-focused {
        fieldset {
          border-color: #5a287d; /* Change the outline color when focused */
        }
      }
  }
`;


const StyledFormControl = styled(FormControl)`
  && {
    label {
        color: #5a287d;
      }
      
    /* Customize outline color */
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #5a287d; /* Change the outline color */
      }
    }

    /* Customize outline color when focused */
    .MuiOutlinedInput-root.Mui-focused {
      fieldset {
        border-color: #5a287d; /* Change the outline color when focused */
      }
    }
  }
`;


export {TextFieldStyled, StyledFormControl};
