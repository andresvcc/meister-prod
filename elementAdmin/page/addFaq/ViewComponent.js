import TextEditor from './ViewsComponets/TextEditor';
import FullImage from './ViewsComponets/FullImage';
import Grid from './ViewsComponets/Grid';
import DoubleImage from './ViewsComponets/DoubleImage';

export default {
  'Text Editor': ({ contain, setEditingContain }) => <TextEditor contain={contain} setEditingContain={setEditingContain} />,
  'Full Image': ({ contain, setEditingContain }) => <FullImage contain={contain} setEditingContain={setEditingContain} />,
  'Image with Text': ({ contain, setEditingContain }) => <Grid contain={contain} setEditingContain={setEditingContain} />,
  'Double Image': ({ contain, setEditingContain }) => <DoubleImage contain={contain} setEditingContain={setEditingContain} />,
};
