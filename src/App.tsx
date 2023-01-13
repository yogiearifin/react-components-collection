import './App.css';
import { DragAndDropFileUpload } from './components/dragAndDropFileUpload';
import { MultiRangeSlider } from './components/multiRangeSlider';
import { useState } from 'react';

function App() {
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const [fileInfos, setFileInfos] = useState<File[]>([]);
  return (
    <div>
      <h1>Yogie's React Components Collection</h1>
      <h2>Browse components folder and import the component(s) here to preview it</h2>
      <div>
        <h3>Put the Component(s) Here</h3>
        <div>
          <MultiRangeSlider min={ 0 } max={ 100 } onChange={ ({ min, max }: { min: number; max: number; }) => {
            console.log(`min is ${ min }, max is ${ max }`);
          } } />
          <DragAndDropFileUpload fileInfos={ fileInfos } setFileInfos={ setFileInfos } previewImage={ previewImage } setPreviewImage={ setPreviewImage } />
        </div>
      </div>
    </div>
  );
}

export default App;
