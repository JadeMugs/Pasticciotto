import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	useColorScheme,
	View,
} from "react-native";
import { Avatar, Badge, Input, ListItem, Text } from "react-native-elements";

import { recipes as data } from "../../assets/recipes";
import { AppIcon } from "../../components/AppIcon";
import Recipe from "../../types/Recipe";
import { RootStackParameterList } from "../../types/RootStackParameterList";

type HomeNavigationProperties = StackNavigationProp<
	RootStackParameterList,
	"Home"
>;

type HomeProperties = {
	navigation: HomeNavigationProperties;
};

export const Home: React.FC<HomeProperties> = ({
	navigation,
}: HomeProperties) => {
	// Style

	const isDarkMode = useColorScheme() === "dark";

	// Component state

	const [searchText, setSearchText] = useState<string>("");
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(data);
	const [isSearchInputFocused, setIsSearchInputFocused] =
		useState<boolean>(false);

	// Functions

	const onChangeFilterText = (text?: string): void => {
		setSearchText(text ?? "");
		onRecipesFilter(text);
	};

	const onSearchTextClear = (): void => {
		setSearchText("");
		setFilteredRecipes(data);
	};

	const onRecipesFilter = (textFilter?: string) => {
		const newRecipes =
			!textFilter || textFilter?.length <= 0
				? data
				: data.filter(
						(recipe) =>
							recipe.name.toLowerCase().search(textFilter.toLowerCase()) !== -1,
				  );

		setFilteredRecipes(newRecipes);
	};

	return (
		<SafeAreaView style={styles.page}>
			<View style={styles.titleContainer}>
				<Text h2 style={styles.header}>
					Pasticciotto
				</Text>

				<Input
					placeholder="Trova un piatto"
					value={searchText}
					onFocus={() => setIsSearchInputFocused(true)}
					onBlur={() => setIsSearchInputFocused(false)}
					rightIcon={
						!isSearchInputFocused || searchText.length === 0 ? (
							<AppIcon
								name="search"
								size={24}
								color="black"
								onPress={() => onRecipesFilter(searchText)}
							/>
						) : (
							<AppIcon
								name="remove"
								size={24}
								color="black"
								onPress={onSearchTextClear}
							/>
						)
					}
					containerStyle={styles.searchbarContainer}
					inputStyle={styles.searchbarInput}
					onChangeText={onChangeFilterText}
				/>

				{/* <SearchBar
					placeholder="Trova una ricetta..."
					onChangeText={onChangeFilterText}
					value={searchText}
					platform="default"
					loadingProps={{}}
					showLoading={true}
					lightTheme={!isDarkMode}
					round={true}
					onClear={onSearchTextClear}
					onCancel={onSearchTextClear}
					onFocus={() => {
						return;
					}}
					onBlur={onRecipesFilter}
					clearIcon={{
						Component: FontAwesomeIcon,
						name: "remove",
						color: "black",
						iconProps: { size: 24, name: "remove" },
						onPress: onSearchTextClear,
					}}
					searchIcon={{
						Component: FontAwesomeIcon,
						name: "search",
						color: "black",
						onPress: onRecipesFilter,
					}}
					cancelButtonTitle={"Annulla"}
					cancelButtonProps={{}}
					showCancel={true}
					style={styles.searchbar}
				/> */}
			</View>

			{filteredRecipes.length === 0 ? (
				<Text>Nessuna ricetta trovata</Text>
			) : (
				// <FlatList<Recipe>
				// 	data={filteredRecipes}
				// 	initialNumToRender={2}
				// 	renderItem={recipeItemRender}
				// 	keyExtractor={(item, index) => index + item?.name}
				// 	/>
				<>
					{filteredRecipes.map((recipe) => (
						<ListItem
							onPress={() => navigation.navigate("RecipeDetails", { recipe })}
							style={styles.recipeContainer}
							key={recipe.name}
							bottomDivider
						>
							<Avatar size="large" source={{ uri: recipe.imgUri }} />
							<ListItem.Content>
								<ListItem.Title style={styles.recipeTitle}>
									{recipe.name}
								</ListItem.Title>
								<Badge
									status="success"
									value={`${recipe.timing.total.time} ${recipe.timing.total.uom}`}
									containerStyle={styles.recipeBadge}
								/>
								<ListItem.Subtitle>{recipe.category}</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					))}
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: "#eeeded",
	},
	titleContainer: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "#d89518",
		width: "100%",
		height: Dimensions.get("window").height * 0.2,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		marginBottom: 30,
	},
	header: {
		top: 30,
		flex: 3,
		fontSize: 32,
		margin: "auto",
	},
	searchbarContainer: {
		flex: 2,
		borderRadius: 20,
		backgroundColor: "#e6dac5",
		width: Dimensions.get("window").width - 40,
		bottom: -13,
	},
	searchbarInput: {
		color: "black",
	},
	recipeContainer: {
		// backgroundColor: "#fff",
		backgroundColor: "#eeeded",
	},
	recipeContent: {
		backgroundColor: "#eeeded",
	},
	recipeTitle: { fontSize: 20 },
	recipeBadge: { position: "absolute", top: -6, right: -4 },
});
