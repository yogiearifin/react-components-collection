import React from 'react';
import style from './index.module.css';

type DragAndDropType = {
  previewImage: string[];
  setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>;
  fileInfos: File[];
  setFileInfos: React.Dispatch<React.SetStateAction<File[]>>;
};

export const DragAndDropFileUpload: React.FC<DragAndDropType> = ({ previewImage, setPreviewImage, fileInfos, setFileInfos }) => {
  const checkIsFileValid = (file: Blob) => {
    return file.type.includes("image") ? true : false;
  };

  const isDisabled = previewImage.length >= 5;
  const handleMultipleImages = (file: FileList | null) => {
    if (file) {
      const dupes = Array.from(file)
        .map((item: File) =>
          fileInfos.filter((items: File) => items.name === item.name)
        )
        .flat();
      const targetFiles: File[] = Array.from(file);
      const selectedFiles: any = [];
      const filteredItem = targetFiles.filter(
        (item: File) => item.size < 2000000 && checkIsFileValid(item)
      );
      if (dupes.length) {
        alert("terdapat duplikat!");
      } else if (previewImage.length + filteredItem.length > 5) {
        alert("maximal 5 file!");
      } else if (
        Array.from(file).filter((item: File) => item.size > 2000000).length
      ) {
        alert("terdapat file dengan ukuran gambar lebih dari 2MB!");
      } else if (filteredItem.length === targetFiles.length) {
        filteredItem.map((file: any) => {
          return selectedFiles.push(URL.createObjectURL(file));
        });
        setPreviewImage([...previewImage, ...selectedFiles]);
        setFileInfos([...fileInfos, filteredItem].flat());
      } else {
        alert("terdapat file yang tidak valid");
      }
    }
  };

  const handleDeleteImages = (index: number, name: string) => {
    setPreviewImage(previewImage.filter((item: string) => item !== name));
    setFileInfos(fileInfos.filter((item: File) => item !== fileInfos[index]));
  };
  return (
    <div
      onDrop={ (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleMultipleImages(e.dataTransfer.files);
      } }
      onDragOver={ (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
      } }
    >
      <div className={ style.fileUploadContainer }>
        <p>Drop you images here or</p>
        <label
          htmlFor="file-upload"
          className={
            isDisabled ? style.fileUploadLabelDisabled : style.fileUploadLabel
          }
        >
          click here
        </label>
        <input
          id="file-upload"
          className={ style.fileUpload }
          type="file"
          multiple
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) =>
            handleMultipleImages(e.target.files)
          }
          onClick={ (e: React.MouseEvent<HTMLInputElement>) =>
            (e.currentTarget.value = "")
          }
          disabled={ isDisabled }
          accept="image/*"
        />
      </div>
      <div className={ style.containerImages }>
        { previewImage.length
          ? previewImage.map((item, index) => {
            return (
              <div key={ index } className={ style.margin1 }>
                <div className={ style.flex + style.previewImageContainer }>
                  <img
                    className={ style.previewImage }
                    src={ item }
                    alt={ `preview ${ index + 1 }` }
                  />
                  <span
                    className={ style.previewImageDelete }
                    onClick={ () => {
                      handleDeleteImages(index, item);
                    } }
                  >
                    X
                  </span>
                </div>
              </div>
            );
          })
          : null }
      </div>
    </div>
  );
};
