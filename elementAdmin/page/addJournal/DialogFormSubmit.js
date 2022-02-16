import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { redux } from 'component';
import FormAddSurvey from '@/elementAdmin/Forms/AddArticle';
import Buttom from '@/components/CustomButtons/Button';

const elementLangue = ['name', 'description'];
const elementsList = ['weekTime', 'badgeColor'];

export default function FormDialog2({
  open = false, handleClose, submit, articleData
}) {
  const programStructure = {
    langue: articleData.langue || '',
    time: 0,
    title: articleData.title || '',
    subtitle: '',
    description: '',
    category: '',
    tags: [],
  };

  const formDataMaster = useState(programStructure);
  const [data, setSata] = formDataMaster;
  const [{ curentLanguage, globalSettings }] = redux();

  const onSubmit = () => {
    submit(data);
  };

  React.useEffect(() => {
    const programStructure = {
      langue: articleData.langue || '',
      time: articleData.time || 0,
      title: articleData.title || '',
      subtitle: articleData.subtitle || '',
      description: articleData.description || '',
      category: articleData.category || '',
      tags: articleData.tags || [],
    };

    setSata(programStructure);
  }, [articleData]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ paddingLeft: '40px', paddingRight: '40px' }}>Add Journal Article</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            Here is a descriptive text that defines very well what it means to add a survey.
          </DialogContentText>
          <FormAddSurvey
            language={curentLanguage}
            // submit={() => console.log('submit')}
            globalSettings={globalSettings}
            formDataMaster={formDataMaster}
            elementsList={elementsList}
            elementLangue={elementLangue}
            buttonChild={<div />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
