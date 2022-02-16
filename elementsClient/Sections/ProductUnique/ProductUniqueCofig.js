const config = {

  photoContainerFull: {
    width: '95%',
    vertical: 'top',
  },
  photoVisible: {
    width: '100%',
    height: '90%',
    row: true,
    horizontal: 'around'
  },
  photoVisibleFull: {
    width: '90%',
    height: '90vw',
    row: true,
    horizontal: 'at'
  },
  photo: {
    style: {
      width: '80%',
      objectFit: 'contain'
    }
  },
  photo2: ({ image, selected }) => ({
    width: [80, 120, 120, 120, 160],
    height: [80, 90, 85, 120, 140],
    style: {
      width: '100%',
      maxHeight: '200px',
      backgroundColor: selected ? '#E4E4E4' : '#EFEEE9',
      objectFit: 'contain'
    }
  }),
  photo3: ({ image, selected, size }) => ({
    width: size > 4 ? [80, 120, 120, 120, 160] : [80, 120, 120, 120, 160],
    height: size > 4 ? [80, 100, 65, 100, 120] : [80, 120, 85, 120, 140],
    style: {
      width: '100%',
      maxHeight: '200px',
      backgroundColor: selected ? '#FFFFFF' : '#E4E4E4',
      objectFit: 'contain'
    }
  }),
  mapPhoto: {
    width: '80%',
    height: 200,
    row: true,
    horizontal: 'at'
  },
  mapPhoto2: {
    width: '100%',
    height: 200,
    row: true,
    horizontal: 'at'
  },
  line1: {
    width: '100%',
    horizontal: 'left',
    row: true,
    style: {
      borderTop: 'solid 1px #d3d3d3',
      borderBottom: 'solid 1px #d3d3d3'
    }
  },
  colorBorder: ({ val, select }) => ({
    style: {
      width: 'calc(2vw + 20px)',
      height: 'calc(2vw + 20px)',
      maxWidth: '30px',
      maxHeight: '30px',
      background: val.colorName === 'transparent' ? 'white' : val.color,
      borderRadius: '50%',
      marginTop: '0.3vw',
      marginRight: 'calc(0.2vw + 8px)',
      marginBottom: '0.3vw',
      border: select ? 'solid 2.5px #33313198' : (val.colorName === 'transparent' ? '1px solid #cdcccc78' : '0.5px solid #ffffff'),
      boxShadow: val.colorName === 'transparent' ? 'rgb(124 139 143 / 78%) 9px 8px 12px -10px inset, rgb(249 249 244 / 82%) 0px 0px 2px 0px' : '#b4b47630 0px 0px 4px 1px',
      filter: val.colorName === 'transparent' ? 'blur(0.4px)' : 'none',
    }
  }),
  line2: {
    width: '100%',
    row: true,
    horizontal: 'at',
  },
  sizesContainer: {
    row: true,
  },
  label: ({ val, select }) => ({
    // indor: true,
    style: {
      marginTop: '0.3vw',
      marginRight: '0.5vw',
      marginBottom: '0.3vw',
      fontWeight: 'bold',
      // fontSize: select ? '1.1vw' : '0.95vw',
      color: select ? 'black' : 'grey'
    }
  }),
  qtyContainer: {
    width: '30%',
    horizontal: 'around',
    row: true,
    style: {
      fontWeight: 'bold'
    }
  },
  qtyBtsup: ({ disable }) => ({
    style: {
      color: disable ? 'grey' : 'black'
    }
  }),
  qtyValue: ({ disable }) => ({
    style: {
      color: disable ? 'grey' : 'black'
    }
  }),
  qtyBtAdd: {
    style: {
      color: 'black'
    }
  },
  submitMotorcycleOrder: {
    width: '100%',
    height: '45px',
    // indor: true,
    style: {
      color: 'white',
      fontWeight: 'bold',
      width: '100%'
    }
  },
  closeMotoDialog: {
    width: '100%',
    height: '40px',
    // indor: true,
    style: {
      background: '#2E5E80',
      color: 'white',
      fontWeight: 'bold'
    }
  },
  sumitButton: (alReadyInBag) => ({
    width: '100%',
    height: '40px',
    style: {
      // background: alReadyInBag ? '#273D48' : '#2E5E80',
      // color: 'white',
      fontWeight: 'bold',
      fontSize: '12px',
      width: '100%',
    }
  }),
  mapDetails: {
    width: '100%',
    vertical: 'top',
    height: 25,
    row: true,
    style: {
      paddingTop: '10px',
      borderBottom: '1px solid #d3d3d3'
    }
  },
};

export default config;
