import React from "react";
import { ListItem } from "react-native-elements";

import { AppIcon } from "../../components/AppIcon";
import { RecipeDetails } from "../../types/Recipe";

export const RecipeInfo: React.FC<RecipeDetails> = ({
	icon,
	iconName,
	label,
	content,
}: RecipeDetails) => (
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
