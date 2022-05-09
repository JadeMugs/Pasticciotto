import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useMemo, useState } from "react";
import {
	ScrollView,
	SectionList,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { Divider, Image, Text } from "react-native-elements";

import { AppIcon } from "../../components/AppIcon";
import Ingredient from "../../types/Ingredient";
import { Difficulty } from "../../types/RecipeDifficulty";
import { RootStackParameterList } from "../../types/RootStackParameterList";
import { RecipeInfo } from "./RecipeInfo";
import { ServingsModal } from "./ServingsModal";

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

	const [servings, setServings] = React.useState<number>(recipe?.servings ?? 1);

	// Effects

	useEffect(() => {
		if (!recipe) return;

		navigation.setOptions({ title: recipe.name });
		setServings(recipe.servings);
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

	// JSX

	if (!recipe) return <></>;

	return (
		<ScrollView>
			<Image
				source={{ uri: recipe.imgUri }}
				// resizeMode="center"
				style={styles.imageContainer}
			/>

			<View>
				<View style={[styles.flexRow, styles.servingsContainer]}>
					<Text style={styles.recipeMainInfo}>Dosi per {servings} persone</Text>

					<TouchableOpacity onPress={() => setServingsModalVisibility(true)}>
						<AppIcon name="pencil" />
					</TouchableOpacity>
				</View>

				{mainData.map((item) => (
					<RecipeInfo
						key={item.label}
						icon={item?.icon}
						content={item?.content}
						iconName={item?.iconName}
						label={item?.label}
					/>
				))}

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

			<ServingsModal
				initialServings={recipe?.servings ?? 1}
				currentServings={servings}
				isVisible={isServingsModalVisible}
				onClose={(newServings: number) => {
					setServings(newServings);
					setServingsModalVisibility(false);
				}}
			/>

			{/* <TabWithContent tabs={tabs} /> */}
		</ScrollView>
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
