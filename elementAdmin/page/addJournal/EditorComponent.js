import TextEditor from './EditorComponents/TextEditor';
import Title from './EditorComponents/Title';
import SubTitle from './EditorComponents/SubTitle';
import Divider from './EditorComponents/Divider';
import FullImage from './EditorComponents/FullImage';
import Grid from './EditorComponents/Grid';
import GridButton from './EditorComponents/GridButton';
import DoubleImage from './EditorComponents/DoubleImage';

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
