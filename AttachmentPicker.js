import {Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ModalPicker from './ModalPicker';

export const PickInModal = ModalPicker;

export class AttachmentPicker {
  constructor(
    DocumentPickerOptions,
    GalleryPickerOptions,
    VideoPickerOptions,
    PhotoPickerOptions,
  ) {
    this.DocumentPickerOptions = DocumentPickerOptions;
    this.GalleryPickerOptions = GalleryPickerOptions;
    this.VideoPickerOptions = VideoPickerOptions;
    this.PhotoPickerOptions = PhotoPickerOptions;
  }

  pickGallery = () => {
    return new Promise((resolve, reject) => {
      if (!this.GalleryPickerOptions) {
        this.GalleryPickerOptions = {};
      }
      launchImageLibrary(this.GalleryPickerOptions, result => {
        if (result.didCancel) {
          reject(new Error('Action pickGallery cancelled!'));
        } else {
          let files = result.assets.map(file => {
            return {
              uri: Platform.select({
                android: file.uri,
                ios: decodeURI(file.uri),
              }),
              filename: file.fileName,
              type: file.type
            };
          });
          resolve({
            files: files,
            original: result,
          });
        }
      });
    });
  };

  makePhoto = () => {
    if (!this.PhotoPickerOptions) {
      this.PhotoPickerOptions = {
        mediaType: 'photo',
      };
    }
    return this.pickCamera(this.PhotoPickerOptions);
  };

  makeVideo = () => {
    if (!this.VideoPickerOptions) {
      this.VideoPickerOptions = {
        mediaType: 'video',
      };
    }
    return this.pickCamera(this.VideoPickerOptions);
  };

  pickCamera = params => {
    return new Promise((resolve, reject) => {
      launchCamera(params, result => {
        if (result.errorCode) {
          reject(new Error(result.errorCode));
          return;
        }
        if (result.didCancel) {
          reject(new Error('Action pickCamera cancelled!'));
          return;
        } else {
          let files = result.assets.map(file => {
            return {
              uri: Platform.select({
                android: file.uri,
                ios: decodeURI(file.uri),
              }),
              filename: file.fileName,
              type: file.type
            };
          });
          resolve({
            files: files,
            original: result,
          });
        }
      });
    });
  };

  pickFiles = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.DocumentPickerOptions) {
          this.DocumentPickerOptions = {
            presentationStyle: 'fullScreen',
            copyTo: 'cachesDirectory',
            allowMultiSelection: true,
          };
        }
        const result = await DocumentPicker.pick(this.DocumentPickerOptions);
        let files = result.map(file => {
          return {
            uri: Platform.select({
              android: file.fileCopyUri,
              ios: decodeURI(file.uri),
            }),
            filename: file.name,
            type: file.type
          };
        });
        resolve({
          files: files,
          original: result,
        });
      } catch (e) {
        console.log(e);
        reject(new Error('Action pickFiles cancelled!'));
      }
    });
  };
}
