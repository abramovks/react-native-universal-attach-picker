# react-native-universal-attach-picker

Hello. That module is wrapper for **react-native-image-picker** and **react-native-document-picker**
| ![ios](https://media3.giphy.com/media/o57efVTcZvNMypERwd/giphy.gif?cid=790b76117416ca0f8c9552d92131af90b288cddc8b8dbcd8&rid=giphy.gif&ct=g) | ![android](https://media2.giphy.com/media/1jUDzEIAKZLFmm1pNX/giphy.gif?cid=790b761153fd63392c2f2aec0e4c1c58df4c4d11597c88ce&rid=giphy.gif&ct=g) |
|--|--|

Tested with

"react": "17.0.2",

"react-native": "0.66.4",

# Install

**yarn add react-native-universal-attach-picker**

or 

**npm install react-native-universal-attach-picker**

Install dependencies (Check instructions of these packages in their repositories)

**yarn add react-native-image-picker react-native-document-picker**

or 

**npm install react-native-image-picker react-native-document-picker**

Then for iOS

**npx pod-install**

or

**cd ios && pod install**

Then
s
Add the appropriate keys to your Info.plist

    <key>NSPhotoLibraryUsageDescription</key>
    <string>description</string>
    <key>NSCameraUsageDescription</key>
    <string>description</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>description</string>

## Usage

  

    import  React, {useState} from  'react';
    import {Text, View, Button, StyleSheet} from  'react-native';
    
    // import
    import {
        AttachmentPicker,
        PickInModal,
        } from  'react-native-universal-attach-picker';
    	
    // define options for pickers
    // Options for launchImageLibrary of 'react-native-image-picker'
    let  galeryOptions = { 
	    selectionLimit:  2,
	    mediaType:  'mixed',
    };
    
    // Options for launchCamera of 'react-native-image-picker'
    let  VideoOptions = {
	    mediaType:  'video',
    };
    
    // Options for launchCamera of 'react-native-image-picker'
    let  PhotoOptions = {
	    mediaType:  'photo',
    };
    
    // Options for DocumentPicker of 'react-native-document-picker'
    let  filesOptions = {
	    presentationStyle:  'fullScreen',
	    allowMultiSelection:  true,
    };

	// init object
    const  attachmentPicker = new  AttachmentPicker(
	    filesOptions,
	    galeryOptions,
	    VideoOptions,
	    PhotoOptions,
    );
  
	// create functional component
    const  PickAttaches = () => {
	    return (
		    <View>
			    <Button
				    style={{marginTop:  5}}
				    title="Galery"
				    onPress={async () => {
					    const  response = await  attachmentPicker.pickGalery();
					    console.log(response);
				    }}
			    />
			    <View  style={{marginTop:  5}}>
				    <Button
					    title="Files"
					    onPress={async () => {
						    const  response = await  attachmentPicker.pickFiles();
						    console.log(response);
						}}
				    />
				</View>
			    <View  style={{marginTop:  5}}>
				    <Button
					    title="MakePhoto"
					    onPress={async () => {
						    const  response = await  attachmentPicker.makePhoto();
						    console.log(response);
					    }}
				    />
				</View>
		    
			    <View  style={{marginTop:  5}}>
				    <Button
					    title="Make Video"
					    onPress={async () => {
					    const  response = await  attachmentPicker.makeVideo();
					    console.log(response);
					    }}
					 />
				</View>
			    
			    <View  style={{marginTop:  5}}>
				    <PickInModal
					    buttonText="Show modal menu"
					    openButtonStyle={{}}
					    openButtonTextStyle={{}}
					    asButton={true}
					    buttonCancelText="CANCEL"
					    buttons={[
							{
							    label:  'Select from galery',
							    onPress:  async () => {
								    const  response = await  attachmentPicker.pickGalery();
								    console.log(response);
								},
							},
							{
								label:  'Select from files',
								onPress:  async () => {
									const  response = await  attachmentPicker.pickFiles();
									console.log(response);
								},
							},
							{
								label:  'Make photo',
								onPress:  async () => {
									const  response = await  attachmentPicker.makePhoto();
									console.log(response);
								},
							},
				    
						    {
							    label:  'Make video',
							    onPress:  async () => {
								    const  response = await  attachmentPicker.makeVideo();
								    console.log(response);
								},
							},
						]}
					/>
			    </View>
		    </View>
		);
	};
	export  default  PickAttaches;

## Init options

On create object receive 4 params

    const  attachmentPicker = new  AttachmentPicker(
	    DocumentPickerOptions,
	    GaleryPickerOptions,
	    VideoPickerOptions,
	    PhotoPickerOptions,
    );

| № | Name |Description |Default|
|--|--|--|--|
| 1 | DocumentPickerOptions | Options for react-native-document-picker | { presentationStyle:  'fullScreen', copyTo: 'cachesDirectory',allowMultiSelection:  true }; |
| 2 | GaleryPickerOptions | Options for launchCamera of react-native-image-picker | { }; |
| 2 | VideoPickerOptions | Options for launchImageLibrary of react-native-image-picker | { mediaType:  'video' }; |
| 2 | PhotoPickerOptions | Options for launchImageLibrary of react-native-image-picker | { mediaType:  'photo' }; |


## Result
All methods return JSON

    {
	    // arrays of objects
	    files: [
		    {
			    uri: 'file:/// path to file',
			    filename: 'filename.jpg',
			    type: 'image/jpeg'
		    }
	    ],
	    original: [ /* original JSON Object which was returned react-native-document-picker or react-native-image-picker */ ]
    }

## UI components

For convenience, a component **PickInModal** has been created that opens a list of buttons (which can be styled) in a modal window for selection 

## PickInModal Props
| Name | Description | Type | Default | Required |
|--|--|--|--|--|
| buttonText | String |Text for open modal button | Pick the files | No |
| openButtonStyle | style Object | Style for TouchableOpacity of open modal button | {} | No |
| openButtonTextStyle | style Object | Style for text of open modal button | {} | No |
| asButton | bool | Render button as RN Button component. Color props will get from openButtonStyle backgroundColor properties | false | No |
| modalContainerStyle |style Object | Style for main View in Modal component (Fullscreen, transparent) | {} | No |
| modalContentStyle |Style Object | Style for in content View in container (Centerd, not transparent)| {} | No |
| buttons |Array of Objects | List of buttons for render in modal | { label:  'Label for button', onPress: async () => {// OnPress functon for button}}| No |
| pickButtonStyle |style Object | Style for TouchableOpacity for pick button | {} | No |
| pickButtonTextStyle |style Object | Style for text in pick button | {} | No |
| buttonCancelText | string | Text for the last button to close modal | Cancel | No |
