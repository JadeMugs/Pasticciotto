import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Tab, TabView } from "react-native-elements";

interface TabWithContentProperties {
	tabs: {
		title: string;
		content: string | JSX.Element;
		style?: StyleProp<ViewStyle>;
	}[];
}

export const TabWithContent: React.FC<TabWithContentProperties> = ({
	tabs,
}: TabWithContentProperties) => {
	const [currentTab, setCurrentTab] = React.useState<number>(0);

	const tabsNavigation = (
		<Tab value={currentTab} onChange={setCurrentTab}>
			{tabs.map((tab) => (
				<Tab.Item key={tab.title} title={tab.title} />
			))}
		</Tab>
	);

	const tabsContent = tabs.map((tab, index) => (
		<TabView.Item key={tab.title + index} style={[tab?.style, styles.tabItem]}>
			{tab.content}
		</TabView.Item>
	));

	return (
		<>
			{tabsNavigation}
			<TabView value={currentTab} onChange={setCurrentTab}>
				{tabsContent}
			</TabView>
		</>
	);
};

const styles = StyleSheet.create({
	tabItem: {
		width: "100%",
	},
});
