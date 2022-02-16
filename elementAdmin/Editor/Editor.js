import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import {
  EditorState, convertToRaw, convertFromRaw, Editor as DF
} from 'draft-js';
// slides pour la mettre horizontal
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// components
import Div from '@/components/Div/Div';

// import react-draft-wysiwyg
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const MyEditor = () => {
  // fonction pour importer des images

  // states
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // ajout de texte
  const onEditorStateChange = (editorState) => { setEditorState(editorState); };

  const textConvert = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  );

  const textReturn = EditorState.createWithContent(
    convertFromRaw(JSON.parse(textConvert))
  );

  return (
    <div className="MyEditor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />

      <Div>
        <DF editorState={textReturn} readOnly />
      </Div>

      <div>
        <pre>{JSON.stringify(editorState, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MyEditor;

// <DF editorState={textReturn} readOnly />
