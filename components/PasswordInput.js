import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    fontSize: theme.typography.fontSize * 1.25,
  },
}));

const PasswordInput = (props) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <OutlinedInput
      type={showPassword ? 'text' : 'password'}
      {...props}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
            tabIndex="-1"
            className={classes.toggleButton}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="1x" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordInput;
