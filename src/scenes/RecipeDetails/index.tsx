import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	SectionList,
	StyleSheet,
	View,
} from "react-native";
import {
	Icon,
	Image,
	ListItem,
	Tab,
	TabView,
	Text,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

import { AppIcon } from "../../components/AppIcon";
import Ingredient from "../../types/Ingredient";
import { Difficulty } from "../../types/Recipe";
import { RootStackParameterList } from "../../types/RootStackParameterList";

type RecipeDetailsNavigationProperties = StackNavigationProp<
	RootStackParameterList,
	"RecipeDetails"
>;

type RecipeDetailsRouteProp = RouteProp<
	RootStackParameterList,
	"RecipeDetails"
>;

type RecipeDetailsProperties = {
	navigation: RecipeDetailsNavigationProperties;
	route: RecipeDetailsRouteProp;
};

export const RecipeDetails: React.FC<RecipeDetailsProperties> = ({
	route,
	navigation,
}: RecipeDetailsProperties) => {
	// Route params

	const { recipe } = route.params;

	// Component state

	const [servings, setServings] = useState<number>(recipe?.serving);
	const [currentTab, setCurrentTab] = useState<number>(0);

	useEffect(() => {
		if (!recipe) return;

		navigation.setOptions({ title: recipe.name });
	}, [navigation, recipe]);

	// Memoized data

	const servingsRange = useMemo(
		() =>
			[...new Array(20).keys()].map((value) => ({
				label: (value + 1).toString(),
				value: value + 1,
			})),
		[],
	);

	const mainData: {
		icon?: JSX.Element;
		iconName?: string;
		label: string;
		content: string | JSX.Element;
	}[] = useMemo(
		() => [
			{
				icon: (
					<View style={styles.flexRow}>
						{[...new Array(3).keys()].map((value) => (
							<AppIcon
								name={value < recipe.difficulty ? "star" : "star-o"}
								key={value}
							/>
						))}
					</View>
				),
				label: "Difficoltà",
				content: Difficulty[recipe.difficulty] ?? "",
			},
			{
				icon: <AppIcon name="clock-o" />,
				label: "Tempo di preparazione",
				content: recipe.timing.preparation.time + recipe.timing.preparation.uom,
			},
			...(recipe.timing.waiting
				? [
						{
							icon: <AppIcon name="hourglass-start" />,
							label: "Tempo di attesa",
							content: recipe.timing.waiting.time + recipe.timing.waiting.uom,
						},
				  ]
				: []),
		],
		[recipe.difficulty, recipe.timing.waiting, recipe.timing.preparation],
	);

	const ingredientsData: { title: string; data: Ingredient[] }[] = useMemo(
		() =>
			recipe.ingredients.map((section) => ({
				title: section.showTitle ? section.title : "",
				data: section.ingredients,
			})),
		[],
	);

	// Callbacks

	const mainRecipeInfo = ({
		icon,
		iconName,
		label,
		content,
	}: {
		icon?: JSX.Element;
		iconName?: string;
		label: string;
		content: string | JSX.Element;
	}) => (
		<ListItem>
			{icon && icon}
			{iconName && <AppIcon name={iconName} />}
			<ListItem.Content>
				<ListItem.Title>
					{label}: {content}
				</ListItem.Title>
			</ListItem.Content>
		</ListItem>
	);

	// JSX

	if (!recipe) return <></>;

	return (
		<SafeAreaView style={styles.page}>
			{/* <ScrollView> */}
			<View style={{ ...styles.flexRow, ...styles.titleContainer }}>
				<Text h1 style={styles.title}>
					{recipe.name}
				</Text>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: recipe.imgUri }}
						resizeMode="center"
						style={styles.image}
					/>
				</View>
			</View>
			<View style={{ ...styles.flexRow, ...styles.servings }}>
				<Text style={styles.recipeMainInfo}>Dosi per: </Text>
				<RNPickerSelect
					onValueChange={setServings}
					value={servings}
					items={servingsRange}
					Icon={() => <AppIcon name="chevron-down" />}
					useNativeAndroidPickerStyle={false}
					style={{
						inputIOS: styles.inputIOS,
						inputAndroid: styles.inputAndroid,
					}}
				/>
				<Text style={styles.recipeMainInfo}> persone </Text>
			</View>

			<Tab value={currentTab} onChange={setCurrentTab}>
				<Tab.Item title="Info" />
				<Tab.Item title="Ingredienti" />
				<Tab.Item title="Procedimento" />
			</Tab>

			<TabView value={currentTab} onChange={setCurrentTab}>
				<TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
					<FlatList
						data={mainData}
						renderItem={({ item }) =>
							mainRecipeInfo({
								icon: item?.icon,
								content: item?.content,
								iconName: item?.iconName,
								label: item?.label,
							})
						}
						keyExtractor={(item) => item.label}
					/>
				</TabView.Item>
				<TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
					<SectionList
						sections={ingredientsData}
						keyExtractor={(item, index) => item.name + index}
						renderItem={({ item }) =>
							mainRecipeInfo({
								icon: <Text>{"\u2022"}</Text>,
								content: (item?.quantity ?? "") + (item?.uom ?? ""),
								label: item?.name,
							})
						}
						renderSectionHeader={({ section: { title } }) => (
							<Text>{title}</Text>
						)}
						ListHeaderComponent={
							<Text style={styles.recipeMainInfo}>Ingredienti: </Text>
						}
					/>
				</TabView.Item>
				<TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
					<ScrollView>
						<Text style={styles.recipeMainInfo}>Procedimento: </Text>
						{recipe.steps.map((currentStep, index) => (
							<View key={index}>
								<Text style={styles.step}>{currentStep.step}</Text>
								{currentStep?.imgUri && (
									<Image
										source={{ uri: currentStep.imgUri }}
										resizeMode="center"
										style={styles.stepImage}
									/>
								)}
							</View>
						))}
					</ScrollView>
				</TabView.Item>
			</TabView>
			{/* </ScrollView> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
	},
	titleContainer: {
		backgroundColor: "#ffffff",
	},
	title: {
		width: "50%",
		padding: 10,
	},
	imageContainer: {
		width: "50%",
	},
	image: {
		// TODO: use screen dimension
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
	servings: { padding: 14, display: "flex" },
	recipeMainInfo: { fontSize: 20, padding: 3 },
	flexRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	inputIOS: {
		fontSize: 20,
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "green",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 20,
		// paddingHorizontal: 10,
		// paddingVertical: 8,
		borderWidth: 1,
		borderColor: "blue",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	step: {
		fontSize: 18,
	},
	stepImage: {
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
});
