import React, { FC, useState } from 'react';

import { FiTrash, FiUpload } from 'react-icons/fi';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { v4 as uuidv4 } from 'uuid';

import { COLORS } from '../../constants/colors';

interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
}
interface Images {
  onPhoto: (photos: FileList | null) => void;
}
const MAX_COUNT = 5;
export const ImageUploader: FC<Images> = ({ onPhoto }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fileLimit, setFileLimit] = useState(false);

  const SortablePhoto = SortableElement<{
    photo: Photo;
    onDelete: (photo: Photo) => void;
    photoIndex: number;
  }>(
    ({
      photo,
      onDelete: handleDelete,
      photoIndex,
    }: {
      photoIndex: number;
      photo: Photo;
      onDelete: (photo: Photo) => void;
    }) => {
      return (
        <div className="w-48 col-span-1">
          <div className="relative group">
            {photoIndex === 0 && (
              <div className="absolute bottom-0 right-0 bg-swipesell-slate-900 text-white opacity-80 p-1 rounded-md">
                <span>Це фото головне!</span>
              </div>
            )}
            <img
              alt="photo"
              className="w-full rounded-md object-cover"
              src={photo.src}
            />
            <button
              className={
                'bg-red-500 z-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 transition-opacity opacity-0 group-hover:opacity-100'
              }
              onClick={() => handleDelete(photo)}>
              <span className={'pointer-events-none'}>
                <FiTrash
                  className={'z-0'}
                  onClick={() => handleDelete(photo)}
                />
              </span>
            </button>
          </div>
        </div>
      );
    },
  );

  const SortableGallery = SortableContainer<{
    items: Photo[];
    onDelete: (photo: Photo) => void;
  }>(
    ({
      items,
      onDelete: handleDelete,
    }: {
      items: Photo[];
      onDelete: (photo: Photo) => void;
    }) => {
      return (
        <div className="grid grid-cols-4 gap-x-6 items-center">
          {items.map((photo: Photo, index: number) => (
            <SortablePhoto
              index={index}
              key={index}
              onDelete={handleDelete}
              photo={photo}
              photoIndex={index}
            />
          ))}
        </div>
      );
    },
  );

  const handleDelete = (photo: Photo) => {
    setFileLimit(false);
    setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photo.id));
  };

  const handleSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setPhotos(prevPhotos => {
      const newPhotos = [...prevPhotos];
      newPhotos.splice(newIndex, 0, newPhotos.splice(oldIndex, 1)[0]);
      return newPhotos;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (photos.length + files.length > MAX_COUNT) {
        alert('You can upload up to 5 images');
        return;
      }
      onPhoto(files);
      const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
        id: uuidv4() + index,
        src: URL.createObjectURL(file),
        width: 500,
        height: 500,
      }));
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
  };

  return (
    <div className={'flex flex-row'}>
      <div className="flex items-center justify-center w-1/4 mr-5">
        <label
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          htmlFor="dropzone-file">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload
              className={'mb-2'}
              color={COLORS.slate['100']}
              size={32}
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            disabled={fileLimit}
            id="dropzone-file"
            multiple={true}
            name={'photos'}
            onChange={handleInputChange}
            type="file"
          />
        </label>
      </div>
      <SortableGallery
        axis="xy"
        items={photos}
        onDelete={handleDelete}
        onSortEnd={handleSortEnd}
      />
    </div>
  );
};
