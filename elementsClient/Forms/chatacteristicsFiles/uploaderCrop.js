import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
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
import Image from 'next/image';
import Button from '@/components/CustomButtons/Button';
import imagine3 from '@/assets/img/repreres.png';

import { getCroppedImg, getRotatedImage } from './canvasUtils';
import style from './styles';
import SliderCrop from './SliderCrop';

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

function FormDialog5(props) {
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

      // apply rotation if needsaed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };
  const [image, setImage] = useState(0);

  const ImageSizeOrder = [
    {
      id: 0, img: imagine3, height: '380px', width: '350px', top: '60px', left: '100px', name: 'Default'
    },
    //       id: 0, img: imagine3, height: '300px', width: '400px', top: '60px', left: '75px', name: 'Default'
    {
      id: 1, img: imagine3, height: '250px', width: '450px', top: '60px', left: '50px', name: 'Motorcycles'
    },
    {
      // id: 2, img: imagine4, height: '250px', width: '240px', top: '60px', left: '150px', name: 'Helmet aside'
    },
  ];

  return (
    <div>
      <Button variant="outlined" simple color="primary" onClick={handleClickOpen}>
        {`Upload Photo ${i}`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"

      >
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>

        <DialogContent>
          <Div width="100%" row>
            {ImageSizeOrder.map((val, i) => (
              <Div key={`${i + 1}`} onClick={() => setImage(val.id)} style={{ margin: '10px' }}>
                {val.name}
              </Div>
            ))}
          </Div>
          <Div width="100%">
            {imageSrc ? (
              <div style={{ width: '100%', height: '100%' }}>

                <div className={classes.cropContainer} style={{ position: 'absolute', top: 10, width: 'auto' }}>
                  {ImageSizeOrder.map((val, i) => (
                    <Div
                      key={`${i + 1}`}
                      style={{
                        position: 'absolute', top: val.top, left: val.left,
                      }}
                      widht="50%"
                      height="70%"
                    >
                      <Div dev>
                        {image === val.id ? (
                          <Image src={(val && val.img) || '/static/images/notPhoto.png'} alt="..." width="350px" height="250px" />
                        ) : <Div />}
                      </Div>
                    </Div>

                  ))}
                </div>
                <Div style={{ position: 'absolute', top: 174, right: 100 }}>
                  <Image src={imagine3 ?? '/static/images/notPhoto.png'} alt="..." width="400px" height="300px" />
                </Div>
                <div className={classes.cropContainer}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    cropSize={{ width: 400, height: 300 }}
                    // aspect={4 / 3}
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
                    <div style={{ width: '25px' }} />
                    <SliderCrop
                      value={zoom}
                      min={0}
                      max={4}
                      step={0.0025}
                      ariaLabelledby="Zoom"
                      className={classes.slider}
                      onChange={(zoom) => setZoom(zoom)}
                    />
                  </div>
                </div>
                <div className={classes.controls}>
                  <div className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
                      Rotation
                    </Typography>
                    <div style={{ width: '0px' }} />
                    <SliderCrop
                      value={rotation}
                      min={0}
                      max={360}
                      step={0.5}
                      aria-labelledby="Rotation"
                      className={classes.slider}
                      onChange={(rotation) => setRotation(rotation)}
                    />
                  </div>
                </div>
              </div>
            ) : <input type="file" onChange={onFileChange} accept="image/*" /> }
          </Div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="transparent">
            Cancel
          </Button>
          <Button onClick={showCroppedImage} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog5;
