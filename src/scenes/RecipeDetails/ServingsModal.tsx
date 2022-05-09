import React from "react";
import { StyleSheet } from "react-native";
import {
	BottomSheet,
	Button,
	ButtonProps,
	Input,
	ListItem,
} from "react-native-elements";

interface ServingsModalProperties {
	initialServings: number;
	currentServings: number;
	isVisible: boolean;
	onClose: (servings: number) => void;
}

export const ServingsModal: React.FC<ServingsModalProperties> = ({
	initialServings,
	currentServings,
	isVisible,
	onClose,
}: ServingsModalProperties) => {
	const [servings, setServings] = React.useState<number>(initialServings);

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
				onClose(initialServings);
			},
			type: "outline",
		},
		{
			title: "Cancel",
			containerStyle: { backgroundColor: "orange" },
			titleStyle: { color: "white" },
			onPress: () => {
				setServings(currentServings);
				onClose(currentServings);
			},
			type: "outline",
		},
		{
			title: "Confirm",
			containerStyle: { backgroundColor: "green" },
			titleStyle: { color: "white" },
			onPress: () => {
				setServings(servings);
				onClose(servings);
			},
			type: "outline",
		},
	];

	return (
		<BottomSheet
			isVisible={isVisible}
			containerStyle={styles.bottomSheetContainer}
			modalProps={{
				onRequestClose: () => onClose(servings),
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
});
