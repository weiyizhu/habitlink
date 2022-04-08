import React from 'react';
import {Snackbar} from 'react-native-paper';
import {useUserContext} from '../utils/fn';

const SnackBar = () => {
  const {snackE, setSnackE} = useUserContext();
  return (
    <Snackbar
      visible={snackE !== ''}
      onDismiss={() => {
        setSnackE('');
      }}
    >
      {snackE}
    </Snackbar>
  );
};

export default SnackBar;
