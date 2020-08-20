import React, { useState, useRef } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Button,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { THEME } from '../theme';
import { addPost } from '../store/actions/post';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const imgRef = useRef();

	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			text: text,
			img: imgRef.current,
			booked: false,
		};
		dispatch(addPost(post));
		navigation.navigate('Main');
	};

	const photoPickHandler = (uri) => {
		imgRef.current = uri;
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ScrollView>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Add new post</Text>
					<TextInput
						style={styles.textArea}
						placeholder="Input text"
						value={text}
						onChangeText={setText}
						multiline
					/>
					<PhotoPicker onPick={photoPickHandler} />
					<Button
						title="Create post"
						color={THEME.MAIN_COLOR}
						onPress={saveHandler}
						disabled={!text}
					/>
				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

CreateScreen.navigationOptions = ({ navigation }) => ({
	headerTitle: 'Create Post',
	headerLeft: (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title="Toggle Drawer"
				iconName="ios-menu"
				onPress={() => navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	),
});

const styles = StyleSheet.create({
	wrapper: {
		padding: 10,
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'open-regular',
		marginVertical: 10,
	},
	textArea: {
		padding: 10,
		marginBottom: 10,
	},
});
