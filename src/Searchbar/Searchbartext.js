import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions()
export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              setOpen(true);
              setDialogValue({
                title: newValue,
                year: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            setOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              year: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={props.data}
        getOptionLabel={(option) => option.name}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 500 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Free solo dialog"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '30px',
              },
            }}
          />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value,
                })
              }
              label="year"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
