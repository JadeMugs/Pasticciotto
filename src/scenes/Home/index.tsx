import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableHighlight,
	useColorScheme,
	View,
	VirtualizedList,
} from "react-native";
import {
	Avatar,
	Badge,
	ListItem,
	SearchBar,
	Text,
} from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import recipes from "../../assets/recipes";
import Recipe from "../../types/Recipe";
import { RootStackParameterList } from "../../types/RootStackParameterList";

type HomeNavigationProperties = StackNavigationProp<
	RootStackParameterList,
	"Home"
>;

type HomeProperties = {
	navigation: HomeNavigationProperties;
};

// TODO: move data
const data = [...recipes, ...recipes, ...recipes];

export const Home: React.FC<HomeProperties> = ({
	navigation,
}: HomeProperties) => {
	// Style

	const isDarkMode = useColorScheme() === "dark";

	// Component state

	const [searchText, setSearchText] = useState<string>("");
	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(data);

	// // JSX

	const recipeItem = ({
		item,
	}: ListRenderItemInfo<Recipe>): React.ReactElement => (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor="#DDDDDD"
			onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
			style={styles.itemContainer}
			key={item.name}
		>
			<Avatar size="large" source={{ uri: item.imgUri }} />
			<ListItem.Content>
				<ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
				<Badge
					status="success"
					value={`${item.timing.total.time} ${item.timing.total.uom}`}
					containerStyle={{ position: "absolute", top: -6, right: -4 }}
				/>
				<ListItem.Subtitle>{item.category}</ListItem.Subtitle>
			</ListItem.Content>
		</TouchableHighlight>
	);

	const getItem = (data: Recipe[], index: number) => data[index];

	const onChangeFilterText = (searchText?: string): void => {
		if (searchText?.indexOf("\n") === -1) {
			setSearchText(searchText);
		}
	};

	const onSearchTextClear = (): void => {
		setSearchText("");
		onRecipesFilter();
	};

	const onRecipesFilter = () => {
		if (!searchText) {
			setFilteredRecipes(data);
			return;
		}

		setFilteredRecipes(
			data.filter(
				(recipe) =>
					recipe.name.toLowerCase().search(searchText.toLowerCase()) !== -1,
			),
		);
	};

	return (
		<SafeAreaView>
			<FlatList<Recipe>
				ListHeaderComponent={
					<>
						<Text h2 style={styles.header}>
							Scopri le ricette
						</Text>

						<SearchBar
							placeholder="Cerca una ricetta..."
							onChangeText={onChangeFilterText}
							value={searchText}
							platform="default"
							loadingProps={{}}
							showLoading={true}
							lightTheme={!isDarkMode}
							round={true}
							onClear={onSearchTextClear}
							onCancel={onSearchTextClear}
							onFocus={() => {}}
							onBlur={onRecipesFilter}
							clearIcon={{
								Component: FontAwesomeIcon,
								name: "remove",
								color: "black",
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
						/>
					</>
				}
				data={filteredRecipes}
				initialNumToRender={4}
				renderItem={recipeItem}
				keyExtractor={(item, index) => index + item?.name}
				getItemCount={() => filteredRecipes.length}
				getItem={getItem}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		marginHorizontal: 16,
	},
	itemContainer: {
		padding: 4,
	},
	itemTitle: { fontSize: 20 },
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
		padding: 8,
		textAlign: "center",
	},
	title: {
		fontSize: 22,
	},
});
