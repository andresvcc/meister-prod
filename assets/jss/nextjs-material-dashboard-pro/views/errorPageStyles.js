import { title, whiteColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const errorPageStyles = () => ({
  contentCenter: {
    color: whiteColor,
  },
  title: {
    ...title,
    // fontSize: '13.7em',
    color: whiteColor,
    letterSpacing: '14px',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: '2.25rem',
    marginTop: '0',
    color: whiteColor,
    marginBottom: '8px',
  },
  description: {
    fontSize: '1.125rem',
    marginTop: '0',
    color: whiteColor,
    marginBottom: '8px',
  },
});

export default errorPageStyles;
