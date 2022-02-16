import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Button from '@/components/CustomButtons/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getOrientation } from 'get-orientation/browser';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Div } from 'component';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import imagine3 from '@/assets/img/black_square.png';
import { getCroppedImg, getRotatedImage } from './canvasUtils';

import style from './styles';

const useStyles = makeStyles(style);

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

function FormDialog3(props) {
  const { onUpload, i } = props;
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(0.4);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles(style);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageSrc(null);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      onUpload(croppedImage);
      setCroppedImage(croppedImage);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      <Button simple color="primary" onClick={handleClickOpen}>
        <Div pointer>
          <CloudUploadIcon style={{ width: '30px', height: '30px' }} />
          <p>Upload Photo</p>
        </Div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={!!imageSrc}
        maxWidth="lg"

      >
        <DialogTitle id="form-dialog-title">
          <Div width="100%">
            Upload Image for Journal
          </Div>
        </DialogTitle>
        <DialogContent>

          <Div width="100%">
            {imageSrc ? (
              <div style={{ width: '100%', height: '100% ' }}>

                <div className={classes.cropContainer}>

                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    cropSize={{ width: 990, height: 540 }}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    minZoom={0.4}
                    restrictPosition={false}
                  />
                </div>
                <div className={classes.controls}>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={0.4}
                      max={2}
                      step={0.025}
                      aria-labelledby="Zoom"
                      className={classes.slider}
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
                      Rotation
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={0.5}
                      aria-labelledby="Rotation"
                      className={classes.slider}
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </div>
                </div>
              </div>
            ) : <input type="file" onChange={onFileChange} accept="image/*" /> }
          </Div>
        </DialogContent>
        <DialogActions>
          <Div width="100%" row>
            <Div width="300px" horizontal="at" row>
              <Button onClick={handleClose} color="transparent">
                Cancel
              </Button>
              <Button onClick={showCroppedImage} color="primary">
                Upload
              </Button>
            </Div>
          </Div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog3;
