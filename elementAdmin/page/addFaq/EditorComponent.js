import TextEditor from './EditorComponents/TextEditor';
import FullImage from './EditorComponents/FullImage';
import Grid from './EditorComponents/Grid';
import DoubleImage from './EditorComponents/DoubleImage';

export default {
  'Text Editor': ({ contain, setEditingContain }) => <TextEditor contain={contain} setEditingContain={setEditingContain} />,
  'Full Image': ({ contain, setEditingContain }) => <FullImage contain={contain} setEditingContain={setEditingContain} />,
  'Image with Text': ({ contain, setEditingContain }) => <Grid contain={contain} setEditingContain={setEditingContain} />,
  'Double Image': ({ contain, setEditingContain }) => <DoubleImage contain={contain} setEditingContain={setEditingContain} />,
};
