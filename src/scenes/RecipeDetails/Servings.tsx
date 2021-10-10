import React from "react";
import {
	Keyboard,
	ScrollView,
	StyleProp,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from "react-native";
import {
	BottomSheet,
	Button,
	ButtonProps,
	Input,
	ListItem,
	Text,
} from "react-native-elements";

interface ServingsProperties {
	initialServings: number;
	isVisible: boolean;
	onPress: (servings?: number) => void;
}

export const Servings: React.FC<ServingsProperties> = ({
	initialServings,
	isVisible,
	onPress,
}: ServingsProperties) => {
	const [servings, setServings] = React.useState<number>(initialServings);
	// const [isKeyboardVisible, setIsKeyboardVisible] =
	// 	React.useState<boolean>(false);

	// React.useEffect(() => {
	// 	const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
	// 		setIsKeyboardVisible(true);
	// 	});
	// 	const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
	// 		setIsKeyboardVisible(false);
	// 	});

	// 	return () => {
	// 		showSubscription.remove();
	// 		hideSubscription.remove();
	// 	};
	// }, []);

	// const servingsRange = React.useMemo(
	// 	() =>
	// 		[...new Array(5).keys()].map((value) => ({
	// 			label: (value + 1).toString(),
	// 			value: value + 1,
	// 		})),
	// 	[],
	// );

	const utilityButtons: ButtonProps[] = [
		{
			title: "Reset",
			containerStyle: { backgroundColor: "red" },
			titleStyle: { color: "white" },
			onPress: () => {
				setServings(initialServings);
				onPress(initialServings);
			},
			type: "outline",
		},
		{
			title: "Cancel",
			containerStyle: { backgroundColor: "orange" },
			titleStyle: { color: "white" },
			onPress: () => {
				setServings(servings);
				onPress(servings);
			},
			type: "outline",
		},
		{
			title: "Confirm",
			containerStyle: { backgroundColor: "green" },
			titleStyle: { color: "white" },
			onPress: () => {
				setServings(servings);
				onPress(servings);
			},
			// icon: <AppIcon name={isKeyboardVisible ? "arrow-down" : "arrow-right"} />,
			type: "outline",
		},
	];

	return (
		<>
			<Text style={styles.servingsLabel}>
				Dosi per <Text style={styles.servingsText}>{servings}</Text> persone
			</Text>

			<BottomSheet
				isVisible={isVisible}
				containerStyle={styles.bottomSheetContainer}
				modalProps={{
					onRequestClose: () => onPress(servings),
				}}
			>
				<ListItem>
					<ListItem.Content style={styles.servingsInputContainer}>
						<Input
							placeholder="Numero di persone "
							keyboardType="numeric"
							onChangeText={(text) => {
								if (Number.isInteger(text)) {
									setServings(Number.parseInt(text, 10));
								} else {
									// TODO: handle error message and validation
									setServings(initialServings);
								}
							}}
							// style={styles.servingTextInput}
						/>
					</ListItem.Content>
				</ListItem>

				{/* <ScrollView style={styles.servingsList}>
					{servingsRange.map(({ label, value }, index) => (
						<ListItem
							key={index}
							onPress={() => {
								setServings(value);
								onPress(servings);
							}}
						>
							<ListItem.Content>
								<ListItem.Title>{label}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					))}
				</ScrollView> */}

				{utilityButtons.map((props, index) => (
					<Button key={index} {...props} />
				))}
			</BottomSheet>
		</>
	);
};

const styles = StyleSheet.create({
	servingsInputContainer: {
		backgroundColor: "white",
	},
	bottomSheetContainer: {
		backgroundColor: "rgba(0.5, 0.25, 0, 0.8)",
	},
	servingsList: { flexGrow: 0 },
	servingsLabel: { fontSize: 20, padding: 3 },
	servingsText: { fontSize: 24 },
});
