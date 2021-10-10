import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	SectionList,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Divider, Image, Text } from "react-native-elements";

import { AppIcon } from "../../components/AppIcon";
import { TabWithContent } from "../../components/TabWithContent";
import Ingredient from "../../types/Ingredient";
import { Difficulty } from "../../types/Recipe";
import { RootStackParameterList } from "../../types/RootStackParameterList";
import { RecipeInfo } from "./RecipeInfo";
import { Servings } from "./Servings";

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

	const [isServingsModalVisible, setServingsModalVisibility] =
		useState<boolean>(false);

	useEffect(() => {
		if (!recipe) return;

		navigation.setOptions({ title: recipe.name });
	}, [navigation, recipe]);

	// Memoized data

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
		[recipe.ingredients],
	);

	const tabs = [
		{
			title: "Info",
			content: (
				<FlatList
					data={mainData}
					renderItem={({ item }) => (
						<RecipeInfo
							icon={item?.icon}
							content={item?.content}
							iconName={item?.iconName}
							label={item?.label}
						/>
					)}
					keyExtractor={(item) => item.label}
				/>
			),
		},
		{
			title: "Procedimento",
			content: (
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
			),
		},
	];

	// JSX

	if (!recipe) return <></>;

	return (
		// <SafeAreaView style={styles.page}>
		<ScrollView>
			<Image
				source={{ uri: recipe.imgUri }}
				// resizeMode="center"
				style={styles.imageContainer}
			/>

			<View>
				<View style={[styles.flexRow, styles.servingsContainer]}>
					<Servings
						initialServings={recipe?.serving}
						isVisible={isServingsModalVisible}
						onPress={() => setServingsModalVisibility(false)}
					/>
					<TouchableOpacity onPress={() => setServingsModalVisibility(true)}>
						<AppIcon name="pencil" />
					</TouchableOpacity>
				</View>

				<FlatList
					data={mainData}
					renderItem={({ item }) => (
						<RecipeInfo
							icon={item?.icon}
							content={item?.content}
							iconName={item?.iconName}
							label={item?.label}
						/>
					)}
					keyExtractor={(item) => item.label}
				/>

				<Divider />

				<SectionList
					sections={ingredientsData}
					keyExtractor={(item, index) => item.name + index}
					renderItem={({ item }) => (
						<RecipeInfo
							icon={<Text>{"\u2022"}</Text>}
							content={(item?.quantity ?? "") + (item?.uom ?? "")}
							label={item?.name}
						/>
					)}
					renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
					ListHeaderComponent={
						<Text style={styles.recipeMainInfo}>Ingredienti: </Text>
					}
				/>
			</View>

			<Divider />

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

			{/* <TabWithContent tabs={tabs} /> */}
		</ScrollView>
		// </SafeAreaView>
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
		fontSize: 20,
	},
	imageContainer: {
		width: "100%",
		height: undefined,
		// figure out your image aspect ratio
		aspectRatio: 3 / 1.8,
	},
	image: {
		// TODO: use screen dimension
		width: "100%",
		height: undefined,
		aspectRatio: 1,
	},
	recipeMainInfo: { fontSize: 20, padding: 3 },
	flexRow: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	servingsContainer: {
		padding: 6,
		justifyContent: "space-between",
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
