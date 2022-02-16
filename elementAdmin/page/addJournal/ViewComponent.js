import TextEditor from './ViewsComponets/TextEditor';
import SubTitle from './ViewsComponets/SubTitle';
import Divider from './ViewsComponets/Divider';
import FullImage from './ViewsComponets/FullImage';
import Grid from './ViewsComponets/Grid';
import GridButton from './ViewsComponets/GridButton';
import DoubleImage from './ViewsComponets/DoubleImage';
import Title from './ViewsComponets/Title';

export default {
  Title: ({ contain, setEditingContain }) => <Title contain={contain} setEditingContain={setEditingContain} />,
  'Sub Title': ({ contain, setEditingContain }) => <SubTitle contain={contain} setEditingContain={setEditingContain} />,
  Divider: ({ contain, setEditingContain }) => <Divider contain={contain} setEditingContain={setEditingContain} />,
  'Text Editor': ({ contain, setEditingContain }) => <TextEditor contain={contain} setEditingContain={setEditingContain} />,
  'Full Image': ({ contain, setEditingContain }) => <FullImage contain={contain} setEditingContain={setEditingContain} />,
  'Image with Text': ({ contain, setEditingContain }) => <Grid contain={contain} setEditingContain={setEditingContain} />,
  'Image with Text and Button': ({ contain, setEditingContain }) => <GridButton contain={contain} setEditingContain={setEditingContain} />,
  'Double Image': ({ contain, setEditingContain }) => <DoubleImage contain={contain} setEditingContain={setEditingContain} />,
};
